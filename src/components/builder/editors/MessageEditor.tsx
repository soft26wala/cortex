// components/builder/editors/MessageEditor.tsx
'use client'
import { useFlowStore } from '@/store/flow.store'
import { Field, Input, Textarea, EditorSection } from './_fields'

export function MessageEditor({ nodeId }: { nodeId: string }) {
  const { nodes, updateNode } = useFlowStore(s => ({ nodes: s.nodes, updateNode: s.updateNode }))
  const data = nodes.find(n => n.id === nodeId)!.data
  const u = (k: string) => (v: string) => updateNode(nodeId, { [k]: v })

  return (
    <EditorSection>
      <Field label="Header" hint="Bold line above body (optional)">
        <Input value={data.header} onChange={u('header')} placeholder="Header text" />
      </Field>
      <Field label="Message Body" hint="Supports {{variable_name}} interpolation">
        <Textarea value={data.text} onChange={u('text')} placeholder="Type your message…" rows={4} />
      </Field>
      <Field label="Footer" hint="Small text below message (optional)">
        <Input value={data.footer} onChange={u('footer')} placeholder="Footer text" />
      </Field>
    </EditorSection>
  )
}