'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useCustomDesignStore } from '@/store/useCustomDesignStore';

const TIMELINE_STEPS = [
  {
    num: '01',
    title: 'Choose Or Request Custom Design',
    desc: 'Browse our Signature Collection or submit your own concept via our Custom Design builder.'
  },
  {
    num: '02',
    title: 'Share Photos / Ideas',
    desc: 'Upload reference images, wedding bouquets, or names & dates to customize your piece.'
  },
  {
    num: '03',
    title: 'Design Concept Preview',
    desc: 'Our master artist sends a visual layout preview on WhatsApp before pouring the resin.'
  },
  {
    num: '04',
    title: 'Handcrafting & Curing',
    desc: 'Multi-layer pouring with optical UV resin and natural gold/floral inclusions over 3-5 days.'
  },
  {
    num: '05',
    title: 'Quality Check & Polishing',
    desc: 'Diamond bevel polishing, crystal clarity check, and anti-yellowing sealant application.'
  },
  {
    num: '06',
    title: 'Secure Crate Packaging & Delivery',
    desc: 'Packed in wooden presentation crates with transit insurance delivered directly to your doorstep.'
  }
];

export const HowItWorks: React.FC = () => {
  const openCustomModal = useCustomDesignStore((state) => state.openModal);

  return (
    <section id="how-it-works" className="py-20 bg-[#0A0A0E] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E6C762]">
            Seamless Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#F5F0EB]">
            How Your Handmade Piece Is Crafted
          </h2>
          <p className="text-sm text-[#9CA3AF] font-light">
            A transparent 6-step journey from your initial idea to your final delivered artwork.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {TIMELINE_STEPS.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-[#0D0D12] border border-white/10 hover:border-[#D4AF37]/30 transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold font-serif text-[#E6C762]">
                  {step.num}
                </span>
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-[#9CA3AF]">
                  ✓
                </span>
              </div>
              <h3 className="text-base font-bold font-serif text-[#F5F0EB] group-hover:text-[#E6C762] transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-[#9CA3AF] font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openCustomModal()}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-xl hover:brightness-110 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create My Piece</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
