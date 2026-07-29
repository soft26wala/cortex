"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Zap, CheckCircle2, Shield, Star } from "lucide-react";
import './style.css';

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
                <p className="text-2xl font-black text-zinc-900 dark:text-white">100+</p>
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

          {/* Right Column: Founder Cards Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 lg:flex hidden items-center justify-center gap-4 relative"
          >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 relative rounded-3xl overflow-hidden w-full shadow-2xl p-1 border border-white/20 transform hover:-translate-y-2 transition duration-500">
              <Image
                src="/images/hero/anmol.png"
                alt="Anmol Singh - Founder"
                width={300}
                height={380}
                quality={100}
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="bg-yellow-400/90 backdrop-blur-md rounded-2xl shadow-xl py-2.5 px-4 absolute top-6 -left-6 border border-white/40">
                <p className="text-sm font-extrabold text-yellow-950">Anmol Singh</p>
                <p className="text-xs font-bold text-yellow-900">Co-Founder & Tech Lead</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 relative rounded-3xl overflow-hidden w-full shadow-2xl p-1 border border-white/20 mt-20 transform hover:-translate-y-2 transition duration-500">
              <Image
                src="/images/hero/gavi.png"
                alt="Gurvinder - Co-Founder"
                width={300}
                height={380}
                quality={100}
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="bg-emerald-400/90 backdrop-blur-md rounded-2xl shadow-xl py-2.5 px-4 absolute top-6 -right-6 border border-white/40">
                <p className="text-sm font-extrabold text-emerald-950">Gurvinder</p>
                <p className="text-xs font-bold text-emerald-900">Co-Founder & Architect</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
