// components/builder/PropertyPanel.tsx
'use client'
import { useState } from 'react'
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
import { Settings2, Code, Variable, CheckCircle2 } from 'lucide-react'

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
  const [activeTab, setActiveTab] = useState<'config' | 'json' | 'vars'>('config')

  if (!selectedNode) {
    return (
      <aside className="w-80 flex-shrink-0 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col select-none">
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-zinc-400">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700/60">
            <Settings2 size={20} className="opacity-40" />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Node Inspector</p>
            <p className="text-xs mt-1 text-zinc-400">Click any node on the canvas to configure properties</p>
          </div>
        </div>
      </aside>
    )
  }

  const Editor = EDITORS[selectedNode.data.type]

  return (
    <aside className="w-80 flex-shrink-0 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden">
      
      {/* Node Header & Type */}
      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex-shrink-0 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            {selectedNode.data.type} Node
          </p>
          <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
            {selectedNode.data.label || 'Node Inspector'}
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          ID: {selectedNode.id}
        </span>
      </div>

      {/* Inspector Tabs */}
      <div className="flex border-b border-zinc-100 dark:border-zinc-800 px-2 pt-2 bg-zinc-50/50 dark:bg-zinc-950/40">
        <button
          onClick={() => setActiveTab('config')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-t-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === 'config'
              ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 border-t border-x border-zinc-200 dark:border-zinc-800'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Settings2 size={13} /> Config
        </button>
        <button
          onClick={() => setActiveTab('json')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-t-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === 'json'
              ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 border-t border-x border-zinc-200 dark:border-zinc-800'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Code size={13} /> JSON
        </button>
        <button
          onClick={() => setActiveTab('vars')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-t-lg transition flex items-center justify-center gap-1.5 ${
            activeTab === 'vars'
              ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 border-t border-x border-zinc-200 dark:border-zinc-800'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Variable size={13} /> Vars
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'config' && (
          Editor ? <Editor nodeId={selectedNode.id} /> : <p className="text-xs text-zinc-400">No editor available for this node type.</p>
        )}

        {activeTab === 'json' && (
          <div className="space-y-2">
            <p className="text-[11px] text-zinc-400">Raw node payload schema:</p>
            <pre className="p-3 bg-zinc-950 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto border border-zinc-800">
              {JSON.stringify(selectedNode.data, null, 2)}
            </pre>
          </div>
        )}

        {activeTab === 'vars' && (
          <div className="space-y-3">
            <p className="text-[11px] font-semibold text-zinc-400">Available Variables for Interpolation:</p>
            <div className="space-y-1.5">
              {['{{customer_name}}', '{{customer_phone}}', '{{user_input}}', '{{order_id}}', '{{ai_response}}'].map(v => (
                <div key={v} className="p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-between">
                  <code className="text-xs text-emerald-500 font-mono">{v}</code>
                  <span className="text-[10px] text-zinc-400">Global</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </aside>
  )
}