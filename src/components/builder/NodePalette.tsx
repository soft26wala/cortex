// components/builder/NodePalette.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Zap, MessageSquare, ImageIcon, LayoutList,
  Keyboard, GitBranch, Globe, Timer, FileText,
  Sparkles, ClipboardList, Search, GripVertical
} from 'lucide-react'

const CATEGORIZED_NODES = [
  {
    category: 'Triggers',
    items: [
      { type: 'trigger', label: 'Keyword Trigger', icon: Zap, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', desc: 'Keyword match start' },
    ]
  },
  {
    category: 'Messages & Media',
    items: [
      { type: 'message', label: 'Text Message', icon: MessageSquare, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20', desc: 'Send text response' },
      { type: 'image', label: 'Image Media', icon: ImageIcon, color: 'text-pink-500 bg-pink-500/10 border-pink-500/20', desc: 'Send image or media' },
      { type: 'buttons', label: 'Reply Buttons', icon: LayoutList, color: 'text-violet-500 bg-violet-500/10 border-violet-500/20', desc: 'Interactive buttons' },
      { type: 'template', label: 'WA Template', icon: FileText, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20', desc: 'Send Meta template' },
    ]
  },
  {
    category: 'Logic & Flow',
    items: [
      { type: 'input', label: 'User Input', icon: Keyboard, color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20', desc: 'Capture response' },
      { type: 'condition', label: 'Condition Branch', icon: GitBranch, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20', desc: 'Variable logic check' },
      { type: 'delay', label: 'Delay Timer', icon: Timer, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20', desc: 'Wait before next' },
    ]
  },
  {
    category: 'AI & Integrations',
    items: [
      { type: 'ai', label: 'AI Auto Reply', icon: Sparkles, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20', desc: 'AI smart reply' },
      { type: 'api', label: 'HTTP API Call', icon: Globe, color: 'text-teal-500 bg-teal-500/10 border-teal-500/20', desc: 'External Webhook/API' },
      { type: 'form', label: 'Meta Form', icon: ClipboardList, color: 'text-rose-500 bg-rose-500/10 border-rose-500/20', desc: 'Meta Flow form' },
    ]
  }
]

export function NodePalette() {
  const [search, setSearch] = useState('')

  const onDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData('application/reactflow', nodeType)
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden select-none">
      
      {/* Header & Search */}
      <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Node Palette</p>
          <span className="text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono">Drag & Drop</span>
        </div>

        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search nodes…"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Categorized List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {CATEGORIZED_NODES.map(cat => {
          const filteredItems = cat.items.filter(
            item =>
              item.label.toLowerCase().includes(search.toLowerCase()) ||
              item.desc.toLowerCase().includes(search.toLowerCase())
          )

          if (filteredItems.length === 0) return null

          return (
            <div key={cat.category} className="space-y-1">
              <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-2">
                {cat.category}
              </p>

              {filteredItems.map(({ type, label, icon: Icon, color, desc }) => (
                <motion.div
                  key={type}
                  draggable
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onDragStart={(e: any) => onDragStart(e, type)}
                  className="flex items-center gap-2.5 p-2 rounded-xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/40 hover:bg-white dark:hover:bg-zinc-800/90 cursor-grab active:cursor-grabbing transition-all shadow-none hover:shadow-sm group"
                >
                  <div className={`p-1.5 rounded-lg border flex-shrink-0 ${color}`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors">{label}</p>
                    <p className="text-[10px] text-zinc-400 truncate">{desc}</p>
                  </div>
                  <GripVertical size={12} className="text-zinc-300 dark:text-zinc-700 opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
                </motion.div>
              ))}
            </div>
          )
        })}
      </div>
    </aside>
  )
}