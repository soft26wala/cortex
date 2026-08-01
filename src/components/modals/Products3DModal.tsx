"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Laptop, 
  MessageSquare, 
  Building2, 
  Newspaper, 
  GraduationCap,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface Products3DModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const productsData = [
  {
    id: "news-portal",
    name: "News Portal CMS",
    icon: Newspaper,
    tagline: "High-Speed Publishing & Content Management System",
    desc: "Complete news portal with instant PostgreSQL sync, dynamic slug generation, breaking news banners, and rich text editor.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    launchLink: "/projects/news-portal",
    adminLink: "/projects/news-portal/admin"
  },
  {
    id: "edtech-lms",
    name: "EdTech LMS Platform",
    icon: GraduationCap,
    tagline: "Multi-Role Online Learning & Course Delivery",
    desc: "Online learning system with 3-role dashboards (Admin, Teacher, Student), HLS video streaming, auto-graded quizzes, and Razorpay.",
    tech: ["Next.js", "Express", "PostgreSQL", "Razorpay"],
    launchLink: "/projects/edtech",
    adminLink: "/projects/edtech/admin"
  },
  {
    id: "whatsapp-bot",
    name: "WhatsApp Automation SaaS",
    icon: MessageSquare,
    tagline: "Visual Flow Builder & Automated WhatsApp Messaging",
    desc: "Enterprise WhatsApp Business platform with node-based chatbot flow builder, contact CRM, and Meta Graph API integration.",
    tech: ["Next.js", "React Flow", "Meta API", "Socket.io"],
    launchLink: "/whatsapp-bot",
    adminLink: "/whatsapp-bot/admin"
  },
  {
    id: "proptis",
    name: "Proptis Real Estate Engine",
    icon: Building2,
    tagline: "Property Discovery & Owner Management Portal",
    desc: "Comprehensive property portal with category search, property posting wizard, broker lead routing, and owner dashboard.",
    tech: ["Next.js", "Zustand", "PostgreSQL", "Tailwind"],
    launchLink: "/proptis",
    adminLink: "/proptis/dashboard"
  }
];

export default function Products3DModal({ isOpen, onClose }: Products3DModalProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeProduct = productsData[selectedIdx];
  const IconComponent = activeProduct.icon;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl rounded-3xl bg-[#0B0B0B] border border-white/[0.1] shadow-[0_30px_100px_rgba(0,212,255,0.2)] overflow-hidden flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#111111] border border-white/[0.1] text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          {/* Left Column: Product Selector Tabs */}
          <div className="md:w-5/12 p-6 bg-[#050505] border-b md:border-b-0 md:border-r border-white/[0.08] flex flex-col justify-between space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles size={12} className="animate-spin text-[#6C63FF]" />
                3D Interactive Products Showroom
              </div>

              <h2 className="text-2xl font-black text-white">Digital Product Catalog</h2>
              <p className="text-zinc-400 text-xs mt-1">Select a software product to test specs and launch portals instantly.</p>

              <div className="mt-6 space-y-2">
                {productsData.map((prod, idx) => {
                  const ProdIcon = prod.icon;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedIdx(idx)}
                      className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3 ${
                        selectedIdx === idx
                          ? "bg-[#111111] border-[#6C63FF] shadow-[0_0_20px_rgba(108,99,255,0.2)] text-white"
                          : "bg-transparent border-white/[0.06] text-zinc-400 hover:text-white"
                      }`}
                    >
                      <div className={`p-2 rounded-xl border ${selectedIdx === idx ? "bg-[#6C63FF]/20 border-[#6C63FF] text-[#00D4FF]" : "bg-[#111111] border-white/[0.08] text-zinc-400"}`}>
                        <ProdIcon size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold">{prod.name}</h4>
                        <p className="text-[10px] text-zinc-500 truncate max-w-[180px]">{prod.tagline}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Link
                href="/products"
                onClick={onClose}
                className="w-full py-3 rounded-full bg-[#111111] border border-white/[0.1] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#181818] transition-colors"
              >
                View Full Products Showcase <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Selected Product Spec & Launch */}
          <div className="md:w-7/12 p-8 bg-[#0B0B0B] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#00D4FF]">
                  <IconComponent size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white">{activeProduct.name}</h3>
                  <p className="text-xs text-[#00D4FF] font-semibold">{activeProduct.tagline}</p>
                </div>
              </div>

              <p className="text-zinc-300 text-xs leading-relaxed p-4 rounded-2xl bg-[#050505] border border-white/[0.08]">
                {activeProduct.desc}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-mono uppercase text-zinc-500 font-bold">Tech Stack & Architecture:</p>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.tech.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-[#111111] border border-white/[0.08] text-xs font-mono text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center gap-4">
              <Link
                href={activeProduct.launchLink}
                onClick={onClose}
                className="flex-1 py-3.5 px-4 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-xs shadow-lg hover:shadow-[0_0_25px_rgba(108,99,255,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink size={14} /> Launch Product App
              </Link>

              <Link
                href={activeProduct.adminLink}
                onClick={onClose}
                className="py-3.5 px-5 rounded-full bg-[#111111] hover:bg-[#181818] text-zinc-300 hover:text-white font-semibold text-xs border border-white/[0.08] transition-all flex items-center justify-center gap-2"
              >
                <Layers size={14} /> Admin Portal
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
