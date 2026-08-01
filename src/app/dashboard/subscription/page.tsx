'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CreditCard,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowLeft,
  Download,
  RefreshCw,
  AlertTriangle,
  Zap,
  TrendingUp,
  X,
  FileText,
  History,
  CheckCircle2,
  Lock,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

export default function MySubscriptionPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [upgradingPlanId, setUpgradingPlanId] = useState<string | null>(null)
  const [actionSuccessMsg, setActionSuccessMsg] = useState('')

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/subscription')
      const result = await res.json()
      if (result.success) {
        setData(result)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscriptionData()
  }, [])

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) return resolve(true)
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleUpgradePlan = async (planId: string) => {
    setUpgradingPlanId(planId)
    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, userId: data?.user?.id || 'user-1' })
      })
      const orderRes = await res.json()

      if (orderRes.success) {
        await loadRazorpayScript()
        const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_RxLyIygnbgHNFI'

        const options: any = {
          key: razorpayKey,
          amount: orderRes.order.amount,
          currency: 'INR',
          name: 'Cortex Web Solutions',
          description: `Subscription Upgrade: ${orderRes.plan.name}`,
          ...(orderRes.isOfficialOrder ? { order_id: orderRes.order.id } : {}),
          handler: async function () {
            setUpgradeModalOpen(false)
            setActionSuccessMsg(`Subscription upgraded to ${orderRes.plan.name} successfully!`)
            fetchSubscriptionData()
            setTimeout(() => setActionSuccessMsg(''), 6000)
          },
          prefill: {
            name: data?.user?.name || 'Customer',
            email: data?.user?.email || 'customer@cortex.com',
            contact: '9876543210'
          },
          theme: { color: '#10b981' }
        }

        if (typeof window !== 'undefined' && (window as any).Razorpay) {
          const rzp = new (window as any).Razorpay(options)
          rzp.open()
        } else {
          setUpgradeModalOpen(false)
          setActionSuccessMsg(`Test Upgrade Activated! ${orderRes.plan.name} is now active.`)
          fetchSubscriptionData()
          setTimeout(() => setActionSuccessMsg(''), 6000)
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUpgradingPlanId(null)
    }
  }

  const handleDownloadInvoice = () => {
    if (!data) return
    const sub = data.subscription
    const invoiceWindow = window.open('', '_blank')
    if (invoiceWindow) {
      invoiceWindow.document.write(`
        <html>
          <head>
            <title>Invoice - ${sub.orderId}</title>
            <style>
              body { font-family: sans-serif; padding: 40px; color: #1e293b; }
              .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
              .title { font-size: 24px; font-weight: bold; color: #0f172a; }
              .badge { background: #dcfce7; color: #15803d; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 12px; }
              .table { width: 100%; border-collapse: collapse; margin-top: 30px; }
              .table th, .table td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; font-size: 14px; }
              .table th { background: #f8fafc; }
              .total { margin-top: 30px; text-align: right; font-size: 18px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <div class="title">CORTEX WEB SOLUTIONS</div>
                <p>Tax Invoice / Receipt</p>
              </div>
              <div>
                <span class="badge">PAID</span>
                <p>Date: ${sub.purchaseDate}</p>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <p><strong>Billed To:</strong> ${data.user.email}</p>
              <p><strong>Subscription ID:</strong> ${sub.id}</p>
              <p><strong>Razorpay Order ID:</strong> ${sub.orderId}</p>
              <p><strong>Payment ID:</strong> ${sub.paymentId}</p>
            </div>
            <table class="table">
              <thead>
                <tr><th>Description</th><th>Cycle</th><th>Amount</th></tr>
              </thead>
              <tbody>
                <tr><td>${sub.planName}</td><td>${sub.billingCycle}</td><td>₹${sub.priceInr}</td></tr>
              </tbody>
            </table>
            <div class="total">Total Paid: ₹${sub.priceInr} INR</div>
            <div style="margin-top: 40px; font-size: 12px; color: #64748b;">
              Thank you for subscribing to Cortex WhatsApp SaaS. For support contact support@cortestack.com.
            </div>
          </body>
        </html>
      `)
      invoiceWindow.document.close()
      invoiceWindow.print()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 flex items-center justify-center">
        <div className="flex items-center gap-3 text-emerald-400 font-bold text-sm">
          <RefreshCw className="w-5 h-5 animate-spin" /> Loading My Subscription...
        </div>
      </div>
    )
  }

  const sub = data?.subscription
  const usage = data?.usage

  // Progress Bar Color mapping
  const getProgressColorClass = (color: string) => {
    if (color === 'rose') return 'bg-rose-500 shadow-rose-500/50'
    if (color === 'amber') return 'bg-amber-500 shadow-amber-500/50'
    return 'bg-emerald-500 shadow-emerald-500/50'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-emerald-500 selection:text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <Link
              href="/whatsapp-bot/dashboard"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Customer Dashboard
            </Link>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-emerald-500" /> My SaaS Subscription
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
              sub?.isExpired
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${sub?.isExpired ? 'bg-rose-400' : 'bg-emerald-400 animate-ping'}`} />
              {sub?.status} Plan ({sub?.planName})
            </span>
          </div>
        </div>

        {actionSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950/40"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{actionSuccessMsg}</span>
          </motion.div>
        )}

        {/* Subscription Main Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Main Card: Subscription Details & Countdown */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">Active Plan Overview</span>
                  <h2 className="text-2xl font-black text-white">{sub?.planName}</h2>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-3xl font-black text-emerald-400">₹{sub?.priceInr} <span className="text-xs text-slate-400 font-normal">/ {sub?.billingCycle}</span></div>
                  <span className="text-xs text-slate-400 font-mono">Order: {sub?.orderId}</span>
                </div>
              </div>

              {/* Countdown Progress Section */}
              <div className="mb-8 p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                  <span className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4 text-emerald-400" /> Subscription Countdown
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-black font-mono ${
                    sub?.statusColor === 'rose' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    sub?.statusColor === 'amber' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {sub?.remainingDays} Days Remaining
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 shadow-md ${getProgressColorClass(sub?.statusColor)}`}
                    style={{ width: `${sub?.progressPercentage}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">Activation Date</span>
                    <span className="font-semibold text-slate-200">{sub?.activationDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Expiry Date</span>
                    <span className="font-semibold text-slate-200">{sub?.expiryDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Next Billing</span>
                    <span className="font-semibold text-slate-200">{sub?.nextBillingDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Payment Status</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> {sub?.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setUpgradeModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Upgrade Plan
                </button>
                <button
                  onClick={() => handleUpgradePlan(sub?.planId)}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-emerald-400" /> Renew Plan
                </button>
                <button
                  onClick={handleDownloadInvoice}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-blue-400" /> Download Invoice
                </button>
                <button
                  onClick={() => setHistoryModalOpen(true)}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2"
                >
                  <History className="w-4 h-4 text-purple-400" /> Payment History
                </button>
              </div>
            </div>

            {/* Resource Usage Progress Bars */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" /> Account Resource Usage
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Bots Created */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Bots Created</span>
                    <span className="text-emerald-400">{usage?.bots?.used} / {usage?.bots?.limit}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${usage?.bots?.percentage}%` }} />
                  </div>
                </div>

                {/* Keywords Used */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Keywords Configured</span>
                    <span className="text-emerald-400">{usage?.keywords?.used} / {usage?.keywords?.limit}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${usage?.keywords?.percentage}%` }} />
                  </div>
                </div>

                {/* Messages Sent */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Auto-Replies Dispatched</span>
                    <span className="text-emerald-400">{usage?.messages?.used.toLocaleString()} / {usage?.messages?.limit.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${usage?.messages?.percentage}%` }} />
                  </div>
                </div>

                {/* Storage Used */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Media & Database Storage</span>
                    <span className="text-emerald-400">{usage?.storage?.used} / {usage?.storage?.limit}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${usage?.storage?.percentage}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Included Features */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Included Plan Features
              </h3>
              <div className="space-y-3 pt-2">
                {data?.features?.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-2">Need Custom Infrastructure?</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                We offer dedicated PostgreSQL clusters, custom Meta Graph API webhooks, and SLA guarantees for enterprise volume.
              </p>
              <a
                href="mailto:enterprise@cortestack.com"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
              >
                Contact Enterprise Architecture <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      <AnimatePresence>
        {upgradeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setUpgradeModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center max-w-lg mx-auto mb-8">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">Upgrade Subscription</span>
                <h2 className="text-3xl font-extrabold text-white">Choose Your SaaS Plan</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data?.availablePlans?.map((plan: any) => {
                  const isCurrent = plan.id === sub?.planId
                  return (
                    <div
                      key={plan.id}
                      className={`p-6 rounded-2xl border flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-slate-950 border-emerald-500/50 shadow-xl'
                          : 'bg-slate-950/60 border-slate-800'
                      }`}
                    >
                      <div>
                        {isCurrent && (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                            Current Active Plan
                          </span>
                        )}
                        <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                        <div className="text-2xl font-black text-emerald-400 my-2">₹{plan.priceInr} /mo</div>
                        <p className="text-xs text-slate-400 mb-4">{plan.messageLimit.toLocaleString()} Messages / mo</p>
                      </div>

                      <button
                        onClick={() => handleUpgradePlan(plan.id)}
                        disabled={isCurrent || upgradingPlanId === plan.id}
                        className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                          isCurrent
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30'
                        }`}
                      >
                        {isCurrent ? 'Active Plan' : upgradingPlanId === plan.id ? 'Processing...' : 'Upgrade via Razorpay'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment History Modal */}
      <AnimatePresence>
        {historyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100"
            >
              <button
                onClick={() => setHistoryModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-purple-400" /> Payment & Transaction History
              </h2>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-white">{sub?.planName} Renewal</div>
                    <div className="text-slate-500 font-mono text-[10px]">Order: {sub?.orderId} | Pay: {sub?.paymentId}</div>
                    <div className="text-slate-400 text-[10px] mt-1">{sub?.activationDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-400">₹{sub?.priceInr} INR</div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">SUCCESS</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
