// src/socket/socket.handlers.ts
import { Server, Socket } from 'socket.io'
import { db } from '../config/db'
import { redis } from '../config/redis'
import { logger } from '../shared/logger'
import jwt from 'jsonwebtoken'

export function registerFlowHandlers(io: Server, socket: Socket) {
  const auth = socket.handshake.auth as any
  let userId: string | null = null

  // Verify auth
  try {
    const payload = jwt.verify(auth.token, process.env.JWT_SECRET!) as any
    userId = payload.userId
    socket.data.userId = userId
  } catch {
    socket.disconnect()
    return
  }

  // ─────────────────────────────────────────────────────────────────
  // FLOW EDITOR ROOM
  // ─────────────────────────────────────────────────────────────────

  socket.on('join-flow', (flowId: string) => {
    socket.join(`flow:${flowId}`)
    logger.debug({ userId, flowId }, 'User joined flow room')
  })

  socket.on('leave-flow', (flowId: string) => {
    socket.leave(`flow:${flowId}`)
  })

  socket.on('save-flow', async (data: any) => {
    const { flowId, name, nodes, edges } = data

    try {
      await db.query(
        `UPDATE flows
         SET name = $1,
             data = $2::jsonb,
             updated_at = NOW()
         WHERE id = $3`,
        [name, JSON.stringify({ name, nodes, edges }), flowId]
      )

      // Invalidate cache
      await redis.del(`flow:${flowId}`)

      socket.emit('flow:saved', { flowId, timestamp: Date.now() })
      socket.to(`flow:${flowId}`).emit('flow:updated', {
        flowId,
        updatedBy: userId,
        name,
        timestamp: Date.now(),
      })

      logger.debug({ userId, flowId }, 'Flow saved')
    } catch (err) {
      socket.emit('flow:save-error', { flowId, error: (err as Error).message })
      logger.error({ userId, flowId, err }, 'Flow save failed')
    }
  })

  // ─────────────────────────────────────────────────────────────────
  // BROADCAST PROGRESS (real-time updates)
  // ─────────────────────────────────────────────────────────────────

  socket.on('join-broadcast', (broadcastId: string) => {
    socket.join(`broadcast:${broadcastId}`)
  })

  socket.on('leave-broadcast', (broadcastId: string) => {
    socket.leave(`broadcast:${broadcastId}`)
  })

  // Emit progress updates to all subscribers
  socket.on('broadcast:progress', (data: any) => {
    const { broadcastId, sent_count, failed_count, status } = data
    io.to(`broadcast:${broadcastId}`).emit('broadcast:progress', {
      broadcastId,
      sent_count,
      failed_count,
      status,
      timestamp: Date.now(),
    })
  })

  // ─────────────────────────────────────────────────────────────────
  // DISCONNECT
  // ─────────────────────────────────────────────────────────────────

  socket.on('disconnect', () => {
    logger.debug({ userId }, 'User disconnected')
  })
}

// ─────────────────────────────────────────────────────────────────────
// EMIT PROGRESS FROM WORKERS
// ─────────────────────────────────────────────────────────────────────

export function emitBroadcastProgress(
  io: Server,
  broadcastId: string,
  sent_count: number,
  failed_count: number,
  status: string
) {
  io.to(`broadcast:${broadcastId}`).emit('broadcast:progress', {
    broadcastId,
    sent_count,
    failed_count,
    status,
    timestamp: Date.now(),
  })
}