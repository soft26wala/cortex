"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Server,
  Zap,
  ShieldCheck,
  Globe,
  Database,
  Terminal,
  MessageSquare
} from "lucide-react";

export default function SoftwareAppDevSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "app" | "software" | "cloud">("all");

  const categories = [
    { id: "all", label: "All Engineering Services" },
    { id: "app", label: "📱 Mobile App Dev" },
    { id: "software", label: "💻 Enterprise Software" },
    { id: "cloud", label: "☁️ AI & Cloud SaaS" }
  ];

  const services = [
    {
      id: "mobile-app",
      category: "app",
      icon: Smartphone,
      title: "Custom Mobile App Development (iOS & Android)",
      tagline: "Ultra-fluid, high-performance cross-platform & native apps",
      description:
        "Engineered with React Native & Flutter for seamless 120fps performance, offline caching, push notifications, biometric security, and app store publishing.",
      features: [
        "iOS & Android cross-platform apps",
        "Payment gateways (Razorpay, Stripe, UPI)",
        "Real-time push notifications & analytics",
        "Play Store & App Store deployment"
      ],
      techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      badge: "Popular Service"
    },
    {
      id: "custom-software",
      category: "software",
      icon: Code2,
      title: "Enterprise Custom Software & ERP / CRM",
      tagline: "Scalable business management systems tailored to your workflow",
      description:
        "Bespoke enterprise software, inventory management, automated billing engines, and client portals built for maximum speed and data security.",
      features: [
        "Multi-tenant SaaS & ERP architecture",
        "Role-based permission & security controls",
        "Automated PDF invoicing & reporting",
        "Legacy system migration & API connectors"
      ],
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
      badge: "Enterprise Ready"
    },
    {
      id: "ai-cloud-saas",
      category: "cloud",
      icon: Cpu,
      title: "AI Automation & Custom SaaS Platforms",
      tagline: "Next-gen web applications powered by custom AI workflows",
      description:
        "Integrate LLMs, vector search, automated WhatsApp communication, and cloud microservices to automate 80%+ of repetitive manual operations.",
      features: [
        "Custom OpenAI / Claude / Local LLM integration",
        "WhatsApp Business API automation pipelines",
        "Zero-downtime CI/CD cloud deployment",
        "Real-time WebSocket & event stream architecture"
      ],
      techStack: ["Python", "FastAPI", "Docker", "AWS", "Vercel", "Redis"],
      badge: "High Converting"
    }
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  const handleWhatsAppConsultation = (serviceTitle: string) => {
    const phone = "916376930459";
    const message = `Hi Cortex Web Solutions, I am interested in custom ${serviceTitle}. Please share project details and consultation.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="custom-software-app-dev" className="py-24 bg-[#050B14] text-white relative overflow-hidden border-t border-white/5">
      {/* Background Neon Glow Effects */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[300px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Custom Engineering & Solutions
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Software Development & <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Mobile App Development
            </span>
          </h2>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            We build custom mobile apps (iOS & Android), enterprise software platforms, and scalable AI-powered cloud applications engineered for performance.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                    : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between hover:shadow-2xl hover:shadow-blue-950/40 backdrop-blur-xl"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-blue-950/80 border border-blue-500/30 text-blue-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-400 mb-3">{service.tagline}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">{service.description}</p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-6 border-t border-slate-800/80 pt-4">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mb-6">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                      Core Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 text-[10px] font-mono border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WhatsApp Call-to-action Button */}
                <button
                  onClick={() => handleWhatsAppConsultation(service.title)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  <MessageSquare className="w-4 h-4 text-white" /> Get Custom Quote on WhatsApp <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Global Bottom Tech Showcase Strip */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have a Unique Custom Project in Mind?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                From initial wireframes to App Store publishing and cloud scaling — we handle end-to-end development.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleWhatsAppConsultation("Software & App Development Project")}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-900/30 whitespace-nowrap flex items-center gap-2"
          >
            Start Project Consultation <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
