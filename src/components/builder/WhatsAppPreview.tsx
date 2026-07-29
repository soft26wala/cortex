// components/builder/WhatsAppPreview.tsx
'use client'
import { useFlowStore } from '@/store/flow.store'
import { MessageSquare, CheckCheck, ImageIcon, Smartphone, Wifi, Battery } from 'lucide-react'
import { cn } from '@/lib/utils'

// Renders a single node as it would appear in WhatsApp
function MessageBubble({ data }: { data: any }) {
  switch (data.type) {
    case 'message':
      return <TextBubble header={data.header} body={data.text} footer={data.footer} />
    case 'image':
      return <ImageBubble url={data.imageUrl} caption={data.caption} />
    case 'buttons':
      return <ButtonsBubble header={data.header} body={data.body} footer={data.footer} buttons={data.buttons ?? []} />
    case 'template':
      return <TemplateBubble name={data.templateName} />
    case 'ai':
      return <TextBubble body="[AI auto-response will appear here]" italic />
    case 'input':
      return (
        <>
          {data.promptText && <TextBubble body={data.promptText} />}
          <UserTypingIndicator />
        </>
      )
    case 'delay':
      return <DelayIndicator ms={data.delayMs} />
    case 'condition':
      return <ConditionIndicator variable={data.variable} operator={data.operator} value={data.value} />
    default:
      return null
  }
}

function TextBubble({ header, body, footer, italic }: {
  header?: string; body?: string; footer?: string; italic?: boolean
}) {
  return (
    <div className="bg-white rounded-[16px] rounded-tl-[4px] shadow-sm px-3.5 py-2.5 max-w-[260px] border border-zinc-100">
      {header && <p className="text-[13px] font-bold text-zinc-900 mb-1">{header}</p>}
      <p className={cn("text-[13px] text-zinc-800 leading-relaxed whitespace-pre-wrap", italic && "italic text-zinc-400")}>
        {body || <span className="italic text-zinc-300">Empty message</span>}
      </p>
      {footer && <p className="text-[11px] text-zinc-400 mt-1">{footer}</p>}
      <div className="flex items-center justify-end gap-1 mt-1">
        <span className="text-[10px] text-zinc-400">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <CheckCheck size={12} className="text-blue-500" />
      </div>
    </div>
  )
}

function ImageBubble({ url, caption }: { url?: string; caption?: string }) {
  return (
    <div className="bg-white rounded-[16px] rounded-tl-[4px] shadow-sm overflow-hidden max-w-[260px] border border-zinc-100">
      {url ? (
        <img src={url} alt="media" className="w-full h-36 object-cover" />
      ) : (
        <div className="w-full h-36 bg-zinc-100 flex items-center justify-center">
          <ImageIcon size={24} className="text-zinc-300" />
        </div>
      )}
      {caption && <p className="text-[12px] text-zinc-700 px-3 py-2">{caption}</p>}
      <div className="flex justify-end px-3 pb-2">
        <CheckCheck size={12} className="text-blue-500" />
      </div>
    </div>
  )
}

function ButtonsBubble({ header, body, footer, buttons }: {
  header?: string; body?: string; footer?: string;
  buttons: Array<{ id: string; text: string }>
}) {
  return (
    <div className="bg-white rounded-[16px] rounded-tl-[4px] shadow-sm overflow-hidden max-w-[260px] border border-zinc-100">
      <div className="px-3.5 pt-2.5 pb-2">
        {header && <p className="text-[13px] font-bold text-zinc-900 mb-1">{header}</p>}
        <p className="text-[13px] text-zinc-800 leading-relaxed">{body}</p>
        {footer && <p className="text-[11px] text-zinc-400 mt-1">{footer}</p>}
        <div className="flex justify-end mt-1">
          <CheckCheck size={12} className="text-blue-500" />
        </div>
      </div>
      <div className="border-t border-zinc-100">
        {buttons.slice(0, 3).map((btn, i) => (
          <button key={btn.id ?? i}
            className={cn(
              "w-full px-4 py-2 text-[13px] text-[#00a884] font-semibold text-center hover:bg-zinc-50 transition-colors",
              i > 0 && "border-t border-zinc-100"
            )}
          >
            {btn.text || `Button ${i + 1}`}
          </button>
        ))}
      </div>
    </div>
  )
}

