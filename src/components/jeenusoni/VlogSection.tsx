"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Film, Calendar, Instagram } from "lucide-react";
import { JeenuVlogData } from "@/lib/db";

interface VlogSectionProps {
  vlogs: JeenuVlogData[];
  onSelectVlog: (vlog: JeenuVlogData) => void;
}

export default function VlogSection({ vlogs, onSelectVlog }: VlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(vlogs.map((v) => v.category)))];

  const filteredVlogs = selectedCategory === "All"
    ? vlogs
    : vlogs.filter((v) => v.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="vlog-section" className="py-24 px-4 relative bg-[#060204]">
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-rose-950/20 blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto max-w-6xl relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-rose-500/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/20 text-xs font-mono uppercase tracking-widest text-[#E8C39E]">
              <Film size={14} className="text-rose-400" />
              Instagram Vlogs & Reels (@jot_soni_0_0)
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Jeenu Soni <span className="bg-gradient-to-r from-[#FCE7D4] to-[#E8C39E] bg-clip-text text-transparent">Vlog & Reel Collection</span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl font-light">
              Watch official design vlogs, Instagram reels (@jot_soni_0_0), luxury staycation stories, and lifestyle diaries.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] border border-[#E8C39E]/50 shadow-[0_0_15px_rgba(232,195,158,0.2)]"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vlogs Cards Grid */}
        {filteredVlogs.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3">
            <Film size={32} className="mx-auto text-zinc-600" />
            <div className="text-lg font-serif text-zinc-300">No vlogs found in this category</div>
            <p className="text-xs text-zinc-500">Check back soon for new content uploads.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVlogs.map((vlog) => {
              const isInstagram = vlog.videoUrl.includes("instagram.com");
              return (
                <div
                  key={vlog.id}
                  onClick={() => onSelectVlog(vlog)}
                  className="group cursor-pointer rounded-3xl bg-white/[0.02] border border-rose-500/10 hover:border-rose-400/30 overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(139,0,50,0.2)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Container */}
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                      <Image
                        src={vlog.thumbnail || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop"}
                        alt={vlog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                      {/* Category Tag */}
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#E8C39E] border border-white/10 flex items-center gap-1">
                        {isInstagram && <Instagram size={12} className="text-[#E1306C]" />}
                        {vlog.category}
                      </span>

                      {/* Instagram Reel Badge */}
                      {isInstagram && (
                        <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-gradient-to-r from-[#E1306C] to-[#F56040] text-white shadow-md">
                          @jot_soni_0_0
                        </span>
                      )}

                      {/* Hover Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ${
                          isInstagram
                            ? "bg-gradient-to-tr from-[#E1306C] via-[#FD1D1D] to-[#F56040] text-white shadow-[0_0_25px_rgba(225,48,108,0.8)]"
                            : "bg-rose-600/90 text-white shadow-[0_0_25px_rgba(225,48,108,0.8)]"
                        }`}>
                          {isInstagram ? <Instagram size={24} /> : <Play size={24} className="fill-current ml-1" />}
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#FCE7D4] transition-colors leading-snug line-clamp-2">
                        {vlog.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {vlog.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-rose-400" />
                      {new Date(vlog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="text-[#E8C39E] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {isInstagram ? "Watch Reel →" : "Watch Vlog →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
