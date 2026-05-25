// app/(dashboard)/dashboard/page.tsx
'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import {
    MessageSquare, Users, GitBranch, TrendingUp,
    ArrowUpRight, ArrowDownRight, Plus, Loader2,
    Zap, Radio, CheckCheck, Activity, Clock,
    ChevronRight, ToggleRight, ToggleLeft, Sparkles,
    Eye, EyeOff
} from 'lucide-react'
import { api } from '@/lib/api'
import { useSessionStore } from '@/store/session.store'
import { useFlowStore } from '@/store/flow.store'
import { FlowCanvas } from '@/components/builder/FlowCanvas'
import { NodePalette } from '@/components/builder/NodePalette'
import { PropertyPanel } from '@/components/builder/PropertyPanel'
import { WhatsAppPreview } from '@/components/builder/WhatsAppPreview'
import { cn } from '@/lib/utils'

/* ── Stat Card ─────────────────────────────────────────────────────────────── */
function StatCard({ label, value, sub, icon: Icon, trend, color, glow }: {
    label: string; value: string | number; sub?: string
    icon: any; trend?: number; color: string; glow?: string
}) {
    const up = (trend ?? 0) >= 0
    return (
        <div className={cn(
            'relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group',
        )}>
            {/* Subtle glow effect */}
            {glow && (
                <div className={cn('absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity', glow)} />
            )}

            <div className="flex items-start justify-between mb-4 relative z-10">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shadow-sm', color)}>
                    <Icon size={18} className="text-white" />
                </div>
                {trend !== undefined && (
                    <span className={cn(
                        'flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg',
                        up ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'text-red-500 bg-red-50 dark:bg-red-900/30 dark:text-red-400'
                    )}>
                        {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {Math.abs(trend)}%
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 relative z-10">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            <p className="text-sm text-zinc-500 mt-0.5 relative z-10">{label}</p>
            {sub && <p className="text-xs text-zinc-400 mt-1 relative z-10">{sub}</p>}
        </div>
    )
}

/* ── Quick Actions ─────────────────────────────────────────────────────────── */
function QuickActions() {
    const actions = [
        { href: '/flows/new/builder', label: 'New Flow', icon: GitBranch, color: 'from-emerald-500 to-teal-500' },
        { href: '/broadcasts', label: 'Broadcast', icon: Radio, color: 'from-blue-500 to-indigo-500' },
        { href: '/contacts', label: 'New Contact', icon: Users, color: 'from-violet-500 to-purple-500' },
        { href: '/analytics', label: 'View Analytics', icon: TrendingUp, color: 'from-amber-500 to-orange-500' },
    ]

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {actions.map(({ href, label, icon: Icon, color }) => (
                <Link key={href} href={href}
                    className="group flex flex-col items-center gap-2.5 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                    <div className={cn('w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform', color)}>
                        <Icon size={18} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                        {label}
                    </span>
                </Link>
            ))}
        </div>
    )
}

/* ── Recent Flows List ─────────────────────────────────────────────────────── */
function RecentFlows({ flows, loading }: { flows: any[]; loading: boolean }) {
    if (loading) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                <div className="flex items-center justify-center py-8">
                    <Loader2 size={20} className="animate-spin text-emerald-500" />
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Recent Flows</h2>
                    <p className="text-xs text-zinc-400 mt-0.5">{flows.length} total flows</p>
                </div>
                <Link href="/flows" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
                    View All <ChevronRight size={12} />
                </Link>
            </div>

            {flows.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-zinc-400">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <GitBranch size={22} className="opacity-30" />
                    </div>
                    <p className="text-sm text-zinc-500">No flows created yet</p>
                    <Link href="/flows/new/builder"
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-medium hover:bg-emerald-600 transition-colors">
                        <Plus size={13} /> Create Your First Flow
                    </Link>
                </div>
            ) : (
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {flows.slice(0, 5).map(flow => (
                        <Link key={flow.id} href={`/flows/${flow.id}/builder`}
                            className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
                        >
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                                <GitBranch size={14} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">{flow.name}</p>
                                <p className="text-[11px] text-zinc-400 mt-0.5">
                                    {flow.data?.nodes?.length ?? 0} nodes · v{flow.version}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {flow.is_active ? (
                                    <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                                        <ToggleRight size={11} /> Active
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-[10px] font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                                        <ToggleLeft size={11} /> Inactive
                                    </span>
                                )}
                                <ChevronRight size={14} className="text-zinc-300 group-hover:text-zinc-500 transition-colors" />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

/* ── Activity Feed ─────────────────────────────────────────────────────────── */
function ActivityFeed() {
    const activities = [
        { icon: Zap, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20', text: 'Flow "Welcome Msg" triggered', time: '2 min ago' },
        { icon: MessageSquare, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20', text: 'Broadcast sent to 142 contacts', time: '15 min ago' },
        { icon: Users, color: 'text-violet-500 bg-violet-50 dark:bg-violet-900/20', text: '3 new contacts added', time: '1 hr ago' },
        { icon: CheckCheck, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20', text: '98% delivery rate today', time: '2 hr ago' },
        { icon: Sparkles, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20', text: 'AI auto-reply handled 23 chats', time: '3 hr ago' },
        { icon: Activity, color: 'text-teal-500 bg-teal-50 dark:bg-teal-900/20', text: 'System health check passed', time: '5 hr ago' },
    ]

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Activity Feed</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Recent system events</p>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {activities.map((act, i) => (
                    <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', act.color)}>
                            <act.icon size={14} />
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-1 min-w-0 truncate">{act.text}</p>
                        <span className="text-[10px] text-zinc-400 flex-shrink-0 flex items-center gap-1">
                            <Clock size={9} /> {act.time}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ── Builder Sandbox ───────────────────────────────────────────────────────── */
function BuilderSandbox() {
    const [expanded, setExpanded] = useState(false)
    const [showPreview, setShowPreview] = useState(true)

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                        <Sparkles size={14} className="text-emerald-500" />
                        Quick Builder
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">Drag nodes to prototype a flow</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {showPreview ? <EyeOff size={12} /> : <Eye size={12} />}
                        {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </button>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                    >
                        {expanded ? 'Collapse' : 'Expand'}
                    </button>
                </div>
            </div>

            {/* Builder Area */}
            <div className={cn(
                'flex transition-all duration-300 overflow-hidden',
                expanded ? 'h-[600px]' : 'h-[380px]'
            )}>
                {/* Node Palette */}
                <NodePalette />

                {/* Flow Canvas */}
                <div className="flex-1 relative">
                    <FlowCanvas />
                </div>

                {/* Right Panel: Property Editor or WhatsApp Preview */}
                {showPreview ? (
                    <div className="w-72 flex-shrink-0 border-l border-zinc-200 dark:border-zinc-800 flex flex-col">
                        <div className="flex border-b border-zinc-100 dark:border-zinc-800">
                            <TabButton active label="Preview" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <WhatsAppPreview />
                        </div>
                    </div>
                ) : (
                    <PropertyPanel />
                )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/50">
                <p className="text-[11px] text-zinc-400">
                    This is a sandbox — changes won&apos;t be saved. Use &quot;New Flow&quot; for production flows.
                </p>
                <Link href="/flows/new/builder"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition-colors"
                >
                    <Plus size={12} /> Create Full Flow
                </Link>
            </div>
        </div>
    )
}

function TabButton({ active, label }: { active: boolean; label: string }) {
    return (
        <button className={cn(
            'flex-1 px-4 py-2.5 text-xs font-medium transition-colors',
            active
                ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                : 'text-zinc-400 hover:text-zinc-600'
        )}>
            {label}
        </button>
    )
}

/* ── Main Dashboard Page ───────────────────────────────────────────────────── */
export default function DashboardPage() {
    const { currentClientId, user } = useSessionStore()
    const [overview, setOverview] = useState<any>(null)
    const [flows, setFlows] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!currentClientId) return
        setLoading(true)

        Promise.all([
            api.get(`/analytics/overview?clientId=${currentClientId}`).catch(() => null),
            api.get(`/flows?clientId=${currentClientId}`).catch(() => []),
        ])
            .then(([ov, fl]) => {
                setOverview(ov)
                setFlows(fl ?? [])
            })
            .finally(() => setLoading(false))
    }, [currentClientId])

    const m = overview?.messages ?? {}
    const c = overview?.contacts ?? {}
    const s = overview?.sessions ?? {}

    const greeting = (() => {
        const h = new Date().getHours()
        if (h < 12) return 'Good morning'
        if (h < 17) return 'Good afternoon'
        return 'Good evening'
    })()

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin text-emerald-500" size={32} />
                    <p className="text-sm text-zinc-400">Loading dashboard…</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Greeting Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        {greeting}, {user?.name?.split(' ')[0] ?? 'there'} 👋
                    </h1>
                    <p className="text-sm text-zinc-500 mt-0.5">
                        Here&apos;s an overview of your WhatsApp automation
                    </p>
                </div>
                <Link
                    href="/flows/new/builder"
                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors shadow-sm hover:shadow-md"
                >
                    <Plus size={15} /> New Flow
                </Link>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Messages Sent"
                    value={m.sent ?? 0}
                    icon={MessageSquare}
                    color="bg-gradient-to-br from-emerald-500 to-teal-500"
                    glow="bg-emerald-400"
                    trend={12}
                />
                <StatCard
                    label="Delivered"
                    value={m.delivered ?? 0}
                    icon={CheckCheck}
                    color="bg-gradient-to-br from-blue-500 to-indigo-500"
                    glow="bg-blue-400"
                    trend={8}
                />
                <StatCard
                    label="Active Flows"
                    value={flows.filter(f => f.is_active).length}
                    icon={GitBranch}
                    color="bg-gradient-to-br from-violet-500 to-purple-500"
                    glow="bg-violet-400"
                    sub={`${flows.length} total`}
                />
                <StatCard
                    label="Total Contacts"
                    value={c.total ?? 0}
                    icon={Users}
                    color="bg-gradient-to-br from-amber-500 to-orange-500"
                    glow="bg-amber-400"
                    sub={c.new_this_month ? `+${c.new_this_month} this month` : undefined}
                    trend={c.new_this_month ? 5 : undefined}
                />
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Recent Flows + Activity Feed */}
            <div className="grid lg:grid-cols-2 gap-4">
                <RecentFlows flows={flows} loading={false} />
                <ActivityFeed />
            </div>

            {/* Builder Sandbox */}
            <BuilderSandbox />
        </div>
    )
}
