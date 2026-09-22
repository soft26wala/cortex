'use client'

import React, { useState, useCallback } from 'react'
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
  MessageSquare,
  Image as ImageIcon,
  GitBranch,
  Globe,
  Bot,
  Save,
  Plus,
  Trash2,
  Edit3,
  X,
  Sparkles,
  CheckCircle2,
  Layers,
  FileCode,
  List,
  BookOpen,
  Smartphone,
  PlayCircle
} from 'lucide-react'
import { WhatsAppTemplateLibraryModal, TemplateItem } from './WhatsAppTemplateLibrary'
import { FlowTestPhoneModal } from './FlowTestPhoneModal'

// ── CUSTOM NODE COMPONENTS WITH DEDICATED PER-BUTTON HANDLES ────────────────────────

const StartNodeComponent = ({ data }: any) => (
  <div className="px-4 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 shadow-lg text-white w-60">
    <Handle type="source" position={Position.Bottom} className="w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900" />
    <div className="flex items-center gap-2 font-bold text-xs text-emerald-300">
      <Play className="w-4 h-4 text-emerald-400" /> Start Trigger
    </div>
    <p className="text-[11px] text-slate-300 mt-1 leading-tight">{data.label || 'Incoming WhatsApp Message'}</p>
  </div>
)

const MessageNodeComponent = ({ data }: any) => (
  <div className="px-4 py-3.5 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-white w-64 relative">
    {/* Top Input Handle */}
    <Handle type="target" position={Position.Top} className="w-3.5 h-3.5 bg-blue-400 border-2 border-slate-900" />

    <div className="flex items-center gap-2 font-bold text-xs text-blue-400">
      <MessageSquare className="w-4 h-4 text-blue-400" /> Message & Buttons
    </div>
    <p className="text-[11px] text-slate-200 mt-2 font-sans leading-relaxed bg-slate-950/60 p-2 rounded-xl border border-slate-800">
      {data.text || 'Enter reply text...'}
    </p>

    {/* Fallback bottom handle if no buttons exist */}
    {(!data.buttons || data.buttons.length === 0) && (
      <Handle type="source" position={Position.Bottom} className="w-3.5 h-3.5 bg-blue-400 border-2 border-slate-900" />
    )}

    {/* Dedicated Output Handle for EACH Button */}
    {data.buttons && data.buttons.length > 0 && (
      <div className="mt-3 space-y-2 border-t border-slate-800/80 pt-2.5">
        <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
          Button Output Branches:
        </span>
        {data.buttons.map((b: string, i: number) => {
          const handleId = `btn-${i}`
          return (
            <div
              key={i}
              className="relative flex items-center justify-between px-3 py-1.5 rounded-xl bg-blue-950/80 text-blue-300 text-[11px] font-semibold border border-blue-500/40 shadow-sm"
            >
              <span className="truncate pr-3">🔘 {b}</span>
              {/* Dedicated Right Handle for Button */}
              <Handle
                type="source"
                position={Position.Right}
                id={handleId}
                className="w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 -right-2.5"
                title={`Branch line for "${b}"`}
              />
            </div>
          )
        })}
      </div>
    )}
  </div>
)

const ConditionNodeComponent = ({ data }: any) => (
  <div className="px-4 py-3.5 rounded-2xl bg-purple-950/90 border border-purple-500/50 shadow-2xl text-white w-60 relative">
    <Handle type="target" position={Position.Top} className="w-3.5 h-3.5 bg-purple-400 border-2 border-slate-900" />
    <div className="flex items-center gap-2 font-bold text-xs text-purple-300">
      <GitBranch className="w-4 h-4 text-purple-400" /> Condition (If / Else)
    </div>
    <p className="text-[11px] text-purple-200 mt-2 font-mono bg-purple-900/40 p-2 rounded-xl border border-purple-500/30">
      {data.condition || 'Text matches keyword'}
    </p>

    <div className="mt-3 flex justify-between text-[10px] font-bold border-t border-purple-800/60 pt-2">
      <div className="relative text-emerald-400">
        <span>✅ Match (Yes)</span>
        <Handle type="source" position={Position.Bottom} id="yes" className="w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 left-4" />
      </div>
      <div className="relative text-rose-400">
        <span>❌ Fallback (No)</span>
        <Handle type="source" position={Position.Bottom} id="no" className="w-3.5 h-3.5 bg-rose-400 border-2 border-slate-900 right-4" />
      </div>
    </div>
  </div>
)

