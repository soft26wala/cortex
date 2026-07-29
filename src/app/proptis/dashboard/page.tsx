'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Building2, Eye, PhoneCall, MessageSquare, Plus,
  Trash2, Edit, CheckCircle2, RotateCcw, TrendingUp, BarChart3,
  Layers, Heart, ShieldAlert, Sparkles, ArrowLeft
} from 'lucide-react'
import { INITIAL_PROPERTIES } from '@/lib/proptisStore'
import { PropertyItem } from '@/types/proptis'
import { useSessionStore } from '@/store/session.store'

export default function ProptisDashboardPage() {
  const { user } = useSessionStore()
  const [properties, setProperties] = useState<PropertyItem[]>(INITIAL_PROPERTIES)
  const [activeTab, setActiveTab] = useState<'my_properties' | 'analytics' | 'saved'>('my_properties')
  const [deletedItem, setDeletedItem] = useState<PropertyItem | null>(null)

  // Compute stats
  const totalViews = properties.reduce((acc, curr) => acc + (curr.analytics?.views || 0), 0)
  const totalWhatsAppClicks = properties.reduce((acc, curr) => acc + (curr.analytics?.whatsappClicks || 0), 0)
  const totalCallClicks = properties.reduce((acc, curr) => acc + (curr.analytics?.callClicks || 0), 0)

  const handleDelete = (id: string) => {
    const item = properties.find(p => p.id === id)
    if (item) {
      setDeletedItem(item)
      setProperties(prev => prev.filter(p => p.id !== id))
    }
  }

  const handleUndo = () => {
    if (deletedItem) {
      setProperties(prev => [deletedItem, ...prev])
      setDeletedItem(null)
    }
  }

  const toggleStatus = (id: string) => {
    setProperties(prev =>
      prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            status: p.status === 'Published' ? 'Draft' : 'Published',
          }
        }
        return p
      })
    )
  }

  return (
    <div className="min-h-screen dark:bg-[#050507] bg-slate-50 text-zinc-900 dark:text-zinc-100 font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
          <div>
            <Link
              href="/proptis"
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition mb-2"
            >
              <ArrowLeft size={14} /> Explore Proptis
            </Link>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
              Owner Analytics & Management
              <span className="text-xs font-bold bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                Cortex Auth Verified
              </span>
            </h1>
          </div>

          <Link
            href="/proptis/upload"
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Post New Listing
          </Link>
        </div>

        {/* Undo Floating Notification Banner */}
        {deletedItem && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-6 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-between text-sm"
          >
            <span className="text-zinc-800 dark:text-zinc-200">
              Property <strong className="text-zinc-900 dark:text-white">&quot;{deletedItem.title}&quot;</strong> was removed.
            </span>
            <button
              onClick={handleUndo}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition"
            >
              <RotateCcw size={14} /> Undo Delete
            </button>
          </motion.div>
        )}

        {/* ── OVERVIEW ANALYTICS COUNTERS ──────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="p-6 dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl flex items-center gap-4 shadow-xl">
            <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Eye size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-zinc-900 dark:text-white">{totalViews}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Total Property Views</p>
            </div>
          </div>

          <div className="p-6 dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl flex items-center gap-4 shadow-xl">
            <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-zinc-900 dark:text-white">{totalWhatsAppClicks}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">WhatsApp Leads Generated</p>
            </div>
          </div>

          <div className="p-6 dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl flex items-center gap-4 shadow-xl">
            <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <PhoneCall size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-zinc-900 dark:text-white">{totalCallClicks}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Direct Phone Calls</p>
            </div>
          </div>
        </div>

        {/* ── TAB SELECTOR ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <button
            onClick={() => setActiveTab('my_properties')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'my_properties'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            My Properties ({properties.length})
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Analytics Breakdown
          </button>
        </div>

        {/* ── TAB 1: MY PROPERTIES LIST ────────────────────────────────────── */}
        {activeTab === 'my_properties' && (
          <div className="space-y-4">
            {properties.map(item => (
              <div
                key={item.id}
                className="p-5 dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg hover:border-blue-500/50 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-20 h-20 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-800 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full transition ${
                          item.status === 'Published'
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {item.status}
                      </button>
                    </div>
                    <Link href={`/proptis/property/${item.id}`}>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white hover:text-blue-500 transition">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {item.location.area}, {item.location.city} • ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end md:self-center">
                  <div className="text-right text-xs text-zinc-500 dark:text-zinc-400">
                    <p className="font-bold text-zinc-900 dark:text-white">{item.analytics?.views || 0} Views</p>
                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold">{item.analytics?.whatsappClicks || 0} WhatsApp</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/proptis/property/${item.id}`}
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition"
                      title="Edit / View"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 transition"
                      title="Delete Property"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 2: DETAILED ANALYTICS ────────────────────────────────────── */}
        {activeTab === 'analytics' && (
          <div className="dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Property Performance Breakdown</h2>
            <div className="space-y-6">
              {properties.map(item => (
                <div key={item.id} className="p-4 dark:bg-zinc-950/80 bg-slate-50 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">{item.title}</p>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">{item.analytics?.views} Total Views</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-xs">
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <p className="font-bold text-zinc-900 dark:text-white">{item.analytics?.dailyViews?.[6] || 0}</p>
                      <p className="text-zinc-500">Today Views</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">{item.analytics?.whatsappClicks}</p>
                      <p className="text-zinc-500">WhatsApp Leads</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <p className="font-bold text-indigo-600 dark:text-indigo-400">{item.analytics?.callClicks}</p>
                      <p className="text-zinc-500">Phone Calls</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
