'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Layers, Send, ChevronRight, Gem, Check } from 'lucide-react';
import { ProductGrid } from '@/components/store/ProductGrid';
import { CategoryFilter } from '@/components/store/CategoryFilter';
import { CustomDesignForm } from '@/components/store/CustomDesignForm';
import { ProcessShowcase } from '@/components/store/ProcessShowcase';
import { MasonryGallery } from '@/components/store/MasonryGallery';
import { YouTubeVideoShowcase } from '@/components/store/YouTubeVideoShowcase';
import { WhyHandmade } from '@/components/store/WhyHandmade';
import { HowItWorks } from '@/components/store/HowItWorks';
import { Testimonials } from '@/components/store/Testimonials';
import { LuxuryCTA } from '@/components/store/LuxuryCTA';
import { useCustomDesignStore } from '@/store/useCustomDesignStore';
import { useHandworkAdminStore } from '@/store/useHandworkAdminStore';
import { FilterState } from '@/types/store';

export default function HandworkStorePage() {
  const openCustomModal = useCustomDesignStore((state) => state.openModal);
  const products = useHandworkAdminStore((state) => state.products);

  // Filter State
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'All',
    priceRange: [0, 100000],
    occasion: 'All',
    size: 'All',
    customizableOnly: false,
    searchQuery: '',
    sortBy: 'featured'
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Dynamic Filtered Products Logic from Admin Store
  const filteredProducts = products.filter((product) => {
    if (filterState.category !== 'All' && product.category !== filterState.category) return false;
    if (filterState.customizableOnly && !product.customizable) return false;
    return true;
  }).sort((a, b) => {
    if (filterState.sortBy === 'price-low') return a.price - b.price;
    if (filterState.sortBy === 'price-high') return b.price - a.price;
    if (filterState.sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const customSteps = [
    { num: '01', title: 'Select Admin Frame', desc: 'Pick any frame piece uploaded from Admin Panel' },
    { num: '02', title: 'Upload Photo', desc: 'Instant local preview & high-res DB attachment' },
    { num: '03', title: 'Engrave Text', desc: 'Add personalized names, dates & custom vow snippets' },
    { num: '04', title: 'Place Order', desc: 'Automatic DB entry & instant WhatsApp quote' }
  ];

  return (
    <div className="space-y-0">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0A0A0E]">
        {/* Parallax / Glowing Ambient Backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#F3E5AB]/10 to-transparent blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E6C762] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Bespoke Handmade Resin Studio</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif text-[#F5F0EB] tracking-tight leading-[1.1]">
              Made For You. <br />
              <span className="handwork-gold-text">Never Made Twice.</span>
            </h1>

            <p className="text-base sm:text-xl text-[#9CA3AF] font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Premium handmade resin art, personalized frames and custom creations designed around your story. Every piece is handcrafted in India with patience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => openCustomModal()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-2xl hover:brightness-110 transition-all group"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Custom Design</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#collections"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/15 text-[#F5F0EB] font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-white/10 hover:border-[#D4AF37]/40 transition-all"
              >
                <span>Explore Collection</span>
              </a>
            </div>

            {/* Micro badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#9CA3AF]">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E6C762]" /> 100% Handmade Resin
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E6C762]" /> Custom Crafted To Order
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E6C762]" /> Worldwide Shipping
              </span>
            </div>
          </motion.div>

          {/* Right Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#121217]">
              <Image
                src={products[0]?.thumbnail || "/images/handwork/hero.jpg"}
                alt={products[0]?.title || "Royal Resin Frame"}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent opacity-60" />

              {/* Floating Glass Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 left-6 p-3.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20 text-xs text-[#F5F0EB] shadow-2xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-xl bg-[#D4AF37]/20 text-[#E6C762] flex items-center justify-center font-bold">
                  ✨
                </div>
                <div>
                  <span className="font-bold block text-[#E6C762]">100% Handmade</span>
                  <span className="text-[10px] text-[#9CA3AF]">Optical Epoxy Clarity</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-[#D4AF37]/40 text-xs text-[#F5F0EB] shadow-2xl flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#C5A059] text-black font-bold flex items-center justify-center">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-serif font-bold text-sm block text-[#F5F0EB]">
                    {products[0]?.title || "Royal Resin Frame"}
                  </span>
                  <span className="text-[11px] text-[#E6C762] font-semibold">
                    Custom Crafted • ₹{products[0]?.price.toLocaleString('en-IN') || '2,499'}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CUSTOM DESIGN — PRIMARY FEATURE */}
      <section id="custom-design" className="py-20 bg-[#070709] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E6C762] px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 inline-block">
              ✨ Primary Feature
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#F5F0EB]">
              Instant Custom Frame Studio
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] font-light leading-relaxed">
              Select a frame uploaded from our Admin Panel, upload your photo for real-time preview, and place your custom order directly.
            </p>
          </div>

          {/* Feature Roadmap Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {customSteps.map((st) => (
              <div
                key={st.num}
                className="p-6 rounded-2xl bg-[#0D0D12] border border-white/10 hover:border-[#D4AF37]/30 transition-all space-y-2 relative group"
              >
                <span className="text-xs font-bold text-[#E6C762] block">Step {st.num}</span>
                <h4 className="text-base font-bold font-serif text-[#F5F0EB] group-hover:text-[#E6C762] transition-colors">
                  {st.title}
                </h4>
                <p className="text-xs text-[#9CA3AF] font-light">{st.desc}</p>
              </div>
            ))}
          </div>

          {/* CUSTOM DESIGN BUILDER UI SECTION */}
          <div className="max-w-4xl mx-auto">
            <CustomDesignForm />
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section id="collections" className="py-20 bg-[#0A0A0E] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E6C762] block mb-2">
                Handcrafted Art Catalog
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#F5F0EB]">
                Signature Collection
              </h2>
            </div>
            <p className="text-xs text-[#9CA3AF] max-w-md font-light">
              Explore our handcrafted pieces managed directly from our Admin Studio. Every design can be customized with your names, photos, and date plaques.
            </p>
          </div>

          {/* Filters & Sorting */}
          <CategoryFilter
            filterState={filterState}
            onChange={setFilterState}
            categories={categories}
          />

          {/* Dynamic Product Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </section>

      {/* BEFORE -> AFTER CUSTOM PROCESS */}
      <ProcessShowcase />

      {/* GALLERY */}
      <MasonryGallery />

      {/* YOUTUBE CRAFT VIDEOS SHOWCASE */}
      <YouTubeVideoShowcase />

      {/* WHY HANDMADE */}
      <WhyHandmade />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* CUSTOMER REVIEWS */}
      <Testimonials />

      {/* CUSTOM REQUEST CTA */}
      <LuxuryCTA />

    </div>
  );
}
