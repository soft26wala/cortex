// src/modules/webhook/webhook.dispatcher.ts
import { FlowEngine } from '../engine/flow-engine'
import { db } from '../../config/db'
import { redis } from '../../config/redis'
import { logger } from '../../../shared/logger'
import { messageQueue } from '../../config/bullmq'

export class WebhookDispatcher {
  private engine: FlowEngine

  constructor(private client: any) {
    this.engine = new FlowEngine(client)
  }

  async handleMessage(message: any, metadata: any): Promise<void> {
    const from = message.from
    const type = message.type

    logger.info({ clientId: this.client.id, from, type }, 'Incoming message')

    // Idempotency: skip already-processed messages
    const dedup = await redis.set(
      `dedup:${this.client.id}:${message.id}`,
      '1', 'EX', 86400, 'NX'
    )
    if (!dedup) return

    // Upsert contact
    const contact = await this.upsertContact(from)

    // Log inbound message
    await this.logMessage({
      clientId: this.client.id,
      contactId: contact.id,
      direction: 'inbound',
      type,
      content: message,
      waMessageId: message.id,
    })

    // Route to engine
    await this.engine.processMessage({
      from,
      contactId: contact.id,
      message,
      type,
    })
  }

  async handleStatus(status: any): Promise<void> {
    const { id: waMessageId, status: newStatus } = status
    await db.query(
      `UPDATE messages SET status = $1 WHERE wa_message_id = $2`,
      [newStatus, waMessageId]
    )
  }

  private async upsertContact(phone: string) {
    const res = await db.query(
      `INSERT INTO contacts (client_id, phone)
       VALUES ($1, $2)
       ON CONFLICT (client_id, phone) DO UPDATE
       SET last_seen = NOW(), updated_at = NOW()
       RETURNING *`,
      [this.client.id, phone]
    )
    return res.rows[0]
  }

  private async logMessage(data: {
    clientId: string; contactId: string; direction: string;
    type: string; content: any; waMessageId?: string
  }) {
    await db.query(
      `INSERT INTO messages (client_id, contact_id, direction, type, content, wa_message_id, status)
       VALUES ($1, $2, $3, $4, $5::jsonb, $6, 'sent')`,
      [data.clientId, data.contactId, data.direction, data.type,
       JSON.stringify(data.content), data.waMessageId ?? null]
    )
  }
}