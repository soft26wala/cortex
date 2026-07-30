'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Video,
  PlusCircle,
  BookOpen,
  DollarSign,
  Users,
  Star,
  ArrowLeft,
  CheckCircle,
  Play,
  Save,
  Sparkles
} from 'lucide-react'

export default function EdTechTeacherDashboard() {
  const [courses, setCourses] = useState([
    { id: '1', title: 'Full-Stack Next.js 15 Masterclass', students: 840, price: 4999, status: 'Published' },
    { id: '2', title: 'Cybersecurity Essentials & Ethical Hacking', students: 580, price: 3499, status: 'Published' }
  ])

  const [showCreate, setShowCreate] = useState(false)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('2999')
  const [category, setCategory] = useState('Web Development')
  const [description, setDescription] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    try {
      const res = await fetch('/api/edtech/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          price: Number(price),
          categoryName: category,
          description,
          teacherName: 'Prof. Sarah Connor',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
        })
      })
      const data = await res.json()
      if (data.success) {
        setCourses((prev) => [
          { id: data.data.id, title: data.data.title, students: 0, price: data.data.price, status: 'Published' },
          ...prev
        ])
        setSuccessMsg('New course published to EdTech Platform database!')
        setShowCreate(false)
        setTitle('')
        setDescription('')
        setTimeout(() => setSuccessMsg(''), 4000)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-purple-500 selection:text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <Link
              href="/projects/edtech"
              className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to LMS Landing
            </Link>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Video className="w-8 h-8 text-purple-500" /> Instructor & Teacher Studio
            </h1>
          </div>

          <button
            onClick={() => setShowCreate(!showCreate)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all"
          >
            <PlusCircle className="w-4 h-4" /> Create New Course
          </button>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Students Enrolled</div>
            <div className="text-3xl font-black text-white">1,420</div>
            <div className="text-xs text-purple-400 mt-2">+14% this month</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Course Earnings</div>
            <div className="text-3xl font-black text-emerald-400">₹2,94,990</div>
            <div className="text-xs text-slate-500 mt-2">Direct Payout Ready</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Instructor Rating</div>
            <div className="text-3xl font-black text-amber-400 flex items-center gap-2">
              4.9 <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-xs text-slate-500 mt-2">520 Reviews</div>
          </div>
        </div>

        {/* Create Course Form Modal/Collapse */}
        {showCreate && (
          <form onSubmit={handleCreateCourse} className="mb-10 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> Course Creator Studio
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Docker & Kubernetes Architecture"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Price (INR)</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Course Description</label>
              <textarea
                rows={3}
                placeholder="What will students learn in this course?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Publish Course
              </button>
            </div>
          </form>
        )}

        {/* My Courses List */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-4">My Published Courses</h3>
          <div className="divide-y divide-slate-800">
            {courses.map((c) => (
              <div key={c.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white">{c.title}</h4>
                  <div className="text-xs text-slate-400 mt-1">
                    {c.students} Students Enrolled • Price: ₹{c.price}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                    {c.status}
                  </span>
                  <button className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700">
                    Manage Video Lessons
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
