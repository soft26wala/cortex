"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Heart, GripVertical } from "lucide-react";

export default function IndependenceDayCelebration() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.04, cursor: "grabbing" }}
      className="fixed left-6 bottom-10 z-[999999] hidden lg:block select-none cursor-grab"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isMinimized ? (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0B0B0F]/90 border border-[#FF9933]/50 shadow-[0_0_20px_rgba(255,153,51,0.3)] hover:scale-105 transition-all cursor-pointer backdrop-blur-xl group"
          title="Drag anywhere or click to open 15th August Celebration"
        >
          <GripVertical size={13} className="text-zinc-400 group-hover:text-white" />
          <div className="w-6 h-4 rounded shadow-sm overflow-hidden flex flex-col border border-white/20 relative animate-pulse">
            <div className="h-1.5 bg-[#FF9933]" />
            <div className="h-1.5 bg-white relative flex items-center justify-center">
              <div className="w-1 h-1 rounded-full border-[0.5px] border-[#000080]" />
            </div>
            <div className="h-1.5 bg-[#138808]" />
          </div>
          <span className="text-[11px] font-extrabold bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent">
            15 AUG 🇮🇳
          </span>
        </button>
      ) : (
        <div className="relative w-64 p-4 rounded-3xl bg-[#0B0B0F]/95 border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-left space-y-3 group hover:border-[#FF9933]/50 transition-all duration-300">
          {/* Ambient Tricolor Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF9933]/30 via-white/10 to-[#138808]/30 rounded-3xl blur-xl opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity" />

          {/* Top Controls: Drag Grip & Minimize */}
          <div className="flex items-center justify-between z-10 relative pb-1 border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
              <GripVertical size={13} className="text-zinc-400" />
              <span>Drag Anywhere</span>
            </div>
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Minimize 15th August Badge"
            >
              <X size={14} />
            </button>
          </div>

          {/* Header Title with Waving Flag */}
          <div className="relative z-10 flex items-center gap-3">
            {/* Animated Waving Indian Flag */}
            <div className="relative w-10 h-7 rounded-md overflow-hidden border border-white/30 shadow-md flex flex-col flex-shrink-0 animate-bounce duration-1000">
              <div className="h-[33.3%] bg-[#FF9933]" />
              <div className="h-[33.3%] bg-white relative flex items-center justify-center">
                {/* 24 Spoke Ashoka Chakra SVG */}
                <svg className="w-2.5 h-2.5 text-[#000080] animate-spin duration-[8000ms]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
                  {Array.from({ length: 24 }).map((_, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 45 * Math.cos((i * 15 * Math.PI) / 180)}
                      y2={50 + 45 * Math.sin((i * 15 * Math.PI) / 180)}
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  ))}
                </svg>
              </div>
              <div className="h-[33.3%] bg-[#138808]" />
            </div>

            <div>
              <div className="inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-[#FF9933] via-white to-[#138808] text-black shadow-sm">
                15th August
              </div>
              <h4 className="text-xs font-black text-white mt-0.5">
                Happy Independence Day 🇮🇳
              </h4>
            </div>
          </div>

          {/* Description & Patriotic Message */}
          <div className="relative z-10 text-[11px] text-zinc-300 leading-relaxed bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.06]">
            Celebrating 79 Years of Freedom & Innovation at <strong className="text-white">Cortex Web Solutions</strong>!
          </div>

          {/* Bottom Footer Badge */}
          <div className="relative z-10 flex items-center justify-between pt-1 border-t border-white/[0.08] text-[10px]">
            <span className="font-extrabold bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent flex items-center gap-1">
              <Heart size={11} className="text-[#FF9933] fill-[#FF9933]" /> Vande Mataram
            </span>
            <span className="text-zinc-500 font-mono">#JaiHind</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
