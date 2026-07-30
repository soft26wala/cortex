'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  Search,
  BookOpen,
  Users,
  Video,
  Award,
  Sparkles,
  PlayCircle,
  Star,
  CheckCircle,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  DollarSign
} from 'lucide-react'

interface Course {
  id: string
  title: string
  slug: string
  description: string
  categoryName: string
  teacherName: string
  image: string
  price: number
  level: string
  duration: string
}

export default function EdTechLMSHomePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null)
  const [enrollSuccess, setEnrollSuccess] = useState(false)

  const categories = ['All', 'Web Development', 'Artificial Intelligence', 'Cybersecurity', 'Cloud Computing']

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/edtech/courses?category=${category}&search=${search}`)
      const data = await res.json()
      if (data.success) {
        setCourses(data.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [category, search])

  const handleEnroll = async (c: Course) => {
    try {
      setEnrollingCourse(c)
      const res = await fetch('/api/edtech/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'student-1',
          courseId: c.id,
          amount: c.price,
          paymentId: `pay_rzp_${Date.now()}`
        })
      })
      const data = await res.json()
      if (data.success) {
        setEnrollSuccess(true)
        setTimeout(() => setEnrollSuccess(false), 4000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setEnrollingCourse(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-indigo-500 selection:text-white">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Navigation & Role Shortcuts Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20 mb-3">
              <GraduationCap className="w-4 h-4" /> Next-Gen Learning Management Engine
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              CORTEX <span className="text-indigo-400">EDTECH LMS</span>
            </h1>
          </div>

          {/* Quick Dashboard Role Navigation */}
          <div className="flex flex-wrap gap-2">
            <Link
              href="/projects/edtech/student"
              className="px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Users className="w-3.5 h-3.5" /> Student Dashboard
            </Link>
            <Link
              href="/projects/edtech/teacher"
              className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Video className="w-3.5 h-3.5" /> Teacher Studio
            </Link>
            <Link
              href="/projects/edtech/admin"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Admin Analytics
            </Link>
          </div>
        </div>

        {enrollSuccess && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Successfully enrolled into course! Check your Student Dashboard to start learning.</span>
            </div>
            <Link href="/projects/edtech/student" className="underline font-bold text-xs">
              Go to Student Hub &rarr;
            </Link>
          </div>
        )}

        {/* Hero Banner Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="text-3xl font-black text-indigo-400 mb-1">1,420+</div>
            <div className="text-xs text-slate-400 font-medium">Active Students</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="text-3xl font-black text-purple-400 mb-1">45+</div>
            <div className="text-xs text-slate-400 font-medium">Expert Courses</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="text-3xl font-black text-emerald-400 mb-1">100%</div>
            <div className="text-xs text-slate-400 font-medium">Verified Certificates</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="text-3xl font-black text-rose-400 mb-1">Razorpay</div>
            <div className="text-xs text-slate-400 font-medium">Instant Payment Ready</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  category === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Course Catalog Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-extrabold text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400" /> Featured Online Courses
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-slate-900 animate-pulse border border-slate-800" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="group rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 overflow-hidden flex flex-col shadow-xl"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                      {course.categoryName}
                    </span>
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md">
                      ₹{course.price}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-slate-300">{course.teacherName}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-medium">{course.level}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-3 mb-6 leading-relaxed flex-grow">
                      {course.description}
                    </p>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <Video className="w-4 h-4 text-purple-400" /> {course.duration}
                      </div>

                      <button
                        onClick={() => handleEnroll(course)}
                        disabled={enrollingCourse?.id === course.id}
                        className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
                      >
                        {enrollingCourse?.id === course.id ? 'Enrolling...' : 'Enroll Now (Razorpay)'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
