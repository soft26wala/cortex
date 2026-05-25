// app/(dashboard)/broadcasts/page.tsx
'use client'
import { useEffect, useState, useRef } from 'react'
import {
  Radio, Plus, Play, Pause, X, Loader2,
  CheckCircle2, Clock, AlertCircle, Send
} from 'lucide-react'
import { api } from '@/lib/api'
import { useSessionStore } from '@/store/session.store'
import { io, Socket } from 'socket.io-client'

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; icon: any; label: string }> = {
    draft:      { color: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',     icon: Clock,         label: 'Draft' },
    scheduled:  { color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',   icon: Clock,         label: 'Scheduled' },
    running:    { color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',icon: Radio,         label: 'Running' },
    completed:  { color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', icon: CheckCircle2, label: 'Completed' },
    cancelled:  { color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',       icon: X,             label: 'Cancelled' },
  }
  const cfg = map[status] ?? map.draft
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
      <Icon size={10} />{cfg.label}
    </span>
  )
}

function ProgressBar({ sent, total, failed }: { sent: number; total: number; failed: number }) {
  const pct = total > 0 ? (sent / total) * 100 : 0
  const failPct = total > 0 ? (failed / total) * 100 : 0
  return (
    <div className="space-y-1">
      <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
        <div className="h-full bg-red-400" style={{ width: `${failPct}%` }} />
      </div>
      <p className="text-[10px] text-zinc-400">{sent.toLocaleString()} / {total.toLocaleString()} sent</p>
    </div>
  )
}

export default function BroadcastsPage() {
  const { currentClientId, token } = useSessionStore()
  const [broadcasts, setBroadcasts] = useState<any[]>([])
  const [loading, setLoading]       = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  const load = () => {
    if (!currentClientId) return
    setLoading(true)
    api.get(`/broadcasts?clientId=${currentClientId}`)
      .then(setBroadcasts)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [currentClientId])

  // Real-time progress via socket
  useEffect(() => {
    if (!token) return
    const socket = io(process.env.NEXT_PUBLIC_WS_URL!, { auth: { token } })
    socketRef.current = socket

    socket.on('broadcast:progress', (data: any) => {
      setBroadcasts(prev => prev.map(b =>
        b.id === data.broadcastId
          ? { ...b, sent_count: data.sent_count, failed_count: data.failed_count, status: data.status }
          : b
      ))
    })
    return () => { socket.disconnect() }
  }, [token])

  const cancel = async (id: string) => {
    await api.post(`/broadcasts/${id}/cancel`)
    load()
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Broadcasts</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Send messages to groups of contacts</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors">
          <Plus size={15} /> New Broadcast
        </button>
      </div>

      {/* Broadcast cards */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={24} className="animate-spin text-emerald-500" />
        </div>
      ) : broadcasts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-zinc-400">
          <Radio size={36} className="opacity-20" />
          <p className="text-sm">No broadcasts yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {broadcasts.map(bc => (
            <div key={bc.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{bc.name}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Template: <span className="font-mono">{bc.template_name ?? '—'}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={bc.status} />
                  {bc.status === 'running' && (
                    <button onClick={() => cancel(bc.id)}
                      className="text-xs text-red-500 hover:text-red-600 font-medium">Cancel</button>
                  )}
                </div>
              </div>

              <ProgressBar sent={bc.sent_count} total={bc.total_count} failed={bc.failed_count} />

              <div className="flex items-center gap-4 mt-3 text-xs text-zinc-400">
                <span>Total: {(bc.total_count ?? 0).toLocaleString()}</span>
                <span className="text-emerald-500">✓ {(bc.sent_count ?? 0).toLocaleString()}</span>
                <span className="text-red-400">✗ {(bc.failed_count ?? 0).toLocaleString()}</span>
                {bc.created_at && <span>Created: {new Date(bc.created_at).toLocaleDateString()}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <CreateBroadcastModal
          clientId={currentClientId!}
          onClose={() => setShowCreate(false)}
          onCreated={load}
        />
      )}
    </div>
  )
}

function CreateBroadcastModal({ clientId, onClose, onCreated }: {
  clientId: string; onClose: () => void; onCreated: () => void
}) {
  const [form, setForm] = useState({
    name: '', templateName: '', targetTags: '', scheduled: false, scheduledAt: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await api.post('/broadcasts', {
        clientId,
        name:         form.name,
        templateName: form.templateName,
        targetTags:   form.targetTags.split(',').map(t => t.trim()).filter(Boolean),
        scheduledAt:  form.scheduled && form.scheduledAt ? form.scheduledAt : null,
      })
      onCreated(); onClose()
    } catch (err: any) {
      setError(err.message ?? 'Failed to create broadcast')
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md shadow-2xl">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">New Broadcast</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-xl">{error}</p>}
          {[
            { key: 'name',         label: 'Broadcast Name',       placeholder: 'January Promo' },
            { key: 'templateName', label: 'Template Name',         placeholder: 'promo_january_2025' },
            { key: 'targetTags',   label: 'Target Tags (optional)',placeholder: 'premium, vip' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-zinc-500 mb-1">{label}</label>
              <input type="text" required={key !== 'targetTags'} placeholder={placeholder}
                value={(form as any)[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 focus:outline-none focus:border-emerald-400 transition-colors" />
            </div>
          ))}

          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <input type="checkbox" checked={form.scheduled}
              onChange={e => setForm(f => ({ ...f, scheduled: e.target.checked }))} className="rounded" />
            Schedule for later
          </label>

          {form.scheduled && (
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Schedule Date & Time</label>
              <input type="datetime-local" value={form.scheduledAt}
                onChange={e => setForm(f => ({ ...f, scheduledAt: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 focus:outline-none focus:border-emerald-400 transition-colors" />
            </div>
          )}

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            ⚠ Only contacts with opted_in = true will receive this broadcast.
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-600 hover:bg-zinc-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2 transition-colors">
              {loading ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
              {form.scheduled ? 'Schedule' : 'Start Broadcast'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}