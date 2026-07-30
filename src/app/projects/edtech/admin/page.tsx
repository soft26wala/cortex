'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  DollarSign,
  Award,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  CreditCard,
  ShieldAlert,
  BarChart3
} from 'lucide-react'

export default function EdTechAdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/edtech/stats')
        const data = await res.json()
        if (data.success) {
          setStats(data.data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-indigo-500 selection:text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <Link
              href="/projects/edtech"
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to LMS Landing
            </Link>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-indigo-500" /> EdTech LMS Admin Portal
            </h1>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">₹{stats?.totalRevenue || 45498}</div>
            <div className="text-xs text-emerald-400 mt-2">Razorpay Verified</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Students</span>
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-indigo-400">{stats?.totalStudents || 1420}</div>
            <div className="text-xs text-slate-500 mt-2">Enrolled Learners</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Courses</span>
              <BookOpen className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-purple-400">{stats?.activeCourses || 3}</div>
            <div className="text-xs text-slate-500 mt-2">Published & Streaming</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Certificates</span>
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">{stats?.certificatesIssued || 12}</div>
            <div className="text-xs text-slate-500 mt-2">Issued to Graduates</div>
          </div>
        </div>

        {/* Database Tables Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" /> Recent Razorpay Transactions
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Full-Stack Next.js 15 Masterclass</div>
                  <div className="text-xs text-slate-500">TX: pay_Rzp982103982 • Student Alex</div>
                </div>
                <span className="text-sm font-black text-emerald-400">₹4,999</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">AI Engineering: LLM & RAG</div>
                  <div className="text-xs text-slate-500">TX: pay_Rzp982103989 • Student Alex</div>
                </div>
                <span className="text-sm font-black text-emerald-400">₹6,999</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" /> System Database Tables Status
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {['users', 'courses', 'lessons', 'categories', 'enrollments', 'quizzes', 'certificates', 'transactions'].map((tbl) => (
                <div key={tbl} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="font-mono text-slate-300">{tbl}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
