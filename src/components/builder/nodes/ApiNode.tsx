// components/builder/nodes/ApiNode.tsx
'use client'
import { memo } from 'react'
import { type NodeProps } from 'reactflow'
import { Globe } from 'lucide-react'
import { BaseNode } from './BaseNode'
import type { FlowNodeData } from '@/store/flow.store'

const METHOD_COLORS: Record<string, string> = {
  GET:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  POST:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  PUT:    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  PATCH:  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
}

export const ApiNode = memo(({ id, selected, data }: NodeProps<FlowNodeData>) => {
  const method = data.method ?? 'GET'
  return (
    <BaseNode
      id={id} selected={selected}
      icon={<Globe size={13} />} label="API Call"
      color="bg-teal-600" borderColor="border-teal-400"
    >
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${METHOD_COLORS[method] ?? METHOD_COLORS.GET}`}>
          {method}
        </span>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate flex-1 font-mono">
          {data.url || 'https://...'}
        </p>
      </div>
      {data.responseMappings && Object.keys(data.responseMappings).length > 0 && (
        <div className="mt-1.5 text-[10px] text-zinc-400">
          Saves: {Object.keys(data.responseMappings).join(', ')}
        </div>
      )}
    </BaseNode>
  )
})
ApiNode.displayName = 'ApiNode'