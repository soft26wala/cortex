// components/builder/editors/DelayEditor.tsx
'use client'
import { useState } from 'react'
import { useFlowStore } from '@/store/flow.store'
import { Field, Select, EditorSection } from './_fields'

type Unit = 'seconds' | 'minutes' | 'hours'

const UNITS: Array<{ value: Unit; label: string }> = [
  { value: 'seconds', label: 'Seconds' },
  { value: 'minutes', label: 'Minutes' },
  { value: 'hours',   label: 'Hours' },
]

const MULTIPLIERS: Record<Unit, number> = {
  seconds: 1_000, minutes: 60_000, hours: 3_600_000
}

export function DelayEditor({ nodeId }: { nodeId: string }) {
  const { nodes, updateNode } = useFlowStore(s => ({ nodes: s.nodes, updateNode: s.updateNode }))
  const data = nodes.find(n => n.id === nodeId)!.data
  const [unit, setUnit] = useState<Unit>('minutes')
  const [amount, setAmount] = useState(String((data.delayMs ?? 60000) / MULTIPLIERS[unit]))

  const handleChange = (newAmount: string, newUnit: Unit) => {
    const ms = Number(newAmount) * MULTIPLIERS[newUnit]
    if (!isNaN(ms) && ms > 0) updateNode(nodeId, { delayMs: ms })
  }

  return (
    <EditorSection>
      <Field label="Delay Duration" hint="User will wait this long before receiving the next message">
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            value={amount}
            onChange={e => { setAmount(e.target.value); handleChange(e.target.value, unit) }}
            className="flex-1 text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-emerald-400"
          />
          <Select
            value={unit}
            onChange={v => { setUnit(v as Unit); handleChange(amount, v as Unit) }}
            options={UNITS}
          />
        </div>
      </Field>
    </EditorSection>
  )
}