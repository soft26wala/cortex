// components/builder/PropertyPanel.tsx
'use client'
import { useFlowStore } from '@/store/flow.store'
import { TriggerEditor }   from './editors/TriggerEditor'
import { MessageEditor }   from './editors/MessageEditor'
import { ImageEditor }     from './editors/ImageEditor'
import { ButtonsEditor }   from './editors/ButtonsEditor'
import { InputEditor }     from './editors/InputEditor'
import { ConditionEditor } from './editors/ConditionEditor'
import { ApiEditor }       from './editors/ApiEditor'
import { DelayEditor }     from './editors/DelayEditor'
import { TemplateEditor }  from './editors/TemplateEditor'
import { AiEditor }        from './editors/AiEditor'
import { FormEditor }      from './editors/FormEditor'
import { Settings2 } from 'lucide-react'

const EDITORS: Record<string, React.ComponentType<{ nodeId: string }>> = {
  trigger:   TriggerEditor,
  message:   MessageEditor,
  image:     ImageEditor,
  buttons:   ButtonsEditor,
  input:     InputEditor,
  condition: ConditionEditor,
  api:       ApiEditor,
  delay:     DelayEditor,
  template:  TemplateEditor,
  ai:        AiEditor,
  form:      FormEditor,
}

export function PropertyPanel() {
  const { nodes, selectedNodeId } = useFlowStore(s => ({
    nodes: s.nodes,
    selectedNodeId: s.selectedNodeId,
  }))
  const selectedNode = nodes.find(n => n.id === selectedNodeId)

  if (!selectedNode) {
    return (
      <aside className="w-72 flex-shrink-0 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-zinc-400">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <Settings2 size={20} className="opacity-40" />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Node Editor</p>
            <p className="text-xs mt-1 text-zinc-400">Click a node to edit its properties</p>
          </div>
        </div>
      </aside>
    )
  }

  const Editor = EDITORS[selectedNode.data.type]

  return (
    <aside className="w-72 flex-shrink-0 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex-shrink-0">
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
          {selectedNode.data.type} node
        </p>
        <p className="text-[11px] text-zinc-400 font-mono mt-0.5 truncate">{selectedNode.id}</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {Editor ? (
          <Editor nodeId={selectedNode.id} />
        ) : (
          <p className="p-4 text-sm text-zinc-400">No editor for this node type.</p>
        )}
      </div>
    </aside>
  )
}