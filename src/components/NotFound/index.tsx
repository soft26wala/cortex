'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Cpu, WifiOff, ArrowRight, Sparkles, RefreshCw } from 'lucide-react'
import { CortexSynapseButton } from '@/components/ui/CortexSynapseButton'

const NotFound = () => {
  return (
    <section className="bg-slate-50 dark:bg-[#050507] pt-16 pb-28 px-4 transition-colors duration-300 min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      
      {/* Background Pulse Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Broken Neural Node Visual */}
        <div className="relative inline-flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-red-500/20 border border-red-500/30 backdrop-blur-2xl flex items-center justify-center shadow-2xl shadow-red-500/10"
          >
            <WifiOff size={48} className="text-red-500 animate-pulse" />
          </motion.div>

          <span className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-wider">
            Signal Severed • 404
          </span>
        </div>

        {/* Neural Error Title */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-white tracking-tight">
            Broken Neural <br />
            <span className="bg-gradient-to-r from-red-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Connection
            </span>
          </h1>
          <p className="max-w-md mx-auto text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The requested neural synapse route could not be found or has been migrated to another Cortex node.
          </p>
        </div>

        {/* Reconnect Action Button */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link href="/">
            <CortexSynapseButton variant="primary">
              <RefreshCw size={16} className="animate-spin" /> Reconnect to Cortex
            </CortexSynapseButton>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default NotFound