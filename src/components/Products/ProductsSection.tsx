"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, CheckCircle2, Layers, Filter } from "lucide-react";

export interface PortfolioProject {
  id: string;
  title: string;
  website: string;
  category: "Healthcare" | "Industrial" | string;
  categoryLabel: string;
  status: "Live" | "In Development";
  description: string;
  tags: string[];
  accentColor: string;
  screenshotUrl?: string;
}

export const REAL_PROJECTS: PortfolioProject[] = [
  {
    id: "anant-ayurveda",
    title: "Anant Ayurveda",
    website: "https://www.anantayurvedaa.com/",
    category: "Healthcare",
    categoryLabel: "Healthcare / Ayurveda",
    status: "Live",
    description:
      "Modern healthcare platform for holistic Ayurvedic treatments, wellness consultations, and authentic natural wellness products.",
    tags: ["Next.js", "React", "Tailwind CSS", "Node.js"],
    accentColor: "#10b981", // Emerald Green
    screenshotUrl: "https://api.microlink.io/?url=https%3A%2F%2Fwww.anantayurvedaa.com%2F&screenshot=true&embed=screenshot.url",
  },
  {
    id: "gk-enterprise",
    title: "GK Enterprise",
    website: "https://www.gkenterpris.com/",
    category: "Industrial",
    categoryLabel: "Industrial Products",
    status: "Live",
    description:
      "Enterprise B2B portal for premium industrial tools, machinery, and manufacturing supply chain solutions.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
    accentColor: "#3b82f6", // Electric Blue
    screenshotUrl: "https://api.microlink.io/?url=https%3A%2F%2Fwww.gkenterpris.com%2F&screenshot=true&embed=screenshot.url",
  },
];

const CATEGORIES = ["All", "Healthcare", "Industrial"];

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = REAL_PROJECTS.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section className="py-24 bg-[#050507] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-2">
            <Sparkles size={14} className="text-blue-400 animate-pulse" />
            Client Showcase & Portfolio
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-4 mb-4">
            Real Projects.{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Real Impact.
            </span>
          </h2>
          
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Explore live digital platforms designed and engineered by Cortex Web Solutions for industry leaders.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-16 flex-wrap"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30"
                  : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat === "All" ? "All Projects" : cat}
            </button>
          ))}
        </motion.div>

        {/* Project Cards Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition duration-500 overflow-hidden"
                >
                  {/* Glowing Hover Gradient Border */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none blur-2xl"
                    style={{
                      background: `radial-gradient(circle at top right, ${project.accentColor}30 0%, transparent 70%)`,
                    }}
                  />

                  <div>
                    {/* Top Row: Category Label & Live Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                        style={{
                          borderColor: `${project.accentColor}40`,
                          color: project.accentColor,
                          backgroundColor: `${project.accentColor}15`,
                        }}
                      >
                        {project.categoryLabel}
                      </span>

                      {/* Floating Live Badge */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        Live Website
                      </span>
                    </div>

                    {/* Screenshot Preview Container */}
                    <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 mb-6 aspect-video group-hover:border-zinc-700 transition">
                      <img
                        src={project.screenshotUrl}
                        alt={`${project.title} screenshot`}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition duration-700"
                        onError={(e) => {
                          // Fallback styled placeholder if screenshot fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                      
                      {/* Fallback Display if image doesn't load */}
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 flex flex-col justify-between -z-10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-zinc-500">{project.website}</span>
                          <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-white">{project.title}</h3>
                          <p className="text-xs text-zinc-400 mt-1">{project.categoryLabel}</p>
                        </div>
                      </div>

                      {/* Hover Overlay Button */}
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 bg-white text-zinc-900 font-bold text-xs rounded-xl shadow-xl flex items-center gap-2 hover:bg-zinc-100 transition transform hover:scale-105"
                        >
                          Visit Website <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>

                    {/* Project Title & Description */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-950 border border-zinc-800 text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visit Website CTA */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-mono truncate max-w-[200px]">
                      {project.website.replace("https://", "").replace("/", "")}
                    </span>

                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/30 active:scale-95"
                    >
                      Visit Website <ExternalLink size={14} />
                    </a>
                  </div>

                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State for Future Categories */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 bg-zinc-900/60 border border-zinc-800 rounded-3xl text-center max-w-md mx-auto"
            >
              <Layers size={32} className="text-zinc-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">More Projects Coming Soon</h3>
              <p className="text-xs text-zinc-400">
                We are constantly shipping new digital platforms. Check back soon!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
