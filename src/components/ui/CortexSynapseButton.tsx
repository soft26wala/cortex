'use client'

import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CortexSynapseButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  type?: 'button' | 'submit'
}

export function CortexSynapseButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: CortexSynapseButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition overflow-hidden shadow-lg active:scale-95'

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-600/25',
    secondary:
      'dark:bg-zinc-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white',
    outline:
      'bg-transparent border border-blue-500/30 hover:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10',
  }

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {/* Animated Synapse Pulse Ripple */}
      <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 hover:opacity-100 transition duration-300 pointer-events-none" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}
