// components/builder/editors/TriggerEditor.tsx
'use client'
import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { useFlowStore } from '@/store/flow.store'
import { Field, Input, EditorSection } from './_fields'

export function TriggerEditor({ nodeId }: { nodeId: string }) {
  const { nodes, updateNode } = useFlowStore(s => ({ nodes: s.nodes, updateNode: s.updateNode }))
  const node = nodes.find(n => n.id === nodeId)!
  const triggers: string[] = node.data.triggers ?? []
  const [input, setInput] = useState('')

  const add = () => {
    const val = input.trim().toLowerCase()
    if (!val || triggers.includes(val)) return
    updateNode(nodeId, { triggers: [...triggers, val] })
    setInput('')
  }

  const remove = (t: string) =>
    updateNode(nodeId, { triggers: triggers.filter(x => x !== t) })

  return (
    <EditorSection>
      <Field label="Trigger Keywords" hint="User messages matching these words will start this flow">
        <div className="flex gap-2">
          <Input value={input} onChange={setInput} placeholder="e.g. hello, hi, start" />
          <button
            onClick={add}
            className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm transition-colors flex-shrink-0"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {triggers.map(t => (
            <span key={t} className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs">
              {t}
              <button onClick={() => remove(t)}><X size={10} /></button>
            </span>
          ))}
        </div>
      </Field>
    </EditorSection>
  )
}