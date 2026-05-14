// store/flow.store.ts
import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Node, Edge } from 'reactflow'

export type NodeType =
  | 'trigger' | 'message' | 'image' | 'buttons' | 'list'
  | 'input' | 'condition' | 'api' | 'delay' | 'ai' | 'form' | 'template'

export interface FlowNodeData {
  type: NodeType
  label: string
  // message
  text?: string
  header?: string
  footer?: string
  // buttons
  body?: string
  buttons?: Array<{ id: string; text: string; nextNodeId?: string }>
  // condition
  variable?: string; operator?: string; value?: string
  trueNodeId?: string; falseNodeId?: string
  // input
  promptText?: string; variableName?: string
  // api
  url?: string; method?: string; responseMappings?: Record<string, string>
  // ai
  systemPrompt?: string; model?: string
  // delay
  delayMs?: number
  // image
  imageUrl?: string; caption?: string
  // form
  metaFlowId?: string; fields?: any[]
  // template
  templateName?: string; language?: string; components?: any[]
  // common
  nextNodeId?: string
  [key: string]: any
}

interface FlowState {
  flowId: string | null
  flowName: string
  nodes: Node<FlowNodeData>[]
  edges: Edge[]
  selectedNodeId: string | null
  isDirty: boolean
  isSaving: boolean

  // Actions
  setFlow: (id: string, name: string, nodes: Node[], edges: Edge[]) => void
  setFlowName: (name: string) => void
  addNode: (type: NodeType, position: { x: number; y: number }) => void
  updateNode: (id: string, data: Partial<FlowNodeData>) => void
  deleteNode: (id: string) => void
  addEdge: (edge: Edge) => void
  deleteEdge: (id: string) => void
  setSelectedNode: (id: string | null) => void
  markSaving: (saving: boolean) => void
  markClean: () => void
}

let nodeCounter = 0

export const useFlowStore = create<FlowState>()(
  devtools(
    subscribeWithSelector(
      immer((set) => ({
        flowId: null,
        flowName: 'Untitled Flow',
        nodes: [],
        edges: [],
        selectedNodeId: null,
        isDirty: false,
        isSaving: false,

        setFlow: (id, name, nodes, edges) =>
          set(s => { s.flowId = id; s.flowName = name; s.nodes = nodes; s.edges = edges; s.isDirty = false }),

        setFlowName: (name) =>
          set(s => { s.flowName = name; s.isDirty = true }),

        addNode: (type, position) => {
          const id = `node_${++nodeCounter}_${Date.now()}`
          set(s => {
            s.nodes.push({
              id, type,
              position,
              data: { type, label: type.charAt(0).toUpperCase() + type.slice(1) },
            })
            s.isDirty = true
          })
        },

        updateNode: (id, data) =>
          set(s => {
            const node = s.nodes.find(n => n.id === id)
            if (node) { Object.assign(node.data, data); s.isDirty = true }
          }),

        deleteNode: (id) =>
          set(s => {
            s.nodes = s.nodes.filter(n => n.id !== id)
            s.edges = s.edges.filter(e => e.source !== id && e.target !== id)
            if (s.selectedNodeId === id) s.selectedNodeId = null
            s.isDirty = true
          }),

        addEdge: (edge) =>
          set(s => { s.edges.push(edge); s.isDirty = true }),

        deleteEdge: (id) =>
          set(s => { s.edges = s.edges.filter(e => e.id !== id); s.isDirty = true }),

        setSelectedNode: (id) =>
          set(s => { s.selectedNodeId = id }),

        markSaving: (saving) =>
          set(s => { s.isSaving = saving }),

        markClean: () =>
          set(s => { s.isDirty = false }),
      }))
    )
  )
)