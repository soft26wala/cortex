// components/builder/WhatsAppPreview.tsx
'use client'
import { useFlowStore } from '@/store/flow.store'
import { MessageSquare, Check, CheckCheck, ImageIcon } from 'lucide-react'
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
      return <TextBubble body="[AI response will appear here]" italic />
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
    <div className="bg-white rounded-[18px] rounded-tl-[4px] shadow-sm px-3.5 py-2.5 max-w-[260px]">
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
    <div className="bg-white rounded-[18px] rounded-tl-[4px] shadow-sm overflow-hidden max-w-[260px]">
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
    <div className="bg-white rounded-[18px] rounded-tl-[4px] shadow-sm overflow-hidden max-w-[260px]">
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
              "w-full px-4 py-2.5 text-[13px] text-[#00a884] font-medium text-center hover:bg-zinc-50 transition-colors",
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
    <div className="bg-white rounded-[18px] rounded-tl-[4px] shadow-sm px-3.5 py-2.5 max-w-[260px] border border-dashed border-zinc-200">
      <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Template</p>
      <p className="text-[12px] font-mono text-zinc-600">{name || 'Not selected'}</p>
    </div>
  )
}

function UserTypingIndicator() {
  return (
    <div className="flex justify-end">
      <div className="bg-[#d9fdd3] rounded-[18px] rounded-tr-[4px] shadow-sm px-3.5 py-2.5">
        <div className="flex items-center gap-1">
          {[0,1,2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
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
      <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
      <span className="text-[10px] text-zinc-400 px-2">⏱ {label}</span>
      <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
    </div>
  )
}

function ConditionIndicator({ variable, operator, value }: {
  variable?: string; operator?: string; value?: string
}) {
  return (
    <div className="flex items-center justify-center gap-2 py-1">
      <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
      <span className="text-[10px] text-zinc-400 px-2 font-mono">
        if {variable} {operator} {value}
      </span>
      <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
    </div>
  )
}

// ── MAIN PREVIEW PANEL ────────────────────────────────────────────────────────
export function WhatsAppPreview() {
  const { nodes, edges, selectedNodeId } = useFlowStore(s => ({
    nodes: s.nodes, edges: s.edges, selectedNodeId: s.selectedNodeId
  }))

  // Build ordered preview from edges (follow the graph from trigger nodes)
  const triggerNodes = nodes.filter(n => n.data.type === 'trigger')
  const preview: typeof nodes = []
  const visited = new Set<string>()

  const traverse = (nodeId: string) => {
    if (visited.has(nodeId)) return
    visited.add(nodeId)
    const node = nodes.find(n => n.id === nodeId)
    if (!node) return
    preview.push(node)
    // Follow single output edge
    const outEdge = edges.find(e => e.source === nodeId)
    if (outEdge) traverse(outEdge.target)
  }

  triggerNodes.forEach(n => traverse(n.id))
  // Add any unconnected nodes
  nodes.forEach(n => { if (!visited.has(n.id)) preview.push(n) })

  return (
    <div className="flex flex-col h-full">
      {/* Phone frame header */}
      <div className="bg-[#128c7e] px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-zinc-300 flex items-center justify-center">
          <MessageSquare size={14} className="text-zinc-600" />
        </div>
        <div>
          <p className="text-white text-sm font-semibold">WhatsApp Business</p>
          <p className="text-[#9de1da] text-xs">Preview Mode</p>
        </div>
      </div>

      {/* Chat area */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{ background: '#efeae2 url("data:image/svg+xml,%3Csvg...")' }}
      >
        {preview.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-zinc-400">
            <MessageSquare size={28} className="opacity-30" />
            <p className="text-xs">Add nodes to see preview</p>
          </div>
        ) : (
          preview.map(node => (
            <div key={node.id}
              className={cn(
                'transition-all duration-150',
                selectedNodeId === node.id && 'ring-2 ring-blue-400 ring-offset-2 rounded-[20px]'
              )}
            >
              <MessageBubble data={node.data} />
            </div>
          ))
        )}
      </div>

      {/* Input bar */}
      <div className="bg-[#f0f0f0] px-3 py-2 flex items-center gap-2 flex-shrink-0">
        <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-zinc-400">
          Type a message…
        </div>
        <div className="w-8 h-8 rounded-full bg-[#128c7e] flex items-center justify-center">
          <Check size={14} className="text-white" />
        </div>
      </div>
    </div>
  )
}