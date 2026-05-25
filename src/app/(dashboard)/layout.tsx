// app/(dashboard)/layout.tsx
'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, Users, GitBranch, MessageSquare,
  Radio, BarChart2, Settings, LogOut, ChevronRight,
  Zap, Menu, X
} from 'lucide-react'
import { useSessionStore } from '@/store/session.store'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard',    label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/clients',      label: 'Clients',     icon: Users },
  { href: '/flows',        label: 'Flows',       icon: GitBranch },
  { href: '/contacts',     label: 'Contacts',    icon: MessageSquare },
  { href: '/broadcasts',   label: 'Broadcasts',  icon: Radio },
  { href: '/analytics',    label: 'Analytics',   icon: BarChart2 },
  { href: '/settings',     label: 'Settings',    icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { token, user, logout } = useSessionStore()
  const router   = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!token) router.replace('/login')
  }, [token])

  if (!token) return null

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-30 w-60 flex-shrink-0',
        'bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800',
        'flex flex-col transition-transform duration-200',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">FlowWA</span>
          <button className="ml-auto lg:hidden" onClick={() => setOpen(false)}>
            <X size={16} className="text-zinc-400" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link key={href} href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  active
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                )}
                onClick={() => setOpen(false)}
              >
                <Icon size={16} className={active ? 'text-emerald-600 dark:text-emerald-400' : ''} />
                {label}
                {active && <ChevronRight size={12} className="ml-auto opacity-50" />}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() ?? 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{user?.name}</p>
              <p className="text-[10px] text-zinc-400 truncate">{user?.role}</p>
            </div>
            <button onClick={logout} title="Logout"
              className="text-zinc-400 hover:text-red-500 transition-colors">
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden px-4 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
          <button onClick={() => setOpen(true)}>
            <Menu size={20} className="text-zinc-600" />
          </button>
          <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">FlowWA</span>
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}