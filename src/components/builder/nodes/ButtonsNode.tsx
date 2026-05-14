// components/builder/nodes/ButtonsNode.tsx
'use client'
import { memo } from 'react'
import { type NodeProps } from 'reactflow'
import { LayoutList } from 'lucide-react'
import { BaseNode } from './BaseNode'
import type { FlowNodeData } from '@/store/flow.store'

export const ButtonsNode = memo(({ id, selected, data }: NodeProps<FlowNodeData>) => {
  const buttons = data.buttons ?? []
  const handleCount = buttons.length || 1
  const outputHandles = buttons.map((b: any, i: number) => ({
    id: b.id,
    label: b.text?.slice(0, 12) ?? `Btn ${i + 1}`,
    top: buttons.length === 1 ? 50 : (i / (buttons.length - 1)) * 80 + 10,
  }))

  return (
    <BaseNode
      id={id} selected={selected}
      icon={<LayoutList size={13} />} label="Buttons"
      color="bg-violet-500" borderColor="border-violet-400"
      outputHandles={buttons.length > 0 ? outputHandles : undefined}
    >
      <p className="text-xs text-zinc-700 dark:text-zinc-300 line-clamp-2 mb-2">
        {data.body || <span className="italic text-zinc-400">No body text</span>}
      </p>
      <div className="space-y-1">
        {buttons.slice(0, 3).map((b: any, i: number) => (
          <div key={b.id ?? i}
            className="px-2.5 py-1 border border-violet-200 dark:border-violet-800 rounded-lg text-[11px] text-violet-700 dark:text-violet-400 text-center font-medium">
            {b.text || `Button ${i + 1}`}
          </div>
        ))}
        {buttons.length === 0 && (
          <p className="text-[11px] text-zinc-400 italic text-center">No buttons yet</p>
        )}
      </div>
    </BaseNode>
  )
})
ButtonsNode.displayName = 'ButtonsNode'