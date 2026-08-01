"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Laptop, 
  MessageSquare, 
  Building2, 
  ShoppingCart, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  ArrowRight
} from "lucide-react";

const products = [
  {
    id: "whatsapp",
    title: "Cortex WhatsApp Bot Studio",
    tagline: "Automated AI conversational pipelines for sales & support",
    icon: MessageSquare,
    description: "Connect your Meta WhatsApp API in seconds. Train custom AI agents to answer FAQs, qualify leads, issue invoices, and trigger backend webhooks automatically.",
    metrics: [
      { label: "Lead Response Time", value: "< 2 seconds" },
      { label: "Conversion Lift", value: "+ 340%" },
      { label: "Handled Conversations", value: "1M+ / month" }
    ],
    features: [
      "Natural language flow creation",
      "Multi-agent team routing",
      "Integrated Razorpay & Stripe checkout",
      "Real-time CRM contact sync"
    ]
  },
  {
    id: "cms",
    title: "Enterprise Custom Web Apps",
    tagline: "High-performance React & Next.js web applications",
    icon: Laptop,
    description: "Custom built web platforms with sub-50ms page load speeds, server-side rendering, and headless CMS integrations tailored for scaling enterprises.",
    metrics: [
      { label: "Lighthouse Performance", value: "99/100" },
      { label: "Global CDN Edge", value: "300+ Cities" },
      { label: "Security Compliance", value: "SOC-2 Ready" }
    ],
    features: [
      "Next.js App Router architecture",
      "Custom UI design systems",
      "Automated SEO optimization",
      "Zero-downtime CI/CD deployment"
    ]
  },
  {
    id: "proptis",
    title: "Proptis Real Estate Engine",
    tagline: "Property listing, lead management & portal automation",
    icon: Building2,
    description: "All-in-one real estate platform with interactive property search, lead distribution algorithms, site visit scheduling, and WhatsApp integration.",
    metrics: [
      { label: "Lead Qualification", value: "89%" },
      { label: "Search Speed", value: "12ms" },
      { label: "Property Views", value: "5M+" }
    ],
    features: [
      "Interactive map search & filtering",
      "Automated broker assignment",
      "Instant WhatsApp brochure sending",
      "Analytics dashboard"
    ]
  }
];

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const currentProduct = products[activeTab];

  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-grid-pattern">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-[#00D4FF] text-xs font-semibold uppercase tracking-wider">
            <Layers size={14} />
            Flagship Software Products
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Designed for Enterprise Scale & Speed
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Explore our ecosystem of custom software solutions engineered to give your business a decisive market advantage.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-[#0B0B0B] border border-white/[0.08] gap-1 overflow-x-auto max-w-full">
            {products.map((prod, idx) => {
              const IconComp = prod.icon;
              return (
                <button
                  key={prod.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                    activeTab === idx
                      ? "bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white shadow-[0_0_20px_rgba(108,99,255,0.4)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <IconComp size={16} />
                  {prod.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Showcase Window */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto rounded-3xl bg-[#0B0B0B] border border-white/[0.08] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-[#111111] border border-white/[0.08] text-[#4ADE80] text-xs font-mono">
                  {currentProduct.tagline}
                </div>

                <h3 className="text-3xl font-extrabold text-white">
                  {currentProduct.title}
                </h3>

                <p className="text-zinc-400 text-base leading-relaxed">
                  {currentProduct.description}
                </p>

                <div className="space-y-3 pt-2">
                  {currentProduct.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle2 size={16} className="text-[#00D4FF] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <a
                    href="/products"
                    className="px-6 py-3 bg-[#6C63FF] hover:bg-[#5b52e0] text-white font-bold text-xs rounded-full transition-all flex items-center gap-2"
                  >
                    View Product Specs <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Right Column: Key Metrics */}
              <div className="lg:col-span-5 space-y-4">
                {currentProduct.metrics.map((m, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#111111] border border-white/[0.08]">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">{m.label}</p>
                    <p className="text-3xl font-black text-white mt-1">{m.value}</p>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ProductShowcase;
