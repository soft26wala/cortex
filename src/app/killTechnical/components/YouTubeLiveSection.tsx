"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Tv, 
  Users, 
  ArrowUpRight, 
  Radio, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Activity,
  Flame,
  Award
} from "lucide-react";

const liveTicker = [
  { pair: "EUR/USD", value: "1.0924", change: "+0.64%", up: true },
  { pair: "GBP/USD", value: "1.2840", change: "+0.82%", up: true },
  { pair: "BTC/USD", value: "$68,420", change: "+4.12%", up: true },
  { pair: "GOLD", value: "$2,442.80", change: "+1.25%", up: true },
  { pair: "BANKNIFTY", value: "52,480", change: "+0.95%", up: true }
];

export default function YouTubeLiveSection() {
  const [activeTab, setActiveTab] = useState("live");

  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-noise bg-grid-pattern border-y border-white/[0.08]">
      {/* Dynamic Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-red-600/20 via-[#6C63FF]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top Ticker Bar */}
        <div className="max-w-6xl mx-auto mb-16 p-4 rounded-2xl bg-[#0B0B0B] border border-white/[0.08] flex items-center overflow-x-auto whitespace-nowrap gap-8 font-mono text-xs">
          <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <Activity size={14} /> LIVE INSTITUTIONAL FEEDS
          </div>
          {liveTicker.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 flex-shrink-0">
              <span className="text-zinc-400">{item.pair}:</span>
              <span className="text-white font-bold">{item.value}</span>
              <span className="text-emerald-400 font-semibold">{item.change}</span>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-xs font-extrabold uppercase tracking-widest shadow-2xl backdrop-blur-xl"
          >
            <Flame size={14} className="animate-bounce text-red-500" />
            Official Kill Technical YouTube Channel
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight"
          >
            Institutional Price Action <br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-red-500 bg-clip-text text-transparent">
              Live Stream & Masterclasses
            </span>
          </motion.h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Watch Jaskeert Singh & Gurvinder Singh break down retail traps, liquidity sweeps, and high-probability forex/crypto setups live on YouTube.
          </p>
        </div>

        {/* High-End 3D Video Console */}
        <div className="max-w-6xl mx-auto rounded-3xl bg-[#0B0B0B] border border-white/[0.1] p-6 sm:p-10 shadow-[0_30px_100px_rgba(239,68,68,0.25)] relative overflow-hidden backdrop-blur-2xl">
          
          {/* Header Controls */}
          <div className="flex flex-col lg:flex-row items-center justify-between pb-6 border-b border-white/[0.08] mb-8 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-xl shadow-red-600/40 flex-shrink-0">
                <Play size={26} fill="white" className="ml-1" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  @killtechnical <ShieldCheck size={18} className="text-[#00D4FF]" />
                </h3>
                <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
                  <Award size={13} className="text-amber-400" /> #1 Trading Academy • 100K+ Subscribers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                🔴 LIVE STREAM BROADCAST
              </div>

              <a
                href="https://www.youtube.com/@killtechnical"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95"
              >
                Subscribe Channel <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* YouTube Video Player Embed */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.1] bg-[#050505] shadow-2xl group">
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/videoseries?list=UUkilltechnical"
              title="Kill Technical YouTube Live & Trading Videos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Interactive Feature Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/[0.08]">
            <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="text-red-400 font-mono font-bold">LIVE ANALYSIS</span>
                <Radio size={14} className="text-red-500 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold text-white">Daily Forex & Crypto Live Stream</h4>
              <p className="text-xs text-zinc-400">Real-time market execution & institutional liquidity zones.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="text-[#00D4FF] font-mono font-bold">STRATEGY MATRIX</span>
                <TrendingUp size={14} className="text-[#00D4FF]" />
              </div>
              <h4 className="text-sm font-bold text-white">Retailer Psychology & Trap Sweeps</h4>
              <p className="text-xs text-zinc-400">Master how market makers hunt stop-losses before major moves.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="text-[#4ADE80] font-mono font-bold">COMMUNITY</span>
                <Users size={14} className="text-[#4ADE80]" />
              </div>
              <h4 className="text-sm font-bold text-white">100,000+ Active Traders</h4>
              <p className="text-xs text-zinc-400">Join India's most respected institutional trading family.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
