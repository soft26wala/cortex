'use client'

import React, { useState, useCallback, useEffect } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  Node,
  Edge,
  Connection
} from 'reactflow'
import 'reactflow/dist/style.css'
import {
  Play,
  Key,
  MessageSquare,
  Image as ImageIcon,
  List,
  GitBranch,
  Clock,
  Globe,
  Bot,
  UserCheck,
  Save,
  Send,
  Plus,
  Trash2,
  Edit3,
  X,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react'

// Custom Node Components
const StartNodeComponent = ({ data }: any) => (
  <div className="px-4 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 shadow-lg text-white w-52">
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-emerald-400 border-2 border-slate-900" />
    <div className="flex items-center gap-2 font-bold text-xs text-emerald-300">
      <Play className="w-4 h-4 text-emerald-400" /> Start Trigger
    </div>
    <p className="text-[11px] text-slate-300 mt-1 leading-tight">{data.label || 'Incoming WhatsApp Message'}</p>
  </div>
)

const MessageNodeComponent = ({ data }: any) => (
  <div className="px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-xl text-white w-60">
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-400 border-2 border-slate-900" />
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-400 border-2 border-slate-900" />
    <div className="flex items-center gap-2 font-bold text-xs text-blue-400">
      <MessageSquare className="w-4 h-4 text-blue-400" /> Message Reply
    </div>
    <p className="text-[11px] text-slate-200 mt-1.5 font-sans leading-relaxed">{data.text || 'Enter reply text...'}</p>
    {data.buttons && data.buttons.length > 0 && (
      <div className="mt-2 space-y-1">
        {data.buttons.map((b: string, i: number) => (
          <div key={i} className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-[10px] font-semibold border border-blue-500/30 text-center">
            🔘 {b}
          </div>
        ))}
      </div>
    )}
  </div>
)

const ConditionNodeComponent = ({ data }: any) => (
  <div className="px-4 py-3 rounded-2xl bg-purple-950/90 border border-purple-500/50 shadow-xl text-white w-56">
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-purple-400 border-2 border-slate-900" />
    <Handle type="source" position={Position.Bottom} id="yes" className="w-3 h-3 bg-emerald-400 left-1/3" />
    <Handle type="source" position={Position.Bottom} id="no" className="w-3 h-3 bg-rose-400 left-2/3" />
    <div className="flex items-center gap-2 font-bold text-xs text-purple-300">
      <GitBranch className="w-4 h-4 text-purple-400" /> Condition (If/Else)
    </div>
    <p className="text-[11px] text-purple-200 mt-1 font-mono">{data.condition || 'Text contains keyword'}</p>
  </div>
)

const AiNodeComponent = ({ data }: any) => (
  <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-500/50 shadow-xl text-white w-56">
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-indigo-400 border-2 border-slate-900" />
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-indigo-400 border-2 border-slate-900" />
    <div className="flex items-center gap-2 font-bold text-xs text-indigo-300">
      <Bot className="w-4 h-4 text-indigo-400" /> AI Auto-Agent
    </div>
    <p className="text-[11px] text-slate-300 mt-1">{data.prompt || 'OpenAI / Gemini Smart Response'}</p>
  </div>
)

const ApiNodeComponent = ({ data }: any) => (
  <div className="px-4 py-3 rounded-2xl bg-slate-900/90 border border-teal-500/50 shadow-xl text-white w-56">
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-teal-400 border-2 border-slate-900" />
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-teal-400 border-2 border-slate-900" />
    <div className="flex items-center gap-2 font-bold text-xs text-teal-300">
      <Globe className="w-4 h-4 text-teal-400" /> REST API / Webhook
    </div>
    <p className="text-[11px] text-slate-400 font-mono mt-1 truncate">{data.url || 'https://api.example.com'}</p>
  </div>
)

const nodeTypes = {
  startNode: StartNodeComponent,
  messageNode: MessageNodeComponent,
  conditionNode: ConditionNodeComponent,
  aiNode: AiNodeComponent,
  apiNode: ApiNodeComponent
}

const initialNodes: Node[] = [
  { id: '1', type: 'startNode', position: { x: 250, y: 30 }, data: { label: 'Incoming WhatsApp Message' } },
  {
    id: '2',
    type: 'messageNode',
    position: { x: 250, y: 180 },
    data: {
      title: 'Welcome Message',
      text: '👋 Welcome to Cortex WhatsApp SaaS! How can we assist you today?',
      buttons: ['View Pricing', 'Connect Meta API', 'Live Agent Support']
    }
  },
  {
    id: '3',
    type: 'aiNode',
    position: { x: 250, y: 380 },
    data: { prompt: 'Generate intelligent AI answer using Gemini / OpenAI API' }
  }
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } }
]

