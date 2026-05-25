// app/(dashboard)/flows/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Plus, GitBranch, Search, MoreVertical,
  Trash2, Copy, ToggleLeft, ToggleRight, Loader2
} from 'lucide-react'
import { api } from '@/lib/api'
import { useSessionStore } from '@/store/session.store'

export default function FlowsPage() {
  const { currentClientId } = useSessionStore()
  const [flows, setFlows]   = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [menuId, setMenuId] = useState<string | null>(null)

  const load = () => {
    if (!currentClientId) return
    setLoading(true)
    api.get(`/flows?clientId=${currentClientId}`)
      .then(setFlows)
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [currentClientId])

  const toggleActive = async (id: string, current: boolean) => {
    await api.patch(`/flows/${id}`, { isActive: !current })
    setFlows(prev => prev.map(f => f.id === id ? { ...f, is_active: !current } : f))
  }

  const duplicate = async (flow: any) => {
    await api.post('/flows', {
      clientId: currentClientId,
      name: `${flow.name} (copy)`,
      data: flow.data,
    })
    load()
  }

  const deleteFlow = async (id: string) => {
    if (!confirm('Delete this flow?')) return
    await api.delete(`/flows/${id}`)
    setFlows(prev => prev.filter(f => f.id !== id))
  }

  const filtered = flows.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Flows</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{flows.length} automation flows</p>
        </div>
        <Link href={`/flows/new/builder`}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors">
          <Plus size={15} /> New Flow
        </Link>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search flows…"
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={24} className="animate-spin text-emerald-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-zinc-400">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <GitBranch size={28} className="opacity-30" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-zinc-500">No flows yet</p>
            <p className="text-xs mt-1">Create your first automation flow</p>
          </div>
          <Link href="/flows/new/builder"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium">
            <Plus size={14} /> Create Flow
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(flow => (
            <div key={flow.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 hover:shadow-md transition-shadow group relative">
              {/* Menu */}
              <div className="absolute top-4 right-4">
                <button onClick={() => setMenuId(menuId === flow.id ? null : flow.id)}
                  className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-colors">
                  <MoreVertical size={14} />
                </button>
                {menuId === flow.id && (
                  <div className="absolute right-0 top-8 z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg py-1 w-40">
                    {[
                      { icon: Copy,        label: 'Duplicate',    action: () => duplicate(flow) },
                      { icon: Trash2,      label: 'Delete',       action: () => deleteFlow(flow.id), danger: true },
                    ].map(({ icon: Icon, label, action, danger }) => (
                      <button key={label} onClick={() => { action(); setMenuId(null) }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                          danger ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                        }`}>
                        <Icon size={13} />{label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <GitBranch size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{flow.name}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    v{flow.version} · {flow.data?.nodes?.length ?? 0} nodes
                  </p>
                </div>
              </div>

              {/* Trigger preview */}
              <div className="mb-4 flex flex-wrap gap-1">
                {(flow.data?.nodes ?? [])
                  .flatMap((n: any) => n.triggers ?? [])
                  .slice(0, 4)
                  .map((t: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-medium">
                      {t}
                    </span>
                  ))
                }
              </div>

              <div className="flex items-center justify-between">
                <button onClick={() => toggleActive(flow.id, flow.is_active)}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                    flow.is_active ? 'text-emerald-600' : 'text-zinc-400'
                  }`}>
                  {flow.is_active
                    ? <ToggleRight size={16} className="text-emerald-500" />
                    : <ToggleLeft size={16} />
                  }
                  {flow.is_active ? 'Active' : 'Inactive'}
                </button>
                <Link href={`/flows/${flow.id}/builder`}
                  className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                  Edit →
                </Link>
              </div>

              <p className="text-[10px] text-zinc-400 mt-3">
                Updated {new Date(flow.updated_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}