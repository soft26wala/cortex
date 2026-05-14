"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "The minimalist approach perfectly captured our brand essence. Their attention to detail and focus on typography made our digital presence stand out.",
      author: "Sarah Johnson",
      role: "Creative Director, Studio Black",
      color: "#3b82f6", // Blue
    },
    {
      quote: "Working with this team was refreshing. They stripped away all the unnecessary elements and delivered a product that was both beautiful and functional.",
      author: "Michael Chen",
      role: "Founder, Monochrome",
      color: "#10b981", // Green
    },
    {
      quote: "Their brutalist design philosophy challenged our conventional thinking and resulted in a website that truly captures attention and drives engagement.",
      author: "Emily Rodriguez",
      role: "Marketing Lead, Contrast Inc.",
      color: "#a855f7", // Purple
    }
  ];

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden text-white">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            {/* Glowing Line */}
            <div className="h-[2px] w-12 bg-blue-500 shadow-[0_0_15px_#3b82f6]"></div>
            <div className="text-xs uppercase tracking-[0.3em] text-blue-400 font-bold">Success Protocols</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
            What Our Clients
            <br />
            <span className="text-white/30 italic">Say About Us</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Card with Neon Border Light */}
          <div 
            className="relative border-2 p-8 md:p-12 bg-white/[0.02] backdrop-blur-md transition-colors duration-500"
            style={{ borderColor: `${testimonials[activeIndex].color}33` }} // Subtle colored border
          >
            {/* Glowing Corner Light */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 transition-colors duration-500"
              style={{ backgroundColor: testimonials[activeIndex].color }}
            />

            <div className="absolute top-6 right-8 text-white/5">
              <Quote size={120} />
            </div>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="min-h-[220px] flex flex-col"
                >
                  <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-tight tracking-tight uppercase">
                    "{testimonials[activeIndex].quote}"
                  </blockquote>
                  <div className="mt-auto flex items-center">
                    <div 
                      className="w-12 h-px mr-4 transition-colors duration-500"
                      style={{ backgroundColor: testimonials[activeIndex].color }}
                    ></div>
                    <div>
                      <div className="font-black text-white uppercase tracking-tighter text-lg">
                        {testimonials[activeIndex].author}
                      </div>
                      <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                        {testimonials[activeIndex].role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* --- STEP PROGRESS BAR (COLOR CHANGES ON STEP) --- */}
            <div className="mt-12 flex items-center">
              <div className="text-white/40 text-[10px] font-black mr-4 uppercase">
                Step 0{activeIndex + 1}
              </div>
              <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
                <motion.div 
                  className="h-full absolute top-0 left-0 shadow-[0_0_10px_currentcolor]"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                    backgroundColor: testimonials[activeIndex].color // Dynamic Color
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                ></motion.div>
              </div>
            </div>

            {/* --- NAVIGATION BUTTONS --- */}
            <div className="flex justify-end mt-8 gap-4">
              <button 
                onClick={prev} 
                className="p-3 border border-white/10 hover:bg-white/5 transition-all group"
                style={{ borderColor: activeIndex > 0 ? `${testimonials[activeIndex].color}44` : "" }}
              >
                <ChevronLeft className="w-5 h-5 text-white/40 group-hover:text-white" />
              </button>
              <button 
                onClick={next} 
                className="p-3 border border-white/10 hover:bg-white/5 transition-all group"
                style={{ borderColor: `${testimonials[activeIndex].color}44` }}
              >
                <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}