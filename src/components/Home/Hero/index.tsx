"use client";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Zap } from "lucide-react";
import './style.css';

const Hero3DCanvas = dynamic(() => import('./Hero3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] sm:h-[500px] lg:h-[560px] flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
      <span className="text-xs font-semibold uppercase tracking-widest text-blue-500/80">Loading 3D Core...</span>
    </div>
  ),
});

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 dark:bg-[#050507] bg-orange-50/70 overflow-hidden">
      {/* Background Radial Glow Effects */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 grid-cols-1 items-center gap-12">

          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md"
            >
              <Sparkles size={14} className="text-blue-500 animate-spin" />
              Cortex Web Solutions • Software & AI Agency
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-zinc-900 dark:text-white"
            >
              Smart Digital Solutions <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                For Modern Businesses
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-2xl"
            >
              At Cortex Web Solutions, we help startups, shops, and growing enterprises build high-converting websites, web apps, and automated WhatsApp systems that increase sales and scale faster.
            </motion.p>

            {/* Service Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {['Web Apps', 'WhatsApp AI Bots', 'Custom CMS', 'Meta Ads'].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700/80"
                >
                  ✓ {tag}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 pt-4"
            >
              <Link
                href="/courses"
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-2xl transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2 active:scale-95"
              >
                <Zap size={16} />
                Explore Services
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 grid grid-cols-3 gap-4"
            >
              <div>
                <p className="text-2xl font-black text-zinc-900 dark:text-white">2+</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Projects Shipped</p>
              </div>
              <div>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">4.9 ★</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Client Rating</p>
              </div>
              <div>
                <p className="text-2xl font-black text-cyan-500">99.8%</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Client Satisfaction</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Interactive AI Core Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative w-full"
          >
            <Hero3DCanvas />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
