"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How fast can Cortex deploy a custom enterprise web application?",
    a: "Our standard sprint delivers initial staging builds within 10 to 14 days, with full production deployment across 300+ global edge locations in under 30 days."
  },
  {
    q: "Can the WhatsApp AI Agent integrate with our existing CRM?",
    a: "Yes. Cortex WhatsApp Bots feature built-in webhooks and REST integrations for Salesforce, HubSpot, Zoho, PostgreSQL, and custom internal APIs."
  },
  {
    q: "How does Cortex ensure sub-50ms latency and 99.99% uptime?",
    a: "We architect every web application using Next.js 15 App Router on Vercel/AWS Edge CDN networks, with automated serverless scaling and zero single points of failure."
  },
  {
    q: "What is your design & development process for custom projects?",
    a: "We operate on a 5-step workflow: Strategic Discovery -> Figma Luxury UI/UX Design -> Next.js & AI Development -> Load Testing & Security Audit -> Global Edge Deployment."
  },
  {
    q: "Do you provide dedicated ongoing maintenance after launch?",
    a: "Yes. Every client gets direct Slack channel access to our senior architects with guaranteed SLAs for continuous updates, security patches, and feature additions."
  }
];

const LuxuryFAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-grid-pattern">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-[#00D4FF] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle size={14} />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Everything You Need To Know
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Have questions about our engineering process or AI integrations? We've got answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-[#0B0B0B] border border-white/[0.08] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-white">{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-[#6C63FF] transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-white/[0.04] pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default LuxuryFAQ;
