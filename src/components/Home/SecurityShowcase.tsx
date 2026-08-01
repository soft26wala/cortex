"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  FileCheck, 
  Database,
  CheckCircle2
} from "lucide-react";

const securityPillars = [
  {
    title: "Zero-Trust Architecture",
    desc: "Every API request is authenticated, encrypted, and isolated to prevent lateral movement or unauthorized data access.",
    icon: Lock
  },
  {
    title: "AES-256 Data Encryption",
    desc: "Data in transit and data at rest are protected using bank-grade AES-256 bit encryption algorithms.",
    icon: Key
  },
  {
    title: "SOC-2 & GDPR Compliance",
    desc: "Strict adherence to global privacy laws, user consent management, and continuous compliance monitoring.",
    icon: FileCheck
  },
  {
    title: "Automated Daily Redundancy",
    desc: "Multi-region database snapshots with point-in-time recovery to guarantee data integrity under any scenario.",
    icon: Database
  }
];

const SecurityShowcase = () => {
  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-grid-pattern">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-6xl mx-auto rounded-3xl bg-[#0B0B0B] border border-white/[0.08] p-8 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-3xl space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck size={14} />
              Enterprise Security First
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Bank-Grade Security Built Into Every Layer
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              We protect your company assets and customer data with industry-leading security protocols.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {securityPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                    <IconComp size={22} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SecurityShowcase;
