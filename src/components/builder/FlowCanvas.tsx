// components/builder/FlowCanvas.tsx
'use client'
import ReactFlow, {
  Background, Controls, MiniMap, Panel,
  useNodesState, useEdgesState, addEdge,
  type NodeTypes, type EdgeTypes,
  type Connection, type OnConnectStartParams,
  BackgroundVariant,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useCallback, useEffect, useRef } from 'react'
import { useFlowStore } from '@/store/flow.store'
import { TriggerNode }   from './nodes/TriggerNode'
import { MessageNode }   from './nodes/MessageNode'
import { ButtonsNode }   from './nodes/ButtonsNode'
import { ConditionNode } from './nodes/ConditionNode'
import { AiNode }        from './nodes/AiNode'
import { DelayNode }     from './nodes/DelayNode'
import { ApiNode }       from './nodes/ApiNode'
import { FormNode }      from './nodes/FormNode'

const nodeTypes: NodeTypes = {
  trigger:   TriggerNode,
  message:   MessageNode,
  buttons:   ButtonsNode,
  condition: ConditionNode,
  ai:        AiNode,
  delay:     DelayNode,
  api:       ApiNode,
  form:      FormNode,
}

export function FlowCanvas() {
  const { nodes, edges, addEdge: storeAddEdge,
          deleteNode, setSelectedNode, addNode } = useFlowStore()

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes)
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const reactFlowInstance = useRef<any>(null)

  // Sync store → ReactFlow
  useEffect(() => { setRfNodes(nodes) }, [nodes])
  useEffect(() => { setRfEdges(edges) }, [edges])

  const onConnect = useCallback((params: Connection) => {
    setRfEdges(es => addEdge({ ...params, type: 'smoothstep' }, es))
    storeAddEdge({ ...params, id: `e${params.source}-${params.target}`, type: 'smoothstep' } as any)
  }, [])

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    const type = event.dataTransfer.getData('application/reactflow')
    if (!type || !reactFlowInstance.current) return

    const bounds = reactFlowWrapper.current?.getBoundingClientRect()
    const position = reactFlowInstance.current.project({
      x: event.clientX - (bounds?.left ?? 0),
      y: event.clientY - (bounds?.top ?? 0),
    })
    addNode(type as any, position)
  }, [])

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move' }}
        onNodeClick={(_, node) => setSelectedNode(node.id)}
        onPaneClick={() => setSelectedNode(null)}
        onInit={i => { reactFlowInstance.current = i }}
        nodeTypes={nodeTypes}
        deleteKeyCode="Delete"
        fitView
        className="bg-zinc-50 dark:bg-zinc-950"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls />
        <MiniMap nodeColor="#6366f1" maskColor="rgba(0,0,0,0.05)" />
      </ReactFlow>
    </div>
  )
}