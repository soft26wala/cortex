"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Compass, 
  Palette, 
  Code, 
  CheckCircle, 
  Rocket,
  Clock
} from "lucide-react";

const steps = [
  {
    phase: "Phase 01",
    title: "Discovery & Strategic Roadmap",
    timeframe: "Week 1",
    desc: "We analyze your target market, user persona journeys, tech stack requirements, and conversion goals to craft a flawless product spec.",
    icon: Compass
  },
  {
    phase: "Phase 02",
    title: "Luxury UI/UX Design System",
    timeframe: "Week 2",
    desc: "Our senior designers craft custom Figma mockups, dark mode liquid glass interactions, micro-animations, and high-converting typography.",
    icon: Palette
  },
  {
    phase: "Phase 03",
    title: "Next.js & AI Engine Development",
    timeframe: "Weeks 3 - 4",
    desc: "We engineer pixel-perfect frontend code, integrate WhatsApp AI bots, set up vector databases, and implement secure REST/GraphQL APIs.",
    icon: Code
  },
  {
    phase: "Phase 04",
    title: "Load Testing & QA Audit",
    timeframe: "Week 5",
    desc: "End-to-end security audits, Lighthouse 90+ speed tuning, mobile responsiveness verification, and zero-downtime deployment pipelines.",
    icon: CheckCircle
  },
  {
    phase: "Phase 05",
    title: "Global Launch & Scaling",
    timeframe: "Continuous",
    desc: "We deploy to Vercel/AWS Edge CDN, enable real-time telemetry analytics, and provide ongoing engineering support.",
    icon: Rocket
  }
];

const WorkflowTimeline = () => {
  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-grid-pattern">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-[#6C63FF] text-xs font-semibold uppercase tracking-wider">
            <Clock size={14} />
            Execution Roadmap
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our 5-Step Engineering Workflow
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            From initial concept to global edge deployment in under 30 days.
          </p>
        </div>

        {/* Timeline Sequence */}
        <div className="max-w-4xl mx-auto relative space-y-8">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#6C63FF] via-[#00D4FF] to-[#4ADE80] hidden sm:block" />

          {steps.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8 rounded-3xl bg-[#0B0B0B] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 relative group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#00D4FF] flex-shrink-0 relative z-10">
                  <IconComp size={22} />
                </div>

                <div className="space-y-2 flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#6C63FF] uppercase font-bold">{s.phase}</span>
                    <span className="text-xs font-mono text-zinc-500 bg-[#111111] px-2.5 py-1 rounded-full border border-white/[0.08]">{s.timeframe}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{s.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WorkflowTimeline;
