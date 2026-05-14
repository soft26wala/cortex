// components/builder/nodes/TriggerNode.tsx
'use client'
import { memo } from 'react'
import { type NodeProps } from 'reactflow'
import { Zap } from 'lucide-react'
import { BaseNode } from './BaseNode'
import type { FlowNodeData } from '@/store/flow.store'

export const TriggerNode = memo(({ id, selected, data }: NodeProps<FlowNodeData>) => (
  <BaseNode
    id={id} selected={selected}
    icon={<Zap size={13} />} label="Trigger"
    color="bg-emerald-500" borderColor="border-emerald-400"
    hasInput={false}
  >
    <div className="space-y-1">
      {data.triggers?.length ? (
        <div className="flex flex-wrap gap-1">
          {data.triggers.map((t: string, i: number) => (
            <span key={i} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-medium">
              {t}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-zinc-400 italic">No triggers set</p>
      )}
    </div>
  </BaseNode>
))
TriggerNode.displayName = 'TriggerNode'