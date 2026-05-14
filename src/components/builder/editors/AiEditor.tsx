// components/builder/editors/AiEditor.tsx
'use client'
import { useFlowStore } from '@/store/flow.store'
import { Field, Input, Textarea, Select, EditorSection } from './_fields'

const MODELS = [
  { value: 'gpt-4o-mini',     label: 'GPT-4o Mini (fast)' },
  { value: 'gpt-4o',          label: 'GPT-4o (powerful)' },
  { value: 'gpt-3.5-turbo',   label: 'GPT-3.5 Turbo (cheap)' },
]

export function AiEditor({ nodeId }: { nodeId: string }) {
  const { nodes, updateNode } = useFlowStore(s => ({ nodes: s.nodes, updateNode: s.updateNode }))
  const data = nodes.find(n => n.id === nodeId)!.data
  const u = (k: string) => (v: string) => updateNode(nodeId, { [k]: v })

  return (
    <EditorSection>
      <Field label="Model">
        <Select value={data.model ?? 'gpt-4o-mini'} onChange={u('model')} options={MODELS} />
      </Field>
      <Field label="System Prompt" hint="Defines the AI's behavior and persona">
        <Textarea value={data.systemPrompt} onChange={u('systemPrompt')}
          placeholder="You are a helpful WhatsApp assistant for {company}. Be concise." rows={4} />
      </Field>
      <Field label="User Prompt Template" hint="What to send as the user message. Use {{variable}} for session data">
        <Textarea value={data.userPrompt} onChange={u('userPrompt')}
          placeholder="{{last_input}}" rows={2} />
      </Field>
      <Field label="Max Tokens">
        <Input value={String(data.maxTokens ?? 300)} onChange={v => updateNode(nodeId, { maxTokens: Number(v) })}
          placeholder="300" />
      </Field>
      <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <input
          type="checkbox"
          checked={data.sendReply !== false}
          onChange={e => updateNode(nodeId, { sendReply: e.target.checked })}
          className="rounded"
        />
        Auto-send AI reply to user
      </label>
    </EditorSection>
  )
}