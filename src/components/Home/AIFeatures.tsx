"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Cpu, 
  Zap, 
  Sparkles, 
  Layers, 
  Database, 
  BarChart3, 
  ShieldAlert,
  ArrowRight
} from "lucide-react";

const aiFeatures = [
  {
    icon: Bot,
    title: "Autonomous WhatsApp AI Agents",
    description: "24/7 intelligent sales & support bots that handle leads, qualify customers, and book appointments directly inside WhatsApp.",
    badge: "Sub-100ms Response",
    color: "#6C63FF"
  },
  {
    icon: Database,
    title: "Real-Time Vector RAG Pipeline",
    description: "Connect your enterprise knowledge base to customized LLM endpoints for contextual accuracy and zero hallucinations.",
    badge: "Vector Search",
    color: "#00D4FF"
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics & Ads AI",
    description: "Automated campaign optimization that tracks conversion funnels, ROAS, and user retention with zero manual input.",
    badge: "ROAS Optimizer",
    color: "#4ADE80"
  },
  {
    icon: Cpu,
    title: "Self-Healing Web Infrastructure",
    description: "Cloud edge engines that automatically detect bottlenecks, optimize asset compression, and ensure 99.99% uptime.",
    badge: "Auto Scaling",
    color: "#FF5757"
  }
];

const AIFeatures = () => {
  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-noise">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-[#6C63FF] text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            AI Intelligence Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Built with Autonomous AI Capabilities
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Replace legacy static websites with living, intelligent software platforms that actively generate revenue and automate customer interactions.
          </p>
        </div>

        {/* 2x2 Bento Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {aiFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-[#0B0B0B] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Glow Background */}
                <div 
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
                  style={{ backgroundColor: feature.color }}
                />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/[0.08] bg-[#111111]"
                      style={{ color: feature.color }}
                    >
                      <IconComponent size={28} />
                    </div>
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-mono font-semibold border border-white/[0.08] bg-[#111111]"
                      style={{ color: feature.color }}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00D4FF] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500 group-hover:text-white transition-colors">
                  <span>Explore Architecture</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AIFeatures;
