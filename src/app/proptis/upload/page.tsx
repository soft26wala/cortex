'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Check, ChevronRight, UploadCloud, MapPin, Building,
  Sliders, ShieldCheck, Sparkles, Image as ImageIcon, Video, FileText,
  Search, Info, Eye, CheckCircle2, Save
} from 'lucide-react'
import { ALL_AMENITIES, INITIAL_PROPERTIES } from '@/lib/proptisStore'
import { PropertyCategory, PropertyPurpose, FurnishingStatus } from '@/types/proptis'
import { useSessionStore } from '@/store/session.store'

export default function UploadPropertyPage() {
  const router = useRouter()
  const { user } = useSessionStore()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Step 1: Basic Info
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<PropertyCategory>('Luxury Villas')
  const [purpose, setPurpose] = useState<PropertyPurpose>('For Sale')

  // Step 2: Property Specs & Price
  const [price, setPrice] = useState<string>('25000000')
  const [areaSqFt, setAreaSqFt] = useState<string>('3500')
  const [bedrooms, setBedrooms] = useState<number>(4)
  const [bathrooms, setBathrooms] = useState<number>(4)
  const [balcony, setBalcony] = useState<number>(2)
  const [kitchen, setKitchen] = useState<number>(1)
  const [parking, setParking] = useState<number>(2)
  const [facing, setFacing] = useState<string>('North-East')
  const [floor, setFloor] = useState<number>(1)
  const [totalFloors, setTotalFloors] = useState<number>(3)
  const [propertyAgeYears, setPropertyAgeYears] = useState<number>(1)
  const [furnishing, setFurnishing] = useState<FurnishingStatus>('Furnished')
  const [description, setDescription] = useState('')

  // Step 3: Location (Manual Map Pin)
  const [country, setCountry] = useState('India')
  const [state, setState] = useState('Punjab')
  const [district, setDistrict] = useState('Jalandhar')
  const [city, setCity] = useState('Jalandhar')
  const [area, setArea] = useState('Model Town')
  const [locality, setLocality] = useState('Green Park Avenue')
  const [pincode, setPincode] = useState('144003')
  const [landmark, setLandmark] = useState('Near Club House')
  const [street, setStreet] = useState('Avenue 4')
  const [houseNumber, setHouseNumber] = useState('Villa #12')
  const [latitude, setLatitude] = useState<number>(31.326)
  const [longitude, setLongitude] = useState<number>(75.576)

  // Step 4: Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Swimming Pool', 'Lift', 'Gym', 'Power Backup', 'Security', 'CCTV', 'EV Charging'
  ])
  const [amenitySearch, setAmenitySearch] = useState('')

  // Step 5: Images & Media
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop'
  )
  const [imageUrls, setImageUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  ])
  const [virtualTour360Url, setVirtualTour360Url] = useState('')
  const [floorPlanUrl, setFloorPlanUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  // Step 6: SEO
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [keywords, setKeywords] = useState('luxury villa, real estate, property for sale')

  const toggleAmenity = (name: string) => {
    setSelectedAmenities(prev =>
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    )
  }

  const handleNext = () => {
    if (currentStep < 7) setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1)
  }

  const handlePublish = (status: 'Published' | 'Draft') => {
    setIsSubmitting(true)

    setTimeout(() => {
      const newProp = {
        id: `prop-${Date.now()}`,
        ownerId: user?.id || 'cortex-user-1',
        title: title || 'New Luxury Estate Property',
        slug: (title || 'new-property').toLowerCase().replace(/\s+/g, '-'),
        category,
        purpose,
        price: Number(price) || 25000000,
        currency: '₹',
        pricePerSqFt: Math.round((Number(price) || 25000000) / (Number(areaSqFt) || 3500)),
        areaSqFt: Number(areaSqFt) || 3500,
        bedrooms,
        bathrooms,
        balcony,
        kitchen,
        parking,
        facing,
        floor,
        totalFloors,
        propertyAgeYears,
        furnishing,
        description: description || 'Beautiful luxury estate property verified by Cortex Web Solutions.',
        location: {
          country, state, district, city, area, locality, pincode, landmark, street, houseNumber,
          latitude, longitude,
        },
        amenities: selectedAmenities,
        images: imageUrls,
        coverImage: coverImage || imageUrls[0],
        virtualTour360Url,
        floorPlanUrl,
        videoUrl,
        metaTitle: metaTitle || `${title} | Proptis Real Estate`,
        metaDescription: metaDescription || `Explore ${title} in ${city}.`,
        keywords: keywords.split(',').map(k => k.trim()),
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFeatured: true,
        isVerified: true,
        analytics: {
          views: 1,
          dailyViews: [1],
          monthlyViews: [1],
          whatsappClicks: 0,
          callClicks: 0,
          emailClicks: 0,
        },
        owner: {
          id: user?.id || 'cortex-user-1',
          name: user?.name || 'Verified Cortex Owner',
          email: user?.email || 'owner@cortexsolutions.com',
          phone: '+91 63769 30459',
          whatsapp: '916376930459',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
          agency: 'Cortex Realty Partner',
          isVerified: true,
        },
      }

      INITIAL_PROPERTIES.unshift(newProp as any)
      setIsSubmitting(false)
      router.push('/proptis')
    }, 1000)
  }

  const filteredAmenitiesList = ALL_AMENITIES.filter(a =>
    a.toLowerCase().includes(amenitySearch.toLowerCase())
  )

  const stepsList = [
    '1. Basic Info', '2. Specs & Price', '3. Location',
    '4. Amenities', '5. Images & Media', '6. SEO', '7. Publish'
  ]

  return (
    <div className="min-h-screen dark:bg-[#050507] bg-slate-50 text-zinc-900 dark:text-zinc-100 font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <Link
            href="/proptis"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
          >
            <ArrowLeft size={16} /> Back to Proptis
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
            <Sparkles size={14} /> Multi-Step Property Wizard
          </div>
        </div>

        {/* ── STEP PROGRESS INDICATOR ────────────────────────────────────────── */}
        <div className="mb-10 overflow-x-auto pb-4">
          <div className="flex items-center justify-between min-w-[600px] gap-2">
            {stepsList.map((st, idx) => {
              const stepNum = idx + 1
              const isActive = currentStep === stepNum
              const isDone = currentStep > stepNum
              return (
                <div key={st} className="flex-1 flex items-center">
                  <div
                    onClick={() => setCurrentStep(stepNum)}
                    className={`cursor-pointer px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : isDone
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-200 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                    }`}
                  >
                    {isDone ? <Check size={14} /> : <span>{stepNum}</span>}
                    <span className="truncate">{st.split('. ')[1]}</span>
                  </div>
                  {idx < stepsList.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-1 ${isDone ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── FORM STEP CARD CONTAINER ───────────────────────────────────────── */}
        <div className="dark:bg-zinc-900/90 bg-white border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {/* STEP 1: BASIC INFO */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">
                Step 1: Basic Property Information
              </h2>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Property Title / Headline *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Royal Golf Villa with Private Pool & Lawn"
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                    Property Category *
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {['Luxury Villas', 'Apartments', 'Commercial Buildings', 'Land', 'Farm Houses', 'Penthouse'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                    Listing Purpose *
                  </label>
                  <select
                    value={purpose}
                    onChange={e => setPurpose(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {['For Sale', 'For Rent', 'Commercial', 'PG', 'Agriculture'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SPECS & PRICE */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">
                Step 2: Pricing & Specifications
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                    Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="25000000"
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                    Carpet Area (Sq.Ft) *
                  </label>
                  <input
                    type="number"
                    value={areaSqFt}
                    onChange={e => setAreaSqFt(e.target.value)}
                    placeholder="3500"
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={e => setBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={e => setBathrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">Balconies</label>
                  <input
                    type="number"
                    value={balcony}
                    onChange={e => setBalcony(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">Furnishing</label>
                  <select
                    value={furnishing}
                    onChange={e => setFurnishing(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white text-xs"
                  >
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Detailed Property Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the highlight features, interior architecture, lawn size, and nearby connectivity..."
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 3: LOCATION (MAP PIN) */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3 flex items-center justify-between">
                <span>Step 3: Property Address & Map Pin</span>
                <span className="text-xs font-normal text-blue-500 flex items-center gap-1">
                  <MapPin size={14} /> Manual Coordinates
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">Area / Suburb</label>
                  <input
                    type="text"
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-xs"
                  />
                </div>
              </div>

              {/* Manual Lat Long Adjuster */}
              <div className="p-4 bg-slate-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
                <p className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <MapPin size={14} className="text-blue-500" /> Manual Map Coordinate Adjuster
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-zinc-500 mb-1">Latitude</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={latitude}
                      onChange={e => setLatitude(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-500 mb-1">Longitude</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={longitude}
                      onChange={e => setLongitude(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: AMENITIES */}
          {currentStep === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Step 4: Select Amenities ({selectedAmenities.length} selected)
                </h2>
                <div className="relative w-48">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={amenitySearch}
                    onChange={e => setAmenitySearch(e.target.value)}
                    placeholder="Search amenity..."
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-96 overflow-y-auto pr-2">
                {filteredAmenitiesList.map(a => {
                  const isChecked = selectedAmenities.includes(a)
                  return (
                    <button
                      key={a}
                      onClick={() => toggleAmenity(a)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition flex items-center justify-between border ${
                        isChecked
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20'
                          : 'bg-slate-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      <span className="truncate">{a}</span>
                      {isChecked && <Check size={13} className="flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 5: MEDIA & 360 */}
          {currentStep === 5 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">
                Step 5: Media & 360° Virtual Tour Links
              </h2>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Main Cover Image URL *
                </label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={e => setCoverImage(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  360° Virtual Tour Embed / Link (Optional)
                </label>
                <input
                  type="text"
                  value={virtualTour360Url}
                  onChange={e => setVirtualTour360Url(e.target.value)}
                  placeholder="https://my.matterport.com/show/..."
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 6: SEO */}
          {currentStep === 6 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">
                Step 6: Search Engine Optimization (SEO)
              </h2>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={e => setMetaTitle(e.target.value)}
                  placeholder={title ? `${title} | Proptis` : 'Luxury Villa in Jalandhar'}
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 7: PUBLISH / DRAFT */}
          {currentStep === 7 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Ready to Publish Listing!</h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                Your listing will be verified by Cortex Web Solutions authentication engine and instantly listed across Proptis real estate portal.
              </p>

              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => handlePublish('Draft')}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs rounded-xl transition"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => handlePublish('Published')}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  {isSubmitting ? 'Publishing…' : 'Publish Property Now'}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP NAVIGATION BUTTONS */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition ${
                currentStep === 1
                  ? 'opacity-40 cursor-not-allowed text-zinc-400'
                  : 'bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              Back
            </button>

            {currentStep < 7 && (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
              >
                Continue <ChevronRight size={14} />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
