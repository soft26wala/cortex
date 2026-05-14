// components/builder/editors/FormEditor.tsx
'use client'
import { Plus, Trash2 } from 'lucide-react'
import { useFlowStore } from '@/store/flow.store'
import { Field, Input, Select, EditorSection } from './_fields'

const FIELD_TYPES = [
  { value: 'text',   label: 'Text Input' },
  { value: 'email',  label: 'Email' },
  { value: 'phone',  label: 'Phone' },
  { value: 'select', label: 'Dropdown' },
  { value: 'date',   label: 'Date Picker' },
]

export function FormEditor({ nodeId }: { nodeId: string }) {
  const { nodes, updateNode } = useFlowStore(s => ({ nodes: s.nodes, updateNode: s.updateNode }))
  const data = nodes.find(n => n.id === nodeId)!.data
  const fields: any[] = data.fields ?? []
  const u = (k: string) => (v: string) => updateNode(nodeId, { [k]: v })

  const addField = () => updateNode(nodeId, {
    fields: [...fields, { type: 'text', name: `field_${fields.length + 1}`, label: 'New Field', required: false }]
  })
  const updateField = (i: number, k: string, v: any) => {
    updateNode(nodeId, { fields: fields.map((f, idx) => idx === i ? { ...f, [k]: v } : f) })
  }
  const removeField = (i: number) =>
    updateNode(nodeId, { fields: fields.filter((_, idx) => idx !== i) })

  return (
    <EditorSection>
      <Field label="Meta Flow ID" hint="From Meta Business Manager → WhatsApp Flows">
        <Input value={data.metaFlowId} onChange={u('metaFlowId')} placeholder="1234567890" />
      </Field>
      <Field label="CTA Button Text">
        <Input value={data.ctaText} onChange={u('ctaText')} placeholder="Open Form" />
      </Field>
      <Field label="Screen ID">
        <Input value={data.screen} onChange={u('screen')} placeholder="WELCOME" />
      </Field>
      <Field label={`Form Fields (${fields.length})`} hint="Used for local preview and validation">
        <div className="space-y-2 mb-2">
          {fields.map((f, i) => (
            <div key={i} className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <Select
                  value={f.type}
                  onChange={v => updateField(i, 'type', v)}
                  options={FIELD_TYPES}
                />
                <button onClick={() => removeField(i)} className="ml-2 text-red-400">
                  <Trash2 size={12} />
                </button>
              </div>
              <Input value={f.label} onChange={v => updateField(i, 'label', v)} placeholder="Field label" />
              <Input value={f.name} onChange={v => updateField(i, 'name', v)} placeholder="field_name" />
              <label className="flex items-center gap-2 text-[11px] text-zinc-500">
                <input type="checkbox" checked={f.required}
                  onChange={e => updateField(i, 'required', e.target.checked)} />
                Required
              </label>
            </div>
          ))}
        </div>
        <button onClick={addField}
          className="w-full py-1.5 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-xs text-zinc-400 hover:text-zinc-600 flex items-center justify-center gap-1.5 transition-colors">
          <Plus size={11} /> Add field
        </button>
      </Field>
    </EditorSection>
  )
}