// src/modules/broadcasts/broadcast.service.ts
import { db } from '../../config/db'
import { redis } from '../../config/redis'
import { logger } from '../../shared/logger'
import { WAMessages } from '../whatsapp/wa-messages'
import { io } from '../../app'

const CHUNK_SIZE = 10
const CHUNK_DELAY_MS = 150  // ~66 chunks/sec, respects Meta's 1000 msgs/sec

export class BroadcastService {
  constructor(private clientId: string) {}

  async executeBroadcast(broadcastId: string): Promise<void> {
    const bcRes = await db.query(
      `SELECT * FROM broadcasts WHERE id = $1`,
      [broadcastId]
    )
    const broadcast = bcRes.rows[0]

    if (!broadcast) {
      logger.warn({ broadcastId }, 'Broadcast not found')
      return
    }

    if (broadcast.status === 'cancelled') {
      logger.info({ broadcastId }, 'Broadcast cancelled, skipping')
      return
    }

    const clientRes = await db.query(
      `SELECT c.* FROM clients c WHERE c.id = $1`,
      [this.clientId]
    )
    const client = clientRes.rows[0]
    if (!client) throw new Error(`Client ${this.clientId} not found`)

    // Fetch target contacts
    let query = `
      SELECT phone FROM contacts
      WHERE client_id = $1 AND opted_in = TRUE
    `
    const params: any[] = [this.clientId]

    if (broadcast.target_tags?.length) {
      query += ` AND tags && $${params.length + 1}`
      params.push(broadcast.target_tags)
    }
    if (broadcast.target_phones?.length) {
      query += ` AND phone = ANY($${params.length + 1})`
      params.push(broadcast.target_phones)
    }

    const contactsRes = await db.query(query, params)
    const phones: string[] = contactsRes.rows.map((r: any) => r.phone)

    logger.info({ broadcastId, totalPhones: phones.length }, 'Starting broadcast')

    const wa = new WAMessages(client)
    let sentCount = 0
    let failedCount = 0

    for (let i = 0; i < phones.length; i += CHUNK_SIZE) {
      // Check if cancelled
      const checkRes = await db.query(
        `SELECT status FROM broadcasts WHERE id = $1`,
        [broadcastId]
      )
      if (checkRes.rows[0]?.status === 'cancelled') {
        logger.info({ broadcastId }, 'Broadcast cancelled during execution')
        break
      }

      const chunk = phones.slice(i, i + CHUNK_SIZE)

      const results = await Promise.allSettled(
        chunk.map(phone =>
          wa.sendTemplate(phone, {
            name: broadcast.template_name,
            language: 'en_US',
            components: broadcast.components ?? [],
          })
        )
      )

      const chunkSent = results.filter(r => r.status === 'fulfilled').length
      const chunkFailed = results.filter(r => r.status === 'rejected').length

      sentCount += chunkSent
      failedCount += chunkFailed

      // Update progress in DB
      await db.query(
        `UPDATE broadcasts
         SET sent_count = $1, failed_count = $2
         WHERE id = $3`,
        [sentCount, failedCount, broadcastId]
      )

      // Emit real-time progress via Socket.io
      if (io) {
        io.to(`broadcast:${broadcastId}`).emit('broadcast:progress', {
          broadcastId,
          sent_count: sentCount,
          failed_count: failedCount,
          status: 'running',
          timestamp: Date.now(),
        })
      }

      if (chunkFailed > 0) {
        logger.warn({
          broadcastId,
          chunkStart: i,
          failed: chunkFailed,
        }, 'Some messages in chunk failed')
      }

      // Respect rate limits
      if (i + CHUNK_SIZE < phones.length) {
        await new Promise(r => setTimeout(r, CHUNK_DELAY_MS))
      }
    }

    // Mark completed
    await db.query(
      `UPDATE broadcasts
       SET status = 'completed', completed_at = NOW()
       WHERE id = $1`,
      [broadcastId]
    )

    logger.info({
      broadcastId,
      sent: sentCount,
      failed: failedCount,
      total: phones.length,
    }, 'Broadcast completed')

    // Final progress update
    if (io) {
      io.to(`broadcast:${broadcastId}`).emit('broadcast:progress', {
        broadcastId,
        sent_count: sentCount,
        failed_count: failedCount,
        status: 'completed',
        timestamp: Date.now(),
      })
    }
  }
}