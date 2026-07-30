'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Bot,
  PlusCircle,
  Trash2,
  CheckCircle,
  RefreshCw,
  QrCode,
  ArrowLeft,
  Search,
  Sparkles,
  Save,
  MessageSquare,
  FileCode,
  Activity,
  ShieldCheck,
  Zap
} from 'lucide-react'

interface KeywordRule {
  id: string
  keyword: string
  matchType: string
  responseType: string
  responseContent: any
  triggerCount: number
}

export default function WhatsAppAdminDashboard() {
  const [keywords, setKeywords] = useState<KeywordRule[]>([])
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'keywords' | 'accounts' | 'templates' | 'logs'>('keywords')
  const [statusMsg, setStatusMsg] = useState('')

  // Create Keyword Form State
  const [keyword, setKeyword] = useState('')
  const [matchType, setMatchType] = useState('contains')
  const [responseType, setResponseType] = useState('text')
  const [responseText, setResponseText] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/whatsapp/keywords')
      const data = await res.json()
      if (data.success) {
        setKeywords(data.keywords)
      }

      const logRes = await fetch('/api/whatsapp/analytics')
      const logData = await logRes.json()
      if (logData.success) {
        setLogs(logData.logs)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!keyword || !responseText) return

    try {
      const res = await fetch('/api/whatsapp/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword,
          matchType,
          responseType,
          responseContent: { text: responseText }
        })
      })
      const data = await res.json()
      if (data.success) {
        setStatusMsg(`Keyword rule "${keyword}" created successfully in PostgreSQL!`)
        setKeyword('')
        setResponseText('')
        fetchData()
        setTimeout(() => setStatusMsg(''), 4000)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteKeyword = async (id: string) => {
    if (!confirm('Are you sure you want to delete this rule?')) return
    try {
      const res = await fetch(`/api/whatsapp/keywords?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setStatusMsg('Keyword rule removed.')
        fetchData()
        setTimeout(() => setStatusMsg(''), 3000)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-emerald-500 selection:text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <Link
              href="/whatsapp-bot"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Bot Landing
            </Link>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Bot className="w-8 h-8 text-emerald-500" /> WhatsApp Bot Admin Center
            </h1>
          </div>

          <div className="flex gap-2">
            <Link
              href="/whatsapp-bot/demo"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Open Live Sandbox
            </Link>
          </div>
        </div>

        {statusMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Connected Bot</div>
            <div className="text-2xl font-black text-emerald-400">+91 98765 43210</div>
            <div className="text-xs text-slate-500 mt-2">Active Webhook</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Keyword Rules</div>
            <div className="text-3xl font-black text-white">{keywords.length} Active</div>
            <div className="text-xs text-emerald-400 mt-2">Auto-Matchers</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Auto-Replies Dispatched</div>
            <div className="text-3xl font-black text-purple-400">450+</div>
            <div className="text-xs text-slate-500 mt-2">99.8% Delivery Rate</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Database Layer</div>
            <div className="text-3xl font-black text-blue-400">PostgreSQL</div>
            <div className="text-xs text-slate-500 mt-2">bot_keywords Table</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              activeTab === 'keywords' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Keyword Trigger Rules ({keywords.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              activeTab === 'logs' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Live Logs & Analytics
          </button>
        </div>

        {/* Keywords Tab */}
        {activeTab === 'keywords' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create Rule Form */}
            <div className="lg:col-span-5">
              <form onSubmit={handleAddKeyword} className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-emerald-400" /> Create Keyword Trigger Rule
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Keyword *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. pricing, support, hours"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Match Type</label>
                    <select
                      value={matchType}
                      onChange={(e) => setMatchType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="contains">Contains Keyword</option>
                      <option value="exact">Exact Match</option>
                      <option value="startsWith">Starts With</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Response Type</label>
                    <select
                      value={responseType}
                      onChange={(e) => setResponseType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="text">Text Response</option>
                      <option value="button">Interactive Button</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Automated Response Text *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Auto reply payload..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Rule to Database
                </button>
              </form>
            </div>

            {/* Keyword Rules List */}
            <div className="lg:col-span-7">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4">Active Keyword Rules</h3>

                <div className="divide-y divide-slate-800">
                  {keywords.map((k) => (
                    <div key={k.id} className="py-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                            "{k.keyword}"
                          </span>
                          <span className="text-[10px] text-slate-500 uppercase">{k.matchType}</span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {k.responseContent?.text || JSON.stringify(k.responseContent)}
                        </p>
                        <div className="text-[10px] text-slate-500 mt-1">Triggers: {k.triggerCount} times</div>
                      </div>

                      <button
                        onClick={() => handleDeleteKeyword(k.id)}
                        className="p-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30"
                        title="Delete Rule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" /> WhatsApp Bot Activity Logs
            </h3>
            <div className="space-y-2">
              {logs.map((l) => (
                <div key={l.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-emerald-400 font-bold mr-3">[{l.eventType}]</span>
                    <span className="text-slate-200">{l.details}</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">{new Date(l.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
