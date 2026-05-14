// components/builder/editors/ConditionEditor.tsx
'use client'
import { useFlowStore } from '@/store/flow.store'
import { Field, Input, Select, EditorSection } from './_fields'

const OPERATORS = [
  { value: 'equals',       label: 'equals' },
  { value: 'contains',     label: 'contains' },
  { value: 'starts_with',  label: 'starts with' },
  { value: 'greater_than', label: 'is greater than' },
  { value: 'less_than',    label: 'is less than' },
  { value: 'is_set',       label: 'is set (not empty)' },
]

export function ConditionEditor({ nodeId }: { nodeId: string }) {
  const { nodes, updateNode } = useFlowStore(s => ({ nodes: s.nodes, updateNode: s.updateNode }))
  const data = nodes.find(n => n.id === nodeId)!.data
  const u = (k: string) => (v: string) => updateNode(nodeId, { [k]: v })

  return (
    <EditorSection>
      <Field label="Variable" hint="Session variable name e.g. user_name">
        <Input value={data.variable} onChange={u('variable')} placeholder="variable_name" />
      </Field>
      <Field label="Operator">
        <Select value={data.operator ?? 'equals'} onChange={u('operator')} options={OPERATORS} />
      </Field>
      {data.operator !== 'is_set' && (
        <Field label="Value">
          <Input value={data.value} onChange={u('value')} placeholder="Compare value" />
        </Field>
      )}
      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 space-y-2">
        <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Branch targets</p>
        <Field label="✓ True → Node ID">
          <Input value={data.trueNodeId} onChange={u('trueNodeId')} placeholder="node_xxx" />
        </Field>
        <Field label="✗ False → Node ID">
          <Input value={data.falseNodeId} onChange={u('falseNodeId')} placeholder="node_xxx" />
        </Field>
      </div>
    </EditorSection>
  )
}