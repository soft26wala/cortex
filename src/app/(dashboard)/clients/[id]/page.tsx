'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Phone, ShieldCheck, Activity } from 'lucide-react'

export default function SingleClientPage() {
  const params = useParams()
  const clientId = params?.id as string

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/clients"
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Client Profile</h1>
          <p className="text-xs text-zinc-500">Client Identifier: {clientId}</p>
        </div>
      </div>

      {/* Main Info Card */}
      <div className="p-6 dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
            <User size={26} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Client #{clientId}</h2>
            <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-0.5">
              <ShieldCheck size={14} className="text-emerald-500" /> Active WhatsApp API Integration
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-100 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 block mb-1">Status</span>
            <span className="text-sm font-bold text-emerald-500 flex items-center gap-1.5">
              <Activity size={14} /> Active & Connected
            </span>
          </div>

          <div className="p-4 bg-slate-100 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 block mb-1">Platform</span>
            <span className="text-sm font-bold text-zinc-900 dark:text-white">
              Cortex WhatsApp Automation Engine
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
