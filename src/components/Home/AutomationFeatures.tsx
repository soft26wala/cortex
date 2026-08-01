"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  GitBranch, 
  ArrowRight, 
  MessageSquare, 
  Database, 
  CreditCard, 
  Send,
  Zap,
  Check
} from "lucide-react";

const workflowNodes = [
  {
    step: "01",
    title: "Incoming Lead Trigger",
    icon: MessageSquare,
    desc: "Customer initiates chat on WhatsApp, Instagram Direct, or Web Form.",
    color: "#6C63FF"
  },
  {
    step: "02",
    title: "AI Intent Recognition",
    icon: Zap,
    desc: "Cortex AI parses request, extracts intent, and queries vector memory.",
    color: "#00D4FF"
  },
  {
    step: "03",
    title: "Database Sync & CRM Update",
    icon: Database,
    desc: "Automatically updates lead score, creates contacts in CRM & sheets.",
    color: "#4ADE80"
  },
  {
    step: "04",
    title: "Instant Conversion Checkout",
    icon: CreditCard,
    desc: "Sends secure Razorpay/Stripe link or schedules calendar appointment.",
    color: "#FF5757"
  }
];

const AutomationFeatures = () => {
  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-grid-pattern">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-[#6C63FF] text-xs font-semibold uppercase tracking-wider">
            <GitBranch size={14} />
            Automated Node Workflows
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Seamless End-to-End Automation
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Connect your operations into a unified visual execution pipeline that runs 24/7 without manual intervention.
          </p>
        </div>

        {/* Workflow Diagram Node Sequence */}
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto relative">
          {workflowNodes.map((node, index) => {
            const IconComp = node.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="p-6 rounded-3xl bg-[#0B0B0B] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm bg-[#111111] border border-white/[0.08]"
                      style={{ color: node.color }}
                    >
                      {node.step}
                    </span>
                    <IconComp size={22} style={{ color: node.color }} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00D4FF] transition-colors">
                    {node.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {node.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <Check size={12} /> Automated Execution
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AutomationFeatures;
