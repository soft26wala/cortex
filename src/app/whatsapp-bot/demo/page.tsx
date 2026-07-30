'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Smartphone,
  Send,
  QrCode,
  CheckCircle,
  Bot,
  RefreshCw,
  ArrowLeft,
  Sparkles,
  Terminal,
  MessageSquare,
  ShieldCheck,
  CheckCheck
} from 'lucide-react'

interface Message {
  id: string
  sender: 'user' | 'bot'
  text: string
  buttons?: { id: string; title: string }[]
  timestamp: string
}

export default function WhatsAppBotDemoPage() {
  const [isConnected, setIsConnected] = useState(true)
  const [qrScanning, setQrScanning] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: '👋 Welcome to Cortex Auto-Reply Bot! Try texting "hello", "pricing", or "menu".',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [logs, setLogs] = useState<string[]>([
    '[INIT] WhatsApp Bot Service connected',
    '[READY] Subscribed to Webhook /api/whatsapp/send',
    '[STATUS] QR session verified (+91 98765 43210)'
  ])

  const addLog = (logStr: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${logStr}`, ...prev])
  }

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input
    if (!text.trim()) return

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput('')
    addLog(`[INBOUND] Received message from client: "${text}"`)

    // Call API Route
    try {
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botId: 'bot-1',
          text,
          sender: '+91 98765 00000'
        })
      })
      const data = await res.json()

      if (data.success) {
        const botResponse = data.result.response
        const matched = data.result.matched
        const keyword = data.result.keyword

        if (matched) {
          addLog(`[MATCH] Keyword matched "${keyword}". Triggered response rule.`)
        } else {
          addLog(`[FALLBACK] No keyword matched. Dispatched default fallback.`)
        }

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `b-${Date.now()}`,
              sender: 'bot',
              text: botResponse.text || 'Message processed.',
              buttons: botResponse.buttons,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ])
          addLog(`[OUTBOUND] Dispatched auto-reply via WhatsApp Business API`)
        }, 400)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSimulateQR = () => {
    setQrScanning(true)
    addLog('[QR] Generating new WhatsApp connection QR code token...')
    setTimeout(() => {
      setQrScanning(false)
      setIsConnected(true)
      addLog('[SUCCESS] WhatsApp device paired successfully!')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-emerald-500 selection:text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <Link
              href="/whatsapp-bot"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Bot Landing
            </Link>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Bot className="w-8 h-8 text-emerald-500" /> Interactive WhatsApp Bot Sandbox
            </h1>
          </div>

          <div className="flex gap-3">
            <Link
              href="/whatsapp-bot/admin"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-800"
            >
              Open Admin Rules Manager
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: QR Connection & Quick Keywords */}
          <div className="lg:col-span-4 space-y-6">
            {/* QR Connection Status */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                <span>WhatsApp Device Session</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  isConnected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </h3>

              <div className="text-center p-6 rounded-xl bg-slate-950 border border-slate-800/80 mb-4">
                {qrScanning ? (
                  <div className="py-8 text-center">
                    <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Scanning device connection...</p>
                  </div>
                ) : (
                  <div>
                    <QrCode className="w-28 h-28 text-emerald-400 mx-auto mb-3 opacity-90" />
                    <div className="text-xs font-bold text-white">+91 98765 43210</div>
                    <div className="text-[10px] text-slate-500">Official Webhook Active</div>
                  </div>
                )}
              </div>

              <button
                onClick={handleSimulateQR}
                disabled={qrScanning}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-scan QR Code
              </button>
            </div>

            {/* Test Trigger Shortcuts */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Click to Test Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {['hello', 'pricing', 'menu', 'help'].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => handleSend(kw)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold transition-all"
                  >
                    "{kw}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column: Live Smartphone Preview */}
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-sm rounded-[40px] bg-slate-900 border-4 border-slate-800 p-4 shadow-2xl shadow-emerald-950/40 relative">
              {/* Phone Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                    CB
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Cortex Support Bot</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online 24/7
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Body */}
              <div className="h-96 overflow-y-auto space-y-3 p-2 font-sans">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                          : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-none shadow-md'
                      }`}
                    >
                      <p>{m.text}</p>

                      {/* Render Option Buttons */}
                      {m.buttons && (
                        <div className="mt-3 pt-2 border-t border-slate-700/80 space-y-1.5">
                          {m.buttons.map((b) => (
                            <button
                              key={b.id}
                              onClick={() => handleSend(b.title)}
                              className="w-full text-center py-1.5 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-all"
                            >
                              {b.title}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="text-[9px] opacity-70 mt-1 text-right flex items-center justify-end gap-1">
                        <span>{m.timestamp}</span>
                        {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-emerald-300" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-800"
              >
                <input
                  type="text"
                  placeholder="Type keyword..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Live Console Logs */}
          <div className="lg:col-span-3">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono h-full flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 mb-3">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <Terminal className="w-4 h-4 text-emerald-400" /> Bot Event Logs
                </span>
                <span className="text-[10px] text-slate-500">Live Stream</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 text-[11px] text-slate-400 pr-1 max-h-[460px]">
                {logs.map((l, i) => (
                  <div key={i} className="p-2 rounded bg-slate-900/60 border border-slate-800/60 leading-tight">
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