const AiNodeComponent = ({ data }: any) => (
  <div className="px-4 py-3.5 rounded-2xl bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-500/50 shadow-2xl text-white w-64">
    <Handle type="target" position={Position.Top} className="w-3.5 h-3.5 bg-indigo-400 border-2 border-slate-900" />
    <Handle type="source" position={Position.Bottom} className="w-3.5 h-3.5 bg-indigo-400 border-2 border-slate-900" />
    <div className="flex items-center gap-2 font-bold text-xs text-indigo-300">
      <Bot className="w-4 h-4 text-indigo-400" /> ChatGPT / Gemini AI Agent
    </div>
    <p className="text-[11px] text-slate-300 mt-2 bg-indigo-900/40 p-2 rounded-xl border border-indigo-500/30 leading-relaxed">
      {data.prompt || 'AI Agent Prompt Response'}
    </p>
  </div>
)

const ApiNodeComponent = ({ data }: any) => (
  <div className="px-4 py-3.5 rounded-2xl bg-slate-900/95 border border-teal-500/50 shadow-2xl text-white w-64">
    <Handle type="target" position={Position.Top} className="w-3.5 h-3.5 bg-teal-400 border-2 border-slate-900" />
    <Handle type="source" position={Position.Bottom} className="w-3.5 h-3.5 bg-teal-400 border-2 border-slate-900" />
    <div className="flex items-center gap-2 font-bold text-xs text-teal-300">
      <Globe className="w-4 h-4 text-teal-400" /> REST API / Webhook Action
    </div>
    <p className="text-[11px] text-slate-300 font-mono mt-2 bg-slate-950 p-2 rounded-xl border border-slate-800 truncate">
      {data.url || 'https://api.cortestack.com/webhook'}
    </p>
  </div>
)

const MediaNodeComponent = ({ data }: any) => (
  <div className="px-4 py-3.5 rounded-2xl bg-amber-950/90 border border-amber-500/50 shadow-2xl text-white w-60">
    <Handle type="target" position={Position.Top} className="w-3.5 h-3.5 bg-amber-400 border-2 border-slate-900" />
    <Handle type="source" position={Position.Bottom} className="w-3.5 h-3.5 bg-amber-400 border-2 border-slate-900" />
    <div className="flex items-center gap-2 font-bold text-xs text-amber-300">
      <ImageIcon className="w-4 h-4 text-amber-400" /> Media Image / PDF Document
    </div>
    <p className="text-[11px] text-amber-200 mt-2 truncate font-mono">{data.mediaUrl || 'https://images.unsplash.com/...'}</p>
  </div>
)

const nodeTypes = {
  startNode: StartNodeComponent,
  messageNode: MessageNodeComponent,
  conditionNode: ConditionNodeComponent,
  aiNode: AiNodeComponent,
  apiNode: ApiNodeComponent,
  mediaNode: MediaNodeComponent
}

// ── PRE-BUILT TEMPLATES CATALOG ─────────────────────────────────────────────────────

