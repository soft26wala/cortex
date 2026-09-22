'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { HANDWORK_REVIEWS } from '@/data/handworkProducts';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#070709] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E6C762]">
            Client Stories & Love
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#F5F0EB]">
            Loved By Couples, Families & Art Collectors
          </h2>
          <p className="text-sm text-[#9CA3AF] font-light">
            Read how custom resin pieces turned cherished memories into eternal heirlooms.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HANDWORK_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-[#0D0D12] border border-white/10 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between space-y-6 shadow-xl relative"
            >
              <Quote className="w-8 h-8 text-[#D4AF37]/20 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#E6C762]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E6C762]" />
                  ))}
                </div>

                <p className="text-sm text-[#F5F0EB]/90 font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                {rev.avatar ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]/30 shrink-0">
                    <Image src={rev.avatar} alt={rev.author} fill unoptimized className="object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#E6C762] font-bold text-xs shrink-0">
                    {rev.author.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-[#F5F0EB] font-serif flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                  </h4>
                  <p className="text-[11px] text-[#9CA3AF]">{rev.productTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
