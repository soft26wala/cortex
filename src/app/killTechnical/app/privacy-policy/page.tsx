"use client";

import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Globe, Zap, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <section className="bg-[#000000] min-h-screen py-24 relative overflow-hidden text-white flex flex-col items-center">

        {/* --- BACKGROUND AMBIENCE (Blue Glow) --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">

          {/* --- CENTERED HEADER --- */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[2px] w-8 bg-blue-600 shadow-[0_0_10px_#3b82f6]"></div>
              <span className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase italic">Data Protection Hub</span>
              <div className="h-[2px] w-8 bg-blue-600 shadow-[0_0_10px_#3b82f6]"></div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase">
              PRIVACY <span className="text-white/10 italic">POLICY</span>
            </h1>
            <p className="text-white/40 tracking-[0.2em] uppercase text-[10px] font-bold">
              Your privacy is our top priority. <span className="text-white/60 ml-2 italic">Last Updated: Dec 24, 2025</span>
            </p>
          </motion.div>

          {/* --- MAIN CONTENT CONTAINER --- */}
          <div className="relative group w-full max-w-4xl">

            {/* ALWAYS RUNNING ENERGY BORDER (Blue/Pink Mix) */}
            <div className="absolute inset-[-1px] overflow-hidden rounded-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-200%]"
                style={{ background: `conic-gradient(from 0deg, transparent, #3b82f6, transparent 40%, #ec4899, transparent 80%)` }}
              />
            </div>

            <div className="relative bg-[#050505] border border-white/10 p-10 md:p-16 z-10">

              {/* POWER CORE BULB IN BACKGROUND */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none" />

              <div className="space-y-16 relative z-10">

                {/* SECTION 1: COLLECTION */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <Eye className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-widest uppercase mb-4 text-white">1. Information We Collect</h2>
                    <p className="text-neutral-400 leading-relaxed mb-4">To provide institutional-grade services, we collect essential data points:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-mono text-blue-400/80">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500" /> Name & Contact Details</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500" /> Billing Information</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500" /> IP Address & Browser</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500" /> Usage Data via Cookies</li>
                    </ul>
                  </div>
                </div>

                {/* SECTION 2: USAGE */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <Zap className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-widest uppercase mb-4 text-white">2. How We Use Information</h2>
                    <div className="grid grid-cols-1 gap-4 text-neutral-400">
                      <p className="border-l-2 border-white/10 pl-4 hover:border-blue-500 transition-colors">To maintain and optimize the Sigma Trader platform experience.</p>
                      <p className="border-l-2 border-white/10 pl-4 hover:border-blue-500 transition-colors">To handle secure transactions and provide elite support.</p>
                      <p className="border-l-2 border-white/10 pl-4 hover:border-blue-500 transition-colors">To monitor security and prevent fraudulent market activity.</p>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: SECURITY */}
                <div className="flex flex-col md:flex-row gap-8 items-start bg-white/[0.02] p-8 border border-white/5">
                  <div className="p-4 bg-blue-500 shadow-[0_0_30px_#3b82f6] rounded-full">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-widest uppercase mb-4 text-white italic">3. Data Security</h2>
                    <p className="text-neutral-400 leading-relaxed">
                      We implement industry-standard encryption protocols (SSL) and secure servers to protect your profile. At <span className="text-white font-bold">SIGMA TRADER</span>, we treat your data as a high-security asset.
                    </p>
                  </div>
                </div>

                {/* SECTION 4: THIRD PARTY */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <Globe className="w-8 h-8 text-pink-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-widest uppercase mb-4 text-white">4. Third-Party Links</h2>
                    <p className="text-neutral-400 leading-relaxed italic">
                      Our platform may link to external sources. We are not responsible for their individual privacy protocols. Read their terms before engaging.
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTACT FOOTER */}
              <div className="mt-16 pt-10 border-t border-white/5 flex flex-col items-center">
                <Mail className="w-6 h-6 text-blue-500 mb-4 animate-bounce" />
                <h3 className="text-xs font-black tracking-[0.4em] text-white/40 mb-2">QUESTIONS ABOUT PRIVACY?</h3>
                <p className="text-xl font-mono text-white hover:text-blue-500 transition-colors cursor-pointer underline decoration-blue-500/30">
                  support@sigmatrader.com
                </p>
              </div>

            </div>
          </div>

          {/* --- DECORATIVE BOTTOM TEXT --- */}
          <div className="mt-16 text-center opacity-30">
            <p className="text-[9px] tracking-[1em] font-black uppercase mb-2">SIGMA TRADER — LEGAL COMPLIANCE SECTION — 2026</p>
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full animate-pulse" />
              ))}
            </div>
          </div>

        </div>

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      </section>
      <Footer />
    </>
  );
}