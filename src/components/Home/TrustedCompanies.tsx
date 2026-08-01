"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const companies = [
  { name: "LINEAR", logo: "Linear" },
  { name: "VERCEL", logo: "Vercel" },
  { name: "OPENAI", logo: "OpenAI" },
  { name: "STRIPE", logo: "Stripe" },
  { name: "SUPABASE", logo: "Supabase" },
  { name: "RAYCAST", logo: "Raycast" },
  { name: "NOTION", logo: "Notion" },
  { name: "FIGMA", logo: "Figma" }
];

const TrustedCompanies = () => {
  return (
    <section className="py-16 bg-[#050505] border-y border-white/[0.08] overflow-hidden relative">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-[#6C63FF]" />
          Trusted by Next-Generation Engineering Teams & Global Enterprises
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div 
          className="flex space-x-16 items-center whitespace-nowrap animate-marquee"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {[...companies, ...companies].map((company, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 text-xl font-bold tracking-wider text-zinc-500 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-[#6C63FF]" />
              <span>{company.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
