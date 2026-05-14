"use client"

import { motion } from "framer-motion"
import { Check, Link, Zap } from "lucide-react"
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import Callback from "./Callback";

export default function Pricing() {
  const [iscbUpOpen, setIsCbUpOpen] = useState(false);
    const callbackRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {


        // Close Callback Modal
        if (
            callbackRef.current &&
            !callbackRef.current.contains(event.target as Node)
        ) {
            setIsCbUpOpen(false);
        }

    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [iscbUpOpen]);

    // close popup on outside click
    const handleOutsideClick = (e: MouseEvent) => {
        if (callbackRef.current && !callbackRef.current.contains(e.target as Node)) {
            setIsCbUpOpen(false);
        }
    };

    useEffect(() => {
        if (iscbUpOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [iscbUpOpen]);



  const plans = [
    {
      name: "INDIAN STOCK MARKET",
      description: "Master The Art of Indian Stock Trading",
      price: 4999,
      features: ["Online & Offline classes", "Mastery on Equity", "futures & Options", " Backtesting", "Operator psychology", "Add Telegram Premi Group Access","Reavling price action trap","Smart Money Concept"],
      cta: "Buy Now",
      popular: false,
      color: "#22c55e", // Green Power
    },
    {
      name: "ALL IN ONE TRADING PROGRAM",
      description: "Learn Indian, Forex & Crypto Trading",
      price: 8999,
      features: ["All in one ", "Advanced strategy", "Backtestingt", "3 Sigma stragedy", "Personalmentorship", "One on One doubt session", "Advanced stragedy","PERSONAL MENTORSHIP"],
      cta: "Buy Now",
      popular: true,
      color: "#3b82f6", // Blue Power
    },
    {
      name: "FOREX TRADING PLATFORM",
      description: "Develop Forex Operator Mindset Through Psychology & Strategy",
      price: 4999,
      features: ["0 to Hero", "Basic knowledge", "Advanced trading strategy", "astery on funded account", "Backtesting", "Live Trading Session", "XAU/USD Mastery","PRICE ACTION", ],
      cta: "Buy Now",
      popular: false,
      color: "#ef4444", // Red Power
    },
    {
      name: "CRYPTO MARKET MASTERY",
      description: "Professional Crypto Trading, Strategy & Psychology",
      price: 4999,
      features: ["Everything in Basic", "How to find best crypto", "How to trade in crypto", "3 Backtesting", "Operators psychology", "How to make a crypto mastery","Live trading session","BTC advanced strategy"],
      cta: "Buy Now",
      popular: false,
      color: "#ec4899", // Pink Power
    },
  ]

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-black">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Course Pricing <br />
            <span className="text-white/50 text-3xl">Unleash Your Potential</span>
          </h2>
        </motion.div>

        <div className="flex md:grid md:grid-cols-4 gap-8 overflow-x-auto pb-12 snap-x scrollbar-hide">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative p-[2px] overflow-hidden group min-w-[85%] md:min-w-full snap-center"
            >
              {/* 1. ALWAYS ROTATING ENERGY BORDER */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-200%] opacity-100"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${plan.color}, transparent 20%, ${plan.color}, transparent 50%)`,
                }}
              />

              {/* Card Main Body */}
              <div className="relative bg-[#050505] p-8 h-full z-10 flex flex-col">
                
                {/* 2. CENTER POWER ORB (The "Bulb" Effect) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0 overflow-hidden">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-[60px]"
                    style={{ backgroundColor: plan.color }}
                  />
                  {/* The Bright Core (White Center) */}
                  <motion.div
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_10px_#fff]"
                    style={{ boxShadow: `0_0_30px_15px_#fff, 0_0_60px_30px_${plan.color}` }}
                  />
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-black text-white" style={{ textShadow: `0 0 20px ${plan.color}` }}>₹{plan.price}</span>
                    <span className="text-white/40 ml-2">/-</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center text-sm text-white/70">
                        <Check className="w-4 h-4 mr-2" style={{ color: plan.color }} /> {f}
                      </li>
                    ))}
                  </ul>

                  {/* 3. SUPERPOWER BUTTON */}
                  <button
                    className="w-full mt-auto relative py-4 bg-transparent border-2 overflow-hidden group/btn transition-all duration-300"
                    style={{ borderColor: plan.color }}
                     onClick={() => {
                setIsCbUpOpen(true); // Open the callback modal
              }}
                  >
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 h-full w-20 skew-x-[-20deg] opacity-50"
                      style={{ background: `linear-gradient(90deg, transparent, white, transparent)` }}
                    />
                    <span className="relative z-10 text-white font-bold tracking-[3px] uppercase text-[10px] flex items-center justify-center gap-2">
                      <Zap className="w-3 h-3 fill-current" /> {plan.cta}
                    </span>
                    {/* Button Glow on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" style={{ backgroundColor: plan.color, filter: 'blur(20px)' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Callback Modal Rendering */}
        {iscbUpOpen && (
          <div
            ref={callbackRef}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 !m-0"
          >
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-black px-8 py-14 text-center">
              <button
                onClick={() => setIsCbUpOpen(false)} 
                className=" hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full absolute top-16 -right-3 mr-8 mt-8"
                aria-label="Close Request Callback Modal"
              >
                <Icon icon="ic:round-close" className="text-2xl dark:text-white" />
              </button>
              {/* Assuming RequestCallback can take a prop to handle its closing */}
              
              <Callback signUpOpen={(value: boolean) => setIsCbUpOpen(value)} />
            </div>
          </div>
        )}
    </section>
  )
}