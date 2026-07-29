"use client"

import { motion } from "framer-motion"
import { Check, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Callback from "./Callback"
import { Icon } from "@iconify/react"

export default function Pricing() {
  const [iscbUpOpen, setIsCbUpOpen] = useState(false)
  const callbackRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      callbackRef.current &&
      !callbackRef.current.contains(event.target as Node)
    ) {
      setIsCbUpOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [iscbUpOpen])

  const plans = [
    {
      name: "INDIAN STOCK MARKET",
      description: "Master The Art of Indian Stock Trading",
      price: 4999,
      features: [
        "Online & Offline classes",
        "Mastery on Equity",
        "Futures & Options",
        "Backtesting",
        "Operator psychology",
        "Telegram Premium Access",
        "Revealing Price Action Trap",
        "Smart Money Concept",
      ],
      cta: "Enroll Now",
      popular: false,
      color: "#22c55e",
    },
    {
      name: "ALL IN ONE TRADING PROGRAM",
      description: "Learn Indian, Forex & Crypto Trading",
      price: 8999,
      features: [
        "All in One Access",
        "Advanced Strategy",
        "Backtesting Suite",
        "3 Sigma Strategy",
        "Personal Mentorship",
        "1-on-1 Doubt Sessions",
        "XAU/USD Mastery",
        "PERSONAL MENTORSHIP",
      ],
      cta: "Enroll Now",
      popular: true,
      color: "#3b82f6",
    },
    {
      name: "FOREX TRADING PLATFORM",
      description: "Develop Forex Operator Mindset Through Strategy",
      price: 4999,
      features: [
        "0 to Hero",
        "Basic & Advanced Knowledge",
        "Mastery on Funded Accounts",
        "Backtesting",
        "Live Trading Sessions",
        "XAU/USD Mastery",
        "Price Action Mastery",
      ],
      cta: "Enroll Now",
      popular: false,
      color: "#ef4444",
    },
    {
      name: "CRYPTO MARKET MASTERY",
      description: "Professional Crypto Trading, Strategy & Psychology",
      price: 4999,
      features: [
        "Everything in Basic",
        "Find High Potential Crypto",
        "Trade Execution & Risk Control",
        "Backtesting & Analytics",
        "Operators Psychology",
        "Live Trading Sessions",
        "BTC Advanced Strategy",
      ],
      cta: "Enroll Now",
      popular: false,
      color: "#ec4899",
    },
  ]

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#050507]">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest">
            Course Pricing & Programs
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-4">
            Unleash Your Potential
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Structured trading programs designed to take you from beginner to profitable trader.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-[2px] overflow-hidden group rounded-3xl apple-liquid-glass apple-liquid-card transition duration-500 shadow-2xl flex flex-col justify-between"
            >
              {/* Rotating Energy Border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-200%] opacity-20 group-hover:opacity-100 transition duration-500 pointer-events-none"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${plan.color}, transparent 30%, ${plan.color}, transparent 60%)`,
                }}
              />

              {/* Card Body */}
              <div className="relative bg-[#08080c] p-7 rounded-[22px] h-full z-10 flex flex-col justify-between">
                <div>
                  
                  {plan.popular && (
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-extrabold uppercase tracking-widest rounded-full">
                        ★ Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 mb-5">{plan.description}</p>

                  <div className="flex items-baseline mb-6">
                    <span className="text-3xl font-black text-white" style={{ textShadow: `0 0 15px ${plan.color}66` }}>
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-zinc-500 text-xs ml-1">/-</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 mr-2 flex-shrink-0" style={{ color: plan.color }} />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="w-full relative py-3 rounded-xl bg-zinc-900 border text-white font-bold text-xs uppercase tracking-wider overflow-hidden group/btn transition-all duration-300 active:scale-95"
                  style={{ borderColor: plan.color }}
                  onClick={() => setIsCbUpOpen(true)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Zap className="w-3.5 h-3.5 fill-current" /> {plan.cta}
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Callback Modal */}
      {iscbUpOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div ref={callbackRef} className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
            <button
              onClick={() => setIsCbUpOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <Icon icon="ic:round-close" className="text-2xl" />
            </button>
            <Callback signUpOpen={(value: boolean) => setIsCbUpOpen(value)} />
          </div>
        </div>
      )}
    </section>
  )
}