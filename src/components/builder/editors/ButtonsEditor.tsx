// components/builder/editors/ButtonsEditor.tsx
'use client'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { useFlowStore } from '@/store/flow.store'
import { Field, Input, Textarea, EditorSection } from './_fields'
import { nanoid } from 'nanoid'

export function ButtonsEditor({ nodeId }: { nodeId: string }) {
  const { nodes, updateNode } = useFlowStore(s => ({ nodes: s.nodes, updateNode: s.updateNode }))
  const data = nodes.find(n => n.id === nodeId)!.data
  const buttons: any[] = data.buttons ?? []
  const u = (k: string) => (v: string) => updateNode(nodeId, { [k]: v })

  const addButton = () => {
    if (buttons.length >= 3) return
    updateNode(nodeId, { buttons: [...buttons, { id: nanoid(8), text: 'Option', nextNodeId: '' }] })
  }

  const updateButton = (idx: number, k: string, v: string) => {
    const updated = buttons.map((b, i) => i === idx ? { ...b, [k]: v } : b)
    updateNode(nodeId, { buttons: updated })
  }

  const removeButton = (idx: number) =>
    updateNode(nodeId, { buttons: buttons.filter((_, i) => i !== idx) })

  return (
    <EditorSection>
      <Field label="Header">
        <Input value={data.header} onChange={u('header')} placeholder="Optional header" />
      </Field>
      <Field label="Body Text" hint="Shown above buttons">
        <Textarea value={data.body} onChange={u('body')} placeholder="Message body…" rows={3} />
      </Field>
      <Field label="Footer">
        <Input value={data.footer} onChange={u('footer')} placeholder="Optional footer" />
      </Field>

      <Field label={`Buttons (${buttons.length}/3)`} hint="Each button routes to a different node">
        <div className="space-y-2 mb-2">
          {buttons.map((btn, idx) => (
            <div key={btn.id} className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 space-y-2">
              <div className="flex items-center gap-2">
                <GripVertical size={12} className="text-zinc-300 cursor-grab" />
                <span className="text-[10px] font-mono text-zinc-400">BTN {idx + 1}</span>
                <button onClick={() => removeButton(idx)} className="ml-auto text-red-400 hover:text-red-500">
                  <Trash2 size={12} />
                </button>
              </div>
              <Input
                value={btn.text} placeholder="Button label (max 20 chars)"
                onChange={v => updateButton(idx, 'text', v.slice(0, 20))}
              />
              <Input
                value={btn.nextNodeId} placeholder="Next node ID"
                onChange={v => updateButton(idx, 'nextNodeId', v)}
              />
            </div>
          ))}
        </div>
        {buttons.length < 3 && (
          <button
            onClick={addButton}
            className="w-full py-2 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-xs text-zinc-400 hover:text-zinc-600 hover:border-zinc-400 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus size={12} /> Add Button
          </button>
        )}
      </Field>
    </EditorSection>
  )
}