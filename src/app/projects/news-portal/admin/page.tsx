'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  PlusCircle,
  Newspaper,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Flame,
  Star,
  Search,
  ArrowLeft,
  Sparkles,
  Save,
  Image as ImageIcon
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

export default function NewsAdminDashboard() {
  const [newsList, setNewsList] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'manage'>('overview')
  const [search, setSearch] = useState('')

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('Technology')
  const [author, setAuthor] = useState('Admin Editor')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)
  const [isBreaking, setIsBreaking] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const fetchNews = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/news')
      const data = await res.json()
      if (data.success) {
        setNewsList(data.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  // Auto generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!editingId) {
      const generated = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      setSlug(generated)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setTitle('')
    setSlug('')
    setCategory('Technology')
    setAuthor('Admin Editor')
    setImage('')
    setDescription('')
    setContent('')
    setIsFeatured(false)
    setIsBreaking(false)
  }

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id)
    setTitle(item.title)
    setSlug(item.slug)
    setCategory(item.category)
    setAuthor(item.author)
    setImage(item.image)
    setDescription(item.description)
    setContent(item.content)
    setIsFeatured(item.isFeatured)
    setIsBreaking(item.isBreaking)
    setActiveTab('create')
  }

  const handleDelete = async (slugOrId: string) => {
    if (!confirm('Are you sure you want to delete this article from PostgreSQL?')) return
    try {
      const res = await fetch(`/api/news/${slugOrId}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setStatusMessage('Article deleted successfully from Database!')
        fetchNews()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    const payload = {
      title,
      slug,
      category,
      author,
      image: image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop',
      description,
      content,
      isFeatured,
      isBreaking
    }

    try {
      if (editingId) {
        await fetch(`/api/news/${slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        setStatusMessage('Article updated successfully in PostgreSQL Database!')
      } else {
        await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        setStatusMessage('Article published & saved to PostgreSQL database!')
      }

      resetForm()
      fetchNews()
      setActiveTab('manage')
      setTimeout(() => setStatusMessage(''), 4000)
    } catch (err) {
      console.error(err)
    }
  }

  const filteredNews = newsList.filter(n => n.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-rose-500 selection:text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <Link
              href="/projects/news-portal"
              className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to News Portal Home
            </Link>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-rose-500" /> News Portal Admin Center
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { resetForm(); setActiveTab('create'); }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-md shadow-rose-600/30 transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Create New Article
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Dashboard Tabs */}
        <div className="flex gap-3 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              activeTab === 'overview' ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              activeTab === 'manage' ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Article Manager ({newsList.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              activeTab === 'create' ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {editingId ? 'Edit Article' : 'Publish / Draft Editor'}
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Articles</div>
                <div className="text-3xl font-black text-white">{newsList.length}</div>
                <div className="text-xs text-rose-400 mt-2">Saved in PostgreSQL</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Featured News</div>
                <div className="text-3xl font-black text-rose-400">{newsList.filter(n => n.isFeatured).length}</div>
                <div className="text-xs text-slate-500 mt-2">Homepage Hero Slots</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Breaking Stories</div>
                <div className="text-3xl font-black text-amber-400">{newsList.filter(n => n.isBreaking).length}</div>
                <div className="text-xs text-slate-500 mt-2">Ticker Banner Active</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Database Status</div>
                <div className="text-3xl font-black text-emerald-400">ONLINE</div>
                <div className="text-xs text-slate-500 mt-2">PostgreSQL Connected</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">Quick News Activity</h3>
              <div className="space-y-3">
                {newsList.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <Newspaper className="w-4 h-4 text-rose-500" />
                      <span className="text-sm font-semibold text-slate-200 line-clamp-1">{item.title}</span>
                    </div>
                    <span className="text-xs text-slate-400">{item.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage */}
        {activeTab === 'manage' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter articles by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/60">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
                    <tr>
                      <th className="p-4">Article</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Flags</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Published Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredNews.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40">
                        <td className="p-4">
                          <div className="font-bold text-white line-clamp-1">{item.title}</div>
                          <div className="text-xs text-slate-500 font-mono">/{item.slug}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-rose-300 text-xs font-medium">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {item.isFeatured && (
                              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                                FEATURED
                              </span>
                            )}
                            {item.isBreaking && (
                              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                                BREAKING
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-xs">{item.author}</td>
                        <td className="p-4 text-xs">{new Date(item.publishedAt).toLocaleDateString()}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/projects/news-portal/news/${item.slug}`}
                              target="_blank"
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.slug || item.id)}
                              className="p-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Create / Edit Editor */}
        {activeTab === 'create' && (
          <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-500" />
                {editingId ? 'Edit News Article' : 'Create & Publish News Article'}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js 15 Released with Unprecedented Speed"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">SEO Slug (Auto-Generated)</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 font-mono focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Technology">Technology</option>
                  <option value="Science">Science</option>
                  <option value="Business">Business</option>
                  <option value="Politics">Politics</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Author Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Image URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Short Description</label>
              <textarea
                rows={2}
                placeholder="Brief excerpt for cards and metadata..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Rich Article Content (HTML / Markdown Supported)</label>
              <textarea
                rows={8}
                placeholder="<p>Full article body goes here...</p>"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white font-mono focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-300">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                />
                <span>Set as Featured News (Hero Grid)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-300">
                <input
                  type="checkbox"
                  checked={isBreaking}
                  onChange={(e) => setIsBreaking(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                />
                <span>Set as Breaking News (Top Ticker)</span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-4">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingId ? 'Save Changes to Database' : 'Publish to News Portal'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
