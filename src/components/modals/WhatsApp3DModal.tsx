"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  CheckCheck, 
  ExternalLink, 
  Zap, 
  MessageSquare,
  ShieldCheck,
  Server
} from "lucide-react";
import Link from "next/link";

interface WhatsApp3DModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const samplePrompts = [
  "Qualify new lead for Enterprise SaaS",
  "Send Razorpay checkout invoice link",
  "Schedule technical consultation demo",
  "Check vector database knowledge base"
];

export default function WhatsApp3DModal({ isOpen, onClose }: WhatsApp3DModalProps) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am Cortex WhatsApp AI Agent. How can I automate your business today?", time: "10:42 AM" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { sender: "user", text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "I have parsed your request. Cortex AI is processing lead data and syncing webhooks in <18ms.";
      if (query.includes("Qualify")) {
        botReply = "Lead #9401 score: 98/100 (High Intent). CRM contact created & notification dispatched to sales team!";
      } else if (query.includes("invoice") || query.includes("Razorpay")) {
        botReply = "Generated secure Razorpay Checkout Link: https://cortex.pay/inv_9841. Sent directly to customer's WhatsApp.";
      } else if (query.includes("Schedule") || query.includes("demo")) {
        botReply = "Executive calendar slot available for Tomorrow at 3:00 PM. Appointment booked & calendar invite dispatched.";
      }
      setMessages((prev) => [...prev, { sender: "bot", text: botReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsTyping(false);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateX: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl rounded-3xl bg-[#0B0B0B] border border-white/[0.1] shadow-[0_30px_100px_rgba(108,99,255,0.3)] overflow-hidden perspective flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#111111] border border-white/[0.1] text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          {/* Left Panel: 3D Info & Actions */}
          <div className="md:w-5/12 p-8 bg-[#050505] border-b md:border-b-0 md:border-r border-white/[0.08] flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#00D4FF] text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles size={12} className="animate-spin" />
                3D Interactive Bot Sandbox
              </div>

              <h2 className="text-2xl font-black text-white leading-tight">
                Cortex WhatsApp AI Simulator
              </h2>

              <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                Test our autonomous Meta WhatsApp Business AI engine live. Experience sub-100ms intent recognition, automatic CRM syncing, and checkout link generation.
              </p>

              {/* Sample Prompts */}
              <div className="mt-6 space-y-2">
                <p className="text-[11px] font-mono uppercase text-zinc-500 font-bold">Quick Test Prompts:</p>
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="w-full p-2.5 rounded-xl bg-[#111111] border border-white/[0.08] hover:border-[#6C63FF]/50 text-left text-xs text-zinc-300 hover:text-white transition-all flex items-center justify-between group"
                  >
                    <span className="truncate">{prompt}</span>
                    <Zap size={12} className="text-[#6C63FF] group-hover:scale-110 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1 text-emerald-400"><Server size={12} /> Meta Graph API Connected</span>
                <span>Latency: 14ms</span>
              </div>

              <Link
                href="/whatsapp-bot"
                onClick={onClose}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_25px_rgba(108,99,255,0.4)] transition-all"
              >
                Launch Full WhatsApp SaaS Platform <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Right Panel: Simulated Phone UI */}
          <div className="md:w-7/12 p-6 bg-[#0B0B0B] flex flex-col justify-between h-[480px]">
            {/* Header Bar */}
            <div className="p-3 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-[#6C63FF] flex items-center justify-center text-white font-bold text-xs shadow-md">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    Cortex AI Agent <ShieldCheck size={13} className="text-emerald-400" />
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono">Online • Instant Response</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.sender === "user" 
                        ? "bg-[#6C63FF] text-white rounded-br-none" 
                        : "bg-[#111111] border border-white/[0.08] text-zinc-200 rounded-bl-none"
                    }`}
                  >
                    <p>{m.text}</p>
                    <div className="flex items-center justify-end gap-1 text-[9px] opacity-60 mt-1">
                      <span>{m.time}</span>
                      {m.sender === "user" && <CheckCheck size={11} className="text-emerald-300" />}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-[#111111] border border-white/[0.08] text-xs text-zinc-400 animate-pulse flex items-center gap-2">
                    <Bot size={14} className="animate-spin text-[#6C63FF]" /> Cortex AI is processing intent...
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type prompt or query..."
                className="w-full px-4 py-3 rounded-full bg-[#111111] border border-white/[0.08] text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#6C63FF]"
              />
              <button
                type="submit"
                className="p-3 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white shadow-lg flex-shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
