"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Github,
  Mail,
  Sparkles,
  Crown,
  ShieldCheck,
  Code,
  Zap,
  Palette,
  Terminal,
  ArrowUpRight
} from "lucide-react";

interface TeamMember {
  name: string;
  primaryRole: string;
  badge: string;
  roles: string[];
  image: string;
  bio: string;
  stats?: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
  highlight?: boolean;
}

const teamMembers: TeamMember[] = [
  {
    name: "Anmol Singh Thind",
    primaryRole: "Founder & CEO / CTO",
    badge: "Founder & Architect",
    roles: ["Fullstack Engineer", "Neural AI", "Cloud Systems"],
    image: "/images/hero/anmolin.png",
    bio: "Architecting high-scale enterprise platforms, multi-tenant microservices, and neural AI automation engines.",
    stats: "8+ Yrs Enterprise Tech",
    highlight: true,
    socials: {
      linkedin: "https://www.linkedin.com/in/cortex-web-solutions-349459399",
      twitter: "https://twitter.com",
      github: "https://github.com",
      email: "mailto:anmol@cortexwebsolutions.com",
    },
  },
  {
    name: "Gurvinder Singh Thind",
    primaryRole: "Co-founder & COO",
    badge: "Co-Founder",
    roles: ["Operations", "Strategic Growth", "Client Delivery"],
    image: "/images/tech.jpeg",
    bio: "Managing operational excellence, agency scaling, cross-border partnerships, and enterprise client execution.",
    stats: "Operations Lead",
    highlight: false,
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:gurvinder@cortexwebsolutions.com",
    },
  },
  {
    name: "Jaskreet Singh Thind",
    primaryRole: "Co-founder & CMO",
    badge: "Co-Founder",
    roles: ["Performance Marketing", "Meta Ads", "Brand Strategy"],
    image: "/images/about/jas.png",
    bio: "Scaling high-converting user acquisition pipelines, performance marketing campaigns, and market visibility.",
    stats: "Growth Strategist",
    highlight: false,
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:jaskreet@cortexwebsolutions.com",
    },
  },
  {
    name: "Gurkireet Singh",
    primaryRole: "Creative Director",
    badge: "Media Lead",
    roles: ["Video Editing", "Visual Production", "Motion Graphics"],
    image: "/images/hero/gurkreet.jpeg",
    bio: "Crafting high-converting visual assets, dynamic video productions, and immersive brand storytelling.",
    stats: "Visual Producer",
    highlight: false,
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Pawan Kumar",
    primaryRole: "Lead UI/UX Designer",
    badge: "Design Architect",
    roles: ["Apple-Grade UI", "Design Systems", "Prototyping"],
    image: "/images/hero/pawan.jpeg",
    bio: "Designing modern, luxury user experiences, ultra-fluid interfaces, and interactive web component systems.",
    stats: "Product Design",
    highlight: false,
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Dharamveer Singh",
    primaryRole: "Lead QA & Automation",
    badge: "Quality Engineering",
    roles: ["Zero-Defect QA", "Performance Load", "Security Audit"],
    image: "/images/hero/dharmveer.jpeg",
    bio: "Ensuring flawless release deployments, high-load stress testing, and uncompromising platform security.",
    stats: "Quality Control",
    highlight: false,
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
];

const LuxuryTeam = () => {
  return (
    <section className="py-32 bg-[#050505] text-white relative overflow-hidden selection:bg-[#6C63FF]/30">
      {/* Background Lighting & Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#6C63FF]/15 via-[#00D4FF]/10 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 blur-[140px] pointer-events-none rounded-full" />
      
      {/* Luxury Subtle Mesh Grid background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111115] border border-white/[0.1] shadow-2xl text-[#00D4FF] text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles size={14} className="text-[#6C63FF] animate-pulse" />
            <span>World-Class Leadership & Minds</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight"
          >
            Engineers & Visionaries Behind{" "}
            <span className="bg-gradient-to-r from-[#6C63FF] via-[#00D4FF] to-[#38BDF8] bg-clip-text text-transparent">
              Cortex
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            A elite team of software architects, UI designers, and growth experts building next-generation digital experiences and enterprise AI engines.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="h-full"
            >
              <div
                className={`relative group h-full rounded-3xl p-7 bg-[#0B0B0F]/90 backdrop-blur-xl border transition-all duration-500 flex flex-col justify-between overflow-hidden ${
                  member.highlight
                    ? "border-[#6C63FF]/40 shadow-[0_0_40px_rgba(108,99,255,0.15)] hover:border-[#6C63FF] hover:shadow-[0_0_60px_rgba(108,99,255,0.25)]"
                    : "border-white/[0.08] hover:border-white/[0.25] hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                }`}
              >
                {/* Background Hover Flare */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-[#6C63FF]/20 to-[#00D4FF]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div>
                  {/* Top Badge & Status Row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-zinc-300 group-hover:border-[#6C63FF]/40 group-hover:text-white transition-colors">
                      {member.highlight ? (
                        <Crown size={12} className="text-amber-400" />
                      ) : (
                        <ShieldCheck size={12} className="text-[#00D4FF]" />
                      )}
                      {member.badge}
                    </span>

                    {member.stats && (
                      <span className="text-[11px] font-medium text-zinc-500 tracking-wide font-mono">
                        {member.stats}
                      </span>
                    )}
                  </div>

                  {/* Profile Avatar Frame */}
                  <div className="relative w-28 h-28 mx-auto mb-6">
                    {/* Ring Glow Gradient */}
                    <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#6C63FF] via-[#00D4FF] to-purple-600 opacity-60 group-hover:opacity-100 blur-sm transition-all duration-500" />
                    
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/20">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Active Pulse Dot */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0B0B0F] shadow-[0_0_10px_#10B981]" />
                  </div>

                  {/* Name & Primary Role */}
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-black text-white group-hover:text-[#00D4FF] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#6C63FF] mt-1 tracking-wide">
                      {member.primaryRole}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-zinc-400 text-xs sm:text-sm text-center leading-relaxed mb-6 font-normal">
                    {member.bio}
                  </p>

                  {/* Role Tags */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-8">
                    {member.roles.map((role, rIdx) => (
                      <span
                        key={rIdx}
                        className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-[#14141A] text-zinc-300 border border-white/[0.06] group-hover:border-[#6C63FF]/30 transition-colors"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Social Actions */}
                <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    Connect Direct
                  </span>

                  <div className="flex items-center gap-2">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-xl bg-[#14141A] hover:bg-[#6C63FF] text-zinc-400 hover:text-white border border-white/[0.08] flex items-center justify-center transition-all duration-300 hover:scale-110"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin size={14} />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-xl bg-[#14141A] hover:bg-[#00D4FF] text-zinc-400 hover:text-white border border-white/[0.08] flex items-center justify-center transition-all duration-300 hover:scale-110"
                        aria-label={`${member.name} Twitter`}
                      >
                        <Twitter size={14} />
                      </a>
                    )}
                    {member.socials.email && (
                      <a
                        href={member.socials.email}
                        className="w-8 h-8 rounded-xl bg-[#14141A] hover:bg-emerald-500 text-zinc-400 hover:text-white border border-white/[0.08] flex items-center justify-center transition-all duration-300 hover:scale-110"
                        aria-label={`${member.name} Email`}
                      >
                        <Mail size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryTeam;
