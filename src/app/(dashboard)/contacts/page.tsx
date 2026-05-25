// app/(dashboard)/contacts/page.tsx
'use client'
import { useEffect, useState, useRef } from 'react'
import {
  Search, Upload, Download, Plus, Tag, Trash2,
  Phone, Mail, User, Loader2, X, Filter
} from 'lucide-react'
import { api } from '@/lib/api'
import { useSessionStore } from '@/store/session.store'
import Papa from 'papaparse'

const TAG_COLORS = [
  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
]

function TagBadge({ tag, onRemove }: { tag: string; onRemove?: () => void }) {
  const color = TAG_COLORS[tag.charCodeAt(0) % TAG_COLORS.length]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${color}`}>
      {tag}
      {onRemove && <button onClick={onRemove}><X size={9} /></button>}
    </span>
  )
}

export default function ContactsPage() {
  const { currentClientId } = useSessionStore()
  const [contacts, setContacts] = useState<any[]>([])
  const [total, setTotal]       = useState(0)
  const [page, setPage]         = useState(1)
  const [search, setSearch]     = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [showImport, setShowImport] = useState(false)
  const [allTags, setAllTags]   = useState<string[]>([])
  const LIMIT = 50

  const load = () => {
    if (!currentClientId) return
    setLoading(true)
    const params = new URLSearchParams({
      clientId: currentClientId,
      page: String(page), limit: String(LIMIT),
      ...(search && { search }),
      ...(filterTag && { tag: filterTag }),
    })
    api.get(`/contacts?${params}`).then(res => {
      setContacts(res.contacts)
      setTotal(res.total)
      // Extract unique tags
      const tags = new Set<string>()
      res.contacts.forEach((c: any) => c.tags?.forEach((t: string) => tags.add(t)))
      setAllTags(prev => [...new Set([...prev, ...tags])])
    }).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [currentClientId, page, search, filterTag])

  const toggleSelect = (id: string) =>
    setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  const exportCSV = () => {
    const csv = Papa.unparse(contacts.map(c => ({
      phone: c.phone, name: c.name, email: c.email,
      tags: c.tags?.join(';'), opted_in: c.opted_in
    })))
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'contacts.csv'; a.click()
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Contacts</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{total.toLocaleString()} contacts</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <Download size={14} /> Export
          </button>
          <button onClick={() => setShowImport(true)}
            className="flex items-center gap-1.5 px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <Upload size={14} /> Import CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by name or phone…"
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors" />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <select value={filterTag} onChange={e => { setFilterTag(e.target.value); setPage(1) }}
            className="pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors appearance-none cursor-pointer">
            <option value="">All tags</option>
            {allTags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <th className="w-10 px-4 py-3">
                <input type="checkbox"
                  checked={selected.size === contacts.length && contacts.length > 0}
                  onChange={e => setSelected(e.target.checked ? new Set(contacts.map(c => c.id)) : new Set())}
                  className="rounded" />
              </th>
              {['Contact','Phone','Email','Tags','Last Seen','Opted In'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="py-16 text-center">
                <Loader2 size={24} className="animate-spin text-emerald-500 mx-auto" />
              </td></tr>
            ) : contacts.map(contact => (
              <tr key={contact.id}
                className="border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.has(contact.id)}
                    onChange={() => toggleSelect(contact.id)} className="rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {(contact.name ?? contact.phone)[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {contact.name ?? <span className="text-zinc-400 italic">No name</span>}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400 font-mono">
                    <Phone size={11} />{contact.phone}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-sm text-zinc-500">
                    {contact.email ? <><Mail size={11} />{contact.email}</> : '—'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {contact.tags?.slice(0, 3).map((tag: string) => <TagBadge key={tag} tag={tag} />)}
                    {contact.tags?.length > 3 && (
                      <span className="text-[11px] text-zinc-400">+{contact.tags.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-zinc-400">
                    {contact.last_seen ? new Date(contact.last_seen).toLocaleDateString() : 'Never'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium ${contact.opted_in ? 'text-emerald-500' : 'text-red-500'}`}>
                    {contact.opted_in ? '✓ Yes' : '✗ No'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <p className="text-xs text-zinc-400">
            Showing {((page-1)*LIMIT)+1}–{Math.min(page*LIMIT, total)} of {total.toLocaleString()}
          </p>
          <div className="flex gap-1">
            {Array.from({ length: Math.ceil(total / LIMIT) }, (_, i) => i + 1)
              .filter(p => Math.abs(p - page) <= 2)
              .map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                    p === page
                      ? 'bg-emerald-500 text-white'
                      : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}>{p}</button>
              ))}
          </div>
        </div>
      </div>

      {showImport && (
        <ImportModal clientId={currentClientId!} onClose={() => setShowImport(false)} onDone={load} />
      )}
    </div>
  )
}

function ImportModal({ clientId, onClose, onDone }: { clientId: string; onClose: () => void; onDone: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [rows, setRows]       = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState<any>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    Papa.parse(file, {
      header: true, skipEmptyLines: true,
      complete: r => setRows(r.data as any[])
    })
  }

  const handleImport = async () => {
    setLoading(true)
    const contacts = rows.map(r => ({
      phone:  r.phone ?? r.Phone ?? r.number,
      name:   r.name ?? r.Name,
      email:  r.email ?? r.Email,
      tags:   (r.tags ?? r.Tags ?? '').split(';').filter(Boolean),
    }))
    const res = await api.post(`/contacts/bulk?clientId=${clientId}`, { contacts, clientId })
    setResult(res)
    setLoading(false)
    onDone()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-lg shadow-2xl">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Import Contacts (CSV)</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">✕</button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 text-sm text-zinc-500 space-y-1">
            <p className="font-medium text-zinc-700 dark:text-zinc-300">Expected CSV columns:</p>
            <p className="font-mono text-xs">phone, name, email, tags (semicolon-separated)</p>
          </div>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-400 transition-colors">
            <Upload size={24} className="mx-auto text-zinc-300 mb-2" />
            <p className="text-sm text-zinc-500">{rows.length > 0 ? `${rows.length} rows loaded` : 'Click to choose CSV file'}</p>
          </div>
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />

          {result && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-sm text-emerald-700 dark:text-emerald-400">
              ✓ Imported {result.imported} contacts ({result.failed} failed)
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-600 hover:bg-zinc-50 transition-colors">Cancel</button>
            <button onClick={handleImport} disabled={rows.length === 0 || loading}
              className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2 transition-colors">
              {loading && <Loader2 size={13} className="animate-spin" />}
              Import {rows.length > 0 ? `${rows.length} contacts` : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}