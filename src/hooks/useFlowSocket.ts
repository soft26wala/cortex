// hooks/useFlowSocket.ts
'use client'
import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useFlowStore } from '@/store/flow.store'
import { useSessionStore } from '@/store/session.store'

function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

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