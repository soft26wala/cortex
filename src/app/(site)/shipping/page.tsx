'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  CheckCircle2, Clock, Globe, ShieldCheck, Rocket, Code2, Server,
  GitBranch, Cloud, Mail, Phone, Lock, Cpu, Sparkles, User, Linkedin, ExternalLink
} from 'lucide-react'

const DELIVERY_TIMELINE = [
  { step: '01', title: 'Requirement Discussion', desc: 'Scope definition, feature matrix planning, and technical stack selection.' },
  { step: '02', title: 'UI/UX Design Approval', desc: 'Figma wireframes, modern design system, and interactive user flow review.' },
  { step: '03', title: 'Development Phase', desc: 'Agile frontend and backend engineering using Next.js 15, React 19, and Node.js.' },
  { step: '04', title: 'Client Mid-Review', desc: 'Live staging demonstration and client feedback integration.' },
  { step: '05', title: 'Testing & QA', desc: 'Cross-browser testing, mobile responsiveness, Lighthouse performance optimization, and security audits.' },
  { step: '06', title: 'Final Payment Approval', desc: 'Milestone sign-off and deployment greenlight.' },
  { step: '07', title: 'Website Deployment', desc: 'Production deployment to high-speed cloud infrastructure (Vercel / AWS).' },
  { step: '08', title: 'Domain & Hosting Configuration', desc: 'Custom domain setup, SSL certificate installation, and DNS routing.' },
  { step: '09', title: 'Source Code Delivery', desc: 'Private GitHub repository transfer or secure ZIP source code handover.' },
  { step: '10', title: 'Post-Launch Support', desc: '30-day warranty, free bug fixes, and administrative training.' },
]

const DELIVERY_METHODS = [
  { icon: Globe, title: 'Hosting Deployment', desc: 'Direct live deployment to Vercel, AWS, Cloudflare, or DigitalOcean.' },
  { icon: GitBranch, title: 'Git Repository Transfer', desc: 'Private GitHub/GitLab repository ownership handover to client team.' },
  { icon: Server, title: 'Server & SSL Migration', desc: 'Complete server configuration, SSL security certificates, and DNS setup.' },
  { icon: Code2, title: 'Source Code Download', desc: 'Secure encrypted download link for raw source code assets.' },
  { icon: Mail, title: 'Email & Credentials Handoff', desc: 'Direct email delivery of admin access, API keys, and documentation.' },
  { icon: ShieldCheck, title: 'Client Portal Access', desc: 'Dedicated client panel for ongoing maintenance and project updates.' },
]

const ESTIMATED_TIMELINES = [
  { type: 'Landing Page', duration: '2 – 5 Working Days', desc: 'High-converting single page website with motion animations.' },
  { type: 'Business Website', duration: '5 – 10 Working Days', desc: 'Multi-page corporate website with CMS and lead forms.' },
  { type: 'E-Commerce Portal', duration: '7 – 20 Working Days', desc: 'Full online store with payment gateway, catalog, and admin.' },
  { type: 'Custom Web SaaS', duration: 'Scope Dependent', desc: 'Complex web applications, AI automation, and custom backends.' },
]

export default function ShippingPage() {
  return (
    <div className="min-h-screen dark:bg-[#050507] bg-slate-50 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-600 selection:text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* ── HERO SECTION ────────────────────────────────────────────────────────── */}
        <section className="text-center py-12 md:py-20 relative overflow-hidden">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} className="text-blue-500 animate-spin" />
            Cortex Web Solutions • Delivery Framework
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-white tracking-tight mb-4"
          >
            Project Delivery & <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Deployment Policy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed"
          >
            At Cortex Web Solutions, we engineer and deliver custom digital platforms. Here is our transparent 10-step deployment pipeline, estimated timelines, and source code transfer policy.
          </motion.p>

        </section>

        {/* ── 10-STEP ANIMATED TIMELINE ───────────────────────────────────────────── */}
        <section className="my-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">10-Step Website Delivery Process</h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">From initial scope alignment to live cloud deployment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DELIVERY_TIMELINE.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 dark:bg-zinc-900/80 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl flex items-start gap-4 hover:border-blue-500/50 transition"
              >
                <span className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-black font-mono flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── DELIVERY METHODS GRID ────────────────────────────────────────────── */}
        <section className="my-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Digital Handover Methods</h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">Secure & transparent transfer of your digital assets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DELIVERY_METHODS.map((m) => {
              const Icon = m.icon
              return (
                <div key={m.title} className="p-6 dark:bg-zinc-900/80 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">{m.title}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{m.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── ESTIMATED TIMELINES ─────────────────────────────────────────────── */}
        <section className="my-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Estimated Project Delivery Timelines</h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">Standard completion windows based on project complexity</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ESTIMATED_TIMELINES.map((t) => (
              <div key={t.type} className="p-6 dark:bg-zinc-900/80 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg text-center space-y-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold uppercase tracking-wider">
                  {t.type}
                </span>
                <p className="text-xl font-black text-zinc-900 dark:text-white">{t.duration}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CEO / FOUNDER CARD ──────────────────────────────────────────────── */}
        <section className="my-16">
          <div className="p-8 sm:p-12 dark:bg-gradient-to-r dark:from-zinc-900 dark:via-blue-950/40 dark:to-zinc-900 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 p-1 flex-shrink-0 shadow-xl border border-white/20">
                <Image
                  src="/images/hero/anmol.png"
                  alt="Anmol Singh - CEO & Founder"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                  Executive Guarantee
                </span>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mt-2">Anmol Singh</h3>
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">CEO & Founder • Cortex Web Solutions</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 max-w-md">
                  &quot;We guarantee 100% transparent timelines, clean enterprise architecture, and dedicated post-launch support for every project we build.&quot;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-stretch md:self-auto">
              <a
                href="mailto:cortexwebsolution@gmail.com"
                className="flex-1 md:flex-none px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <Mail size={16} /> Email CEO
              </a>
              <a
                href="https://www.linkedin.com/in/cortex-web-solutions-349459399"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl transition"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
            </div>

          </div>
        </section>

      </div>
    </div>
  )
}