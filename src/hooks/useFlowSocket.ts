// hooks/useFlowSocket.ts
'use client'
import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useFlowStore } from '@/store/flow.store'
import { useSessionStore } from '@/store/session.store'
import debounce from 'lodash/debounce'

export function useFlowSocket(flowId: string) {
  const socket = useRef<Socket | null>(null)
  const { nodes, edges, flowName, isDirty, markClean, markSaving } = useFlowStore()
  const { token } = useSessionStore()

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_WS_URL!, {
      auth: { token },
      transports: ['websocket'],
    })

    socket.current.emit('join-flow', flowId)

    socket.current.on('flow-saved', () => markClean())
    socket.current.on('flow-conflict', () => {
      // Another user edited — show conflict resolution UI
    })

    return () => { socket.current?.disconnect() }
  }, [flowId])

  // Auto-save on change (debounced 1.5s)
  const autoSave = useRef(
    debounce(async (data: any) => {
      markSaving(true)
      socket.current?.emit('save-flow', data)
    }, 1500)
  ).current

  useEffect(() => {
    if (isDirty && flowId) {
      autoSave({ flowId, name: flowName, nodes, edges })
    }
  }, [nodes, edges, flowName, isDirty])
}

// socket/socket.handlers.ts (backend)
export function registerFlowHandlers(io: Server, socket: Socket) {
  socket.on('join-flow', (flowId: string) => {
    socket.join(`flow:${flowId}`)
  })

  socket.on('save-flow', async (data: any) => {
    const { flowId, name, nodes, edges } = data
    await db.query(
      `UPDATE flows SET name = $1, data = $2::jsonb, updated_at = NOW() WHERE id = $3`,
      [name, JSON.stringify({ name, nodes, edges }), flowId]
    )
    // Invalidate cache
    await redis.del(`flow:${flowId}`)
    // Notify collaborators
    socket.to(`flow:${flowId}`).emit('flow-updated', { flowId, updatedBy: socket.data.userId })
    socket.emit('flow-saved', { flowId })
  })
}