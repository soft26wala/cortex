'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Zap,
  Bot,
  QrCode,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Layers,
  Code2,
  Workflow,
  Radio,
  FileCode,
  HelpCircle,
  PlayCircle
} from 'lucide-react'
import { AppleLiquidGlass } from '@/components/ui/AppleLiquidGlass'
import { CortexNeuralCard } from '@/components/ui/CortexNeuralCard'

export default function WhatsAppBotLandingPage() {
  const features = [
    {
      icon: <Bot className="w-6 h-6 text-emerald-400" />,
      title: 'Instant Keyword Auto-Replies',
      description: 'Trigger automated text, button, or list responses instantly when customers text specific keywords like "price", "help", or "order".'
    },
    {
      icon: <QrCode className="w-6 h-6 text-blue-400" />,
      title: 'Seamless QR Code Setup',
      description: 'Connect your WhatsApp Business number in seconds with one-click QR code scanning. No complex API approvals needed.'
    },
    {
      icon: <Workflow className="w-6 h-6 text-purple-400" />,
      title: 'Visual Chatbot Flow Builder',
      description: 'Design multi-turn conversational trees, lead capture forms, and dynamic decision logic using our drag-and-drop canvas.'
    },
    {
      icon: <Radio className="w-6 h-6 text-rose-400" />,
      title: 'Bulk Broadcast Engine',
      description: 'Send personalized promotional or transactional broadcast campaigns to thousands of opted-in WhatsApp contacts with 99.8% inbox delivery.'
    },
    {
      icon: <FileCode className="w-6 h-6 text-amber-400" />,
      title: 'Meta Template Messages',
      description: 'Create and submit official Meta-approved template messages directly from your admin panel with variable placeholders.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-400" />,
      title: '24/7 Webhook & PostgreSQL Logs',
      description: 'Real-time webhook ingestion with automated retry logic, error handling, and transactional database event logging.'
    }
  ]

  const workflowSteps = [
    { step: '01', title: 'Scan QR Code', desc: 'Connect your official WhatsApp Business number via QR code scan.' },
    { step: '02', title: 'Define Keyword Triggers', desc: 'Set up automated rules (e.g. "pricing", "support", "location") and responses.' },
    { step: '03', title: 'Build Chat Flows', desc: 'Create interactive buttons, lists, and decision trees using visual flow builder.' },
    { step: '04', title: 'Automate & Scale', desc: 'Sit back as your bot handles 80%+ of customer inquiries 24/7 automatically.' }
  ]

  const pricingTiers = [
    {
      name: 'Starter',
      price: '₹999',
      period: '/month',
      description: 'Ideal for small businesses automated quick auto-replies.',
      features: ['1 WhatsApp Account', '50 Keyword Trigger Rules', '1,000 Auto-Replies / mo', 'Basic Analytics', 'Standard Support'],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro Automation',
      price: '₹2,499',
      period: '/month',
      description: 'Complete flow builder and broadcast engine for growing teams.',
      features: ['3 WhatsApp Accounts', 'Unlimited Keyword Rules', '25,000 Auto-Replies / mo', 'Visual Flow Canvas Builder', 'Bulk Broadcast Engine', 'Live Webhook Logs', 'Priority 24/7 Support'],
      cta: 'Start Free Demo',
      popular: true
    },
    {
      name: 'Enterprise SaaS',
      price: '₹5,999',
      period: '/month',
      description: 'Dedicated cloud infrastructure with Meta Graph API integration.',
      features: ['Unlimited WhatsApp Accounts', 'Custom AI Agent Integration', 'Unlimited Auto-Replies', 'Multi-Agent Live Chat Inbox', 'Dedicated Database Pool', 'SLA Guarantee'],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const faqs = [
    { q: 'How does the WhatsApp Auto Reply Bot work?', a: 'When a customer sends a message to your WhatsApp number, our server processes the incoming webhook, matches keywords against your rules, and dispatches the configured automated text, button, or list response instantly.' },
    { q: 'Do I need WhatsApp Business API?', a: 'Our platform supports both direct WhatsApp Web QR connection and Meta official Cloud API credentials.' },
    { q: 'Can I send interactive buttons and lists?', a: 'Yes! You can configure interactive quick reply buttons and list menus that customers can tap with a single touch.' },
    { q: 'Is my database secure?', a: 'All message logs and credentials are stored securely in PostgreSQL with row-level encryption.' }
  ]

  return (
    <div className="relative min-h-screen pt-28 pb-20 overflow-hidden bg-slate-950 text-white selection:bg-emerald-500 selection:text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-600/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-3/4 left-1/4 w-[500px] h-[500px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            Next-Gen WhatsApp Business Automation Engine
          </div>

          <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent leading-tight">
            Automate WhatsApp Support & Sales 24/7
          </h1>

          <p className="text-slate-300 text-base sm:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
            Build intelligent keyword auto-replies, interactive button menus, and automated visual chat flows. Connect in 30 seconds via QR code.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/whatsapp-bot/demo"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" /> Launch Live Interactive Demo
            </Link>
            <Link
              href="/whatsapp-bot/admin"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-5 h-5" /> Open Bot Admin Dashboard
            </Link>
          </div>
        </motion.div>

        {/* Live Simulator Preview Banner */}
        <div className="mb-24 p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                Interactive Bot Sandbox
              </span>
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Test Keyword Triggers in Real-Time
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Try sending keywords like <code className="bg-slate-950 px-2 py-1 rounded text-emerald-400 font-mono">hello</code>, <code className="bg-slate-950 px-2 py-1 rounded text-emerald-400 font-mono">pricing</code>, or <code className="bg-slate-950 px-2 py-1 rounded text-emerald-400 font-mono">menu</code> to experience sub-second auto replies and button messages.
              </p>
              <Link
                href="/whatsapp-bot/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
              >
                Open Demo Sandbox <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 mb-4">
                <span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-emerald-400" /> WhatsApp Live Simulator</span>
                <span className="text-emerald-400">● Connected</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right">
                  <span className="text-slate-400 text-[10px]">User:</span> "pricing"
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-200">
                  <span className="text-emerald-400 text-[10px]">Bot:</span> 🚀 Our WhatsApp Bot SaaS plans start at ₹999/mo with unlimited keyword auto-replies!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Enterprise Features Built for Scale
            </h2>
            <p className="text-slate-400 text-sm">
              Everything you need to manage automated customer messaging on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <CortexNeuralCard key={i} className="bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 w-fit mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{feat.description}</p>
              </CortexNeuralCard>
            ))}
          </div>
        </div>

        {/* Workflow Stepper */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              4 Steps to Launch Your WhatsApp Bot
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((w, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
                <div className="text-4xl font-black text-emerald-400/40 mb-2">{w.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{w.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-white mb-4">Simple, Transparent Pricing</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((p, i) => (
              <div
                key={i}
                className={`p-8 rounded-3xl border flex flex-col justify-between ${
                  p.popular
                    ? 'bg-slate-900 border-emerald-500/50 shadow-2xl shadow-emerald-950/50 relative scale-105'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-black font-bold text-[10px] uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-black text-white">{p.price}</span>
                    <span className="text-slate-400 text-xs">{p.period}</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-6">{p.description}</p>

                  <div className="space-y-3 mb-8">
                    {p.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/whatsapp-bot/demo"
                  className={`w-full py-3 rounded-xl font-bold text-xs text-center transition-all ${
                    p.popular
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400" /> {f.q}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to Automate Your WhatsApp Support?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8">
            Experience our live interactive demo sandbox or connect your official number now.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/whatsapp-bot/demo"
              className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30"
            >
              Try Interactive Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
