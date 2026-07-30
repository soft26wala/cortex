'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Newspaper,
  Flame,
  Search,
  ChevronRight,
  User,
  Clock,
  Tag,
  ShieldCheck,
  TrendingUp,
  LayoutDashboard,
  Sparkles,
  ArrowRight
} from 'lucide-react'

interface NewsItem {
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

export default function NewsPortalHomePage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const categories = ['All', 'Technology', 'Science', 'Business', 'Politics', 'Sports']

  const fetchNews = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/news?category=${selectedCategory}&search=${searchQuery}`)
      const data = await res.json()
      if (data.success) {
        setNews(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch news:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [selectedCategory, searchQuery])

  const breakingNews = news.filter((item) => item.isBreaking)
  const featuredNews = news.filter((item) => item.isFeatured)
  const regularNews = news.filter((item) => !item.isFeatured)

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRegularItems = regularNews.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(regularNews.length / itemsPerPage) || 1

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-rose-500 selection:text-white">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Top Header & Admin Link */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20 mb-2">
              <Newspaper className="w-3.5 h-3.5" /> News Portal CMS Engine
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              CORTEX <span className="text-rose-500">NEWSROOM</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/projects/news-portal/admin"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-sm shadow-lg shadow-rose-600/30 transition-all"
            >
              <LayoutDashboard className="w-4 h-4" /> Admin Portal & Upload
            </Link>
          </div>
        </div>

        {/* Breaking News Ticker */}
        {breakingNews.length > 0 && (
          <div className="mb-10 rounded-2xl bg-rose-950/40 border border-rose-500/30 p-3 sm:p-4 backdrop-blur-md flex items-center gap-4 overflow-hidden shadow-lg shadow-rose-950/20">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-black uppercase tracking-wider shrink-0 animate-pulse">
              <Flame className="w-4 h-4 fill-white" /> Breaking
            </div>
            <div className="overflow-hidden relative w-full">
              <div className="whitespace-nowrap flex items-center gap-8 animate-[marquee_20s_linear_infinite]">
                {breakingNews.map((item) => (
                  <Link
                    key={item.id}
                    href={`/projects/news-portal/news/${item.slug}`}
                    className="hover:underline text-sm font-medium text-rose-200 inline-flex items-center gap-2"
                  >
                    <span>{item.title}</span>
                    <span className="text-xs text-rose-400 font-normal">({new Date(item.publishedAt).toLocaleTimeString()})</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setCurrentPage(1)
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-all"
            />
          </div>
        </div>

        {/* Featured News Section */}
        {featuredNews.length > 0 && selectedCategory === 'All' && !searchQuery && (
          <div className="mb-14">
            <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-500" /> Featured Headlines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredNews.slice(0, 2).map((item) => (
                <Link key={item.id} href={`/projects/news-portal/news/${item.slug}`} className="group block">
                  <div className="relative h-80 rounded-2xl overflow-hidden border border-slate-800 mb-4 bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold">
                        {item.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-black/60 text-slate-200 backdrop-blur-md text-xs font-medium border border-white/20">
                        Featured
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 text-sm line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div>
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-500" /> Latest Articles
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-2xl bg-slate-900 animate-pulse border border-slate-800" />
              ))}
            </div>
          ) : currentRegularItems.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
              <Newspaper className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-300">No news articles found</h3>
              <p className="text-sm text-slate-500 mt-1">Try selecting another category or publish articles in Admin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentRegularItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/projects/news-portal/news/${item.slug}`}
                  className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-rose-400 text-xs font-semibold border border-rose-500/30">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-rose-500" /> {item.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(item.publishedAt).toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-2 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-3 mb-4 leading-relaxed flex-grow">
                      {item.description}
                    </p>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-rose-400 group-hover:text-rose-300">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-xs text-slate-400 px-3">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
