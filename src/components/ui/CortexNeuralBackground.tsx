'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function CortexNeuralBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Radial Energy Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-[140px]" />
      <div className="absolute top-2/3 right-10 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-indigo-600/15 rounded-full blur-[130px]" />

      {/* SVG Animated Neural Synapses */}
      <svg className="w-full h-full opacity-30 dark:opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Floating Connecting Lines */}
        <motion.path
          d="M 100,200 Q 300,50 500,250 T 900,100"
          fill="none"
          stroke="url(#neuralGrad)"
          strokeWidth="1.5"
          strokeDasharray="8 12"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />

        <motion.path
          d="M 200,600 Q 600,400 1000,700 T 1400,500"
          fill="none"
          stroke="url(#neuralGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
          animate={{ strokeDashoffset: [0, 100] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        {/* Pulse Synapse Nodes */}
        {[
          { cx: '15%', cy: '20%' },
          { cx: '40%', cy: '15%' },
          { cx: '70%', cy: '35%' },
          { cx: '85%', cy: '18%' },
          { cx: '25%', cy: '75%' },
          { cx: '60%', cy: '65%' },
          { cx: '88%', cy: '80%' },
        ].map((node, i) => (
          <g key={i}>
            <circle cx={node.cx} cy={node.cy} r="3" fill="#3b82f6" />
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="12"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
