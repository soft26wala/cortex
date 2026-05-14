"use client";

import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { motion } from "framer-motion";
import { BarChart2, Zap, Shield, Users, Globe, ArrowUpRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Psychology Mastery",
      desc: "Decode institutional traps and retailer mindset to trade like the 1% operators.",
      icon: Users,
      color: "#3b82f6",
      tag: "CORE"
    },
    {
      title: "Forex Edge",
      desc: "Advanced SMC and Price Action strategies optimized for global currency markets.",
      icon: Globe,
      color: "#10b981",
      tag: "GLOBAL"
    },
    {
      title: "Indian Market Pro",
      desc: "Master Nifty and Bank Nifty with high-precision volume and data analysis.",
      icon: BarChart2,
      color: "#f59e0b",
      tag: "DOMESTIC"
    },
    {
      title: "Risk Engine",
      desc: "Mathematical risk management protocols to protect your capital at all costs.",
      icon: Shield,
      color: "#ef4444",
      tag: "SECURE"
    }
  ];

  return (
    <>
    <Navbar />
    
    <section className="bg-[#000] min-h-screen py-24 relative overflow-hidden text-white">
      
      {/* --- BACKGROUND TERMINAL GRID --- */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="max-w-4xl mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <Zap className="w-5 h-5 text-blue-500 fill-current animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase">Mission Modules</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
            ELITE <span className="text-white/10 italic">SERVICES</span>
          </h1>
          <p className="text-neutral-500 text-xl max-w-2xl border-l border-white/20 pl-6">
            We don't just teach trading; we install a <span className="text-white font-bold">Sigma Mindset</span> into your DNA using institutional protocols.
          </p>
        </div>

        {/* --- SERVICES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="relative group p-[1px] overflow-hidden"
            >
              {/* Rotating Border Glow 
                  Mobile: opacity-100 (Hamesha dikhega)
                  Desktop: lg:opacity-0 (Sirf hover par dikhega)
              */}
              <div className="absolute inset-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-100%]"
                   style={{ background: `conic-gradient(from 0deg, transparent, ${service.color}, transparent 30%)` }}
                />
              </div>

              <div className="relative bg-[#050505] border border-white/10 p-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-12">
                    {/* Icon Box Glow - Mobile pe hamesha glowing border */}
                    <div className="p-4 bg-white/5 border border-white/20 lg:border-white/10 lg:group-hover:border-white/30 transition-all">
                      <service.icon className="w-8 h-8" style={{ color: service.color }} />
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-white/20 uppercase">{service.tag}</span>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase lg:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed mb-8">
                    {service.desc}
                  </p>
                </div>

                {/* Initialize Button - Mobile pe hamesha active color */}
                <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.3em] text-white/70 lg:text-white/40 lg:group-hover:text-white transition-colors cursor-pointer">
                  INITIALIZE MODULE <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Internal "Bulb" Glow 
                    Mobile: opacity-10 (Always visible)
                    Desktop: lg:opacity-0 (Hover only)
                */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 blur-[80px] opacity-10 lg:opacity-0 lg:group-hover:opacity-20 transition-opacity rounded-full pointer-events-none" style={{ backgroundColor: service.color }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- SYSTEM STATS (BOTTOM) --- */}
        <div className="mt-32 p-12 bg-white/[0.02] border border-white/5 flex flex-wrap justify-around gap-12 text-center">
            <div>
                <p className="text-4xl font-black mb-1 italic">95%</p>
                <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase">Uptime Accuracy</p>
            </div>
            <div className="w-px h-12 bg-white/10 hidden md:block" />
            <div>
                <p className="text-4xl font-black mb-1 italic">24/7</p>
                <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase">Market Monitoring</p>
            </div>
            <div className="w-px h-12 bg-white/10 hidden md:block" />
            <div>
                <p className="text-4xl font-black mb-1 italic">CORE</p>
                <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase">Institutional Data</p>
            </div>
        </div>

      </div>
    </section>
      <Footer />
        </>
  );
}