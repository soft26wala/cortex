'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Sparkles,
  ExternalLink,
  Newspaper,
  GraduationCap,
  MessageSquare,
  Building2,
  ArrowRight,
  Layers,
  Zap,
  CheckCircle2
} from 'lucide-react'
import { CortexNeuralCard } from '@/components/ui/CortexNeuralCard'

interface SoftwareProduct {
  id: string
  name: string
  tagline: string
  description: string
  category: string
  image: string
  link: string
  adminLink?: string
  techStack: string[]
  features: string[]
}

const productsList: SoftwareProduct[] = [
  {
    id: 'news-portal',
    name: 'News Portal CMS',
    tagline: 'High-Speed Publishing & Content Management System',
    description: 'A complete News Portal Management System where the Admin can upload news articles with rich text editing, auto-slug generation, breaking news banners, and instant real-time homepage updates.',
    category: 'Publishing & Media',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1200&auto=format&fit=crop',
    link: '/projects/news-portal',
    adminLink: '/projects/news-portal/admin',
    techStack: ['Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'TypeScript', 'JWT'],
    features: [
      'Admin Dashboard & Analytics',
      'Instant PostgreSQL Database Sync',
      'Dynamic Slug & SEO Metadata Generation',
      'Featured & Breaking News Tickers',
      'Rich Text Content Editor & Image Upload'
    ]
  },
  {
    id: 'edtech-lms',
    name: 'EdTech LMS Platform',
    tagline: 'Multi-Role Online Learning & Course Delivery Platform',
    description: 'Complete online learning platform with dedicated dashboards for Admin, Teacher, and Student, featuring HLS video stream lessons, auto-graded quizzes, certificate generator, and Razorpay payments.',
    category: 'Education & E-Learning',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
    link: '/projects/edtech',
    adminLink: '/projects/edtech/admin',
    techStack: ['Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'TypeScript', 'Razorpay', 'Video Streaming'],
    features: [
      '3-Role Dashboards (Admin, Teacher, Student)',
      'Video Lessons Stream Player',
      'Student Progress Tracking & Course Analytics',
      'Interactive Quizzes & Certificate Verification',
      'Razorpay Payment Gateway Integration'
    ]
  },
  {
    id: 'whatsapp-bot',
    name: 'WhatsApp Automation SaaS',
    tagline: 'Visual Flow Builder & Automated WhatsApp Messaging',
    description: 'Enterprise WhatsApp Business automation platform with node-based chatbot flow builder, bulk broadcast engine, contact CRM, and real-time conversation analytics.',
    category: 'SaaS & Marketing',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1200&auto=format&fit=crop',
    link: '/whatsapp-bot',
    adminLink: '/whatsapp-bot/admin',
    techStack: ['Next.js', 'React Flow', 'Node.js', 'PostgreSQL', 'Meta Graph API', 'Socket.io'],
    features: [
      'Visual Canvas Flow Builder',
      'Meta WhatsApp Business API Integration',
      'Broadcast Scheduling & Contact Tagging',
      'Live Chat & Interactive Bot Triggers'
    ]
  },
  {
    id: 'proptis',
    name: 'Proptis Real Estate Engine',
    tagline: 'Property Discovery & Owner Management Platform',
    description: 'Comprehensive property listing and real estate portal with category search, property posting wizard, owner dashboard, and interactive location discovery.',
    category: 'Real Estate & Property',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    link: '/proptis',
    adminLink: '/proptis/dashboard',
    techStack: ['Next.js', 'Tailwind CSS', 'Zustand', 'TypeScript', 'PostgreSQL'],
    features: [
      'Interactive Property Search & Filters',
      'Property Upload & Image Gallery Wizard',
      'Owner Dashboard & Inquiry Leads',
      'Luxury Villa & Rental Showcase'
    ]
  }
]

export default function ProductsPage() {
  return (
    <div className="relative min-h-screen pt-28 pb-20 overflow-hidden bg-slate-950 text-white selection:bg-blue-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            Software Products & Digital Solutions
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
            Our Digital Products Suite
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Explore ready-to-deploy, high-performance software platforms built by Cortex Web Solutions — from CMS and LMS platforms to WhatsApp automation engines.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {productsList.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <CortexNeuralCard className="h-full bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 transition-all duration-500 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Product Image */}
                  <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-6 group bg-slate-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-blue-600 text-white shadow-md">
                      {product.category}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                    {product.name}
                  </h2>
                  <p className="text-xs font-semibold text-blue-400 mb-3">{product.tagline}</p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-6 space-y-2">
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {product.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                  <Link
                    href={product.link}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Launch Product
                  </Link>

                  {product.adminLink && (
                    <Link
                      href={product.adminLink}
                      className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Layers className="w-4 h-4" /> Admin Portal
                    </Link>
                  )}
                </div>
              </CortexNeuralCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
