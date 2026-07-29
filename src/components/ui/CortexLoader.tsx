'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Sparkles } from 'lucide-react'

const LOADING_TEXTS = [
  'Initializing Cortex…',
  'Connecting Neural Network…',
  'Building Intelligence…',
  'Optimizing Experience…',
  'Launching Innovation…',
]

export function CortexLoader({ text = 'Initializing Cortex…' }: { text?: string }) {
  const [currentTextIdx, setCurrentTextIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIdx(prev => (prev + 1) % LOADING_TEXTS.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Circular Neural Ring */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer Rotating Synapse Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/40"
        />

        {/* Inner Glowing Pulse Core */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-xl shadow-blue-500/30 flex items-center justify-center"
        >
          <div className="w-full h-full bg-[#050507] rounded-[14px] flex items-center justify-center text-blue-400">
            <Cpu size={24} className="animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Sequential Text Reveal */}
      <motion.p
        key={currentTextIdx}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mt-6 flex items-center gap-2"
      >
        <Sparkles size={13} className="animate-spin text-blue-500" />
        {LOADING_TEXTS[currentTextIdx]}
      </motion.p>
    </div>
  )
}
