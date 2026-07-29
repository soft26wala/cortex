// components/builder/editors/TemplateEditor.tsx
'use client'
import { useFlowStore, FlowNodeData } from '@/store/flow.store'
import { Field, Input, EditorSection } from './_fields'

export function TemplateEditor({ nodeId }: { nodeId: string }) {
  const { nodes, updateNode } = useFlowStore(s => ({ nodes: s.nodes, updateNode: s.updateNode }))
  const data = (nodes.find(n => n.id === nodeId)?.data || {}) as FlowNodeData
  const u = (k: string) => (v: string) => updateNode(nodeId, { [k]: v })

  return (
    <EditorSection>
      <Field label="Template Name" hint="Approved Meta template name">
        <Input value={data.templateName} onChange={u('templateName')} placeholder="e.g. welcome_promo_v1" />
      </Field>
      <Field label="Language Code" hint="e.g. en_US, es_ES, hi">
        <Input value={data.language} onChange={u('language')} placeholder="en_US" />
      </Field>
    </EditorSection>
  )
}
