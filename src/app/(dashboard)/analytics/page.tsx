// app/(dashboard)/analytics/page.tsx
'use client'
import { useEffect, useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  MessageSquare, Users, TrendingUp, CheckCheck,
  Radio, ArrowUpRight, ArrowDownRight, Loader2
} from 'lucide-react'
import { api } from '@/lib/api'
import { useSessionStore } from '@/store/session.store'

function StatCard({ label, value, sub, icon: Icon, trend, color }: any) {
  const up = trend >= 0
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${up ? 'text-emerald-500' : 'text-red-500'}`}>
            {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      <p className="text-sm text-zinc-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-zinc-400 mt-1">{sub}</p>}
    </div>
  )
}

const CHART_COLORS = {
  sent:     '#10b981',
  received: '#6366f1',
  delivered:'#0ea5e9',
  read:     '#f59e0b',
}

export default function AnalyticsPage() {
  const { currentClientId } = useSessionStore()
  const [overview, setOverview]     = useState<any>(null)
  const [timeseries, setTimeseries] = useState<any[]>([])
  const [days, setDays]             = useState('30')
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    if (!currentClientId) return
    setLoading(true)
    Promise.all([
      api.get(`/analytics/overview?clientId=${currentClientId}`),
      api.get(`/analytics/timeseries?clientId=${currentClientId}&days=${days}`),
    ]).then(([ov, ts]) => {
      setOverview(ov)
      setTimeseries(ts.map((r: any) => ({
        ...r,
        date: new Date(r.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
        sent:     Number(r.sent),
        received: Number(r.received),
      })))
    }).finally(() => setLoading(false))
  }, [currentClientId, days])

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin text-emerald-500" size={32} />
    </div>
  )

  const m = overview?.messages ?? {}
  const s = overview?.sessions ?? {}
  const c = overview?.contacts ?? {}

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Analytics</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Message delivery and flow performance</p>
        </div>
        <select
          value={days} onChange={e => setDays(e.target.value)}
          className="text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-emerald-400"
        >
          {[7, 14, 30, 90].map(d => <option key={d} value={d}>Last {d} days</option>)}
        </select>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Messages Sent"     value={m.sent}      icon={MessageSquare} color="bg-emerald-500" trend={12} />
        <StatCard label="Delivered"         value={m.delivered}  icon={CheckCheck}    color="bg-blue-500"    trend={8} />
        <StatCard label="Read"              value={m.read}       icon={TrendingUp}    color="bg-amber-500"   trend={-3} />
        <StatCard label="Total Contacts"    value={c.total}      icon={Users}         color="bg-purple-500"
          sub={`+${c.new_this_month} this month`} />
      </div>

      {/* Line chart */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">Message Volume</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={timeseries} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #e4e4e7', fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="sent"     stroke={CHART_COLORS.sent}     strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="received" stroke={CHART_COLORS.received} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart + session stats */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">Daily Breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={timeseries.slice(-14)} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="sent"     fill={CHART_COLORS.sent}     radius={[4,4,0,0]} />
              <Bar dataKey="received" fill={CHART_COLORS.received}  radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">Session Stats</h2>
          <div className="space-y-3">
            {[
              { label: 'Total sessions',    value: s.total_sessions, color: 'bg-blue-500' },
              { label: 'Completed',         value: s.completed,      color: 'bg-emerald-500' },
              { label: 'Avg duration (min)',value: Number(s.avg_duration_min ?? 0).toFixed(1), color: 'bg-amber-500' },
              { label: 'Failed messages',   value: m.failed,         color: 'bg-red-500' },
            ].map(row => (
              <div key={row.label} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${row.color}`} />
                <span className="text-sm text-zinc-600 dark:text-zinc-400 flex-1">{row.label}</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {(row.value ?? 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}