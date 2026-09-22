'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Gem, Check, Layers, Scissors, Feather, Award } from 'lucide-react';
import { FASHION_PRODUCTS, FASHION_REVIEWS } from '@/data/fashionProducts';
import { ProductCard } from '@/components/store/ProductCard';
import { ProductGrid } from '@/components/store/ProductGrid';
import { CategoryFilter } from '@/components/store/CategoryFilter';
import { CustomDesignForm } from '@/components/store/CustomDesignForm';
import { Testimonials } from '@/components/store/Testimonials';
import { LuxuryCTA } from '@/components/store/LuxuryCTA';
import { useCustomDesignStore } from '@/store/useCustomDesignStore';
import { FilterState } from '@/types/store';

export default function FashionStorePage() {
  const openCustomModal = useCustomDesignStore((state) => state.openModal);

  const [filterState, setFilterState] = useState<FilterState>({
    category: 'All',
    priceRange: [0, 50000],
    occasion: 'All',
    size: 'All',
    customizableOnly: false,
    searchQuery: '',
    sortBy: 'featured'
  });

  const categories = Array.from(new Set(FASHION_PRODUCTS.map((p) => p.category)));

  const filteredProducts = FASHION_PRODUCTS.filter((product) => {
    if (filterState.category !== 'All' && product.category !== filterState.category) return false;
    if (filterState.customizableOnly && !product.customizable) return false;
    return true;
  }).sort((a, b) => {
    if (filterState.sortBy === 'price-low') return a.price - b.price;
    if (filterState.sortBy === 'price-high') return b.price - a.price;
    if (filterState.sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const artisanStorySteps = [
    { title: 'Varanasi Zari Looms', desc: 'Handloomed pure Katan Mulberry silk woven with tested 24K gold Zari.' },
    { title: 'Kashmiri Pashmina Spinners', desc: 'Grade-A 14.5 micron Changthangi Cashmere hand-embroidered with needle Sozni.' },
    { title: 'Lucknow Chikankari Crafts', desc: 'Shadow-work Bakhiya embroidery on crisp silk organza and muslin.' },
    { title: 'Bespoke Royal Tailoring', desc: 'Custom master tailoring with personalized padded blouse and sherwani fittings.' }
  ];

  return (
    <div className="space-y-0 bg-[#070D0B] text-[#F5F0EB]">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070D0B]">
        {/* Ambient Emerald & Gold Backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-gradient-to-tr from-[#0F382C]/30 via-[#D4AF37]/15 to-transparent blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E6C762] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Handwoven Heritage & Bespoke Couture</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif text-[#F5F0EB] tracking-tight leading-[1.1]">
              Woven By History. <br />
              <span className="handwork-gold-text">Tailored For You.</span>
            </h1>

            <p className="text-base sm:text-xl text-[#9CA3AF] font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Handloomed Banarasi silks, certified Kashmiri Pashminas, and bespoke hand-embroidered Zardozi couture. Crafted by master Indian weavers and tailored to your exact measurements.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => openCustomModal('Bespoke Silk Outfit')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-2xl hover:brightness-110 transition-all group"
              >
                <Scissors className="w-4 h-4" />
                <span>Request Bespoke Order</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#fashion-collection"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/15 text-[#F5F0EB] font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-white/10 hover:border-[#D4AF37]/40 transition-all"
              >
                <span>Explore Heritage Weaves</span>
              </a>
            </div>

            {/* Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#9CA3AF]">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E6C762]" /> 100% Certified Mulberry Silk
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E6C762]" /> GI Tagged Authentic Weaves
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E6C762]" /> Bespoke Fitting Guarantee
              </span>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#0F1E19]">
              <Image
                src="/images/fashion/saree.jpg"
                alt="Royal Banarasi Kadwa Zari Saree"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D0B] via-transparent to-transparent opacity-60" />

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 left-6 p-3.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20 text-xs text-[#F5F0EB] shadow-2xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-xl bg-[#D4AF37]/20 text-[#E6C762] flex items-center justify-center font-bold">
                  👑
                </div>
                <div>
                  <span className="font-bold block text-[#E6C762]">Heritage Weave</span>
                  <span className="text-[10px] text-[#9CA3AF]">Pure Gold Zari Brocade</span>
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
                  <span className="font-serif font-bold text-sm block text-[#F5F0EB]">Banarasi Kadwa Zari</span>
                  <span className="text-[11px] text-[#E6C762] font-semibold">₹18,999 • Pure Katan Silk</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Artisan Heritage Story Cards */}
      <section className="py-16 bg-[#040807] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E6C762]">
              Centuries Of Craftsmanship
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#F5F0EB]">
              Master Indian Weavers & Artisans
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artisanStorySteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0B1411] border border-white/10 hover:border-[#D4AF37]/40 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E6C762] flex items-center justify-center font-bold text-sm font-serif">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold font-serif text-[#F5F0EB]">{step.title}</h3>
                <p className="text-xs text-[#9CA3AF] font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Apparel Collection */}
      <section id="fashion-collection" className="py-20 bg-[#070D0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E6C762] block mb-2">
                Pure Silk & Pashmina Collection
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#F5F0EB]">
                Signature Weaves & Couture
              </h2>
            </div>
            <p className="text-xs text-[#9CA3AF] max-w-md font-light">
              Explore handloomed silk sarees, Kashmiri Pashmina shawls, and bespoke zardozi bridal sherwanis.
            </p>
          </div>

          {/* Filters */}
          <CategoryFilter
            filterState={filterState}
            onChange={setFilterState}
            categories={categories}
          />

          {/* Products Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </section>

      {/* Bespoke Tailoring Customizer Section */}
      <section className="py-20 bg-[#040807] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E6C762]">
              Personalized Tailoring Studio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#F5F0EB]">
              Need Bespoke Sizing & Blouse Stitching?
            </h2>
            <p className="text-sm text-[#9CA3AF] font-light">
              Submit your measurements or design ideas for custom Zardozi embroidery and tailored fitting.
            </p>
          </div>

          <CustomDesignForm initialProductType="Banarasi Saree & Blouse" />
        </div>
      </section>

      {/* Reviews */}
      <Testimonials />

      {/* Luxury CTA */}
      <LuxuryCTA />
    </div>
  );
}
