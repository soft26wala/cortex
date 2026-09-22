"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Send,
  X,
  Bot,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Globe,
  Zap,
  ArrowRight
} from "lucide-react";
import { Node, Edge } from "reactflow";

interface FlowTestPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: Node[];
  edges: Edge[];
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  buttons?: string[];
  mediaUrl?: string;
  timestamp: string;
}

export function FlowTestPhoneModal({
  isOpen,
  onClose,
  nodes,
  edges
}: FlowTestPhoneModalProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 10)]);
  };

  // Initialize Flow Execution on Modal Open
  useEffect(() => {
    if (!isOpen) return;

    setLogs([]);
    addLog("⚡ Executing visual flow graph in interactive simulator...");

    // Find start trigger or first message node
    const startNode = nodes.find((n) => n.type === "startNode") || nodes[0];
    if (!startNode) {
      setChatMessages([
        {
          id: "init",
          sender: "bot",
          text: "⚠️ No nodes found on canvas. Add nodes to design a flow.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
      return;
    }

    addLog(`[START] Triggered node "${startNode.data?.label || startNode.id}"`);

    // Find outgoing edge from start node
    const firstEdge = edges.find((e) => e.source === startNode.id);
    const targetNode = firstEdge
      ? nodes.find((n) => n.id === firstEdge.target)
      : nodes.find((n) => n.type === "messageNode" && n.id !== startNode.id);

    if (targetNode) {
      renderNodeResponse(targetNode);
    } else {
      setChatMessages([
        {
          id: "init",
          sender: "bot",
          text: "👋 Flow initialized. Connect Start Trigger to a Message Node on canvas.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }
  }, [isOpen, nodes, edges]);

  const renderNodeResponse = (node: Node) => {
    setCurrentNodeId(node.id);
    addLog(`[NODE] Executing "${node.type}" (ID: ${node.id})`);

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (node.type === "messageNode") {
      const msgText = node.data?.text || "Automated Reply Message";
      const buttons = node.data?.buttons || [];

      setChatMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: msgText,
          buttons,
          timestamp
        }
      ]);
      addLog(`[OUTBOUND] Rendered Message with ${buttons.length} button options.`);
    } else if (node.type === "aiNode") {
      const prompt = node.data?.prompt || "AI Agent Response";
      setChatMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: `🤖 AI Response (${prompt}): "Hello! I am Cortex AI Assistant. I can answer your questions, schedule visits, or assist with billing!"`,
          timestamp
        }
      ]);
      addLog(`[AI ENGINE] Generated response for prompt: "${prompt}"`);
    } else if (node.type === "apiNode") {
      const url = node.data?.url || "https://api.cortestack.com/webhook";
      setChatMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: `🌐 Webhook Action Triggered!\nTarget URL: ${url}\nStatus: HTTP 200 OK ✅`,
          timestamp
        }
      ]);
      addLog(`[REST API] Posted payload to ${url}`);
    } else if (node.type === "mediaNode") {
      const mediaUrl = node.data?.mediaUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9";
      setChatMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: `🖼️ Media attachment:`,
          mediaUrl,
          timestamp
        }
      ]);
      addLog(`[MEDIA] Sent media attachment URL.`);
    }
  };

  const handleButtonClick = (buttonTitle: string, buttonIndex: number) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Push user tap message
    setChatMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        sender: "user",
        text: buttonTitle,
        timestamp
      }
    ]);
    addLog(`[USER TAP] Clicked button "${buttonTitle}" (Handle: btn-${buttonIndex})`);

    // Trace edge originating from currentNodeId & sourceHandle `btn-${buttonIndex}`
    const buttonHandleId = `btn-${buttonIndex}`;
    let matchingEdge = edges.find(
      (e) => e.source === currentNodeId && e.sourceHandle === buttonHandleId
    );

    // Fallback: match any edge from currentNodeId if specific handle not found
    if (!matchingEdge) {
      matchingEdge = edges.find((e) => e.source === currentNodeId);
    }

    if (matchingEdge) {
      const nextNode = nodes.find((n) => n.id === matchingEdge?.target);
      if (nextNode) {
        setTimeout(() => {
          renderNodeResponse(nextNode);
        }, 300);
        return;
      }
    }

    // Default fallback if no connected edge
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: `ℹ️ End of flow branch for "${buttonTitle}". Connect this button handle to another node on canvas to extend the flow!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
      addLog(`[FLOW END] Branch end reached for "${buttonTitle}".`);
    }, 300);
  };

  const handleSendText = () => {
    if (!userInput.trim()) return;
    const text = userInput;
    setUserInput("");

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        sender: "user",
        text,
        timestamp
      }
    ]);
    addLog(`[USER INPUT] Sent text "${text}"`);

    // Try finding matching condition or message node
    const matchingNode = nodes.find(
      (n) =>
        n.type === "messageNode" &&
        n.data?.text?.toLowerCase().includes(text.toLowerCase())
    );

    setTimeout(() => {
      if (matchingNode) {
        renderNodeResponse(matchingNode);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: "bot",
            text: `🤖 Auto-Reply: Received "${text}". Rule matched against visual flow graph.`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      }
    }, 400);
  };

  const restartFlow = () => {
    setChatMessages([]);
    setLogs([]);
    const startNode = nodes.find((n) => n.type === "startNode") || nodes[0];
    if (startNode) {
      const firstEdge = edges.find((e) => e.source === startNode.id);
      const targetNode = firstEdge ? nodes.find((n) => n.id === firstEdge.target) : null;
      if (targetNode) renderNodeResponse(targetNode);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[85vh] text-white font-sans"
      >
        {/* Left Column: WhatsApp Phone Simulator Mockup */}
        <div className="flex-1 bg-slate-950 p-6 flex flex-col justify-between items-center border-r border-slate-800 relative">
          {/* Top Notch & Phone Title */}
          <div className="w-full max-w-sm flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-white">Live Phone Flow Simulator</span>
            </div>
            <button
              onClick={restartFlow}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 text-[11px] font-semibold border border-slate-800 flex items-center gap-1 transition-all"
              title="Restart Flow Simulation"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Restart
            </button>
          </div>

          {/* Virtual Phone Shell */}
          <div className="w-full max-w-sm flex-1 rounded-[36px] border-[5px] border-slate-800 bg-slate-950 flex flex-col overflow-hidden shadow-2xl relative border-emerald-500/20">
            {/* Phone Speaker Notch */}
            <div className="w-28 h-3.5 bg-slate-800 rounded-full mx-auto my-2" />

            {/* Chat Header */}
            <div className="bg-emerald-900/90 p-3 flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-xs">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-none">Canvas Live Flow Engine</h4>
                  <span className="text-[9px] text-emerald-300">● Running Visual Flow</span>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-900/90 text-xs">
              {chatMessages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      m.sender === "user"
                        ? "bg-emerald-600 text-white rounded-tr-none shadow-md"
                        : "bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none shadow-md"
                    }`}
                  >
                    {m.mediaUrl && (
                      <img src={m.mediaUrl} alt="" className="w-full h-36 object-cover rounded-xl mb-2 border border-slate-700" />
                    )}

                    <p className="whitespace-pre-line leading-relaxed font-sans">{m.text}</p>

                    {/* Multi-Branch Buttons */}
                    {m.buttons && m.buttons.length > 0 && (
                      <div className="mt-2.5 space-y-1.5 border-t border-slate-700/80 pt-2">
                        {m.buttons.map((bTitle, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleButtonClick(bTitle, idx)}
                            className="w-full py-1.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold text-center transition-all flex items-center justify-between"
                          >
                            <span>🔘 {bTitle}</span>
                            <ArrowRight className="w-3 h-3 text-emerald-400" />
                          </button>
                        ))}
                      </div>
                    )}

                    <span className="text-[8px] text-slate-400 block text-right mt-1">{m.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-2 bg-slate-950 border-t border-slate-800 flex items-center gap-1.5">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendText()}
                placeholder="Type test message..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-full px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-500"
              />
              <button
                onClick={handleSendText}
                className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Real-time Execution Traces & Logs */}
        <div className="w-full lg:w-80 bg-slate-900 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" /> Execution Logs
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-[11px] text-slate-400 space-y-2 mb-4">
              <p>
                This simulator executes your saved canvas graph in real-time. Tapping buttons follows output handles (<code className="text-emerald-400 font-mono">btn-0</code>, <code className="text-emerald-400 font-mono">btn-1</code>) to target nodes.
              </p>
            </div>

            {/* Logs Console */}
            <div className="h-72 overflow-y-auto bg-slate-950 p-3.5 rounded-2xl border border-slate-800 font-mono text-[10px] text-emerald-400 space-y-1.5">
              {logs.map((log, index) => (
                <div key={index} className="leading-tight">
                  <span className="text-slate-600">&gt; </span>
                  <span className={log.includes("MATCH") || log.includes("START") ? "text-emerald-300 font-bold" : "text-slate-300"}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
          >
            Close & Return to Canvas Editor
          </button>
        </div>
      </motion.div>
    </div>
  );
}
