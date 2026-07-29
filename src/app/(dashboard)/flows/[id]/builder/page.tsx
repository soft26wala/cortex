// app/(dashboard)/flows/[id]/builder/page.tsx
'use client'
import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Save, Check, Loader2, Eye, EyeOff, Sparkles,
  ToggleLeft, ToggleRight, GitBranch, AlertCircle, Download, Upload
} from 'lucide-react'
import { api } from '@/lib/api'
import { useSessionStore } from '@/store/session.store'
import { useFlowStore } from '@/store/flow.store'
import { FlowCanvas } from '@/components/builder/FlowCanvas'
import { NodePalette } from '@/components/builder/NodePalette'
import { PropertyPanel } from '@/components/builder/PropertyPanel'
import { WhatsAppPreview } from '@/components/builder/WhatsAppPreview'
import { cn } from '@/lib/utils'

export default function FlowBuilderPage() {
  const params = useParams()
  const router = useRouter()
  const flowIdParam = (params?.id as string) ?? 'new'
  const { currentClientId } = useSessionStore()

  const {
    flowId, flowName, nodes, edges, isDirty, isSaving,
    setFlow, setFlowName, markSaving, markClean
  } = useFlowStore()

  const [isActive, setIsActive] = useState(true)
  const [showPreview, setShowPreview] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Load flow data on mount or when param/clientId changes
  useEffect(() => {
    if (!currentClientId) return
    setLoading(true)

    if (flowIdParam === 'new') {
      // Setup default starter flow
      const defaultNodes = [
        {
          id: 'trigger_node_1',
          type: 'trigger',
          position: { x: 250, y: 100 },
          data: {
            type: 'trigger',
            label: 'Trigger Node',
            triggers: ['hi', 'hello', 'start', 'order']
          }
        },
        {
          id: 'msg_node_1',
          type: 'message',
          position: { x: 250, y: 250 },
          data: {
            type: 'message',
            label: 'Welcome Message',
            text: 'Hello! Welcome to Cortex Web Solutions. How can we help you today?'
          }
        }
      ]
      const defaultEdges = [
        {
          id: 'etrigger_node_1-msg_node_1',
          source: 'trigger_node_1',
          target: 'msg_node_1',
          type: 'smoothstep',
          animated: true
        }
      ]
      setFlow('new', 'New WhatsApp Flow', defaultNodes as any, defaultEdges as any)
      setIsActive(true)
      setLoading(false)
    } else {
      api.get(`/flows/${flowIdParam}`)
        .then((res: any) => {
          if (res) {
            setFlow(
              res.id ? String(res.id) : flowIdParam,
              res.name || 'Untitled Flow',
              res.data?.nodes || [],
              res.data?.edges || []
            )
            setIsActive(res.is_active ?? true)
          }
        })
        .catch((err: any) => {
          console.error('Failed to load flow:', err)
          setErrorMsg('Failed to load flow data')
        })
        .finally(() => setLoading(false))
    }
  }, [flowIdParam, currentClientId, setFlow])

  const handleSave = useCallback(async () => {
    if (!currentClientId) return
    setSaveStatus('saving')
    markSaving(true)
    setErrorMsg('')

    try {
      const payload = {
        id: flowIdParam !== 'new' && !isNaN(Number(flowIdParam)) ? Number(flowIdParam) : undefined,
        name: flowName || 'Untitled Flow',
        data: { nodes, edges },
        clientId: currentClientId,
        isActive,
      }

      const res = await api.post('/flows', payload)
      if (res && res.id) {
        if (flowIdParam === 'new') {
          router.replace(`/flows/${res.id}/builder`)
        }
        setFlow(String(res.id), res.name, res.data?.nodes || nodes, res.data?.edges || edges)
      }
      markClean()
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2500)
    } catch (err: any) {
      console.error('Save error:', err)
      setErrorMsg(err.message || 'Failed to save flow')
      setSaveStatus('error')
    } finally {
      markSaving(false)
    }
  }, [currentClientId, flowIdParam, flowName, nodes, edges, isActive, markSaving, markClean, setFlow, router])

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ name: flowName, nodes, edges }, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `${flowName.toLowerCase().replace(/\s+/g, '_')}_flow.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px] bg-zinc-50 dark:bg-[#050507]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-emerald-500" size={32} />
          <p className="text-sm font-semibold text-zinc-400">Loading Cortex Visual Flow Builder…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-zinc-50 dark:bg-[#050507] overflow-hidden select-none">
      {/* Top Header Bar */}
      <header className="h-14 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 flex items-center justify-between flex-shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/flows"
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
            title="Back to Flows"
          >
            <ArrowLeft size={18} />
          </Link>

          <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800" />

          <div className="flex items-center gap-2">
            <GitBranch size={16} className="text-emerald-500 flex-shrink-0" />
            <input
              type="text"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              placeholder="Flow Name"
              className="bg-transparent font-bold text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded px-1.5 py-0.5"
            />
          </div>

          {isDirty && (
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full border border-amber-500/30">
              Unsaved Changes
            </span>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {errorMsg && (
            <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
              <AlertCircle size={13} /> {errorMsg}
            </span>
          )}

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Export Flow JSON"
          >
            <Download size={14} /> Export JSON
          </button>

          {/* Active Toggle */}
          <button
            onClick={() => setIsActive(!isActive)}
            className={cn(
              'flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all border',
              isActive
                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500/30'
                : 'text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700'
            )}
          >
            {isActive ? <ToggleRight size={16} className="text-emerald-500" /> : <ToggleLeft size={16} />}
            {isActive ? 'Active' : 'Inactive'}
          </button>

          {/* Toggle Live Preview */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800"
          >
            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
            {showPreview ? 'Hide Preview' : 'WhatsApp Preview'}
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className={cn(
              'flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold text-white transition-all shadow-md active:scale-95',
              saveStatus === 'saved'
                ? 'bg-emerald-600'
                : saveStatus === 'error'
                ? 'bg-red-500'
                : 'bg-emerald-500 hover:bg-emerald-600'
            )}
          >
            {saveStatus === 'saving' ? (
              <Loader2 size={14} className="animate-spin" />
            ) : saveStatus === 'saved' ? (
              <Check size={14} />
            ) : (
              <Save size={14} />
            )}
            {saveStatus === 'saving'
              ? 'Saving…'
              : saveStatus === 'saved'
              ? 'Saved!'
              : 'Save Flow'}
          </button>
        </div>
      </header>

      {/* Editor Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Palette */}
        <NodePalette />

        {/* Center Canvas */}
        <div className="flex-1 relative">
          <FlowCanvas />
        </div>

        {/* Right Sidebar: Property Panel or WhatsApp Preview */}
        {showPreview ? (
          <div className="w-80 flex-shrink-0 border-l border-zinc-200 dark:border-zinc-800 flex flex-col bg-white dark:bg-zinc-900 shadow-xl">
            <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/40">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-500" /> WhatsApp Live Simulator
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <WhatsAppPreview />
            </div>
          </div>
        ) : (
          <PropertyPanel />
        )}
      </div>
    </div>
  )
}