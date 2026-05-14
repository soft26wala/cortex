// src/types/index.ts
export interface FlowNode {
  id: string
  type: string
  data: Record<string, any>
  buttons?: Array<{ id: string; text: string; nextNodeId?: string; action?: string; url?: string }>
  triggers?: string[]
  position?: { x: number; y: number }
}

export interface FlowData {
  id: string
  name: string
  nodes: FlowNode[]
  edges?: Array<{ id: string; source: string; target: string; sourceHandle?: string }>
}

export interface Session {
  id: string
  clientId: string
  contactId: string
  phone: string
  flowId: string
  currentNodeId: string
  state: Record<string, any>
  status: 'active' | 'waiting_input' | 'completed' | 'expired'
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface Client {
  id: string
  userId: string
  planId: string
  name: string
  slug: string
  phoneNumberId: string
  waBusinessId: string
  accessToken: string
  verifyToken: string
  messagesSentThisMonth: number
  planExpiresAt: Date | null
  isActive: boolean
  timezone: string
}