function TemplateBubble({ name }: { name?: string }) {
  return (
    <div className="bg-white rounded-[16px] rounded-tl-[4px] shadow-sm px-3.5 py-2.5 max-w-[260px] border border-dashed border-zinc-300">
      <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Approved Template</p>
      <p className="text-[12px] font-mono font-semibold text-zinc-700">{name || 'Not selected'}</p>
    </div>
  )
}

function UserTypingIndicator() {
  return (
    <div className="flex justify-end">
      <div className="bg-[#d9fdd3] rounded-[16px] rounded-tr-[4px] shadow-sm px-3 py-2">
        <div className="flex items-center gap-1">
          {[0,1,2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function DelayIndicator({ ms }: { ms?: number }) {
  const label = !ms ? 'Delay' : ms < 60000 ? `${ms/1000}s delay` : ms < 3600000 ? `${ms/60000}m delay` : `${ms/3600000}h delay`
  return (
    <div className="flex items-center justify-center gap-2 py-1">
      <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
      <span className="text-[10px] text-zinc-400 px-2 font-mono">⏱ {label}</span>
      <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
    </div>
  )
}

function ConditionIndicator({ variable, operator, value }: {
  variable?: string; operator?: string; value?: string
}) {
  return (
    <div className="flex items-center justify-center gap-2 py-1">
      <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
      <span className="text-[10px] text-zinc-400 px-2 font-mono">
        if {variable} {operator} {value}
      </span>
      <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
    </div>
  )
}

// ── MAIN PREVIEW PANEL ────────────────────────────────────────────────────────
export function WhatsAppPreview() {
  const { nodes, edges, selectedNodeId } = useFlowStore(s => ({
    nodes: s.nodes, edges: s.edges, selectedNodeId: s.selectedNodeId
  }))

  // Build ordered preview from edges
  const triggerNodes = nodes.filter(n => n.data.type === 'trigger')
  const preview: typeof nodes = []
  const visited = new Set<string>()

  const traverse = (nodeId: string) => {
    if (visited.has(nodeId)) return
    visited.add(nodeId)
    const node = nodes.find(n => n.id === nodeId)
    if (!node) return
    preview.push(node)
    const outEdge = edges.find(e => e.source === nodeId)
    if (outEdge) traverse(outEdge.target)
  }

  triggerNodes.forEach(n => traverse(n.id))
  nodes.forEach(n => { if (!visited.has(n.id)) preview.push(n) })

  return (
    <div className="flex flex-col h-full bg-zinc-100 dark:bg-zinc-950">
      
      {/* Smartphone Status Header */}
      <div className="bg-[#075e54] text-white px-4 pt-2 pb-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
            WA
          </div>
          <div>
            <p className="text-xs font-bold leading-tight">Cortex Bot Simulator</p>
            <p className="text-[10px] text-emerald-200">Online • Live Preview</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/80">
          <Wifi size={12} />
          <Battery size={14} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#e5ddd5] dark:bg-[#0b141a]">
        {preview.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-zinc-400">
            <MessageSquare size={28} className="opacity-30" />
            <p className="text-xs font-medium">Add nodes to see live preview</p>
          </div>
        ) : (
          preview.map(node => (
            <div key={node.id}
              className={cn(
                'transition-all duration-150',
                selectedNodeId === node.id && 'ring-2 ring-emerald-500 ring-offset-2 rounded-[18px]'
              )}
            >
              <MessageBubble data={node.data} />
            </div>
          ))
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-zinc-200 dark:bg-zinc-900 px-3 py-2 flex items-center gap-2 flex-shrink-0 border-t border-zinc-300 dark:border-zinc-800">
        <div className="flex-1 bg-white dark:bg-zinc-800 rounded-full px-4 py-1.5 text-xs text-zinc-400">
          Simulate reply…
        </div>
        <div className="w-7 h-7 rounded-full bg-[#075e54] flex items-center justify-center text-white">
          <MessageSquare size={12} />
        </div>
      </div>

    </div>
  )
}