export function FlowBuilderCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [statusMsg, setStatusMsg] = useState('')
  const [saving, setSaving] = useState(false)

  // Node Inspector input states
  const [nodeText, setNodeText] = useState('')
  const [nodeButtons, setNodeButtons] = useState('')

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#10b981', strokeWidth: 2 } }, eds)),
    [setEdges]
  )

  const onNodeClick = (_: any, node: Node) => {
    setSelectedNode(node)
    setNodeText(node.data?.text || node.data?.prompt || node.data?.url || '')
    setNodeButtons((node.data?.buttons || []).join(', '))
  }

  const handleUpdateSelectedNode = () => {
    if (!selectedNode) return
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === selectedNode.id) {
          const updatedData = { ...n.data }
          if (n.type === 'messageNode') {
            updatedData.text = nodeText
            updatedData.buttons = nodeButtons.split(',').map((b) => b.trim()).filter(Boolean)
          } else if (n.type === 'aiNode') {
            updatedData.prompt = nodeText
          } else if (n.type === 'apiNode') {
            updatedData.url = nodeText
          }
          return { ...n, data: updatedData }
        }
        return n
      })
    )
    setStatusMsg('Node configuration updated!')
    setTimeout(() => setStatusMsg(''), 3000)
  }

  const handleAddNode = (type: string) => {
    const newNodeId = `node-${Date.now()}`
    const newNode: Node = {
      id: newNodeId,
      type,
      position: { x: Math.random() * 300 + 100, y: Math.random() * 300 + 100 },
      data:
        type === 'messageNode'
          ? { text: 'New Automated Reply Message', buttons: ['Option 1', 'Option 2'] }
          : type === 'conditionNode'
          ? { condition: 'Keyword matches' }
          : type === 'aiNode'
          ? { prompt: 'AI Agent Response Prompt' }
          : { url: 'https://api.cortestack.com/webhook' }
    }
    setNodes((nds) => [...nds, newNode])
  }

  const handleSaveAndPublishFlow = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/whatsapp/flows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Production WhatsApp Visual Flow',
          isPublished: true,
          nodes,
          edges
        })
      })
      const result = await res.json()
      if (result.success) {
        setStatusMsg('Flow graph saved & published to production engine!')
        setTimeout(() => setStatusMsg(''), 5000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="w-full h-[750px] bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col">
      {/* Top Toolbar */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Visual WhatsApp Flow Builder <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">Active Engine</span>
            </h2>
            <p className="text-xs text-slate-400">Drag & drop nodes to design visual conversational trees.</p>
          </div>
        </div>

        {statusMsg && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {statusMsg}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAndPublishFlow}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> {saving ? 'Publishing...' : 'Save & Publish Flow'}
          </button>
        </div>
      </div>

      {/* Main Canvas + Sidebar Area */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Left Node Palette Sidebar */}
        <div className="w-64 bg-slate-900/90 border-r border-slate-800 p-4 space-y-3 z-10 overflow-y-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Drag / Add Node</span>
          <button
            onClick={() => handleAddNode('messageNode')}
            className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-white flex items-center gap-2.5 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-blue-400" /> Text / Buttons Reply
          </button>
          <button
            onClick={() => handleAddNode('conditionNode')}
            className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-white flex items-center gap-2.5 transition-all"
          >
            <GitBranch className="w-4 h-4 text-purple-400" /> If / Else Condition
          </button>
          <button
            onClick={() => handleAddNode('aiNode')}
            className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-white flex items-center gap-2.5 transition-all"
          >
            <Bot className="w-4 h-4 text-indigo-400" /> AI Auto Agent Response
          </button>
          <button
            onClick={() => handleAddNode('apiNode')}
            className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-white flex items-center gap-2.5 transition-all"
          >
            <Globe className="w-4 h-4 text-teal-400" /> REST API / Webhook Action
          </button>
        </div>

        {/* Center React Flow Canvas */}
        <div className="flex-1 h-full bg-slate-950 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background color="#334155" gap={20} />
            <Controls className="bg-slate-900 border-slate-800 text-white fill-white" />
            <MiniMap className="bg-slate-900 border-slate-800" nodeColor="#1e293b" maskColor="rgba(0, 0, 0, 0.7)" />
          </ReactFlow>
        </div>

        {/* Right Node Inspector Panel */}
        {selectedNode && (
          <div className="w-80 bg-slate-900/95 border-l border-slate-800 p-5 space-y-4 z-10">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-400" /> Node Inspector
              </h3>
              <button onClick={() => setSelectedNode(null)} className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">Node Type / ID</label>
                <span className="font-mono text-emerald-400">{selectedNode.type} ({selectedNode.id})</span>
              </div>

              {selectedNode.type === 'messageNode' && (
                <>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Message Text Payload</label>
                    <textarea
                      rows={4}
                      value={nodeText}
                      onChange={(e) => setNodeText(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-sans focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Quick Reply Buttons (Comma separated)</label>
                    <input
                      type="text"
                      value={nodeButtons}
                      onChange={(e) => setNodeButtons(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </>
              )}

              {selectedNode.type === 'aiNode' && (
                <div>
                  <label className="text-slate-400 font-bold block mb-1">AI Prompt / Context</label>
                  <textarea
                    rows={4}
                    value={nodeText}
                    onChange={(e) => setNodeText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              {selectedNode.type === 'apiNode' && (
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Webhook Endpoint URL</label>
                  <input
                    type="text"
                    value={nodeText}
                    onChange={(e) => setNodeText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              <button
                onClick={handleUpdateSelectedNode}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
              >
                Apply Node Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
