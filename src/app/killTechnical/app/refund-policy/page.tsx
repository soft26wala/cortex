"use client";

import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, Zap, XCircle } from "lucide-react";

export default function RefundPolicy() {
  return (
    <>
    <Navbar />
    <section className="bg-[#000000] min-h-screen py-24 relative overflow-hidden text-white flex flex-col items-center justify-center">
      
      {/* --- BACKGROUND ENERGY GLOW --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* --- CENTERED HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-8 bg-red-600 shadow-[0_0_10px_#ef4444]"></div>
            <span className="text-[10px] font-black tracking-[0.5em] text-red-500 uppercase">Official Protocol</span>
            <div className="h-[2px] w-8 bg-red-600 shadow-[0_0_10px_#ef4444]"></div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
            SIGMA <span className="text-white/10 italic">TRADER</span>
          </h1>
          <p className="text-white/40 tracking-[0.2em] uppercase text-[10px] font-bold">Refund & Cancellation Policy</p>
        </motion.div>

        {/* --- MAIN POLICY BOX (CENTERED) --- */}
        <div className="relative group w-full max-w-3xl">
          
          {/* ALWAYS RUNNING ENERGY BORDER (RED) */}
          <div className="absolute inset-[-2px] overflow-hidden rounded-sm">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-200%]"
              style={{ background: `conic-gradient(from 0deg, transparent, #ef4444, transparent 30%, #ef4444, transparent 60%)` }}
            />
          </div>

          <div className="relative bg-[#050505] border border-white/10 p-10 md:p-16 z-10 flex flex-col items-center text-center">
            
            {/* POWER CORE BULB (RED) */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-600/20 blur-[60px] pointer-events-none" />
            
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-20 mb-8 p-6 rounded-full bg-red-600/10 border border-red-600 shadow-[0_0_20px_#ef444433]"
            >
              <XCircle className="w-12 h-12 text-red-500" />
            </motion.div>

            <h2 className="text-3xl font-black mb-6 tracking-tight uppercase italic">Strict &nbsp; No-Refund &nbsp; Policy</h2>
            
            <div className="space-y-6 text-neutral-400 text-lg leading-relaxed max-w-xl">
              <p>
                At <span className="text-white font-bold">SIGMA TRADER</span>, we provide high-value digital assets, proprietary strategies, and live trading insights.
              </p>
              <p className="bg-red-500/5 border-l-4 border-red-600 p-4 text-sm italic">
                "Once the course content is accessed or a service is activated, all payments are final. No refunds, partial or full, will be issued under any circumstances."
              </p>
              <p className="text-sm">
                This policy ensures the integrity of our intellectual property and the dedication of our members. By proceeding with the purchase, you agree to these terms.
              </p>
            </div>

            {/* CONTACT CORE */}
            <div className="mt-12 pt-8 border-t border-white/5 w-full flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-red-500 fill-current" />
                <span className="text-[10px] font-black tracking-widest text-white/60">HAVE QUESTIONS?</span>
              </div>
              <p className="text-white font-mono text-sm group-hover:text-red-500 transition-colors cursor-pointer">
                support@sigmatrader.com
              </p>
            </div>

          </div>
        </div>

        {/* --- DECORATIVE FOOTER TAG --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex items-center gap-4 opacity-20"
        >
          <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="text-[9px] tracking-[1em] font-black uppercase">Terminal Locked</span>
        </motion.div>

      </div>

      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
    </section>
     <Footer />
        </>
  );
}