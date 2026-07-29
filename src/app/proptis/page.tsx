'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, MapPin, Building2, Home as HomeIcon, Filter,
  Sparkles, CheckCircle2, Bed, Bath, Maximize2, ShieldCheck,
  ChevronRight, Compass, PhoneCall, Plus, ArrowUpRight, SlidersHorizontal,
  Star, Heart, Share2, Layers
} from 'lucide-react'
import { INITIAL_PROPERTIES } from '@/lib/proptisStore'
import { PropertyItem, PropertyCategory, PropertyPurpose } from '@/types/proptis'
import { Lens } from '@/registry/magicui/lens'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const CATEGORIES: PropertyCategory[] = [
  'Luxury Villas', 'Apartments', 'Commercial Buildings',
  'Land', 'Farm Houses', 'Penthouse'
]

const CITIES = ['Jalandhar', 'Chandigarh', 'Amritsar', 'Ludhiana', 'Delhi NCR', 'Mumbai']

export default function ProptisPage() {
  const [properties, setProperties] = useState<PropertyItem[]>(INITIAL_PROPERTIES)
  const [selectedPurpose, setSelectedPurpose] = useState<string>('All')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState<number>(200000000)
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([])
  const [activeCity, setActiveCity] = useState<string>('All')

  // Filtered properties computation
  const filteredProperties = useMemo(() => {
    return properties.filter(item => {
      if (selectedPurpose !== 'All' && item.purpose !== selectedPurpose) return false
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false
      if (activeCity !== 'All' && item.location.city.toLowerCase() !== activeCity.toLowerCase()) return false
      if (item.price > priceRange) return false
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase()
        const matchTitle = item.title.toLowerCase().includes(q)
        const matchCity = item.location.city.toLowerCase().includes(q)
        const matchArea = item.location.area.toLowerCase().includes(q)
        if (!matchTitle && !matchCity && !matchArea) return false
      }
      return true
    })
  }, [properties, selectedPurpose, selectedCategory, activeCity, priceRange, searchQuery])

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSavedPropertyIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const openWhatsApp = (name: string, phone: string) => {
    const msg = `Hi, I am interested in property: ${name} listed on Cortex Proptis.`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="min-h-screen dark:bg-[#050507] bg-slate-50 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-600 selection:text-white pt-20 transition-colors duration-300">
      
      {/* ── HERO SECTION ────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b dark:from-blue-950/40 dark:via-[#050507] dark:to-[#050507] from-blue-50 via-slate-50 to-slate-50">
        
        {/* Animated background radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md"
          >
            <Sparkles size={14} className="animate-spin text-blue-500" />
            Cortex Web Solutions • Proptis Real Estate
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-white mb-6"
          >
            Discover Luxury Estates <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Designed For The Extraordinary
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-normal mb-10 leading-relaxed"
          >
            Sotheby&apos;s level exclusivity meets Apple-grade digital experience. Buy, rent, or showcase high-end villas, farmhouses, and commercial spaces with verified Cortex authentication.
          </motion.p>

          {/* ── SEARCH CARD WITH PURPOSE TABS ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto dark:bg-zinc-900/90 bg-white/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 rounded-3xl shadow-2xl"
          >
            {/* Purpose Selector Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              {['All', 'For Sale', 'For Rent', 'Commercial', 'PG', 'Agriculture'].map(purpose => (
                <button
                  key={purpose}
                  onClick={() => setSelectedPurpose(purpose)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedPurpose === purpose
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  {purpose}
                </button>
              ))}
            </div>

            {/* Main Search Controls */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              <div className="md:col-span-6 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by city, locality, or villa name (e.g. Jalandhar, Model Town)..."
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div className="md:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 transition cursor-pointer"
                >
                  <option value="All">All Property Types</option>
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <Link
                  href="/proptis/upload"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-2xl transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Plus size={16} /> Post Property
                </Link>
              </div>

            </div>

            {/* City Shortcuts */}
            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex-wrap text-xs">
              <span className="text-zinc-400 font-medium">Popular Cities:</span>
              <button
                onClick={() => setActiveCity('All')}
                className={`px-3 py-1 rounded-lg transition ${activeCity === 'All' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
              >
                All
              </button>
              {CITIES.map(city => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-3 py-1 rounded-lg transition ${activeCity === city ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
                >
                  {city}
                </button>
              ))}
            </div>

          </motion.div>

        </div>
      </section>

      {/* ── STATS COUNTER BAR ────────────────────────────────────────────────── */}
      <section className="py-12 border-y border-zinc-200 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">₹1,500 Cr+</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">Property Volume</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">100%</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">Verified Owners</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-indigo-500">250+</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">Luxury Listings</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-500">0%</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">Broker Spams</p>
          </div>
        </div>
      </section>

      {/* ── MAIN PROPERTY GRID SECTION ───────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">Featured Luxury Listings</h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Showing {filteredProperties.length} verified real estate properties
            </p>
          </div>

          <Link
            href="/proptis/dashboard"
            className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 self-start md:self-auto"
          >
            <Layers size={14} /> Owner Dashboard
          </Link>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="py-20 text-center dark:bg-zinc-900/60 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">
            <Building2 size={48} className="text-zinc-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">No properties match your filter</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-6">Try resetting your search query or price range filters.</p>
            <button
              onClick={() => {
                setSelectedPurpose('All')
                setSelectedCategory('All')
                setActiveCity('All')
                setSearchQuery('')
              }}
              className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(item => {
              const isSaved = savedPropertyIds.includes(item.id)
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-500 flex flex-col justify-between"
                >
                  <div>
                    
                    {/* Magic UI Lens Zoom Image Wrapper */}
                    <div className="relative h-64 overflow-hidden dark:bg-zinc-950 bg-slate-100">
                      <Lens zoomFactor={1.8} lensSize={140}>
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition duration-700"
                        />
                      </Lens>

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider border border-white/20">
                          {item.purpose}
                        </span>

                        <button
                          onClick={e => toggleSave(item.id, e)}
                          className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-red-400 transition pointer-events-auto border border-white/20"
                        >
                          <Heart size={16} className={isSaved ? 'fill-red-500 text-red-500' : ''} />
                        </button>
                      </div>

                      {/* Bottom Price Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                        <span className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-black text-sm shadow-lg shadow-blue-600/40">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        {item.virtualTour360Url && (
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                            360° Tour
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6">
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        {item.owner.isVerified && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <ShieldCheck size={12} /> Verified
                          </span>
                        )}
                      </div>

                      <Link href={`/proptis/property/${item.id}`}>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-500 transition line-clamp-1">
                          {item.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1">
                        <MapPin size={13} className="text-blue-500 flex-shrink-0" />
                        {item.location.area}, {item.location.city}
                      </p>

                      {/* Specs Row */}
                      <div className="grid grid-cols-3 gap-2 py-4 my-4 border-y border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-600 dark:text-zinc-400">
                        {item.bedrooms && (
                          <div>
                            <span className="font-bold text-zinc-900 dark:text-white block">{item.bedrooms} BHK</span>
                            <span className="text-[10px]">Bedrooms</span>
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-zinc-900 dark:text-white block">{item.areaSqFt}</span>
                          <span className="text-[10px]">Sq.Ft</span>
                        </div>
                        <div>
                          <span className="font-bold text-zinc-900 dark:text-white block">{item.facing}</span>
                          <span className="text-[10px]">Facing</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Footer CTAs */}
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
                    <Link
                      href={`/proptis/property/${item.id}`}
                      className="flex-1 py-2.5 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs rounded-xl transition text-center flex items-center justify-center gap-1"
                    >
                      View Details <ChevronRight size={14} />
                    </Link>

                    <button
                      onClick={() => openWhatsApp(item.title, item.owner.whatsapp)}
                      className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition shadow-lg shadow-emerald-600/30"
                      title="Direct Owner WhatsApp"
                    >
                      <PhoneCall size={16} />
                    </button>
                  </div>

                </motion.div>
              )
            })}
          </div>
        )}
      </section>

    </div>
  )
}
