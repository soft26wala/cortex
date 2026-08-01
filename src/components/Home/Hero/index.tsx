"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Terminal, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Shield, 
  Layers, 
  Code2, 
  Bot,
  Globe,
  TrendingUp,
  Server
} from "lucide-react";

const codeTabs = [
  {
    id: "ai",
    label: "cortex.ai.ts",
    code: `import { CortexAI } from "@cortex/core";

const agent = new CortexAI({
  model: "cortex-v4-turbo",
  memory: true,
  latency: "ultra-low",
});

await agent.deployWorkflow({
  trigger: "whatsapp.message",
  action: "vector_search.exec",
  response: "auto_qualify_lead"
});`
  },
  {
    id: "api",
    label: "deploy.config.ts",
    code: `export default defineCortexConfig({
  region: ["us-east-1", "eu-central-1"],
  scaling: { min: 10, max: 1000 },
  security: { soc2: true, zeroTrust: true },
  analytics: "realtime_telemetry"
});`
  }
];

const Hero = () => {
  const [activeTab, setActiveTab] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY, currentTarget } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-[#050505] text-white overflow-hidden bg-grid-pattern bg-noise"
    >
      {/* Dynamic Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#6C63FF]/20 via-[#00D4FF]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#4ADE80]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Mouse Reactive Beam */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(108,99,255,0.12), transparent 40%)`
          )
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111111] border border-white/[0.08] text-[#00D4FF] text-xs font-semibold uppercase tracking-widest shadow-2xl backdrop-blur-xl">
            <Sparkles size={14} className="animate-spin text-[#6C63FF]" />
            <span>Next-Gen SaaS & AI Intelligence Engineering</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
          </div>
        </motion.div>

        {/* Display Heading */}
        <div className="text-center max-w-5xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05]"
          >
            Engineering Luxury <br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-[#6C63FF] bg-clip-text text-transparent">
              Digital Software Platforms
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-zinc-400 font-normal max-w-3xl mx-auto leading-relaxed"
          >
            Cortex Web Solutions builds high-converting enterprise web applications, AI-automated WhatsApp pipelines, and cloud software infrastructure designed for market leaders.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/Service"
              className="px-8 py-4 bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-sm rounded-full shadow-[0_0_30px_rgba(108,99,255,0.4)] hover:shadow-[0_0_45px_rgba(0,212,255,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-3"
            >
              <Zap size={18} />
              Explore Solutions
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 bg-[#111111] hover:bg-[#181818] text-zinc-200 hover:text-white font-semibold text-sm rounded-full border border-white/[0.08] hover:border-white/[0.2] backdrop-blur-md transition-all duration-300 flex items-center gap-2"
            >
              Book Executive Consultation
            </Link>
          </motion.div>

          {/* Key Feature Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-6"
          >
            {["Ultra-Low Latency", "WhatsApp AI Agent API", "SOC-2 Ready Infrastructure", "High Conversion UX"].map((tag) => (
              <span 
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#111111]/80 text-zinc-400 border border-white/[0.08] flex items-center gap-1.5"
              >
                <CheckCircle2 size={12} className="text-[#4ADE80]" />
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Live Interactive Software Preview & Code Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-16 max-w-6xl mx-auto"
        >
          <div className="rounded-3xl bg-[#0B0B0B] border border-white/[0.08] p-4 sm:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.9)] backdrop-blur-2xl relative overflow-hidden group">
            {/* Ambient Background Gradient Beam */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#6C63FF]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Window Top Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs text-zinc-500 font-mono ml-2">cortex-control-center v4.8</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                  <Activity size={12} className="animate-pulse" /> Live Telemetry
                </span>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid lg:grid-cols-12 gap-6">
              
              {/* Left Column: Code Preview */}
              <div className="lg:col-span-6 rounded-2xl bg-[#050505] border border-white/[0.08] p-4 sm:p-5 flex flex-col justify-between font-mono">
                <div>
                  <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 mb-4">
                    {codeTabs.map((tab, idx) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                          activeTab === idx 
                            ? "bg-[#6C63FF]/20 text-[#00D4FF] border border-[#6C63FF]/30" 
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        <Code2 size={13} />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <pre className="text-xs text-zinc-300 leading-relaxed overflow-x-auto p-2">
                    <code>{codeTabs[activeTab].code}</code>
                  </pre>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Server size={12} /> Execution time: 14ms
                  </span>
                  <span>TypeScript 5.4</span>
                </div>
              </div>

              {/* Right Column: Live Data Visualization Card */}
              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#111111] border border-white/[0.08]">
                    <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                      <span>API Throughput</span>
                      <TrendingUp size={14} className="text-[#4ADE80]" />
                    </div>
                    <p className="text-2xl font-black text-white">48,920 req/s</p>
                    <span className="text-[11px] text-emerald-400">↑ 24% vs benchmark</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#111111] border border-white/[0.08]">
                    <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                      <span>Uptime Guarantee</span>
                      <Shield size={14} className="text-[#00D4FF]" />
                    </div>
                    <p className="text-2xl font-black text-white">99.999%</p>
                    <span className="text-[11px] text-zinc-400">Zero downtime SLA</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot size={16} className="text-[#6C63FF]" />
                      <span className="text-xs font-semibold text-white">Active AI Workflows</span>
                    </div>
                    <span className="text-xs text-[#00D4FF] font-mono">1,420 Active Agents</span>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] h-full w-[88%] rounded-full animate-pulse" />
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                    <span>Lead Qualification Rate</span>
                    <span className="text-white font-bold">94.2%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Glass Statistics Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { metric: "250+", label: "Enterprise Projects Shipped" },
            { metric: "99.9%", label: "Client SLA Uptime" },
            { metric: "4.9/5", label: "Executive Rating Score" },
            { metric: "<30ms", label: "Global Edge Latency" },
          ].map((stat, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-[#0B0B0B] border border-white/[0.08] backdrop-blur-md">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                {stat.metric}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
