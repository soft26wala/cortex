// app/(dashboard)/settings/page.tsx
'use client'
import { useEffect, useState } from 'react'
import {
  Settings, CreditCard, Shield, Bell, Key,
  Loader2, CheckCircle2, AlertTriangle, ChevronRight
} from 'lucide-react'
import { api } from '@/lib/api'
import { useSessionStore } from '@/store/session.store'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-zinc-100 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function PlanCard({ plan, current, usage }: any) {
  const isCurrent = plan.id === current?.plan_id
  return (
    <div className={`rounded-2xl border-2 p-4 transition-all ${
      isCurrent
        ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10'
        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{plan.name}</h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            {plan.monthly_message_limit.toLocaleString()} messages/mo
          </p>
        </div>
        {isCurrent && (
          <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
            <CheckCircle2 size={12} /> Current
          </span>
        )}
      </div>
      <div className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        <p>✓ {plan.max_flows} flows</p>
        <p>✓ {plan.max_contacts.toLocaleString()} contacts</p>
        <p>{plan.ai_nodes_enabled ? '✓' : '✗'} AI nodes</p>
        <p>{plan.broadcast_enabled ? '✓' : '✗'} Broadcasts</p>
      </div>
      <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
          ${(plan.price_usd_cents / 100).toFixed(0)}/mo
        </span>
        {!isCurrent && (
          <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
            Upgrade →
          </button>
        )}
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const { currentClientId, user } = useSessionStore()
  const [client, setClient]       = useState<any>(null)
  const [plans, setPlans]         = useState<any[]>([])
  const [loading, setLoading]     = useState(true)
  const [saved, setSaved]         = useState(false)
  const [profile, setProfile]     = useState({ name: user?.name ?? '', email: user?.email ?? '' })
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [tab, setTab]             = useState<'general' | 'billing' | 'security' | 'api'>('general')

  useEffect(() => {
    Promise.all([
      currentClientId ? api.get(`/clients/${currentClientId}`) : Promise.resolve(null),
      api.get('/plans'),
    ]).then(([c, p]) => { setClient(c); setPlans(p) })
      .finally(() => setLoading(false))
  }, [currentClientId])

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.patch('/auth/profile', profile)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const TABS = [
    { key: 'general',  label: 'General',  icon: Settings },
    { key: 'billing',  label: 'Billing',  icon: CreditCard },
    { key: 'security', label: 'Security', icon: Shield },
    { key: 'api',      label: 'API Keys', icon: Key },
  ]

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 size={24} className="animate-spin text-emerald-500" />
    </div>
  )

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Settings</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Manage your account and billing</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl w-fit">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key as any)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === key
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}>
            <Icon size={13} />{label}
          </button>
        ))}
      </div>

      {/* General */}
      {tab === 'general' && (
        <Section title="Profile">
          <form onSubmit={saveProfile} className="space-y-4 max-w-sm">
            {[
              { key: 'name',  label: 'Full Name',  type: 'text' },
              { key: 'email', label: 'Email',       type: 'email' },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-zinc-500 mb-1">{label}</label>
                <input type={type} value={(profile as any)[key]}
                  onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 focus:outline-none focus:border-emerald-400 transition-colors" />
              </div>
            ))}
            <button type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors">
              {saved && <CheckCircle2 size={13} />}
              {saved ? 'Saved!' : 'Save changes'}
            </button>
          </form>
        </Section>
      )}

      {/* Billing */}
      {tab === 'billing' && (
        <div className="space-y-5">
          {/* Usage card */}
          {client && (
            <Section title="Current Usage">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-zinc-600 dark:text-zinc-400">Messages this month</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {(client.messages_sent_this_month ?? 0).toLocaleString()}
                      <span className="text-zinc-400 font-normal"> / {(client.monthly_message_limit ?? 0).toLocaleString()}</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        (client.messages_sent_this_month / client.monthly_message_limit) > 0.9
                          ? 'bg-red-500'
                          : (client.messages_sent_this_month / client.monthly_message_limit) > 0.7
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (client.messages_sent_this_month / client.monthly_message_limit) * 100)}%` }}
                    />
                  </div>
                </div>
                {client.plan_expires_at && (
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle size={14} className="text-amber-500" />
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Plan expires: <strong>{new Date(client.plan_expires_at).toLocaleDateString()}</strong>
                    </span>
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* Plans */}
          <Section title="Available Plans">
            <div className="grid sm:grid-cols-3 gap-3">
              {plans.map(plan => (
                <PlanCard key={plan.id} plan={plan} current={client} />
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* Security */}
      {tab === 'security' && (
        <Section title="Change Password">
          <form className="space-y-4 max-w-sm" onSubmit={async (e) => {
            e.preventDefault()
            if (passwords.next !== passwords.confirm) return alert('Passwords do not match')
            await api.post('/auth/change-password', { current: passwords.current, next: passwords.next })
            setPasswords({ current: '', next: '', confirm: '' })
            setSaved(true); setTimeout(() => setSaved(false), 2000)
          }}>
            {[
              { key: 'current', label: 'Current Password' },
              { key: 'next',    label: 'New Password' },
              { key: 'confirm', label: 'Confirm New Password' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-zinc-500 mb-1">{label}</label>
                <input type="password" value={(passwords as any)[key]}
                  onChange={e => setPasswords(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 focus:outline-none focus:border-emerald-400 transition-colors" />
              </div>
            ))}
            <button type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors">
              Update Password
            </button>
          </form>
        </Section>
      )}

      {/* API Keys */}
      {tab === 'api' && (
        <Section title="API Access">
          <div className="space-y-4">
            <p className="text-sm text-zinc-500">Use your API key to authenticate requests to the FlowWA API.</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-mono text-zinc-600 dark:text-zinc-400 truncate">
                fwa_live_••••••••••••••••••••••••••••••••
              </code>
              <button className="px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-600 hover:bg-zinc-50 transition-colors">
                Copy
              </button>
              <button className="px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-600 hover:bg-zinc-50 transition-colors">
                Rotate
              </button>
            </div>
            <p className="text-xs text-zinc-400">
              Base URL: <code className="font-mono text-zinc-600 dark:text-zinc-400">{process.env.NEXT_PUBLIC_API}</code>
            </p>
          </div>
        </Section>
      )}
    </div>
  )
}