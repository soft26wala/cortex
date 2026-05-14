// components/builder/nodes/AiNode.tsx
'use client'
import { memo } from 'react'
import { type NodeProps } from 'reactflow'
import { Sparkles } from 'lucide-react'
import { BaseNode } from './BaseNode'
import type { FlowNodeData } from '@/store/flow.store'

export const AiNode = memo(({ id, selected, data }: NodeProps<FlowNodeData>) => (
  <BaseNode
    id={id} selected={selected}
    icon={<Sparkles size={13} />} label="AI Reply"
    color="bg-gradient-to-r from-purple-500 to-pink-500"
    borderColor="border-purple-400"
  >
    <div className="space-y-2">
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg px-2.5 py-1.5">
        <p className="text-[10px] text-purple-500 font-semibold mb-0.5">System prompt</p>
        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {data.systemPrompt || <span className="italic">Not configured</span>}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-zinc-500">
          {data.model ?? 'gpt-4o-mini'}
        </span>
        {data.maxTokens && (
          <span className="text-[10px] text-zinc-400">
            max {data.maxTokens} tokens
          </span>
        )}
      </div>
    </div>
  </BaseNode>
))
AiNode.displayName = 'AiNode'