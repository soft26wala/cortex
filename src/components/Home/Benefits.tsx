"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  ShieldCheck, 
  Globe2, 
  Headphones, 
  Zap, 
  Sparkles,
  BarChart4
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "10x Higher Conversion Rates",
    desc: "Transform passive site visitors into qualified paying clients with friction-free UX and instant AI response channels.",
    highlight: "+340% Avg ROAS",
    size: "col-span-1 md:col-span-2"
  },
  {
    icon: ShieldCheck,
    title: "SOC-2 Ready Security",
    desc: "End-to-end data encryption, role-based access control, and GDPR compliance built in by default.",
    highlight: "Zero-Trust Protocol",
    size: "col-span-1"
  },
  {
    icon: Globe2,
    title: "Sub-50ms Global Latency",
    desc: "Deployed across 300+ edge locations worldwide for instant page load times and zero downtime.",
    highlight: "300+ Edge Regions",
    size: "col-span-1"
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Engineering Support",
    desc: "Direct Slack channel access to our senior architects for rapid deployment, updates, and maintenance.",
    highlight: "15min SLA Response",
    size: "col-span-1 md:col-span-2"
  }
];

const Benefits = () => {
  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-noise">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-[#00D4FF] text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            Unmatched Strategic Advantage
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Why Market Leaders Choose Cortex
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Every component we build is engineered for high performance, maximum security, and measurable ROI.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((b, idx) => {
            const IconComp = b.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 rounded-3xl bg-[#0B0B0B] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 ${b.size} flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#6C63FF] group-hover:text-[#00D4FF] transition-colors">
                      <IconComp size={24} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#111111] border border-white/[0.08] text-[#4ADE80]">
                      {b.highlight}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {b.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Benefits;
