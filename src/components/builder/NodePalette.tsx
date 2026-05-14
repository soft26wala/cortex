// components/builder/NodePalette.tsx
'use client'
import {
  Zap, MessageSquare, ImageIcon, LayoutList,
  Keyboard, GitBranch, Globe, Timer, FileText,
  Sparkles, ClipboardList, ChevronRight
} from 'lucide-react'

const NODE_TYPES = [
  { type: 'trigger',   label: 'Trigger',     icon: Zap,           color: 'text-emerald-500', desc: 'Keyword match start' },
  { type: 'message',   label: 'Message',     icon: MessageSquare, color: 'text-blue-500',    desc: 'Send text message' },
  { type: 'image',     label: 'Image',       icon: ImageIcon,     color: 'text-pink-500',    desc: 'Send image / media' },
  { type: 'buttons',   label: 'Buttons',     icon: LayoutList,    color: 'text-violet-500',  desc: 'Reply buttons (max 3)' },
  { type: 'input',     label: 'User Input',  icon: Keyboard,      color: 'text-cyan-500',    desc: 'Capture user reply' },
  { type: 'condition', label: 'Condition',   icon: GitBranch,     color: 'text-amber-500',   desc: 'Branch on variable' },
  { type: 'api',       label: 'API Call',    icon: Globe,         color: 'text-teal-600',    desc: 'HTTP request' },
  { type: 'delay',     label: 'Delay',       icon: Timer,         color: 'text-orange-500',  desc: 'Wait before next' },
  { type: 'template',  label: 'Template',    icon: FileText,      color: 'text-indigo-500',  desc: 'Send WA template' },
  { type: 'ai',        label: 'AI Reply',    icon: Sparkles,      color: 'text-purple-500',  desc: 'OpenAI auto reply' },
  { type: 'form',      label: 'Form',        icon: ClipboardList, color: 'text-rose-500',    desc: 'Meta Flow form' },
]

export function NodePalette() {
  const onDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData('application/reactflow', nodeType)
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="w-56 flex-shrink-0 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">Nodes</p>
        <p className="text-[11px] text-zinc-400 mt-0.5">Drag onto canvas</p>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {NODE_TYPES.map(({ type, label, icon: Icon, color, desc }) => (
          <div
            key={type}
            draggable
            onDragStart={e => onDragStart(e, type)}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl cursor-grab active:cursor-grabbing hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
          >
            <Icon size={15} className={`flex-shrink-0 ${color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-zinc-700 dark:text-zinc-200">{label}</p>
              <p className="text-[10px] text-zinc-400 truncate">{desc}</p>
            </div>
            <ChevronRight size={10} className="text-zinc-300 group-hover:text-zinc-400 flex-shrink-0" />
          </div>
        ))}
      </div>
    </aside>
  )
}