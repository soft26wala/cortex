// components/builder/nodes/DelayNode.tsx
'use client'
import { memo } from 'react'
import { type NodeProps } from 'reactflow'
import { Timer } from 'lucide-react'
import { BaseNode } from './BaseNode'
import type { FlowNodeData } from '@/store/flow.store'

function formatDelay(ms: number): string {
  if (!ms) return 'No delay set'
  if (ms < 60_000)  return `${ms / 1000}s`
  if (ms < 3_600_000) return `${ms / 60_000}m`
  return `${ms / 3_600_000}h`
}

export const DelayNode = memo(({ id, selected, data }: NodeProps<FlowNodeData>) => (
  <BaseNode
    id={id} selected={selected}
    icon={<Timer size={13} />} label="Delay"
    color="bg-orange-500" borderColor="border-orange-400"
  >
    <div className="flex items-center justify-center py-2">
      <div className="text-center">
        <p className="text-2xl font-bold text-orange-500 dark:text-orange-400 font-mono tabular-nums">
          {formatDelay(data.delayMs ?? 0)}
        </p>
        <p className="text-[10px] text-zinc-400 mt-0.5">wait before next node</p>
      </div>
    </div>
  </BaseNode>
))
DelayNode.displayName = 'DelayNode'