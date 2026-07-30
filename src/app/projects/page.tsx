'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Eye,
  Layers,
  Sparkles,
  CheckCircle2,
  X,
  Database,
  Zap,
  Globe,
  Building,
  Activity
} from 'lucide-react'
import { CortexNeuralCard } from '@/components/ui/CortexNeuralCard'

interface Project {
  id: string
  name: string
  category: string
  image: string
  description: string
  fullDescription: string
  liveUrl: string
  adminUrl?: string
  techStack: string[]
  features: string[]
  isClientProject?: boolean
  stats: { label: string; value: string }[]
}

const projectsData: Project[] = [
  {
    id: 'anant-ayurveda',
    name: 'Anant Ayurveda',
    category: 'Healthcare / Wellness',
    image: 'https://api.microlink.io/?url=https%3A%2F%2Fwww.anantayurvedaa.com%2F&screenshot=true&embed=screenshot.url',
    description: 'Modern healthcare platform for holistic Ayurvedic treatments, wellness consultations, and authentic natural wellness products.',
    fullDescription: 'Production client web platform engineered for Anant Ayurveda. Built with Next.js, React, Node.js, and Tailwind CSS to deliver seamless appointment bookings, wellness product discovery, and holistic consultation workflows.',
    liveUrl: 'https://www.anantayurvedaa.com/',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'REST API'],
    isClientProject: true,
    features: [
      'Holistic Wellness Product Catalog',
      'Doctor Consultation Appointment Booking',
      'SEO Optimized Mobile First Layout',
      'High Speed Cloud Delivery'
    ],
    stats: [
      { label: 'Status', value: 'Live' },
      { label: 'Industry', value: 'Healthcare' },
      { label: 'Performance', value: '98/100' }
    ]
  },
  {
    id: 'gk-enterprise',
    name: 'GK Enterprise',
    category: 'Industrial & B2B',
    image: 'https://api.microlink.io/?url=https%3A%2F%2Fwww.gkenterpris.com%2F&screenshot=true&embed=screenshot.url',
    description: 'Enterprise B2B portal for premium industrial tools, machinery, and manufacturing supply chain solutions.',
    fullDescription: 'Full-featured industrial B2B enterprise platform engineered for GK Enterprise to streamline supply chain inquiries, equipment catalogs, and client quote requests.',
    liveUrl: 'https://www.gkenterpris.com/',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js'],
    isClientProject: true,
    features: [
      'Industrial Tool & Machinery Catalog',
      'Quotation Request & Inquiry Workflow',
      'Responsive Mobile & Tablet Experience',
      'Custom B2B Product Search Filters'
    ],
    stats: [
      { label: 'Status', value: 'Live' },
      { label: 'Industry', value: 'Industrial' },
      { label: 'Uptime', value: '99.9%' }
    ]
  },
  {
    id: 'news-portal',
    name: 'News Portal CMS',
    category: 'Media & Publishing',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1200&auto=format&fit=crop',
    description: 'A complete News Portal Management System where the Admin can upload news articles and they are instantly displayed on the Home Page.',
    fullDescription: 'High-performance news distribution engine featuring PostgreSQL transactional persistence, dynamic slug generation, automated breaking news ticker, rich text content authoring, SEO metadata management, draft/publish workflow, and instant real-time homepage updates.',
    liveUrl: '/projects/news-portal',
    adminUrl: '/projects/news-portal/admin',
    techStack: ['Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'TypeScript', 'JWT'],
    features: [
      'Admin Dashboard & Analytics',
      'Instant PostgreSQL CRUD Operations',
      'Dynamic Slug & SEO Fields Generation',
      'Featured & Breaking News Flags',
      'Rich Content & Image Uploader'
    ],
    stats: [
      { label: 'Latency', value: '< 40ms' },
      { label: 'Data Sync', value: 'Instant' },
      { label: 'Database', value: 'PostgreSQL' }
    ]
  },
  {
    id: 'edtech-lms',
    name: 'EdTech LMS Platform',
    category: 'Education & E-Learning',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
    description: 'A complete Online Learning Platform featuring multi-role dashboards for Admin, Teacher, and Student with video lessons, quizzes, and certificates.',
    fullDescription: 'Enterprise learning management ecosystem with video stream delivery, course progress tracking, interactive quizzes with auto-grading, automated certificate generation, student enrollments, and Razorpay payment integration ready out-of-the-box.',
    liveUrl: '/projects/edtech',
    adminUrl: '/projects/edtech/admin',
    techStack: ['Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'TypeScript', 'Razorpay', 'Video Streaming'],
    features: [
      'Multi-Role Dashboards (Admin, Teacher, Student)',
      'Course Builder & Video Lesson Player',
      'Progress Tracking & Interactive Quizzes',
      'Automated Certificate Verification Engine',
      'Razorpay Payment Gateway Ready'
    ],
    stats: [
      { label: 'Dashboards', value: '3 Roles' },
      { label: 'Video Stream', value: 'HLS' },
      { label: 'Payment', value: 'Razorpay' }
    ]
  }
]

export default function ProjectsShowcasePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('All')

  const filteredProjects = projectsData.filter((p) => {
    if (filterCategory === 'All') return true
    if (filterCategory === 'Client Projects') return p.isClientProject
    if (filterCategory === 'Web Apps') return !p.isClientProject
    return true
  })

  return (
    <div className="relative min-h-screen pt-28 pb-20 overflow-hidden bg-slate-950 text-white selection:bg-purple-500 selection:text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-3/4 left-1/4 w-[500px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-medium text-purple-300">Client Portfolio & Engineering Projects</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
            Our Projects & Portfolio
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Explore live client websites, production platforms, and engineered web apps built by Cortex Web Solutions.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-14 flex-wrap">
          {['All', 'Client Projects', 'Web Apps'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                filterCategory === cat
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <CortexNeuralCard className="h-full bg-slate-900/60 border border-white/10 hover:border-purple-500/50 transition-all duration-500 flex flex-col justify-between">
                <div>
                  {/* Image & Badges */}
                  <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 group bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30 backdrop-blur-md">
                      {project.category}
                    </span>

                    {project.isClientProject && (
                      <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Live Website
                      </span>
                    )}

                    {/* Quick Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-sm">
                      <a
                        href={project.liveUrl}
                        target={project.isClientProject ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs shadow-lg shadow-purple-600/40 transition-all scale-95 group-hover:scale-100"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Preview
                      </a>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium text-xs backdrop-blur-md border border-white/30 transition-all scale-95 group-hover:scale-100"
                      >
                        <Eye className="w-4 h-4" /> View Details
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-purple-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <a
                    href={project.liveUrl}
                    target={project.isClientProject ? '_blank' : '_self'}
                    rel="noreferrer"
                    className="flex-1 text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-md shadow-purple-600/30 transition-all text-xs flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Launch Project
                  </a>

                  {project.adminUrl && (
                    <Link
                      href={project.adminUrl}
                      className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs border border-white/15 transition-all flex items-center justify-center gap-2"
                    >
                      <Layers className="w-4 h-4" /> Admin Portal
                    </Link>
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </CortexNeuralCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl shadow-purple-950/50"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  {selectedProject.category}
                </span>
              </div>

              <h2 className="text-3xl font-extrabold mb-4 text-white">{selectedProject.name}</h2>
              <p className="text-slate-300 leading-relaxed mb-6">{selectedProject.fullDescription}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {selectedProject.stats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className="text-xl font-bold text-purple-400">{stat.value}</div>
                    <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400" /> Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-2.5 rounded-lg border border-white/5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                <a
                  href={selectedProject.liveUrl}
                  target={selectedProject.isClientProject ? '_blank' : '_self'}
                  rel="noreferrer"
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 py-3 text-center rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30"
                >
                  <ExternalLink className="w-4 h-4" /> Open Project
                </a>
                {selectedProject.adminUrl && (
                  <Link
                    href={selectedProject.adminUrl}
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 py-3 text-center rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Layers className="w-4 h-4" /> Open Admin Portal
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
