"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Puzzle, 
  MessageCircle, 
  Database, 
  CreditCard, 
  Cloud, 
  Bot, 
  Workflow, 
  Code2,
  Lock
} from "lucide-react";

const integrations = [
  { name: "WhatsApp Business API", icon: MessageCircle, desc: "Automated messaging & chat triggers", category: "Messaging" },
  { name: "OpenAI & Claude LLM", icon: Bot, desc: "Contextual vector AI generation", category: "AI Models" },
  { name: "PostgreSQL & Prisma", icon: Database, desc: "High-speed database persistence", category: "Database" },
  { name: "Stripe & Razorpay", icon: CreditCard, desc: "Global payment processing", category: "Payments" },
  { name: "Vercel & AWS Edge", icon: Cloud, desc: "Serverless global CDN hosting", category: "Infrastructure" },
  { name: "Slack & Webhooks", icon: Workflow, desc: "Real-time team notification sync", category: "DevOps" }
];

const Integrations = () => {
  return (
    <section className="py-28 bg-[#050505] text-white relative overflow-hidden bg-noise">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-[#4ADE80] text-xs font-semibold uppercase tracking-wider">
            <Puzzle size={14} />
            Ecosystem Integrations
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Plugs Seamlessly Into Your Existing Stack
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            No need to rebuild your tech stack from scratch. Cortex integrates with 50+ enterprise services out of the box.
          </p>
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {integrations.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-[#0B0B0B] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#6C63FF] group-hover:text-[#00D4FF] transition-colors">
                    <IconComp size={24} />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 bg-[#111111] px-2.5 py-1 rounded-full border border-white/[0.08]">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00D4FF] transition-colors">
                  {item.name}
                </h3>
                <p className="text-zinc-400 text-xs">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Integrations;
