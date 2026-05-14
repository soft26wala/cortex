// components/builder/nodes/MessageNode.tsx
'use client'
import { memo } from 'react'
import { type NodeProps } from 'reactflow'
import { MessageSquare } from 'lucide-react'
import { BaseNode } from './BaseNode'
import type { FlowNodeData } from '@/store/flow.store'

export const MessageNode = memo(({ id, selected, data }: NodeProps<FlowNodeData>) => (
  <BaseNode
    id={id} selected={selected}
    icon={<MessageSquare size={13} />} label="Message"
    color="bg-blue-500" borderColor="border-blue-400"
  >
    {data.header && (
      <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wider">
        {data.header}
      </p>
    )}
    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-3">
      {data.text || <span className="italic text-zinc-400">No message text</span>}
    </p>
    {data.footer && (
      <p className="text-[10px] text-zinc-400 mt-1 italic">{data.footer}</p>
    )}
  </BaseNode>
))
MessageNode.displayName = 'MessageNode'