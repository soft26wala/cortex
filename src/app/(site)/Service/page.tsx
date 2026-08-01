import React from "react";
import { Metadata } from "next";
import AIFeatures from "@/components/Home/AIFeatures";
import Benefits from "@/components/Home/Benefits";
import LuxuryPricing from "@/components/Home/LuxuryPricing";
import FinalCTA from "@/components/Home/FinalCTA";
import { Sparkles, Code2, Bot, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Cortex Web Solutions",
  description: "Explore enterprise web applications, automated WhatsApp AI agents, and custom SaaS software engineering.",
};

const serviceCards = [
  {
    title: "Custom SaaS & Web Applications",
    desc: "Next.js 15 App Router architecture engineered with sub-50ms global edge latency, custom design systems, and serverless backends.",
    icon: Code2,
    badge: "Enterprise Web",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Vercel Edge"]
  },
  {
    title: "WhatsApp AI Agents & Automation",
    desc: "Autonomous Meta WhatsApp API bots trained on custom vector RAG knowledge bases for 24/7 lead qualification and checkout.",
    icon: Bot,
    badge: "AI Automation",
    tags: ["Meta WhatsApp API", "Vector RAG", "Razorpay Sync", "Lead Scoring"]
  },
  {
    title: "E-Commerce & Digital Transformation",
    desc: "High-converting online store architectures with ultra-fast product filtering, checkout optimization, and automated inventory sync.",
    icon: Layers,
    badge: "E-Commerce",
    tags: ["Headless Commerce", "Payment Gateway", "Global CDN", "Sub-1s Load"]
  }
];

export default function ServicePage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen pt-32 pb-20 bg-noise bg-grid-pattern">
      {/* Hero Header */}
      <section className="container mx-auto px-6 text-center space-y-6 mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-white/[0.08] text-[#00D4FF] text-xs font-semibold uppercase tracking-widest">
          <Sparkles size={14} className="text-[#6C63FF]" />
          Enterprise Capabilities
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto">
          World-Class Services Engineered For High Growth
        </h1>

        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          We combine cutting-edge AI pipelines with luxury frontend design to deliver software that scales effortlessly.
        </p>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-6 mb-28">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {serviceCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-[#0B0B0B] border border-white/[0.08] hover:border-[#6C63FF]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#6C63FF] group-hover:text-[#00D4FF] transition-colors">
                      <IconComponent size={24} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#111111] border border-white/[0.08] text-[#4ADE80]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00D4FF] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {card.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {card.tags.map((t, i) => (
                      <span key={i} className="text-[11px] font-mono text-zinc-400 bg-[#111111] px-2.5 py-1 rounded-md border border-white/[0.06]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="pt-4 border-t border-white/[0.08] text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-white flex items-center justify-between transition-colors"
                >
                  <span>Request Service Architecture</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <AIFeatures />
      <Benefits />
      <LuxuryPricing />
      <FinalCTA />
    </main>
  );
}
