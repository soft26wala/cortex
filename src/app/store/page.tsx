'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Store, Gem, PackageCheck, Compass, ShieldCheck } from 'lucide-react';
import { STORE_CATEGORIES } from '@/data/storeCategories';

export default function StoreHubPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0E] text-[#F5F0EB] font-sans selection:bg-[#D4AF37] selection:text-black">



      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0E] via-[#050508] to-[#0A0A0E] overflow-hidden">

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#E6C762] uppercase tracking-widest">
            <Store className="w-4 h-4" />
            <span>CortexStack Store Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold font-serif tracking-tight text-[#F5F0EB]">
            Discover Premium <br />
            <span className="handwork-gold-text">Craftsmanship & Design</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9CA3AF] font-light max-w-2xl mx-auto leading-relaxed">
            Welcome to the CortexStack Store Ecosystem. Explore verified artisan storefronts, bespoke custom designs, and luxury physical and digital creations.
          </p>
        </div>
      </section>

      {/* Store Categories Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10 text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#F5F0EB]">
            Explore Store Categories
          </h2>
          <p className="text-xs text-[#9CA3AF]">
            Select a specialized storefront to begin your customized shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STORE_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -6 }}
              className={`rounded-3xl border overflow-hidden transition-all duration-500 flex flex-col justify-between ${cat.active
                ? 'bg-[#0D0D12] border-[#D4AF37]/40 shadow-2xl hover:border-[#D4AF37]'
                : 'bg-[#0D0D12]/50 border-white/10 opacity-75'
                }`}
            >
              <div className="relative aspect-[4/3] w-full bg-[#121217]">
                <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-transparent to-transparent opacity-80" />

                <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cat.active
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-black/60 text-[#9CA3AF] border-white/20'
                  }`}>
                  {cat.badge}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#F5F0EB]">{cat.name}</h3>
                  <p className="text-xs text-[#9CA3AF] font-light mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  {cat.active ? (
                    <Link
                      href={`/store/${cat.slug}`}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Enter Storefront</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[#9CA3AF] font-semibold text-xs uppercase cursor-not-allowed text-center"
                    >
                      Launching Soon
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs text-[#9CA3AF]">
        <p>© {new Date().getFullYear()} CortexStack Store System. Scalable Multi-Category Architecture.</p>
      </footer>
    </div>
  );
}
