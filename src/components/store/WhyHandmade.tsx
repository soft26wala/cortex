'use client';

import React from 'react';
import { Sparkles, Heart, ShieldCheck, Gem, Feather, Layers } from 'lucide-react';

const FEATURES = [
  {
    icon: Gem,
    title: '100% Handmade',
    description: 'Every piece is carefully poured, layered, and polished by hand by our master resin artisan.'
  },
  {
    icon: Heart,
    title: 'Made For You',
    description: 'Every custom order is designed uniquely around your names, dates, memories and aesthetic preferences.'
  },
  {
    icon: ShieldCheck,
    title: 'Premium Materials',
    description: 'We use optical-grade UV resistant resin, 24K real gold leaf, and preserved natural flowers.'
  },
  {
    icon: Feather,
    title: 'Unique By Nature',
    description: 'No two handmade resin pieces are ever identical. Organic flower placement creates a true one-of-one.'
  }
];

export const WhyHandmade: React.FC = () => {
  return (
    <section className="py-20 bg-[#050508] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E6C762]">
            Artisan Value & Craftsmanship
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#F5F0EB]">
            Why Order A Handmade Piece?
          </h2>
          <p className="text-sm text-[#9CA3AF] font-light">
            Mass-produced factory decor fades. Handmade resin art carries your personal story forever.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#0D0D12] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 shadow-xl group flex flex-col justify-between space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37]/30 to-[#0A0A0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#E6C762] group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-serif text-[#F5F0EB] group-hover:text-[#E6C762] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] font-light leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-[#E6C762] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Artisan Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
