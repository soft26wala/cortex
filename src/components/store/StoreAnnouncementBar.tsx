'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const MESSAGES = [
  '✨ Handmade • Personalized • Made With Love',
  '🎨 Custom Orders Available — Designed Around Your Story',
  '💎 Every Piece Is Made For You — Never Made Twice',
  '🌹 Premium Handmade Resin & Floral Preservation Art'
];

export const StoreAnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#070709] border-b border-[#D4AF37]/20 py-2.5 px-4 overflow-hidden text-center relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs md:text-sm font-medium tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 animate-pulse" />
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-[#F5F0EB]/90 font-light"
          >
            {MESSAGES[index]}
          </motion.span>
        </AnimatePresence>
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 animate-pulse" />
      </div>
    </div>
  );
};
