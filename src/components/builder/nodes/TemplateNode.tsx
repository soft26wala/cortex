// components/builder/nodes/TemplateNode.tsx
'use client'
import { memo } from 'react'
import { type NodeProps } from 'reactflow'
import { FileText } from 'lucide-react'
import { BaseNode } from './BaseNode'
import type { FlowNodeData } from '@/store/flow.store'

export const TemplateNode = memo(({ id, selected, data }: NodeProps<FlowNodeData>) => (
  <BaseNode
    id={id} selected={selected}
    icon={<FileText size={13} />} label="Template"
    color="bg-indigo-500" borderColor="border-indigo-400"
  >
    <div className="space-y-1">
      <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
        {data.templateName || <span className="italic text-zinc-400 font-sans">No template selected</span>}
      </p>
      {data.language && (
        <span className="inline-block px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded text-[10px]">
          {data.language}
        </span>
      )}
    </div>
  </BaseNode>
))
TemplateNode.displayName = 'TemplateNode'