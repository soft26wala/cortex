"use client";
import React from "react";
import { motion } from "framer-motion";
import { Gauge, Zap, TrendingUp, ShieldCheck } from "lucide-react";

const metrics = [
  { value: "99.99%", label: "Uptime SLA Guarantee", detail: "Multi-region fallback" },
  { value: "< 30ms", label: "Global Edge Latency", detail: "Vercel CDN Network" },
  { value: "50M+", label: "Monthly API Requests", detail: "Zero bottlenecks" },
  { value: "3.4x", label: "Average Conversion Lift", detail: "Measured client ROI" },
];

const PerformanceMetrics = () => {
  return (
    <section className="py-24 bg-[#050505] text-white relative overflow-hidden bg-noise border-y border-white/[0.08]">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-[#0B0B0B] border border-white/[0.08] text-center"
            >
              <h3 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-white via-zinc-200 to-[#6C63FF] bg-clip-text text-transparent">
                {m.value}
              </h3>
              <p className="text-sm font-bold text-white mt-2">{m.label}</p>
              <span className="text-xs text-zinc-500 font-mono mt-1 block">{m.detail}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PerformanceMetrics;
