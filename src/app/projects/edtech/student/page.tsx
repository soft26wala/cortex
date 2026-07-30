'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  PlayCircle,
  Award,
  CheckCircle2,
  Clock,
  ArrowLeft,
  FileCheck,
  CreditCard,
  Sparkles,
  X,
  HelpCircle
} from 'lucide-react'

export default function EdTechStudentDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [activeQuiz, setActiveQuiz] = useState<boolean>(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [viewCertificate, setViewCertificate] = useState<boolean>(false)

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/edtech/courses/course-1')
        const courseRes = await res.json()

        setData({
          enrolledCourses: [
            {
              id: 'en-1',
              progressPercent: 75,
              course: courseRes.success ? courseRes.data : null
            }
          ],
          certificates: [
            {
              code: 'CRT-CTX-89210',
              issuedAt: new Date().toLocaleDateString(),
              title: 'Full-Stack Next.js 15 Masterclass'
            }
          ],
          transactions: [
            {
              id: 'tx-101',
              amount: 4999,
              paymentId: 'pay_Rzp982103982',
              date: new Date().toLocaleDateString(),
              courseTitle: 'Full-Stack Next.js 15 Masterclass'
            }
          ]
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStudentData()
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
              <GraduationCap className="w-8 h-8 text-indigo-500" /> Student Learning Portal & Hub
            </h1>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Enrolled Courses</div>
            <div className="text-3xl font-black text-white">2 Active</div>
            <div className="text-xs text-indigo-400 mt-2">In Progress</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Certificates Earned</div>
            <div className="text-3xl font-black text-amber-400">1 Verified</div>
            <div className="text-xs text-slate-500 mt-2">Ready to Download</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Average Completion</div>
            <div className="text-3xl font-black text-emerald-400">75%</div>
            <div className="text-xs text-slate-500 mt-2">Top 5% Student</div>
          </div>
        </div>

        {/* Enrolled Courses Progress */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-indigo-400" /> My Active Learning Paths
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-semibold">Web Development</span>
                  <span className="font-bold text-emerald-400">75% Completed</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Full-Stack Next.js 15 Masterclass</h3>
                <p className="text-xs text-slate-400 mb-4">Instructor: Prof. Sarah Connor</p>

                {/* Progress Bar */}
                <div className="w-full bg-slate-950 rounded-full h-2.5 mb-6 overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full w-[75%]" />
                </div>

                {/* Lessons Quick List */}
                <div className="space-y-2 mb-6">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 font-medium text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 01. Next.js 15 App Router Architecture
                    </span>
                    <button
                      onClick={() => setActiveVideo('https://www.w3schools.com/html/mov_bbb.mp4')}
                      className="text-indigo-400 hover:underline font-semibold"
                    >
                      Watch Again
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 font-medium text-slate-200">
                      <PlayCircle className="w-4 h-4 text-indigo-400 animate-pulse" /> 02. PostgreSQL APIs & Server Actions
                    </span>
                    <button
                      onClick={() => setActiveVideo('https://www.w3schools.com/html/mov_bbb.mp4')}
                      className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs"
                    >
                      Play Lesson
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setActiveQuiz(true)}
                  className="flex-1 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" /> Take Module Quiz
                </button>
                <button
                  onClick={() => setViewCertificate(true)}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" /> View Certificate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-400" /> Razorpay Purchase Receipts
          </h3>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-white">Full-Stack Next.js 15 Masterclass</div>
              <div className="text-slate-500 mt-0.5">Razorpay ID: pay_Rzp982103982 • Status: Completed</div>
            </div>
            <div className="text-right">
              <div className="font-black text-emerald-400 text-sm">₹4,999</div>
              <div className="text-slate-500">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Lesson Streaming Player</h3>
            <video controls autoPlay className="w-full h-96 rounded-2xl bg-black">
              <source src={activeVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <button onClick={() => setActiveQuiz(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">Module Quiz: Next.js 15 & PostgreSQL</h3>

            {quizScore !== null ? (
              <div className="text-center py-8">
                <Award className="w-16 h-16 text-amber-400 mx-auto mb-3" />
                <h4 className="text-2xl font-bold text-white">Score: {quizScore}/2 (100%)</h4>
                <p className="text-slate-400 text-xs mt-2">Congratulations! You passed the module quiz.</p>
                <button
                  onClick={() => { setQuizScore(null); setActiveQuiz(false); setViewCertificate(true); }}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                >
                  Claim Certificate &rarr;
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-sm font-semibold text-white mb-3">1. Which hook is used to access search params in React Server Components?</p>
                  <div className="space-y-2 text-xs">
                    <label className="block p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      <input type="radio" name="q1" className="mr-2" defaultChecked /> Async searchParams page prop
                    </label>
                    <label className="block p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      <input type="radio" name="q1" className="mr-2" /> useRouter() hook
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => setQuizScore(2)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-md"
                >
                  Submit Quiz Answers
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {viewCertificate && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 border-2 border-amber-500/40 text-center shadow-2xl">
            <button onClick={() => setViewCertificate(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white">
              <X className="w-5 h-5" />
            </button>

            <Award className="w-20 h-20 text-amber-400 mx-auto mb-4" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">Official Certificate of Accomplishment</span>
            <h2 className="text-3xl font-black text-white mb-2">Alex Mercer</h2>
            <p className="text-xs text-slate-400 mb-6">has successfully completed all requirements for</p>

            <h3 className="text-xl font-bold text-indigo-400 mb-6">Full-Stack Next.js 15 Masterclass & Cloud Architecture</h3>

            <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
              <span>Code: CRT-CTX-89210</span>
              <span>Issued: {new Date().toLocaleDateString()}</span>
              <span>Cortex Academy</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
