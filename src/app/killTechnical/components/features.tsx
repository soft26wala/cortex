"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Square, Circle, Triangle, Hexagon } from "lucide-react";

export default function Features() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -25% 0px" });

  const features = [
    { icon: <Square className="w-6 h-6" />, title: "FOREX MARKET", description: "Practical learning of Forex market", color: "#ef4444" },
    { icon: <Circle className="w-6 h-6" />, title: "Crypto market", description: "How to find hidden gems in crypto market", color: "#3b82f6" },
    { icon: <Triangle className="w-6 h-6" />, title: "Indian market", description: "Option buying, Option selling, Hedging Strategies", color: "#22c55e" },
    { icon: <Hexagon className="w-6 h-6" />, title: "LIVE CHALLENGES", description: "Challenge to Make 100 dollar to 10000 dollar strategy", color: "#eab308" },
  ];

  return (
    <section id="features" ref={sectionRef} className="py-24 relative overflow-hidden bg-black">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
           <div className="flex items-center gap-4 mb-6">
            {/* Glowing Line */}
            <div className="h-[2px] w-12 bg-blue-500 shadow-[0_0_15px_#3b82f6]"></div>
            <div className="text-xs uppercase tracking-[0.3em] text-blue-400 font-bold">Our Approach</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Trader Community<br />
            <span className="text-white/70">Maximum Impact</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for PC
  const springX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-8 rounded-xl border border-white/10 bg-neutral-900/50 overflow-hidden h-72 flex flex-col justify-center transition-all duration-500"
    >
      {/* 1. RUNNING BORDER LIGHT (Always on Mobile, Hover on PC) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-150%] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${feature.color}, transparent 30%)`,
        }}
      />

      {/* 2. SPOTLIGHT / GLOW */}
      {/* Mobile Glow (Static Center) */}
      <div 
        className="block md:hidden pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(150px circle at 50% 50%, ${feature.color}44, transparent 80%)`
        }}
      />
      
      {/* PC Glow (Mouse Following) */}
      <motion.div
        className="hidden md:block pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(200px circle at ${x}px ${y}px, ${feature.color}33, transparent 80%)`
          ),
        }}
      />

      {/* Inner Black Box Background */}
      <div className="absolute inset-[2px] bg-[#0a0a0a] rounded-xl z-10 transition-colors group-hover:bg-[#0d0d0d]" />

      {/* Content */}
      <div className="relative z-20">
        <div className="mb-6 inline-block">
          <div 
            className="p-3 rounded-lg bg-white/5 transition-transform duration-300 group-hover:scale-110"
            style={{ color: feature.color, boxShadow: `0 0 15px ${feature.color}33` }}
          >
            {feature.icon}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors">
          {feature.title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}