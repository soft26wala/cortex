// components/builder/editors/ApiEditor.tsx
'use client'
import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useFlowStore } from '@/store/flow.store'
import { Field, Input, Textarea, Select, EditorSection } from './_fields'

const METHODS = ['GET','POST','PUT','PATCH','DELETE'].map(v => ({ value: v, label: v }))

export function ApiEditor({ nodeId }: { nodeId: string }) {
  const { nodes, updateNode } = useFlowStore(s => ({ nodes: s.nodes, updateNode: s.updateNode }))
  const data = nodes.find(n => n.id === nodeId)!.data
  const u = (k: string) => (v: string) => updateNode(nodeId, { [k]: v })
  const mappings: Record<string,string> = data.responseMappings ?? {}

  const addMapping = () => {
    updateNode(nodeId, { responseMappings: { ...mappings, '': '' } })
  }
  const updateMapping = (oldKey: string, newKey: string, path: string) => {
    const next = Object.fromEntries(
      Object.entries(mappings).map(([k, v]) => k === oldKey ? [newKey, path] : [k, v])
    )
    updateNode(nodeId, { responseMappings: next })
  }
  const removeMapping = (key: string) => {
    const next = { ...mappings }; delete next[key]
    updateNode(nodeId, { responseMappings: next })
  }

  return (
    <EditorSection>
      <Field label="Method">
        <Select value={data.method ?? 'GET'} onChange={u('method')} options={METHODS} />
      </Field>
      <Field label="URL" hint="Supports {{variable}} interpolation">
        <Input value={data.url} onChange={u('url')} placeholder="https://api.example.com/endpoint" />
      </Field>
      {(data.method !== 'GET') && (
        <Field label="Request Body (JSON)">
          <Textarea value={data.body ? JSON.stringify(data.body, null, 2) : ''} onChange={v => {
            try { updateNode(nodeId, { body: JSON.parse(v) }) } catch {}
          }} placeholder='{"key": "{{variable}}"}' rows={4} />
        </Field>
      )}
      <Field label="Save Response To Variables" hint="Map response fields to session variables">
        <div className="space-y-1.5 mb-2">
          {Object.entries(mappings).map(([key, path]) => (
            <div key={key} className="flex items-center gap-1.5">
              <Input value={key} onChange={v => updateMapping(key, v, path)} placeholder="variable" />
              <span className="text-zinc-400 text-xs">←</span>
              <Input value={path} onChange={v => updateMapping(key, key, v)} placeholder="response.field" />
              <button onClick={() => removeMapping(key)} className="text-red-400 flex-shrink-0">
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addMapping}
          className="w-full py-1.5 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-xs text-zinc-400 hover:text-zinc-600 flex items-center justify-center gap-1.5 transition-colors">
          <Plus size={11} /> Add mapping
        </button>
      </Field>
    </EditorSection>
  )
}