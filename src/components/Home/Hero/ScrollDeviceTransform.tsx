"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2,
  Server,
  TrendingUp,
  Shield,
  Bot,
  Activity,
  Sparkles,
  Smartphone,
  Tablet,
  Laptop,
  Lock,
  Wifi,
  Battery,
  Send,
  UserCheck,
  ChevronRight,
  Zap
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

export default function ScrollDeviceTransform() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Track scroll progress over sticky container (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Container Size Morphing (Desktop 900px -> Orange iPhone 310px)
  // Morphing completes between scroll 0.15 and 0.50 so it happens 100% IN FULL SCREEN VIEW!
  const containerWidth = useTransform(
    scrollYProgress, 
    [0.10, 0.50], 
    ["900px", "310px"]
  );
  
  const containerHeight = useTransform(
    scrollYProgress, 
    [0.10, 0.50], 
    ["440px", "510px"]
  );
  
  const borderRadius = useTransform(
    scrollYProgress, 
    [0.10, 0.50], 
    ["18px", "44px"]
  );
  
  const borderWidth = useTransform(
    scrollYProgress, 
    [0.10, 0.50], 
    ["1px", "7px"]
  );
  
  // Titanium Orange Metallic Bezel morphing completes in full view
  const borderColor = useTransform(
    scrollYProgress, 
    [0.10, 0.50], 
    ["rgba(255,255,255,0.15)", "#F97316"]
  );

  const shadowGlow = useTransform(
    scrollYProgress,
    [0.10, 0.50],
    ["0 20px 60px rgba(0,0,0,0.85)", "0 0 65px rgba(249,115,22,0.55)"]
  );

  // 2. 3D Tilt & Elevation
  const rotateX = useTransform(scrollYProgress, [0.10, 0.50], [8, 0]);
  const scale = useTransform(scrollYProgress, [0.10, 0.50], [1, 0.96]);

  // 3. Header Morphing (Mac OS Bar -> Phone Dynamic Island Notch)
  const macHeaderOpacity = useTransform(scrollYProgress, [0.10, 0.30], [1, 0]);
  const mobileNotchOpacity = useTransform(scrollYProgress, [0.30, 0.50], [0, 1]);

  // 4. Inner Content Transitions (Desktop UI -> Mobile UI)
  const desktopOpacity = useTransform(scrollYProgress, [0.10, 0.30], [1, 0]);
  const desktopScale = useTransform(scrollYProgress, [0.10, 0.30], [1, 0.45]);
  const desktopPointerEvents = useTransform(scrollYProgress, [0, 0.30], ["auto", "none"]);

  const mobileOpacity = useTransform(scrollYProgress, [0.30, 0.50], [0, 1]);
  const mobileScale = useTransform(scrollYProgress, [0.30, 0.50], [0.85, 1]);
  const mobilePointerEvents = useTransform(scrollYProgress, [0, 0.30], ["none", "auto"]);

  // Floating side badges fade out smoothly when morph starts
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[180vh] my-4"
    >
      {/* Sticky Viewport Container - Dead-center in screen height below header (top-[15vh]) */}
      <div className="sticky top-[15vh] h-[65vh] w-full flex flex-col items-center justify-center overflow-visible z-20">

        {/* Dynamic Mode Switcher Pill */}
        <motion.div 
          className="mb-3 z-40 flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0D0D14]/90 border border-white/10 text-xs font-semibold text-zinc-300 backdrop-blur-xl shadow-2xl"
        >
          <motion.span 
            className="flex items-center gap-1.5"
            style={{ color: useTransform(scrollYProgress, [0, 0.30], ["#00D4FF", "#71717A"]) }}
          >
            <Laptop size={13} />
            <span>Desktop</span>
          </motion.span>
          
          <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#00D4FF] via-[#6C63FF] to-[#F97316]"
              style={{ width: useTransform(scrollYProgress, [0, 0.50], ["0%", "100%"]) }}
            />
          </div>

          <motion.span 
            className="flex items-center gap-1.5"
            style={{ color: useTransform(scrollYProgress, [0.30, 0.50], ["#71717A", "#F97316"]) }}
          >
            <Smartphone size={13} />
            <span>Orange Phone</span>
          </motion.span>
        </motion.div>

        {/* Ambient Glow Beam */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.4, 0.9], [0.3, 0.8, 0.5]),
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[480px] bg-gradient-to-tr from-[#F97316]/20 via-[#6C63FF]/25 to-[#00D4FF]/20 rounded-full blur-[140px] pointer-events-none z-0"
        />

        {/* Floating Side Highlights */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none max-w-6xl mx-auto z-40">
          <motion.div 
            style={{ opacity: badgeOpacity }}
            className="absolute left-0 top-1/4 px-3.5 py-2 rounded-2xl bg-[#0F0F16]/90 border border-white/10 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
            <span>⚡ Ultra-Fast 14ms Engine</span>
          </motion.div>

          <motion.div 
            style={{ opacity: badgeOpacity }}
            className="absolute right-0 top-1/4 px-3.5 py-2 rounded-2xl bg-[#0F0F16]/90 border border-white/10 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl flex items-center gap-2"
          >
            <Bot size={15} className="text-[#F97316]" />
            <span>🤖 Auto WhatsApp AI Pipeline</span>
          </motion.div>
        </div>

        {/* 3D Perspective Wrapper Container */}
        <div className="w-full flex justify-center perspective-[1200px] z-10 px-4">
          
          {/* Morphing Device Frame (Desktop 900px -> Orange iPhone 310px in 100% full view) */}
          <motion.div
            style={{
              width: containerWidth,
              height: containerHeight,
              borderRadius: borderRadius,
              borderWidth: borderWidth,
              borderColor: borderColor,
              boxShadow: shadowGlow,
              rotateX: rotateX,
              scale: scale,
            }}
            className="relative bg-[#090910] backdrop-blur-2xl overflow-hidden transition-all duration-75 ease-out flex flex-col justify-between group shrink-0"
          >
            {/* Top Metallic Edge Highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-50" />

            {/* HEADER STATE A: MacOS Browser Window Bar */}
            <motion.div 
              style={{ opacity: macHeaderOpacity }}
              className="absolute top-0 left-0 right-0 h-10 px-4 border-b border-white/10 bg-[#0F0F18]/90 flex items-center justify-between z-30 shrink-0"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-[11px] text-zinc-400 font-mono ml-2 hidden sm:inline">cortex-browser v4.8</span>
              </div>

              {/* URL Address Bar */}
              <div className="px-3 py-0.5 rounded-full bg-zinc-900/90 border border-white/10 text-[11px] text-zinc-300 font-mono flex items-center gap-2 max-w-xs sm:max-w-md w-full justify-center shadow-inner">
                <Lock size={10} className="text-[#4ADE80]" />
                <span className="truncate">https://cortex.ai/dashboard/live-telemetry</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
                  <Activity size={11} className="animate-pulse" /> Live
                </span>
              </div>
            </motion.div>

            {/* HEADER STATE B: iPhone Dynamic Island Notch & Status Bar */}
            <motion.div 
              style={{ opacity: mobileNotchOpacity }}
              className="absolute top-0 left-0 right-0 pt-1.5 px-5 flex flex-col items-center z-40 pointer-events-none"
            >
              <div className="w-full flex items-center justify-between text-[10px] font-semibold text-zinc-300 px-1 pb-0.5">
                <span>09:41</span>
                <div className="flex items-center gap-1">
                  <Wifi size={11} />
                  <span className="text-[8px] font-mono bg-orange-500/20 text-[#F97316] px-1 rounded font-bold">5G</span>
                  <Battery size={12} className="text-zinc-300" />
                </div>
              </div>

              {/* Dynamic Island Pill Notch */}
              <div className="w-24 h-5 bg-black rounded-full border border-white/10 flex items-center justify-between px-2 shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-[#050505] border border-zinc-800 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#F97316]" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
                  <span className="text-[8px] font-mono text-zinc-400">AI Active</span>
                </div>
              </div>
            </motion.div>

            {/* INNER CONTENT AREA */}
            <div className="relative w-full h-full flex-1 overflow-hidden flex items-center justify-center">
              
              {/* DESKTOP CONTENT VIEW (Live Software Sandbox + Telemetry) */}
              <motion.div 
                style={{ 
                  opacity: desktopOpacity, 
                  scale: desktopScale,
                  pointerEvents: desktopPointerEvents 
                }}
                className="absolute inset-0 pt-12 p-5 w-[880px] left-1/2 -translate-x-1/2 flex flex-col justify-between origin-center"
              >
                <div className="grid grid-cols-12 gap-5 h-full items-stretch">
                  
                  {/* Left Column: Code Sandbox */}
                  <div className="col-span-7 rounded-2xl bg-[#05050A] border border-white/10 p-4 flex flex-col justify-between font-mono shadow-2xl">
                    <div>
                      <div className="flex items-center gap-2 border-b border-white/10 pb-2.5 mb-3">
                        {codeTabs.map((tab, idx) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(idx)}
                            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                              activeTab === idx 
                                ? "bg-[#6C63FF]/20 text-[#00D4FF] border border-[#6C63FF]/40 shadow-md" 
                                : "text-zinc-500 hover:text-zinc-300"
                            }`}
                          >
                            <Code2 size={12} />
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      <pre className="text-[11px] text-zinc-300 leading-relaxed overflow-x-auto p-1 font-mono">
                        <code>{codeTabs[activeTab].code}</code>
                      </pre>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <Server size={12} /> Edge latency: 14ms
                      </span>
                      <span>TypeScript 5.4</span>
                    </div>
                  </div>

                  {/* Right Column: Telemetry Cards */}
                  <div className="col-span-5 space-y-3 flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3.5 rounded-2xl bg-[#11111C] border border-white/10 shadow-lg">
                        <div className="flex items-center justify-between text-zinc-400 text-[11px] mb-1">
                          <span>API Throughput</span>
                          <TrendingUp size={13} className="text-[#4ADE80]" />
                        </div>
                        <p className="text-xl font-black text-white">48,920</p>
                        <span className="text-[10px] text-emerald-400 font-medium">req/sec ↑ 24%</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#11111C] border border-white/10 shadow-lg">
                        <div className="flex items-center justify-between text-zinc-400 text-[11px] mb-1">
                          <span>SLA Uptime</span>
                          <Shield size={13} className="text-[#00D4FF]" />
                        </div>
                        <p className="text-xl font-black text-white">99.999%</p>
                        <span className="text-[10px] text-zinc-400 font-medium">Zero downtime</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#11111C] border border-white/10 space-y-2.5 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Bot size={15} className="text-[#6C63FF]" />
                          <span className="text-xs font-bold text-white">Active AI Workflows</span>
                        </div>
                        <span className="text-xs text-[#00D4FF] font-mono font-semibold">1,420 Active</span>
                      </div>

                      <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] h-full w-[88%] rounded-full animate-pulse" />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-0.5">
                        <span>Lead Qualification Rate</span>
                        <span className="text-white font-bold">94.2%</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-gradient-to-r from-[#6C63FF]/20 to-[#00D4FF]/20 border border-[#6C63FF]/40 flex items-center justify-between text-xs text-zinc-200">
                      <span className="flex items-center gap-1.5 font-medium text-[11px]">
                        <Sparkles size={13} className="text-[#00D4FF]" />
                        WhatsApp Agent V4 Pipeline
                      </span>
                      <ChevronRight size={13} className="text-zinc-400" />
                    </div>
                  </div>

                </div>
              </motion.div>

              {/* MOBILE CONTENT VIEW (Mobile AI App layout inside Orange Phone) */}
              <motion.div 
                style={{ 
                  opacity: mobileOpacity, 
                  scale: mobileScale,
                  pointerEvents: mobilePointerEvents 
                }}
                className="absolute inset-0 pt-12 pb-4 px-3.5 w-[290px] left-1/2 -translate-x-1/2 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0B0B14] to-[#11111E] origin-center"
              >
                {/* Mobile App Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#F97316] to-[#00D4FF] flex items-center justify-center text-white font-bold text-[10px] shadow-md">
                      CX
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white leading-none">Cortex Mobile AI</h4>
                      <span className="text-[8px] text-[#F97316] flex items-center gap-1 font-mono">
                        <span className="w-1 h-1 rounded-full bg-[#F97316] animate-pulse" /> Connected
                      </span>
                    </div>
                  </div>

                  <span className="px-1.5 py-0.5 rounded-full bg-orange-500/10 text-[8px] font-mono text-[#F97316] border border-orange-500/20">
                    WhatsApp Bot
                  </span>
                </div>

                {/* Mobile Feed */}
                <div className="space-y-2.5 my-auto py-1">
                  
                  {/* Lead Qualification Alert Card */}
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#141424] to-[#1C1C30] border border-[#F97316]/40 shadow-xl">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] font-semibold">
                        <UserCheck size={8} /> High Value Lead
                      </span>
                      <span className="text-[8px] text-zinc-500 font-mono">Just now</span>
                    </div>
                    <p className="text-[11px] font-bold text-white">Acme Corp ($120k ARR)</p>
                    <p className="text-[9px] text-zinc-400 mt-0.5">Automated WhatsApp meeting booked for 2:00 PM.</p>
                  </div>

                  {/* Chat Bubbles */}
                  <div className="space-y-1.5">
                    <div className="flex justify-end">
                      <div className="max-w-[88%] px-2.5 py-1.5 rounded-xl rounded-br-xs bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white text-[10px] shadow-sm">
                        Deploy AI qualification agent to WhatsApp line.
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-4 h-4 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[#F97316] shrink-0 mt-0.5">
                        <Bot size={10} />
                      </div>
                      <div className="max-w-[88%] px-2.5 py-1.5 rounded-xl rounded-bl-xs bg-[#181828] border border-white/10 text-zinc-200 text-[10px] shadow-sm">
                        Workflow deployed! ⚡ Average response latency is 12ms.
                      </div>
                    </div>
                  </div>

                  {/* Mini Stats Grid */}
                  <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                    <div className="p-2 rounded-lg bg-[#12121F] border border-white/10 text-center">
                      <span className="text-[8px] text-zinc-400 block">Conversion</span>
                      <span className="text-[11px] font-extrabold text-[#4ADE80]">94.8%</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#12121F] border border-white/10 text-center">
                      <span className="text-[8px] text-zinc-400 block">Messages</span>
                      <span className="text-[11px] font-extrabold text-[#F97316]">14.2k</span>
                    </div>
                  </div>

                </div>

                {/* Mobile Input */}
                <div className="pt-1.5 border-t border-white/10 flex items-center gap-1">
                  <div className="flex-1 px-2.5 py-1.5 rounded-full bg-[#151524] border border-white/10 text-[10px] text-zinc-400 flex items-center justify-between">
                    <span>Ask AI Agent...</span>
                    <Zap size={10} className="text-[#F97316]" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#F97316] text-white flex items-center justify-center shadow-md">
                    <Send size={10} />
                  </div>
                </div>

                {/* iPhone Bottom Bar */}
                <div className="w-16 h-1 bg-zinc-600/70 rounded-full mx-auto mt-1" />
              </motion.div>

            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}
