"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Workflow,
  Smartphone,
  Bot,
  Sparkles,
  Send,
  QrCode,
  CheckCircle2,
  RefreshCw,
  Terminal,
  ArrowRight,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { FlowBuilderCanvas } from "@/components/whatsapp-bot/FlowBuilderCanvas";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  buttons?: { id: string; title: string }[];
  timestamp: string;
}

export default function WhatsAppBlueprintSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -20% 0px" });

  const [activeTab, setActiveTab] = useState<"blueprint" | "simulator">("blueprint");

  // Phone Simulator state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "👋 Welcome to Cortex Auto-Reply Bot! Try texting 'hello', 'pricing', or 'menu'.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "[INIT] WhatsApp Bot Service active",
    "[READY] Subscribed to Webhook /api/whatsapp/send",
    "[STATUS] QR session verified (+91 98765 43210)"
  ]);

  const addLog = (logStr: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${logStr}`, ...prev.slice(0, 15)]);
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    addLog(`[INBOUND] Client sent: "${text}"`);

    try {
      const res = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          botId: "bot-1",
          text,
          sender: "+91 98765 00000"
        })
      });
      const data = await res.json();

      if (data.success) {
        const botResponse = data.result.response;
        const matched = data.result.matched;
        const keyword = data.result.keyword;

        if (matched) {
          addLog(`[MATCH] Rule matched "${keyword}". Triggering response.`);
        } else {
          addLog(`[FALLBACK] Default fallback triggered.`);
        }

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `b-${Date.now()}`,
              sender: "bot",
              text: botResponse.text || "Message processed.",
              buttons: botResponse.buttons,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            }
          ]);
          addLog(`[OUTBOUND] Auto-reply dispatched via Meta Webhook.`);
        }, 400);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="whatsapp-blueprint-demo" ref={sectionRef} className="py-24 relative overflow-hidden bg-slate-950 text-white border-t border-slate-900">
      {/* Background Neon Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-emerald-500 shadow-[0_0_12px_#10b981]" />
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-bold flex items-center gap-1.5">
              <Bot className="w-4 h-4" /> Live Interactive Demo
            </span>
            <div className="h-[2px] w-10 bg-emerald-500 shadow-[0_0_12px_#10b981]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            WhatsApp AI Blueprint & <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Visual Flow Builder Demo
            </span>
          </h2>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Design multi-turn automated bot trees, instant keyword auto-replies, and view live client responses in real time.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 mt-8 gap-2 shadow-2xl">
            <button
              onClick={() => setActiveTab("blueprint")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "blueprint"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Workflow className="w-4 h-4 text-emerald-300" /> 🗺️ Visual Flow Blueprint
            </button>

            <button
              onClick={() => setActiveTab("simulator")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "simulator"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-300" /> 📱 Live WhatsApp Simulator
            </button>
          </div>
        </motion.div>

        {/* Tab 1: Visual Blueprint Canvas */}
        {activeTab === "blueprint" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl overflow-hidden shadow-2xl relative"
          >
            {/* Top Toolbar */}
            <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-200">Interactive Canvas • Drag, Connect & Edit Bot Nodes</span>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/whatsapp-bot/demo"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  Full Screen Sandbox <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Canvas Container */}
            <div className="h-[550px] w-full">
              <FlowBuilderCanvas />
            </div>
          </motion.div>
        )}

        {/* Tab 2: Live WhatsApp Simulator & Webhook Console */}
        {activeTab === "simulator" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left: Phone Screen Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-sm rounded-[40px] border-[6px] border-slate-800 bg-slate-950 p-4 shadow-2xl shadow-emerald-950/20 relative">
                {/* Speaker Notch */}
                <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

                {/* WhatsApp Chat Header */}
                <div className="bg-emerald-900/80 p-3 rounded-t-2xl flex items-center justify-between border-b border-emerald-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-sm">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-none">Cortex AI Support</h4>
                      <span className="text-[10px] text-emerald-300">Online • Auto-Reply Active</span>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                </div>

                {/* Messages Body */}
                <div className="h-80 overflow-y-auto p-3 space-y-3 bg-slate-900/90 text-xs font-sans rounded-b-2xl">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl ${
                          m.sender === "user"
                            ? "bg-emerald-600 text-white rounded-tr-none"
                            : "bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none"
                        }`}
                      >
                        <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                        {/* Interactive Buttons */}
                        {m.buttons && m.buttons.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {m.buttons.map((b) => (
                              <button
                                key={b.id}
                                onClick={() => handleSend(b.title)}
                                className="w-full py-1.5 px-3 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold text-center transition-all"
                              >
                                {b.title}
                              </button>
                            ))}
                          </div>
                        )}

                        <span className="text-[9px] text-slate-400 block text-right mt-1">{m.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Bar */}
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type 'hello', 'pricing' or 'menu'..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-500"
                  />
                  <button
                    onClick={() => handleSend()}
                    className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-900/50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Shortcut Keywords */}
                <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                  {["hello", "pricing", "menu", "help"].map((kw) => (
                    <button
                      key={kw}
                      onClick={() => handleSend(kw)}
                      className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-emerald-950 border border-slate-800 text-[10px] text-emerald-400 font-mono"
                    >
                      "{kw}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Real-time Webhook Execution Console */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" /> Real-time Webhook & AI Engine Logs
                </h3>
                <div className="h-64 overflow-y-auto bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-[11px] text-emerald-400 space-y-1.5">
                  {logs.map((log, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="text-slate-600">&gt;</span>
                      <span className={log.includes("MATCH") ? "text-emerald-300 font-bold" : "text-slate-300"}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bot Feature Summary Card */}
              <div className="p-6 rounded-3xl bg-emerald-950/30 border border-emerald-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ready to Deploy your WhatsApp Bot?
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Connect official Meta WhatsApp Business API or QR session in seconds.
                  </p>
                </div>
                <Link
                  href="/whatsapp-bot"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
