"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Server, 
  ShieldCheck, 
  Cpu, 
  Radio, 
  Zap, 
  Users, 
  ArrowUpRight,
  RefreshCw
} from "lucide-react";

const mockLogs = [
  { id: 1, text: "[SYS] Vector store synchronized across 12 edge nodes", time: "10:42:01", status: "success" },
  { id: 2, text: "[WA-BOT] Lead #8492 qualified -> Transferred to CRM", time: "10:42:04", status: "info" },
  { id: 3, text: "[API] Edge response latency: 18ms from us-east-1", time: "10:42:09", status: "success" },
  { id: 4, text: "[SECURITY] Zero-trust token verified -> Access granted", time: "10:42:15", status: "success" },
];

const InteractiveDashboard = () => {
  const [logs, setLogs] = useState(mockLogs);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        text: `[LIVE] Automated ping completed at ${new Date().toLocaleTimeString()} -> All Systems 100%`,
        time: new Date().toLocaleTimeString(),
        status: "success"
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 3)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-noise">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-[#4ADE80] text-xs font-semibold uppercase tracking-wider">
            <Radio size={14} className="animate-pulse" />
            Live Intelligence Telemetry
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Real-Time Command Dashboard
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Monitor infrastructure performance, active AI conversational agents, and API throughput in real time.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="max-w-6xl mx-auto rounded-3xl bg-[#0B0B0B] border border-white/[0.08] p-6 sm:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-white/[0.08] gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-base font-bold text-white font-mono">cortex.cluster.01</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">Healthy</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 font-mono">Region: Global Anycast</span>
              <button 
                onClick={() => setLogs([...mockLogs])} 
                className="p-2 rounded-xl bg-[#111111] border border-white/[0.08] hover:bg-[#181818] transition-colors text-zinc-400"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Grid Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08]">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span>Active AI Sessions</span>
                <Users size={14} className="text-[#6C63FF]" />
              </div>
              <p className="text-3xl font-extrabold text-white">14,290</p>
              <span className="text-[11px] text-emerald-400 font-mono">↑ 12% live scale</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08]">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span>Avg Latency</span>
                <Zap size={14} className="text-[#00D4FF]" />
              </div>
              <p className="text-3xl font-extrabold text-white">22ms</p>
              <span className="text-[11px] text-zinc-400 font-mono">Sub-50ms SLA</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08]">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span>Memory Load</span>
                <Cpu size={14} className="text-[#4ADE80]" />
              </div>
              <p className="text-3xl font-extrabold text-white">18.4%</p>
              <span className="text-[11px] text-emerald-400 font-mono">Optimal headroom</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08]">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span>Security Rating</span>
                <ShieldCheck size={14} className="text-emerald-400" />
              </div>
              <p className="text-3xl font-extrabold text-white">A+ SOC2</p>
              <span className="text-[11px] text-zinc-400 font-mono">0 Vulnerabilities</span>
            </div>
          </div>

          {/* Live Log Stream */}
          <div className="p-5 rounded-2xl bg-[#050505] border border-white/[0.08] font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] text-zinc-500">
              <span>LIVE LOG STREAM</span>
              <span className="text-emerald-400">CONNECTING...</span>
            </div>

            <div className="space-y-2.5">
              {logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between text-zinc-300">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500">[{log.time}]</span>
                    <span>{log.text}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InteractiveDashboard;
