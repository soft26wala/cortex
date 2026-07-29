// components/builder/editors/InputEditor.tsx
'use client'
import { useFlowStore, FlowNodeData } from '@/store/flow.store'
import { Field, Input, Textarea, EditorSection } from './_fields'

export function InputEditor({ nodeId }: { nodeId: string }) {
  const { nodes, updateNode } = useFlowStore(s => ({ nodes: s.nodes, updateNode: s.updateNode }))
  const data = (nodes.find(n => n.id === nodeId)?.data || {}) as FlowNodeData
  const u = (k: string) => (v: string) => updateNode(nodeId, { [k]: v })

  return (
    <EditorSection>
      <Field label="Prompt Text" hint="Message to send to user before waiting for input">
        <Textarea value={data.promptText} onChange={u('promptText')} placeholder="Please enter your response…" rows={3} />
      </Field>
      <Field label="Save to Variable" hint="Variable name to store customer answer">
        <Input value={data.variableName} onChange={u('variableName')} placeholder="e.g. customer_name" />
      </Field>
    </EditorSection>
  )
}
