// app/(dashboard)/clients/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Plus, Search, Phone, MoreVertical,
  CheckCircle2, XCircle, Loader2, Users
} from 'lucide-react'
import { api } from '@/lib/api'
import { useSessionStore } from '@/store/session.store'

function PlanBadge({ name }: { name: string }) {
  const colors: Record<string, string> = {
    Starter:  'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
    Pro:      'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    Business: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  }
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${colors[name] ?? colors.Starter}`}>
      {name}
    </span>
  )
}

export default function ClientsPage() {
  const { token } = useSessionStore()
  const [clients, setClients]   = useState<any[]>([])
  const [search, setSearch]     = useState('')
  const [loading, setLoading]   = useState(true)
  const [showModal, setShowModal] = useState(false)

  const load = () => {
    setLoading(true)
    api.get('/clients').then(setClients).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone_number_id.includes(search)
  )

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Clients</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{clients.length} WhatsApp numbers</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors">
          <Plus size={15} /> Add Client
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search clients…"
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-emerald-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-zinc-400">
            <Users size={32} className="opacity-30" />
            <p className="text-sm">No clients found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                {['Name','Phone Number ID','Plan','Messages','Status',''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(client => (
                <tr key={client.id}
                  className="border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/clients/${client.id}`} className="font-medium text-sm text-zinc-900 dark:text-zinc-100 hover:text-emerald-600">
                      {client.name}
                    </Link>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{client.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400 font-mono">
                      <Phone size={12} />
                      {client.phone_number_id}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <PlanBadge name={client.plan_name ?? 'Starter'} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-zinc-700 dark:text-zinc-300">
                      {(client.messages_sent_this_month ?? 0).toLocaleString()}
                      <span className="text-xs text-zinc-400 ml-1">/ {(client.monthly_limit ?? 1000).toLocaleString()}</span>
                    </div>
                    <div className="w-24 h-1 bg-zinc-100 dark:bg-zinc-700 rounded-full mt-1">
                      <div
                        className="h-1 bg-emerald-500 rounded-full"
                        style={{ width: `${Math.min(100, (client.messages_sent_this_month / (client.monthly_limit ?? 1000)) * 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {client.is_active
                      ? <span className="flex items-center gap-1 text-emerald-600 text-xs"><CheckCircle2 size={12} /> Active</span>
                      : <span className="flex items-center gap-1 text-red-500 text-xs"><XCircle size={12} /> Inactive</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/clients/${client.id}`}
                      className="text-xs text-zinc-400 hover:text-emerald-600 font-medium transition-colors">
                      Manage →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create modal */}
      {showModal && <CreateClientModal onClose={() => setShowModal(false)} onCreated={load} />}
    </div>
  )
}

function CreateClientModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({
    name: '', slug: '', phoneNumberId: '', waBusinessId: '',
    accessToken: '', verifyToken: '', timezone: 'UTC', planId: ''
  })
  const [plans, setPlans]   = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  useEffect(() => {
    api.get('/plans').then(setPlans)
  }, [])

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-xs font-medium text-zinc-500 mb-1">{label}</label>
      <input type={type} value={form[key]} placeholder={placeholder}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 focus:outline-none focus:border-emerald-400 transition-colors"
      />
    </div>
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await api.post('/clients', form)
      onCreated(); onClose()
    } catch (err: any) {
      setError(err.message ?? 'Failed to create client')
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md shadow-2xl">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Add New Client</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-3">
          {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-xl">{error}</p>}
          {field('name',          'Business Name',      'text', 'Acme Corp')}
          {field('slug',          'URL Slug',           'text', 'acme-corp')}
          {field('phoneNumberId', 'Phone Number ID',    'text', '1234567890')}
          {field('waBusinessId',  'WA Business ID',     'text', '0987654321')}
          {field('accessToken',   'Access Token',       'password')}
          {field('verifyToken',   'Verify Token',       'text', 'my_verify_token')}
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Plan</label>
            <select value={form.planId} onChange={e => setForm(f => ({ ...f, planId: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 focus:outline-none focus:border-emerald-400">
              <option value="">Select plan…</option>
              {plans.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-600 hover:bg-zinc-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {loading && <Loader2 size={13} className="animate-spin" />}
              Create Client
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}