const FLOW_TEMPLATES = {
  ecommerce: {
    name: '🛒 E-Commerce & Lead Sales Bot',
    nodes: [
      { id: '1', type: 'startNode', position: { x: 300, y: 30 }, data: { label: 'Customer texts "hello" or "menu"' } },
      {
        id: '2',
        type: 'messageNode',
        position: { x: 300, y: 150 },
        data: {
          text: '👋 Welcome to Cortex Store! How can we assist your order today?',
          buttons: ['Browse Products', 'Track My Order', 'Talk to Sales AI']
        }
      },
      {
        id: 'node-prod',
        type: 'messageNode',
        position: { x: 40, y: 380 },
        data: {
          text: '🛍️ Explore top products: 1. Luxury Villa SaaS, 2. WhatsApp Bot Engine. Click link to order!',
          buttons: ['Complete Payment']
        }
      },
      {
        id: 'node-track',
        type: 'apiNode',
        position: { x: 340, y: 380 },
        data: { url: 'https://api.cortestack.com/orders/track' }
      },
      {
        id: 'node-ai',
        type: 'aiNode',
        position: { x: 640, y: 380 },
        data: { prompt: 'Answer sales inquiries automatically using Gemini AI model.' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
      { id: 'e-btn0', source: '2', sourceHandle: 'btn-0', target: 'node-prod', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
      { id: 'e-btn1', source: '2', sourceHandle: 'btn-1', target: 'node-track', animated: true, style: { stroke: '#14b8a6', strokeWidth: 2 } },
      { id: 'e-btn2', source: '2', sourceHandle: 'btn-2', target: 'node-ai', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } }
    ]
  },
  support: {
    name: '🛠️ 24/7 Customer Support & FAQ Tree',
    nodes: [
      { id: '1', type: 'startNode', position: { x: 300, y: 30 }, data: { label: 'Incoming Support Request' } },
      {
        id: '2',
        type: 'messageNode',
        position: { x: 300, y: 150 },
        data: {
          text: '🛠️ Cortex Helpdesk. Please select a department below:',
          buttons: ['Technical Setup', 'Billing & Refunds', 'Human Agent']
        }
      },
      {
        id: 'node-tech',
        type: 'messageNode',
        position: { x: 40, y: 380 },
        data: { text: '🔧 For tech setup, connect Meta API Token in Dashboard -> Meta Credentials tab.' }
      },
      {
        id: 'node-bill',
        type: 'apiNode',
        position: { x: 340, y: 380 },
        data: { url: 'https://api.cortestack.com/billing/invoices' }
      },
      {
        id: 'node-human',
        type: 'messageNode',
        position: { x: 640, y: 380 },
        data: { text: '👨‍💼 Customer support team notified! Our executive will call you in 5 mins.' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
      { id: 'e-b0', source: '2', sourceHandle: 'btn-0', target: 'node-tech', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
      { id: 'e-b1', source: '2', sourceHandle: 'btn-1', target: 'node-bill', animated: true, style: { stroke: '#14b8a6', strokeWidth: 2 } },
      { id: 'e-b2', source: '2', sourceHandle: 'btn-2', target: 'node-human', animated: true, style: { stroke: '#ec4899', strokeWidth: 2 } }
    ]
  },
  realestate: {
    name: '🏡 Proptis Real Estate Inquiry Bot',
    nodes: [
      { id: '1', type: 'startNode', position: { x: 300, y: 30 }, data: { label: 'Property buyer WhatsApp inquiry' } },
      {
        id: '2',
        type: 'messageNode',
        position: { x: 300, y: 150 },
        data: {
          text: '🏡 Welcome to Proptis Real Estate! What type of property are you searching for?',
          buttons: ['Luxury Penthouse', 'Commercial Office', 'Book Site Visit']
        }
      },
      {
        id: 'node-pent',
        type: 'messageNode',
        position: { x: 40, y: 380 },
        data: { text: '🏙️ DLF The Camellias & Sapphire Heights penthouses available starting ₹4.5 Cr.' }
      },
      {
        id: 'node-comm',
        type: 'messageNode',
        position: { x: 340, y: 380 },
        data: { text: '🏢 Cortex Business Tower 15,000 sq ft Grade A commercial space at BMC Chowk.' }
      },
      {
        id: 'node-visit',
        type: 'apiNode',
        position: { x: 640, y: 380 },
        data: { url: 'https://api.cortestack.com/proptis/schedule-visit' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
      { id: 'e-r0', source: '2', sourceHandle: 'btn-0', target: 'node-pent', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
      { id: 'e-r1', source: '2', sourceHandle: 'btn-1', target: 'node-comm', animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } },
      { id: 'e-r2', source: '2', sourceHandle: 'btn-2', target: 'node-visit', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } }
    ]
  }
}

export function FlowBuilderCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(FLOW_TEMPLATES.ecommerce.nodes as any)
  const [edges, setEdges, onEdgesChange] = useEdgesState(FLOW_TEMPLATES.ecommerce.edges as any)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [statusMsg, setStatusMsg] = useState('')
  const [saving, setSaving] = useState(false)

  // Inspector States
  const [nodeText, setNodeText] = useState('')
  const [nodeButtons, setNodeButtons] = useState('')

  const [isLibraryOpen, setIsLibraryOpen] = useState(false)
  const [isPhoneTestOpen, setIsPhoneTestOpen] = useState(false)

  const handleSelectLibraryTemplate = (tpl: TemplateItem) => {
    setNodes(tpl.flowData.nodes as any)
    setEdges(tpl.flowData.edges as any)
    setSelectedNode(null)
    setStatusMsg(`Applied AiSensy Template: "${tpl.name}"!`)
    setTimeout(() => setStatusMsg(''), 4000)
  }

  const loadTemplate = (key: 'ecommerce' | 'support' | 'realestate') => {
    const t = FLOW_TEMPLATES[key]
    setNodes(t.nodes as any)
    setEdges(t.edges as any)
    setSelectedNode(null)
    setStatusMsg(`Loaded "${t.name}" template with multi-branch button routing!`)
    setTimeout(() => setStatusMsg(''), 4000)
  }

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#10b981', strokeWidth: 2 } }, eds)),
    [setEdges]
  )

  const onNodeClick = (_: any, node: Node) => {
    setSelectedNode(node)
    setNodeText(node.data?.text || node.data?.prompt || node.data?.url || node.data?.mediaUrl || '')
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
          } else if (n.type === 'mediaNode') {
            updatedData.mediaUrl = nodeText
          }
          return { ...n, data: updatedData }
        }
        return n
      })
    )
    setStatusMsg('Node configuration & button handles updated!')
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
          ? { text: 'New Automated Reply Message', buttons: ['Button Option 1', 'Button Option 2'] }
          : type === 'conditionNode'
          ? { condition: 'Keyword equals "pricing"' }
          : type === 'aiNode'
          ? { prompt: 'Smart AI Response for User Inquiries' }
          : type === 'mediaNode'
          ? { mediaUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9' }
          : { url: 'https://api.cortestack.com/webhook' }
    }
    setNodes((nds) => [...nds, newNode])
  }

  const handleDeleteNode = (id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id))
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id))
    setSelectedNode(null)
  }

  const handleSaveAndPublishFlow = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/whatsapp/flows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Production Multi-Branch WhatsApp Flow',
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
    <div className="w-full h-[800px] bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col font-sans">
      {/* Top Bar with Template Selector */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Visual Flow Builder <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">Multi-Branch Active</span>
            </h2>
            <p className="text-xs text-slate-400">Every button creates its own output handle for multi-branch routing.</p>
          </div>
        </div>

        {/* AiSensy Template Library Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLibraryOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-purple-900/40 flex items-center gap-2 transition-all hover:scale-105"
          >
            <BookOpen className="w-4 h-4 text-purple-200" /> 📚 AiSensy Template Library
          </button>
        </div>

        {statusMsg && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {statusMsg}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPhoneTestOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <Smartphone className="w-4 h-4 text-slate-950" /> 📱 Run & Test Phone Preview
          </button>

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
        {/* Left Palette */}
        <div className="w-64 bg-slate-900/90 border-r border-slate-800 p-4 space-y-3 z-10 overflow-y-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Drag / Add Node</span>
          
          <button
            onClick={() => handleAddNode('messageNode')}
            className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-white flex items-center gap-2.5 transition-all group"
          >
            <MessageSquare className="w-4 h-4 text-blue-400 group-hover:scale-110" /> Text & Multi-Button Reply
          </button>

          <button
            onClick={() => handleAddNode('conditionNode')}
            className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-white flex items-center gap-2.5 transition-all group"
          >
            <GitBranch className="w-4 h-4 text-purple-400 group-hover:scale-110" /> If / Else Branching
          </button>

          <button
            onClick={() => handleAddNode('aiNode')}
            className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-white flex items-center gap-2.5 transition-all group"
          >
            <Bot className="w-4 h-4 text-indigo-400 group-hover:scale-110" /> ChatGPT / Gemini AI Agent
          </button>

          <button
            onClick={() => handleAddNode('apiNode')}
            className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-white flex items-center gap-2.5 transition-all group"
          >
            <Globe className="w-4 h-4 text-teal-400 group-hover:scale-110" /> REST API / Webhook Action
          </button>

          <button
            onClick={() => handleAddNode('mediaNode')}
            className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-white flex items-center gap-2.5 transition-all group"
          >
            <ImageIcon className="w-4 h-4 text-amber-400 group-hover:scale-110" /> Media Image / PDF Document
          </button>
        </div>

        {/* React Flow Canvas */}
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
            <Background color="#1e293b" gap={20} size={1} />
            <Controls className="bg-slate-900 border-slate-800 text-white fill-white" />
            <MiniMap className="bg-slate-900 border-slate-800" nodeColor="#3b82f6" />
          </ReactFlow>
        </div>

        {/* Right Inspector Panel (Opens on Node Click) */}
        {selectedNode && (
          <div className="w-80 bg-slate-900/95 border-l border-slate-800 p-5 space-y-4 z-20 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-400" /> Node Inspector
              </h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Node ID:</label>
                <input
                  type="text"
                  disabled
                  value={selectedNode.id}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  {selectedNode.type === 'messageNode'
                    ? 'Message Text Payload:'
                    : selectedNode.type === 'aiNode'
                    ? 'AI System Prompt:'
                    : selectedNode.type === 'mediaNode'
                    ? 'Image / PDF URL:'
                    : 'Endpoint URL:'}
                </label>
                <textarea
                  rows={3}
                  value={nodeText}
                  onChange={(e) => setNodeText(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {selectedNode.type === 'messageNode' && (
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Buttons (comma separated, each creates a handle):
                  </label>
                  <input
                    type="text"
                    value={nodeButtons}
                    onChange={(e) => setNodeButtons(e.target.value)}
                    placeholder="e.g. View Pricing, Connect API, Help"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-emerald-400 mt-1">
                    💡 Every comma-separated button automatically creates a right handle on the node!
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={handleUpdateSelectedNode}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-900/40"
                >
                  Apply Changes
                </button>
                <button
                  onClick={() => handleDeleteNode(selectedNode.id)}
                  className="p-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-all"
                  title="Delete Node"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AiSensy Template Library Modal */}
      <WhatsAppTemplateLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelectTemplate={handleSelectLibraryTemplate}
      />

      {/* Live Phone Test Simulator Modal */}
      <FlowTestPhoneModal
        isOpen={isPhoneTestOpen}
        onClose={() => setIsPhoneTestOpen(false)}
        nodes={nodes}
        edges={edges}
      />
    </div>
  )
}
