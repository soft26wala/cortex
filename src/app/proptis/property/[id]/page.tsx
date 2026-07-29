'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, MapPin, Bed, Bath, Maximize2, ShieldCheck,
  PhoneCall, Mail, Share2, Heart, Calculator, Compass,
  CheckCircle2, Sparkles, Printer, Download, Eye, Layers, ExternalLink
} from 'lucide-react'
import { INITIAL_PROPERTIES } from '@/lib/proptisStore'
import { PropertyItem } from '@/types/proptis'

export default function SinglePropertyPage() {
  const params = useParams()
  const router = useRouter()
  const propertyId = params.id as string

  const property: PropertyItem =
    INITIAL_PROPERTIES.find(p => p.id === propertyId) || INITIAL_PROPERTIES[0]

  const [activeImage, setActiveImage] = useState<string>(property.coverImage)
  const [activeTab, setActiveTab] = useState<'photos' | 'virtual360' | 'map'>('photos')
  const [isSaved, setIsSaved] = useState<boolean>(false)

  // EMI Calculator State
  const [downPayment, setDownPayment] = useState<number>(Math.round(property.price * 0.2))
  const [interestRate, setInterestRate] = useState<number>(8.5)
  const [loanYears, setLoanYears] = useState<number>(20)

  // EMI Math Calculation
  const loanAmount = property.price - downPayment
  const monthlyRate = interestRate / 12 / 100
  const totalMonths = loanYears * 12
  const emi =
    monthlyRate > 0
      ? Math.round(
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0

  const openWhatsApp = () => {
    property.analytics.whatsappClicks += 1
    const msg = `Hi ${property.owner.name}, I am interested in your property "${property.title}" listed on Proptis.`
    window.open(`https://wa.me/${property.owner.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const openCall = () => {
    property.analytics.callClicks += 1
    window.open(`tel:${property.owner.phone}`, '_self')
  }

  return (
    <div className="min-h-screen dark:bg-[#050507] bg-slate-50 text-zinc-900 dark:text-zinc-100 font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/proptis"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
          >
            <ArrowLeft size={16} /> Back to Proptis
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-red-500 transition shadow-sm"
            >
              <Heart size={16} className={isSaved ? 'fill-red-500 text-red-500' : ''} />
            </button>
            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition shadow-sm"
              title="Print Brochure"
            >
              <Printer size={16} />
            </button>
          </div>
        </div>

        {/* Property Title & Meta Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] font-extrabold uppercase tracking-wider">
                {property.category} • {property.purpose}
              </span>
              {property.owner.isVerified && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck size={13} /> Verified Cortex Owner
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">{property.title}</h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
              <MapPin size={15} className="text-blue-500 flex-shrink-0" />
              {property.location.houseNumber}, {property.location.locality}, {property.location.area}, {property.location.city}, {property.location.state}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400">₹{property.price.toLocaleString('en-IN')}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold mt-1">₹{(property.pricePerSqFt || 0).toLocaleString('en-IN')} / Sq.Ft</p>
          </div>
        </div>

        {/* Grid Layout: Main Media & Sticky Owner Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Gallery, Specs, Description */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Gallery Component */}
            <div className="dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 shadow-xl overflow-hidden">
              <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden dark:bg-zinc-950 bg-slate-100 mb-4">
                {activeTab === 'photos' && (
                  <img
                    src={activeImage}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {activeTab === 'virtual360' && (
                  <div className="w-full h-full flex flex-col items-center justify-center dark:bg-zinc-950 bg-slate-200 p-8 text-center">
                    <Compass size={48} className="text-emerald-500 animate-spin mb-4" />
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">360° Virtual Tour Experience</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mt-1 mb-4">
                      Simulated Matterport 3D spatial tour. Walk through rooms, measure dimensions, and explore lawn architecture.
                    </p>
                    <button
                      onClick={() => setActiveTab('photos')}
                      className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg"
                    >
                      Return to Photo Gallery
                    </button>
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveImage(img)
                      setActiveTab('photos')
                    }}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                      activeImage === img && activeTab === 'photos'
                        ? 'border-blue-500 scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Specs Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center shadow-sm">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Bedrooms</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">{property.bedrooms} BHK</span>
              </div>
              <div className="p-4 dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center shadow-sm">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Carpet Area</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">{property.areaSqFt} Sq.Ft</span>
              </div>
              <div className="p-4 dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center shadow-sm">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Facing</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">{property.facing}</span>
              </div>
              <div className="p-4 dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center shadow-sm">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Furnishing</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">{property.furnishing}</span>
              </div>
            </div>

            {/* Description */}
            <div className="dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Property Description</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">{property.description}</p>
            </div>

            {/* Amenities Grid */}
            <div className="dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map(a => (
                  <div key={a} className="p-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EMI Mortgage Calculator */}
            <div className="dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <Calculator size={20} className="text-blue-500" /> EMI & Mortgage Calculator
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Down Payment (₹)</label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={e => setDownPayment(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={e => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Tenure (Years)</label>
                  <input
                    type="number"
                    value={loanYears}
                    onChange={e => setLoanYears(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="p-6 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500">Estimated Monthly EMI</p>
                  <p className="text-2xl font-black text-blue-600 dark:text-blue-400">₹{emi.toLocaleString('en-IN')} / mo</p>
                </div>
                <div className="text-right text-xs text-zinc-500">
                  <p>Loan Amount: ₹{loanAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Verified Owner Contact Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-6">
              
              <div className="flex items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <img
                  src={property.owner.avatar}
                  alt={property.owner.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700"
                />
                <div>
                  <p className="text-base font-bold text-zinc-900 dark:text-white">{property.owner.name}</p>
                  <p className="text-xs text-zinc-500">{property.owner.agency}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mt-1">
                    <ShieldCheck size={12} /> Cortex Auth Verified
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={openWhatsApp}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-95"
                >
                  <PhoneCall size={16} /> Direct WhatsApp Chat
                </button>

                <button
                  onClick={openCall}
                  className="w-full py-3.5 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
                >
                  <PhoneCall size={16} /> Call {property.owner.phone}
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
                Protected by Cortex Auth System. No brokers or third-party spam.
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
