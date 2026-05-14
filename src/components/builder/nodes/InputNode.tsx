// components/builder/nodes/InputNode.tsx
'use client'
import { memo } from 'react'
import { type NodeProps } from 'reactflow'
import { Keyboard } from 'lucide-react'
import { BaseNode } from './BaseNode'
import type { FlowNodeData } from '@/store/flow.store'

export const InputNode = memo(({ id, selected, data }: NodeProps<FlowNodeData>) => (
  <BaseNode
    id={id} selected={selected}
    icon={<Keyboard size={13} />} label="User Input"
    color="bg-cyan-500" borderColor="border-cyan-400"
  >
    <div className="space-y-1.5">
      {data.promptText && (
        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {data.promptText}
        </p>
      )}
      <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-2 py-1.5">
        <Keyboard size={10} className="text-zinc-400" />
        <span className="text-[11px] text-zinc-400 font-mono">
          → saves to: <span className="text-cyan-600 dark:text-cyan-400">
            {data.variableName || 'user_input'}
          </span>
        </span>
      </div>
    </div>
  </BaseNode>
))
InputNode.displayName = 'InputNode'