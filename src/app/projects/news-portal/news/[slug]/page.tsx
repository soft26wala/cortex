'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  Flame,
  Tag,
  Newspaper,
  ChevronRight
} from 'lucide-react'

interface NewsArticle {
  id: string
  title: string
  slug: string
  description: string
  content: string
  category: string
  image: string
  author: string
  isFeatured: boolean
  isBreaking: boolean
  publishedAt: string
}

export default function NewsDetailsPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/news/${slug}`)
        const data = await res.json()
        if (data.success) {
          setArticle(data.data)

          // Fetch related
          const listRes = await fetch('/api/news?limit=4')
          const listData = await listRes.json()
          if (listData.success) {
            setRelatedNews(listData.data.filter((n: NewsArticle) => n.slug !== slug))
          }
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <Link href="/projects/news-portal" className="text-rose-400 hover:underline">
          Return to Newsroom
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-rose-500 selection:text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
          <Link href="/projects/news-portal" className="hover:text-rose-400">
            Newsroom
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-rose-400">{article.category}</span>
        </div>

        {/* Category & Status Badges */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3.5 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider">
            {article.category}
          </span>
          {article.isBreaking && (
            <span className="px-3.5 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-500" /> Breaking Story
            </span>
          )}
        </div>

        {/* Article Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-6">
          {article.title}
        </h1>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800 text-xs text-slate-400 mb-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 font-medium text-slate-200">
              <User className="w-4 h-4 text-rose-500" /> {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {new Date(article.publishedAt).toLocaleDateString(undefined, { dateStyle: 'full' })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> 4 min read
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Article link copied to clipboard!')}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-rose-500/40 transition-all"
              title="Share Article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden mb-10 border border-slate-800 shadow-2xl">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Main Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="text-lg text-slate-300 font-medium leading-relaxed mb-6 italic border-l-4 border-rose-500 pl-4 bg-slate-900/40 p-4 rounded-r-2xl border-y border-r border-slate-800/60">
              {article.description}
            </div>

            <div
              className="prose prose-invert prose-rose max-w-none text-slate-300 leading-relaxed text-base space-y-4"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="mt-12 pt-6 border-t border-slate-800 flex items-center justify-between">
              <Link
                href="/projects/news-portal"
                className="inline-flex items-center gap-2 text-sm font-semibold text-rose-400 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> Back to News Headlines
              </Link>
            </div>
          </div>

          {/* Related Articles Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 sticky top-32">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-rose-500" /> More Top Stories
              </h3>
              <div className="space-y-4">
                {relatedNews.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/projects/news-portal/news/${rel.slug}`}
                    className="group block p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-rose-500/40 transition-all"
                  >
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-rose-300 line-clamp-2">
                      {rel.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
