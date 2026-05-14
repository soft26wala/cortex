"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Work() {
  const projects = [
    {
      title: "PROFESSIONAL TRADING PROGRAM",
      subtitle: "Learn Indian, Forex & Crypto Trading",
      image: "/mypic/pic1.jpeg",
      year: "2026",
      color: "#3b82f6", // Blue
    },
    {
      title: "CRYPTO MARKET MASTERY",
      subtitle: "Professional Crypto Trading, Strategy & Psychology",
      image: "/mypic/pic2.jpeg",
      year: "2026",
      color: "#10b981", // Green
    },
    {
      title: "FOREX TRADING PLATFORM",
      subtitle: "Develop Forex Operator Mindset Through Psychology & Strategy",
      image: "/mypic/pic3.jpeg",
      year: "2026",
      color: "#a855f7", // Purple
    },
    {
      title: "INDIAN STOCK MARKET",
      subtitle: "Master The Art of Indian Stock Trading",
      image: "/mypic/pic4.jpeg",
      year: "2026",
      color: "#ef4444", // Red
    },
  ];

  return (
    <section id="work" className="py-24 bg-black relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black">Institutional Archive</div>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase">
              SIGMA <br />
              <span className="text-white/20 italic">PROJECTS</span>
            </h2>
            <Link href="/#pricing">
              <button className="border border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all duration-500 flex items-center group">
                Access All Modules
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* --- PROJECTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-neutral-900 group-hover:border-white/30 transition-all duration-500">
                
                {/* Image Logic: Mobile pe colored, Desktop pe hover pe color */}
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 grayscale-0 lg:grayscale lg:group-hover:grayscale-0 group-hover:scale-105"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 lg:opacity-80 lg:group-hover:opacity-40 transition-all" />

                {/* Year Tag */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-black text-white border border-white/10">
                  EST. {project.year}
                </div>

                {/* ENROLL NOW Overlay: Mobile pe hamesha visible, Desktop pe hover par */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black to-transparent">
                  <Link href="/#pricing" className="flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-current" style={{ color: project.color }} />
                    <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">Initialize Enrollment</span>
                  </Link>
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="mt-6">
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase group-hover:text-blue-500 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-neutral-500 text-sm mt-2 max-w-sm font-medium leading-relaxed">
                  {project.subtitle}
                </p>
                {/* Animated Line */}
                <div className="h-[2px] w-12 bg-white/10 group-hover:w-24 transition-all duration-500 mt-4" style={{ backgroundColor: project.color }} />
              </div>

              {/* Mobile Decorative Glow (Only visible on mobile for feel) */}
              <div className="absolute -z-10 inset-0 blur-[60px] opacity-10 lg:opacity-0 lg:group-hover:opacity-20 transition-opacity" style={{ backgroundColor: project.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}