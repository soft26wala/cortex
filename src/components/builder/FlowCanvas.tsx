// components/builder/FlowCanvas.tsx
'use client'
import ReactFlow, {
  Background, Controls, MiniMap, Panel,
  useNodesState, useEdgesState, addEdge,
  type NodeTypes, type Connection,
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
          setSelectedNode, addNode } = useFlowStore()

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes)
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const reactFlowInstance = useRef<any>(null)

  // Sync store → ReactFlow
  useEffect(() => { setRfNodes(nodes) }, [nodes])
  useEffect(() => { setRfEdges(edges) }, [edges])

  const onConnect = useCallback((params: Connection) => {
    const edgeConfig = {
      ...params,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 }
    }
    setRfEdges(es => addEdge(edgeConfig, es))
    storeAddEdge({ ...params, id: `e${params.source}-${params.target}`, ...edgeConfig } as any)
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
    <div ref={reactFlowWrapper} className="w-full h-full relative overflow-hidden bg-zinc-50 dark:bg-[#08080c]">
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
        className="bg-transparent"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.2} color="rgba(100, 116, 139, 0.2)" />
        <Controls className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-1 text-zinc-700 dark:text-zinc-300" />
        <MiniMap
          nodeColor="#10b981"
          maskColor="rgba(0,0,0,0.1)"
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-lg"
        />
      </ReactFlow>
    </div>
  )
}