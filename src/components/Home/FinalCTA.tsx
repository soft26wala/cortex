"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, PhoneCall } from "lucide-react";
import Link from "next/link";

const FinalCTA = () => {
  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-noise">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0B0B0B] border border-white/[0.1] p-10 md:p-16 text-center shadow-[0_30px_100px_rgba(108,99,255,0.2)] relative overflow-hidden">
          
          {/* Animated Background Mesh Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/20 via-[#00D4FF]/10 to-[#4ADE80]/10 opacity-50 blur-3xl pointer-events-none animate-pulse-glow" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-white/[0.08] text-[#00D4FF] text-xs font-semibold uppercase tracking-widest">
              <Sparkles size={14} className="animate-spin text-[#6C63FF]" />
              Ready To Scale Your Enterprise?
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Build Your $100k Custom SaaS Platform With Cortex
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
              Schedule an executive strategy session today and see how our Next.js & AI software architecture can transform your revenue.
            </p>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-sm rounded-full shadow-[0_0_30px_rgba(108,99,255,0.4)] hover:shadow-[0_0_45px_rgba(0,212,255,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-2"
              >
                <Zap size={18} />
                Request Custom Proposal <ArrowRight size={18} />
              </Link>

              <Link
                href="/Service"
                className="px-8 py-4 bg-[#111111] hover:bg-[#181818] text-white font-semibold text-sm rounded-full border border-white/[0.08] transition-all"
              >
                Browse All Services
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
