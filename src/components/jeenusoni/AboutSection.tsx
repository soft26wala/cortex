"use client";

import React from "react";
import Image from "next/image";
import { Heart, Sparkles, Crown, MapPin, Award } from "lucide-react";
import { JeenuProfileData } from "@/lib/db";

interface AboutSectionProps {
  profile: JeenuProfileData;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#0A0507] via-[#12070D] to-[#0A0507]">
      {/* Subtle Background Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-900/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image Mosaic */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-[#E8C39E]/20 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
              <Image
                src={profile.coverImage || profile.profileImage || "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1600&auto=format&fit=crop"}
                alt="Jeenu Soni Lifestyle"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0507] via-transparent to-transparent opacity-70" />
            </div>

            {/* Overlapping Floating Quote Card */}
            <div className="absolute -bottom-8 -right-4 sm:-right-8 p-6 rounded-3xl bg-black/70 backdrop-blur-xl border border-rose-500/20 shadow-2xl max-w-xs space-y-2">
              <div className="flex items-center gap-2 text-[#E8C39E]">
                <Heart size={16} className="fill-rose-500 text-rose-500" />
                <span className="text-xs font-serif italic">Philosophy of Style</span>
              </div>
              <p className="text-xs text-rose-100 font-serif leading-relaxed italic">
                "True luxury is not just what you wear, but the feeling of passion, creative expression, and grace you carry every day."
              </p>
              <div className="text-[10px] font-mono text-zinc-400">— Jeenu Soni</div>
            </div>
          </div>

          {/* Right Column: Bio Details & Highlights */}
          <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/20 text-[11px] font-mono uppercase tracking-widest text-[#E8C39E]">
                <Crown size={12} className="text-[#D4AF37]" />
                About Jeenu Soni
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                Curating Elegance, <span className="bg-gradient-to-r from-[#FCE7D4] to-[#E8C39E] bg-clip-text text-transparent">Design Vlogs</span> & High-Fashion
              </h2>
            </div>

            <p className="text-zinc-300 text-base leading-relaxed font-light font-sans">
              {profile.bio ||
                "Jeenu Soni is a professional digital creator and design vlogger based in Gajsinghpur. Known for her refined aesthetic taste, cinematic vlog storytelling, and high-converting brand partnerships, she brings a sophisticated touch to luxury fashion, creative production, and personal branding."}
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-rose-400/30 transition-all space-y-1.5">
                <Sparkles size={18} className="text-[#E8C39E]" />
                <div className="text-sm font-serif font-bold text-white">Design Vlogs</div>
                <div className="text-xs text-zinc-400 leading-normal">
                  Engaging video stories capturing travel, style, and fashion aesthetics.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-rose-400/30 transition-all space-y-1.5">
                <Crown size={18} className="text-amber-400" />
                <div className="text-sm font-serif font-bold text-white">Creative Profession</div>
                <div className="text-xs text-zinc-400 leading-normal">
                  High-converting campaigns for luxury & lifestyle brand collaborations.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-rose-400/30 transition-all space-y-1.5">
                <MapPin size={18} className="text-rose-400" />
                <div className="text-sm font-serif font-bold text-white">City Base</div>
                <div className="text-xs text-zinc-400 leading-normal">
                  {profile.location || "Gajsinghpur, Rajasthan • Digital Creator"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
