// components/builder/nodes/ConditionNode.tsx
'use client'
import { memo } from 'react'
import { type NodeProps } from 'reactflow'
import { GitBranch } from 'lucide-react'
import { BaseNode } from './BaseNode'
import type { FlowNodeData } from '@/store/flow.store'

const OPERATOR_LABELS: Record<string, string> = {
  equals:       '=',
  contains:     '⊃',
  starts_with:  '^=',
  greater_than: '>',
  less_than:    '<',
  is_set:       '≠ ∅',
}

export const ConditionNode = memo(({ id, selected, data }: NodeProps<FlowNodeData>) => (
  <BaseNode
    id={id} selected={selected}
    icon={<GitBranch size={13} />} label="Condition"
    color="bg-amber-500" borderColor="border-amber-400"
    outputHandles={[
      { id: 'true',  label: '✓ True',  top: 30 },
      { id: 'false', label: '✗ False', top: 70 },
    ]}
  >
    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg px-2.5 py-2 font-mono text-xs text-amber-800 dark:text-amber-300">
      {data.variable
        ? <>
            <span className="text-amber-600">{data.variable}</span>
            {' '}
            <span className="font-bold">{OPERATOR_LABELS[data.operator ?? 'equals'] ?? '='}</span>
            {' '}
            <span className="text-zinc-600 dark:text-zinc-400">"{data.value}"</span>
          </>
        : <span className="italic text-zinc-400 font-sans">No condition set</span>
      }
    </div>
  </BaseNode>
))
ConditionNode.displayName = 'ConditionNode'