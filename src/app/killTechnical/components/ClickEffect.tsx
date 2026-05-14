"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function ClickEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const colors = ["#3b82f6", "#10b981", "#ef4444", "#a855f7", "#f59e0b", "#fff", "#22c55e", "#06b6d4", "#f43f5e", "#8b5cf6", "#ec4899"];

  const handleClick = (e: MouseEvent | TouchEvent) => {
    const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const y = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newId = Date.now();

    // Naye particles add karna
    setParticles((prev) => [...prev, { id: newId, x, y, color: randomColor }]);

    // 1 second baad particle ko remove karna
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newId));
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("touchstart", handleClick);
    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("touchstart", handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <React.Fragment key={p.id}>
            {/* 1. Main Ripple Light (Main Glow) */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute rounded-full blur-xl"
              style={{
                left: p.x,
                top: p.y,
                width: "40px",
                height: "40px",
                backgroundColor: p.color,
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* 2. Chote Daane (Small Particles) */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`${p.id}-${i}`}
                initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
                animate={{
                  x: p.x + (Math.random() - 0.5) * 100,
                  y: p.y + (Math.random() - 0.5) * 100,
                  opacity: 0,
                  scale: 0,
                }}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: p.color,
                  boxShadow: `0 0 10px ${p.color}`,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            ))}
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
}