"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Growth SaaS",
    tagline: "Ideal for growing startups & specialized web apps",
    priceMonthly: "$1,499",
    priceYearly: "$1,199",
    features: [
      "Custom Next.js 15 Web Application",
      "Sub-50ms Global Edge CDN",
      "Basic WhatsApp AI Bot Pipeline",
      "Lighthouse 95+ Speed Score",
      "Standard 24/7 Slack Support"
    ],
    highlight: false,
    cta: "Start Growth Plan"
  },
  {
    name: "Enterprise Core",
    tagline: "Full AI & custom software architecture",
    priceMonthly: "$3,499",
    priceYearly: "$2,999",
    features: [
      "Everything in Growth SaaS",
      "Autonomous WhatsApp AI Agents",
      "Vector RAG Knowledge Base Search",
      "Integrated Payment & CRM Webhooks",
      "SOC-2 Compliant Security Setup",
      "Dedicated Senior Architect"
    ],
    highlight: true,
    cta: "Deploy Enterprise Platform"
  },
  {
    name: "Custom Agency",
    tagline: "Dedicated engineering team for complex ecosystems",
    priceMonthly: "Custom",
    priceYearly: "Custom",
    features: [
      "Multi-tenant SaaS Architecture",
      "Custom Microservice Infrastructure",
      "Unlimited AI Agent Training",
      "Custom SLA & Uptime Guarantee",
      "15-Minute Dedicated Support SLA",
      "White-Glove Migration Services"
    ],
    highlight: false,
    cta: "Schedule Architecture Call"
  }
];

const LuxuryPricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-noise">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-[#00D4FF] text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            Predictable Enterprise Investment
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Transparent Pricing Built For Scale
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            No hidden fees. Choose a plan that matches your growth velocity.
          </p>

          {/* Toggle */}
          <div className="pt-4 flex justify-center">
            <div className="p-1 rounded-full bg-[#0B0B0B] border border-white/[0.08] inline-flex items-center gap-2">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${!isYearly ? "bg-[#111111] text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${isYearly ? "bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                Yearly Billing
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">Save 20%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-8 rounded-3xl bg-[#0B0B0B] border transition-all duration-300 flex flex-col justify-between relative ${
                plan.highlight 
                  ? "border-[#6C63FF] shadow-[0_0_50px_rgba(108,99,255,0.25)]" 
                  : "border-white/[0.08] hover:border-white/[0.2]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                  Most Popular Enterprise Choice
                </div>
              )}

              <div>
                <h3 className="text-2xl font-extrabold text-white">{plan.name}</h3>
                <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">{plan.tagline}</p>

                <div className="mt-6 mb-8">
                  <span className="text-4xl font-black text-white">
                    {isYearly ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  {plan.priceMonthly !== "Custom" && <span className="text-xs text-zinc-500 font-mono"> / month</span>}
                </div>

                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-xs text-zinc-300">
                      <Check size={14} className="text-[#4ADE80] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-white/[0.08]">
                <Link
                  href="/contact"
                  className={`w-full py-3.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    plan.highlight
                      ? "bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white shadow-[0_0_20px_rgba(108,99,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)]"
                      : "bg-[#111111] hover:bg-[#181818] text-white border border-white/[0.08]"
                  }`}
                >
                  {plan.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LuxuryPricing;
