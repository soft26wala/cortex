"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position state for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothing the movement
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const steps = [
    { number: "01", title: "Basic", description: "Indian market, Forex market, Investing, Commodities, Currency, and Crypto Market, etc." },
    { number: "02", title: "Psychology", description: "Retailers Psychology, Operator Psychology, Price Action Psychology, Trap Trading psychology, etc." },
    { number: "03", title: "Price action", description: "Candlestick Patterns, Chart Patterns, Support and Resistance, Indicators, etc." },
    { number: "04", title: "Advance Strategies", description: "Smart Money Concept, Inner Circle trading, Mastering liquidity, Intraday Strategy, Risk management, etc." },
    { number: "05", title: "Live Trades", description: "Real Time Market Analysis, Trade Setups, Daily Live Trade Share Telegram Group, etc." },
    { number: "06", title: "trading challenges", description: "Challenges to make 100 dollar to 10000 dollar strategy" },
    { number: "07", title: "FUNDED FIRMS MASTERY", description: "How to clear funded account, How to buy USDT, personal guidance, etc." },
    { number: "08", title: "Support", description: "Live Classes, Doubt Sessions, Community Support, Regular Updates, etc." },
  ]

  return (
    <section 
      id="process" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-24 relative overflow-hidden bg-[#0a0a0a] group"
    >
      {/* --- MOUSE FOLLOW SPOTLIGHT --- */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-30 opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(34, 197, 94, 0.15), transparent 80%)`,
        }}
      />
      
      {/* Small bright core follows mouse */}
      <motion.div
        className="pointer-events-none absolute z-30 w-1 h-1 bg-green-400 rounded-full group-hover:opacity-100 opacity-0"
        style={{
          left: smoothX,
          top: smoothY,
          boxShadow: "0 0 100px 50px rgba(74, 222, 128, 0.2)",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            {/* Glowing Line */}
            <div className="h-[2px] w-12 bg-blue-500 shadow-[0_0_15px_#3b82f6]"></div>
            <div className="text-xs uppercase tracking-[0.3em] text-blue-400 font-bold">How We Work</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Our Process
            <br />
            <span className="text-white/90">Step by Step</span>
          </h2>
        </motion.div>

        <div className="relative">
          
          {/* VERTICAL GREEN LIGHT ANIMATION */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 overflow-visible">
            <motion.div
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 -translate-x-1/2 w-[4px] h-64 z-20"
              style={{
                background: "linear-gradient(to bottom, transparent, #22c55e, #4ade80, transparent)",
                boxShadow: "0 0 25px #22c55e, 0 0 50px #22c55e",
              }}
            />
          </div>

          {steps.map((step, index) => {
            const isEven = (index + 1) % 2 === 0;
            const accentColor = isEven ? "#3b82f6" : "#ef4444"; 

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 mb-24 md:mb-20 relative ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""} pl-24 md:pl-0`}>
                  <div className={`text-5xl md:text-7xl font-bold text-white/10 mb-4`}>
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-white/70 max-w-sm md:inline-block leading-relaxed">{step.description}</p>
                </div>

                {/* STEP BOX WITH ROTATING BORDER */}
                <div className="relative flex items-center justify-center z-10 absolute-vertical-center md:static">
                  <div className="relative w-20 h-20 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-50%] z-[-1]"
                      style={{ background: `conic-gradient(from 0deg, transparent, ${accentColor}, transparent 30%)` }}
                    />
                    <div className="w-[76px] h-[76px] bg-[#0a0a0a] flex items-center justify-center border border-white/10">
                      <div className="text-xl font-bold text-white">{step.number}</div>
                    </div>
                  </div>
                </div>

                {/* HORIZONTAL LINE ANIMATION */}
                <div className="flex-1 w-full md:w-auto relative overflow-hidden h-[2px] bg-white/5 ml-24 md:ml-0">
                  <motion.div
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
                    className="absolute top-0 w-48 h-full"
                    style={{
                      background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
                      boxShadow: `0 0 20px ${accentColor}`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .absolute-vertical-center {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        @media (min-width: 768px) {
          .absolute-vertical-center { position: static; transform: none; }
        }
      `}</style>
    </section>
  )
}