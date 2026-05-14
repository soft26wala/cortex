// components/builder/nodes/FormNode.tsx
'use client'
import { memo } from 'react'
import { type NodeProps } from 'reactflow'
import { ClipboardList } from 'lucide-react'
import { BaseNode } from './BaseNode'
import type { FlowNodeData } from '@/store/flow.store'

const FIELD_ICONS: Record<string, string> = {
  text: 'T', email: '@', phone: '☎', select: '▾', date: '📅',
}

export const FormNode = memo(({ id, selected, data }: NodeProps<FlowNodeData>) => {
  const fields = data.fields ?? []
  return (
    <BaseNode
      id={id} selected={selected}
      icon={<ClipboardList size={13} />} label="Form (Meta Flow)"
      color="bg-rose-500" borderColor="border-rose-400"
    >
      <div className="space-y-1">
        {fields.slice(0, 4).map((f: any, i: number) => (
          <div key={i} className="flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 rounded px-2 py-1">
            <span className="text-[10px] text-rose-500 font-mono w-3">{FIELD_ICONS[f.type] ?? 'T'}</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400 flex-1 truncate">{f.label}</span>
            {f.required && <span className="text-[9px] text-rose-400">*</span>}
          </div>
        ))}
        {fields.length === 0 && (
          <p className="text-[11px] text-zinc-400 italic text-center py-1">No fields configured</p>
        )}
        {fields.length > 4 && (
          <p className="text-[10px] text-zinc-400 text-center">+{fields.length - 4} more fields</p>
        )}
        {data.metaFlowId && (
          <p className="text-[10px] text-zinc-400 font-mono mt-1">
            Flow ID: {data.metaFlowId.slice(0, 16)}…
          </p>
        )}
      </div>
    </BaseNode>
  )
})
FormNode.displayName = 'FormNode'