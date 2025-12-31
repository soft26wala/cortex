"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const NewYearCelebration = () => {
  const [showText, setShowText] = useState(false);

  // Real Fireworks Effect
  const fireFireworks = useCallback(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      // Fireworks blast from different positions
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  useEffect(() => {
    fireFireworks(); // Start fireworks immediately
    
    const showTimer = setTimeout(() => setShowText(true), 5000);
    const hideTimer = setTimeout(() => setShowText(false), 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [fireFireworks]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      
      {/* 3D Small Animated Rocket */}
      <motion.div
        animate={{ 
          y: [800, -200], 
          x: [0, 100, -50, 200],
          rotate: [0, 20, -20, 45] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 text-3xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
      >
        🚀
      </motion.div>

      {/* 3D Floating Small Popup */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateX: 45, y: 50 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="absolute bottom-10 right-10 perspective-1000"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border-b-4 border-r-4 border-yellow-600 p-4 rounded-xl shadow-[20px_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center">
              <h2 className="text-sm font-bold text-yellow-500 tracking-tighter uppercase italic">
                Happy New Year
              </h2>
              <div className="relative">
                <span className="text-4xl font-black text-white drop-shadow-[2px_2px_0px_#ca8a04]">
                  2026
                </span>
                {/* 3D depth effect using absolute layers */}
                <span className="absolute -top-[1px] -left-[1px] text-4xl font-black text-yellow-400 opacity-30">
                  2026
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default NewYearCelebration;