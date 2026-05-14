"use client";

import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { motion } from "framer-motion";
import { Shield, Target, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  const stats = [
    { label: "Years Experience", value: "4+", color: "#22c55e" },
    { label: "Students Trained", value: "1000+", color: "#3b82f6" },
    { label: "Success Rate", value: "92%", color: "#f4409aff" },
    { label: "Live Sessions", value: "500+", color: "#ef4444" },
  ];

  return (
    <>
    <Navbar />
    <section className="bg-[#000000] min-h-screen py-24 relative overflow-hidden text-white">
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-white/40"></div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/80">The Founder</div>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            ANUBHAV <span className="text-white/40">SONI</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            The visionary behind Sigma Trading Company  , pioneering a psychology-based approach to the Forex and Indian Stock Market.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT: POWER IMAGE CORE --- */}
          <div className="relative">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] w-full max-w-md mx-auto group"
            >
              {/* Energy Border Flow (Always Moving) */}
              <div className="absolute inset-[-4px] overflow-hidden rounded-sm">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-200%]"
                  style={{ background: `conic-gradient(from 0deg, transparent, #3b82f6, transparent 30%, #FFF, transparent 60%)` }}
                />
              </div>

              {/* Main Image Container */}
              <div className="relative h-full w-full bg-[#050505] overflow-hidden border border-white/10 p-2">
                <div className="relative h-full w-full grayscale group-hover:grayscale-0 transition-all duration-700 bg-neutral-900">
                  {/* Replace with actual image of Anubhav Soni */}
                  <div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold text-8xl italic"><Image src="/mypic/anubavimg.jpeg" fill className="object-cover" alt="Anubhav Soni" /> </div>
                  {/* <Image src="/anubhav.jpg" fill className="object-cover" alt="Anubhav Soni" /> */}
                </div>

                {/* Bright Center Power Glow */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-600/40 to-transparent pointer-events-none" />
              </div>

              {/* Glowing Corner Elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-blue-500 shadow-[0_0_15px_#3b82f6]" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-pink-500 shadow-[0_0_15px_#ec4899]" />
            </motion.div>
          </div>

          {/* --- RIGHT: THE STORY & MISSION --- */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Zap className="text-yellow-400 fill-yellow-400 w-6 h-6" /> Our Strategy
              </h2>
              <p className="text-neutral-400 text-lg">
                Having over 4 years of hands-on experience, Anubhav Soni developed a unique strategy based on Retailers Psychology. We don't just teach charts; we teach how to think like the 1% of profitable operators. <span className="text-white font-bold">Retailers Psychology</span>. We don't just teach charts; we teach how to think like the 1% of profitable operators.
              </p>
            </div>

            {/* Feature Grid with Small Bulb Effect */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: "Risk Mastery", text: "Protecting capital is our first priority." },
                { icon: Target, title: "Precision", text: "High-probability setups only." },
                { icon: TrendingUp, title: "Growth", text: "Compounding wealth systematically." },
                { icon: Zap, title: "Psychology", text: "Mastering the trader's mind." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white/5 border border-white/10 relative group overflow-hidden">
                   {/* Moving Power Light inside card */}
                   <motion.div 
                     animate={{ x: ["-100%", "200%"] }}
                     transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                     className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                   />
                   <item.icon className="w-8 h-8 mb-4 text-white" />
                   <h3 className="text-white font-bold mb-2">{item.title}</h3>
                   <p className="text-white/50 text-xs leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- STATS SECTION (The Glowing Stats) --- */}
        <div className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="text-center p-8 border border-white/5 bg-[#050505] relative"
            >
              {/* Small Bulb Glow in background of each stat */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 blur-[40px] opacity-20" style={{ backgroundColor: stat.color }} />
              
              <h4 className="text-5xl font-black mb-2" style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}66` }}>
                {stat.value}
              </h4>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
    <Footer />
    </>
  );
}