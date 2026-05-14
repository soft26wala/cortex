// components/builder/nodes/BaseNode.tsx
'use client'
import { Handle, Position, type NodeProps } from 'reactflow'
import { memo } from 'react'
import { Trash2 } from 'lucide-react'
import { useFlowStore } from '@/store/flow.store'
import { cn } from '@/lib/utils'

interface BaseNodeProps {
  id: string
  selected: boolean
  icon: React.ReactNode
  label: string
  color: string          // tailwind bg class e.g. 'bg-emerald-500'
  borderColor: string    // e.g. 'border-emerald-400'
  children?: React.ReactNode
  hasInput?: boolean
  hasOutput?: boolean
  outputHandles?: Array<{ id: string; label: string; top: number }>
}

export const BaseNode = memo(({
  id, selected, icon, label, color, borderColor,
  children, hasInput = true, hasOutput = true, outputHandles
}: BaseNodeProps) => {
  const deleteNode = useFlowStore(s => s.deleteNode)

  return (
    <div className={cn(
      'rounded-2xl border bg-white dark:bg-zinc-900 shadow-sm min-w-[220px] max-w-[280px]',
      'transition-all duration-150',
      selected
        ? `${borderColor} border-2 shadow-md`
        : 'border-zinc-200 dark:border-zinc-700 border'
    )}>
      {/* Input handle */}
      {hasInput && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-3 !h-3 !bg-zinc-400 !border-2 !border-white dark:!border-zinc-900"
        />
      )}

      {/* Header */}
      <div className={cn('flex items-center gap-2 px-3 py-2.5 rounded-t-2xl', color)}>
        <span className="text-white">{icon}</span>
        <span className="text-white text-xs font-semibold uppercase tracking-wider flex-1">{label}</span>
        <button
          onClick={e => { e.stopPropagation(); deleteNode(id) }}
          className="text-white/60 hover:text-white transition-colors"
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* Body */}
      <div className="px-3 py-2.5">
        {children}
      </div>

      {/* Single output handle */}
      {hasOutput && !outputHandles && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-3 !h-3 !bg-zinc-400 !border-2 !border-white dark:!border-zinc-900"
        />
      )}

      {/* Multiple output handles (condition, buttons) */}
      {outputHandles?.map(h => (
        <Handle
          key={h.id}
          id={h.id}
          type="source"
          position={Position.Bottom}
          style={{ left: `${h.top}%` }}
          className="!w-3 !h-3 !border-2 !border-white dark:!border-zinc-900 !bg-violet-500"
        >
          <span
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-zinc-400 whitespace-nowrap"
          >{h.label}</span>
        </Handle>
      ))}
    </div>
  )
})
BaseNode.displayName = 'BaseNode'