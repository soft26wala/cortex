'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Sun, Moon, LogIn, LogOut, UserCheck, ShieldCheck,
  ChevronRight, Sparkles, Phone, Mail, Instagram, Linkedin, Globe
} from 'lucide-react'
import { HeaderItem } from '@/types/menu'
import MobileHeaderLink from './MobileHeaderLink'
import { useTheme } from 'next-themes'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  headerData: HeaderItem[]
  isLoggedIn: boolean
  user: any
  onOpenSignIn: () => void
  onOpenSignUp: () => void
  onLogout: () => void
}

export default function MobileDrawer({
  isOpen,
  onClose,
  headerData,
  isLoggedIn,
  user,
  onOpenSignIn,
  onOpenSignUp,
  onLogout,
}: MobileDrawerProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!mounted) return null

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-2xl z-[99998] lg:hidden"
          />

          {/* Liquid Glass Sliding Drawer */}
          <motion.aside
            initial={{ x: '100%', opacity: 0.5, scale: 0.95 }}
            animate={{ x: '0%', opacity: 1, scale: 1 }}
            exit={{ x: '100%', opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.9 }}
            className="fixed top-0 right-0 h-[100dvh] w-[85%] max-w-[420px] z-[99999] lg:hidden dark:bg-zinc-900/95 bg-white/95 backdrop-blur-2xl border-l border-white/20 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden rounded-l-[32px]"
          >
            {/* Header & User Profile Bar */}
            <div className="pt-6 px-6 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    {isLoggedIn ? 'Online Member' : 'Cortex Mobile OS'}
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition active:scale-90 shadow-sm"
                  aria-label="Close mobile menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* User Identity Box */}
              <div className="p-3.5 rounded-2xl dark:bg-zinc-950/70 bg-slate-100 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {user?.name?.[0]?.toUpperCase() || (isLoggedIn ? 'U' : 'G')}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[150px]">
                      {user?.name || (isLoggedIn ? 'Cortex Member' : 'Welcome Guest')}
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      {isLoggedIn ? (user?.email || 'Authenticated User') : 'Sign in for full access'}
                    </p>
                  </div>
                </div>

                {!isLoggedIn ? (
                  <button
                    onClick={() => {
                      onOpenSignIn()
                      onClose()
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] rounded-lg shadow-sm active:scale-95 transition"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onLogout()
                      onClose()
                    }}
                    className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-xs font-bold transition"
                    title="Logout"
                  >
                    <LogOut size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Main Navigation Links */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Navigation</p>
              
              {headerData.map((item, index) => (
                <div key={index} className="py-1">
                  <MobileHeaderLink item={item} setNavbarOpen={onClose} />
                </div>
              ))}

              {!isLoggedIn && (
                <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                  <button
                    onClick={() => {
                      onOpenSignIn()
                      onClose()
                    }}
                    className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <LogIn size={15} /> Sign In to Account
                  </button>
                  <button
                    onClick={() => {
                      onOpenSignUp()
                      onClose()
                    }}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                  >
                    <Sparkles size={15} /> Create Free Account
                  </button>
                </div>
              )}
            </div>

            {/* Footer Section */}
            <div className="p-6 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-4 flex-shrink-0">
              
              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 active:scale-98 transition"
              >
                <span className="flex items-center gap-2">
                  {theme === 'dark' ? <Moon size={15} className="text-blue-400" /> : <Sun size={15} className="text-amber-500" />}
                  Theme Mode: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </span>
                <span className="text-[10px] text-zinc-400 uppercase font-mono">Toggle</span>
              </button>

              {/* Contact & Social Links */}
              <div className="flex items-center justify-between pt-2 text-xs text-zinc-400">
                <a
                  href="mailto:cortexwebsolution@gmail.com"
                  className="flex items-center gap-1.5 hover:text-blue-400 transition"
                >
                  <Mail size={14} /> Contact Team
                </a>

                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/cortestack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-blue-400 transition"
                  >
                    <Instagram size={14} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/cortex-web-solutions-349459399"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-blue-400 transition"
                  >
                    <Linkedin size={14} />
                  </a>
                </div>
              </div>

            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )

  return createPortal(drawerContent, document.body)
}
