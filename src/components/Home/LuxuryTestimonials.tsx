"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    quote: "Cortex transformed our entire WhatsApp sales workflow. Their AI bot handles 80% of incoming lead queries instantly and increased our revenue by 340% in just 60 days.",
    author: "Rohan Verma",
    role: "CEO & Founder",
    company: "Apex E-Commerce",
    rating: 5
  },
  {
    quote: "The speed and design quality of our new platform completely blew our board members away. It looks and feels like a $100k Silicon Valley custom product.",
    author: "Priya Sharma",
    role: "Head of Digital Product",
    company: "Nexus Fintech",
    rating: 5
  },
  {
    quote: "Sub-30ms page loads and 100% uptime during our biggest product launch. Working with Cortex is hands down the best engineering decision we ever made.",
    author: "Vikramaditya Mehta",
    role: "CTO",
    company: "ScalePro Labs",
    rating: 5
  }
];

const LuxuryTestimonials = () => {
  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-grid-pattern">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-[#6C63FF] text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            Executive Feedback
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Loved by Founders & Product Leaders
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            See what executives say about working with Cortex Web Solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#0B0B0B] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <Quote size={32} className="text-[#6C63FF]/30 mb-4" />

                <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-normal">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.08]">
                <h4 className="text-base font-bold text-white">{t.author}</h4>
                <p className="text-xs text-zinc-400">{t.role} • <span className="text-[#00D4FF] font-semibold">{t.company}</span></p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LuxuryTestimonials;
