// components/builder/editors/ImageEditor.tsx
'use client'
import { useFlowStore, FlowNodeData } from '@/store/flow.store'
import { Field, Input, Textarea, EditorSection } from './_fields'

export function ImageEditor({ nodeId }: { nodeId: string }) {
  const { nodes, updateNode } = useFlowStore(s => ({ nodes: s.nodes, updateNode: s.updateNode }))
  const data = (nodes.find(n => n.id === nodeId)?.data || {}) as FlowNodeData
  const u = (k: string) => (v: string) => updateNode(nodeId, { [k]: v })

  return (
    <EditorSection>
      <Field label="Image URL" hint="Direct link to image (e.g. Cloudinary / CDN)">
        <Input value={data.imageUrl} onChange={u('imageUrl')} placeholder="https://example.com/image.png" />
      </Field>
      <Field label="Caption" hint="Optional text caption below image">
        <Textarea value={data.caption} onChange={u('caption')} placeholder="Check out our latest product!" rows={2} />
      </Field>
    </EditorSection>
  )
}
