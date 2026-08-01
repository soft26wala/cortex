"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Radio, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shapeRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 12;
      const yPos = (clientY / innerHeight - 0.5) * 12;

      shapeRef.current.style.transform = `perspective(1000px) rotateX(${-yPos * 0.5}deg) rotateY(${xPos * 0.5}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative flex items-center px-6 py-28 md:py-36 bg-[#050505] text-white overflow-hidden bg-noise bg-grid-pattern">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-red-600/15 via-[#6C63FF]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111111] border border-white/[0.08] text-red-400 text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-xl"
            >
              <Radio size={14} className="animate-pulse text-red-500" />
              <span>#1 Institutional Stock & Forex Academy</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
            >
              Practical Institutional <br />
              <span className="bg-gradient-to-r from-white via-zinc-200 to-red-500 bg-clip-text text-transparent">
                Trading & Price Action
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed font-normal"
            >
              Master market maker strategies, retailer psychology, and high-probability liquidity sweeps with Gurvinder Singh & Jaskeert Singh (7+ years forex experience).
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Link
                href="/killTechnical/app/classroom"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_45px_rgba(239,68,68,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-3"
              >
                Join Classroom <ArrowRight size={16} />
              </Link>

              <a
                href="https://www.youtube.com/@killtechnical"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#111111] hover:bg-[#181818] text-white font-semibold text-xs uppercase tracking-widest rounded-full border border-white/[0.08] transition-all flex items-center gap-2"
              >
                <Play size={14} className="text-red-500" fill="currentColor" /> Watch YouTube Live
              </a>
            </motion.div>

            {/* Key Trust Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4"
            >
              <div>
                <p className="text-2xl font-black text-white">7+ Yrs</p>
                <p className="text-xs text-zinc-500">Market Experience</p>
              </div>
              <div>
                <p className="text-2xl font-black text-red-500">100K+</p>
                <p className="text-xs text-zinc-500">YouTube Traders</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#00D4FF]">94.8%</p>
                <p className="text-xs text-zinc-500">Setup Accuracy</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Holographic Trading Terminal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <div
              ref={shapeRef}
              className="w-full aspect-square max-w-md rounded-3xl bg-[#0B0B0B] border border-white/[0.1] p-6 shadow-[0_30px_100px_rgba(239,68,68,0.2)] transition-transform duration-200 ease-out relative overflow-hidden backdrop-blur-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono font-bold text-white">KILL TECHNICAL CORE</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-mono border border-red-500/20">LIVE</span>
              </div>

              {/* Chart Visual Simulation */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#050505] border border-white/[0.08] font-mono">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                    <span>INSTITUTIONAL SWEEP</span>
                    <TrendingUp size={14} className="text-emerald-400" />
                  </div>
                  <p className="text-2xl font-black text-white">EUR/USD 1.0924</p>
                  <span className="text-[11px] text-emerald-400">↑ Liquidity Grab Completed</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#050505] border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>ORDER BLOCK STATUS</span>
                    <span className="text-[#00D4FF]">ACTIVE</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-red-600 to-[#00D4FF] h-full w-[92%] rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Youtube Live Indicator */}
              <a
                href="https://www.youtube.com/@killtechnical"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-red-600/20 to-red-900/20 border border-red-600/30 flex items-center justify-between text-xs font-bold text-white hover:border-red-500 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Play size={16} fill="red" className="text-red-500" />
                  <span>Watch YouTube Live Stream</span>
                </div>
                <ArrowRight size={14} />
              </a>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}