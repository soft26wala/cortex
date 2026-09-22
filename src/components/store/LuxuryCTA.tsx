'use client';

import React from 'react';
import { Sparkles, Send, ArrowRight } from 'lucide-react';
import { useCustomDesignStore } from '@/store/useCustomDesignStore';

export const LuxuryCTA: React.FC = () => {
  const openCustomModal = useCustomDesignStore((state) => state.openModal);

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=${encodeURIComponent('Hello! I have a custom design idea for a handmade resin piece.')}`;

  return (
    <section className="py-24 bg-gradient-to-b from-[#0A0A0E] via-[#050508] to-[#0A0A0E] border-t border-white/10 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#E6C762] text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Bespoke Handmade Studio</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-[#F5F0EB] leading-tight max-w-3xl mx-auto">
          Have Something Special In Your Mind?
        </h2>

        <p className="text-base sm:text-lg text-[#9CA3AF] font-light max-w-2xl mx-auto leading-relaxed">
          Send us your photo, bouquet, or custom concept idea. We'll craft it into a handmade resin artwork you can keep forever.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => openCustomModal()}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-2xl hover:brightness-110 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Custom Design</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#25D366]/30 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#9CA3AF]">
          <span>✨ 100% Guaranteed Custom Craftsmanship</span>
          <span>•</span>
          <span>📦 Insured Crate Delivery India-wide</span>
          <span>•</span>
          <span>💬 Direct Artist WhatsApp Support</span>
        </div>
      </div>
    </section>
  );
};
