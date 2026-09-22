"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Search,
  X,
  CheckCircle2,
  ArrowRight,
  Bot,
  MessageSquare,
  ShoppingCart,
  Building2,
  Stethoscope,
  GraduationCap,
  Car,
  Headphones,
  Zap,
  TrendingUp,
  Eye,
  Layers
} from "lucide-react";

export interface TemplateItem {
  id: string;
  name: string;
  category: "ecommerce" | "healthcare" | "realestate" | "edtech" | "support" | "auto";
  categoryLabel: string;
  icon: any;
  image: string;
  badge: string;
  tagline: string;
  description: string;
  conversionLift: string;
  nodesCount: number;
  whatsappMessagePreview: {
    text: string;
    buttons: string[];
  };
  flowData: {
    nodes: any[];
    edges: any[];
  };
}

export const TEMPLATE_CATALOG: TemplateItem[] = [
  {
    id: "tpl-ecommerce-cart",
    name: "🛒 Abandoned Cart & Checkout Recovery Bot",
    category: "ecommerce",
    categoryLabel: "E-Commerce & D2C",
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?q=80&w=800&auto=format&fit=crop",
    badge: "🔥 340% Conversion Lift",
    tagline: "Recover lost carts with automatic WhatsApp discount triggers & 1-click checkout",
    description:
      "Automated D2C sales chatbot that triggers when a customer leaves items in their cart. Sends personalized discount codes and direct checkout buttons.",
    conversionLift: "+340% Sales",
    nodesCount: 5,
    whatsappMessagePreview: {
      text: "👋 Hi Rahul! You left items in your cart. Claim 15% OFF now using code CORTEX15!",
      buttons: ["🛍️ Checkout Now", "❓ Ask Product Question"]
    },
    flowData: {
      nodes: [
        { id: "1", type: "startNode", position: { x: 300, y: 30 }, data: { label: "Trigger: Abandoned Cart Webhook" } },
        {
          id: "2",
          type: "messageNode",
          position: { x: 300, y: 150 },
          data: {
            text: "👋 Hi Rahul! You left items in your cart. Claim 15% OFF now using code CORTEX15!",
            buttons: ["🛍️ Checkout Now", "❓ Ask Product Question"]
          }
        },
        {
          id: "node-pay",
          type: "apiNode",
          position: { x: 100, y: 380 },
          data: { url: "https://api.cortestack.com/checkout/pay" }
        },
        {
          id: "node-ai",
          type: "aiNode",
          position: { x: 500, y: 380 },
          data: { prompt: "Answer customer questions about sizing, shipping, and delivery time." }
        }
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
        { id: "e-btn0", source: "2", sourceHandle: "btn-0", target: "node-pay", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
        { id: "e-btn1", source: "2", sourceHandle: "btn-1", target: "node-ai", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 2 } }
      ]
    }
  },
  {
    id: "tpl-realestate-lead",
    name: "🏡 Proptis Luxury Real Estate Lead Qualifier",
    category: "realestate",
    categoryLabel: "Real Estate",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    badge: "⭐ Top Rated Real Estate",
    tagline: "Qualify high-net-worth property buyers and schedule site visits automatically",
    description:
      "Captures property preferences (BHK, Budget, Location), showcases luxury villas/penthouse catalogs, and schedules appointments directly with sales agents.",
    conversionLift: "+410% Site Visits",
    nodesCount: 6,
    whatsappMessagePreview: {
      text: "🏡 Welcome to Proptis Luxury Estates! What type of property are you interested in today?",
      buttons: ["🏙️ Penthouse Villa", "🏢 Commercial Tower", "📅 Book Site Visit"]
    },
    flowData: {
      nodes: [
        { id: "1", type: "startNode", position: { x: 300, y: 30 }, data: { label: "Property Inquiry Keyword Trigger" } },
        {
          id: "2",
          type: "messageNode",
          position: { x: 300, y: 150 },
          data: {
            text: "🏡 Welcome to Proptis Luxury Estates! What type of property are you interested in today?",
            buttons: ["🏙️ Penthouse Villa", "🏢 Commercial Tower", "📅 Book Site Visit"]
          }
        },
        {
          id: "node-pent",
          type: "messageNode",
          position: { x: 40, y: 380 },
          data: { text: "💎 DLF The Camellias & Sapphire Heights 5BHK luxury penthouses starting ₹4.5 Cr." }
        },
        {
          id: "node-comm",
          type: "messageNode",
          position: { x: 340, y: 380 },
          data: { text: "🏢 Cortex Business Tower 15,000 sq ft Grade A commercial space at BMC Chowk." }
        },
        {
          id: "node-visit",
          type: "apiNode",
          position: { x: 640, y: 380 },
          data: { url: "https://api.cortestack.com/proptis/schedule-visit" }
        }
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
        { id: "e-r0", source: "2", sourceHandle: "btn-0", target: "node-pent", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
        { id: "e-r1", source: "2", sourceHandle: "btn-1", target: "node-comm", animated: true, style: { stroke: "#a855f7", strokeWidth: 2 } },
        { id: "e-r2", source: "2", sourceHandle: "btn-2", target: "node-visit", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } }
      ]
    }
  },
  {
    id: "tpl-healthcare-doctor",
    name: "🏥 Clinic & Hospital Appointment Scheduler",
    category: "healthcare",
    categoryLabel: "Healthcare & Clinics",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    badge: "🩺 Instant Booking",
    tagline: "Automated doctor appointment booking, patient intake & prescription alerts",
    description:
      "Enables patients to select doctor specialties, choose available time slots, get instant appointment confirmations, and receive automated WhatsApp reminders.",
    conversionLift: "99% No-Show Reduction",
    nodesCount: 5,
    whatsappMessagePreview: {
      text: "🏥 Welcome to City Health Clinic! How can we assist your health consultation?",
      buttons: ["👨‍⚕️ Book Doctor Slot", "💊 Prescriptions", "🚑 Emergency Support"]
    },
    flowData: {
      nodes: [
        { id: "1", type: "startNode", position: { x: 300, y: 30 }, data: { label: "Patient WhatsApp Message" } },
        {
          id: "2",
          type: "messageNode",
          position: { x: 300, y: 150 },
          data: {
            text: "🏥 Welcome to City Health Clinic! How can we assist your health consultation?",
            buttons: ["👨‍⚕️ Book Doctor Slot", "💊 Prescriptions", "🚑 Emergency Support"]
          }
        },
        {
          id: "node-doc",
          type: "apiNode",
          position: { x: 100, y: 380 },
          data: { url: "https://api.cortestack.com/clinic/book-slot" }
        },
        {
          id: "node-rx",
          type: "messageNode",
          position: { x: 500, y: 380 },
          data: { text: "💊 Please reply with your Patient ID or mobile number to download PDF prescription." }
        }
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
        { id: "e-b0", source: "2", sourceHandle: "btn-0", target: "node-doc", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
        { id: "e-b1", source: "2", sourceHandle: "btn-1", target: "node-rx", animated: true, style: { stroke: "#14b8a6", strokeWidth: 2 } }
      ]
    }
  },
  {
    id: "tpl-edtech-courses",
    name: "🎓 EdTech Course Enrollment & Fee Collection",
    category: "edtech",
    categoryLabel: "EdTech & Education",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    badge: "⚡ High Lead Capture",
    tagline: "Share course syllabus PDFs, demo class links, and collect course fee payments",
    description:
      "Captures student course inquiries, sends automated syllabus PDF brochures, schedules live demo classes, and integrates Razorpay fee links.",
    conversionLift: "+280% Enrollments",
    nodesCount: 5,
    whatsappMessagePreview: {
      text: "🎓 Welcome to Cortex Academy! Which course would you like to master?",
      buttons: ["💻 Full-Stack Web Dev", "📊 Forex Trading", "📲 WhatsApp AI SaaS"]
    },
    flowData: {
      nodes: [
        { id: "1", type: "startNode", position: { x: 300, y: 30 }, data: { label: "Student Inquiry Keyword" } },
        {
          id: "2",
          type: "messageNode",
          position: { x: 300, y: 150 },
          data: {
            text: "🎓 Welcome to Cortex Academy! Which course would you like to master?",
            buttons: ["💻 Full-Stack Web Dev", "📊 Forex Trading", "📲 WhatsApp AI SaaS"]
          }
        },
        {
          id: "node-dev",
          type: "messageNode",
          position: { x: 100, y: 380 },
          data: { text: "💻 Full-Stack Web Dev 6-Month Bootcamp. Complete React + Node.js + Next.js with job placement." }
        },
        {
          id: "node-trade",
          type: "messageNode",
          position: { x: 500, y: 380 },
          data: { text: "📊 Kill Technical Forex Academy. Master institutional sweeps & price action liquidity." }
        }
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
        { id: "e-b0", source: "2", sourceHandle: "btn-0", target: "node-dev", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
        { id: "e-b1", source: "2", sourceHandle: "btn-1", target: "node-trade", animated: true, style: { stroke: "#eab308", strokeWidth: 2 } }
      ]
    }
  },
  {
    id: "tpl-support-247",
    name: "🛠️ 24/7 Enterprise Support & Escalation Bot",
    category: "support",
    categoryLabel: "Customer Support",
    icon: Headphones,
    image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=800&auto=format&fit=crop",
    badge: "🤖 Zero Wait Time",
    tagline: "Instant FAQ resolution with automatic ticket creation & human agent handover",
    description:
      "Reduces support desk workload by 80%. Resolves standard queries automatically and routes VIP requests to human support agents.",
    conversionLift: "< 2 sec Response Time",
    nodesCount: 5,
    whatsappMessagePreview: {
      text: "🛠️ Cortex Support Desk. How can we resolve your issue today?",
      buttons: ["🔧 Technical Help", "📄 Billing Invoice", "👨‍💼 Connect Agent"]
    },
    flowData: {
      nodes: [
        { id: "1", type: "startNode", position: { x: 300, y: 30 }, data: { label: "Support Ticket Trigger" } },
        {
          id: "2",
          type: "messageNode",
          position: { x: 300, y: 150 },
          data: {
            text: "🛠️ Cortex Support Desk. How can we resolve your issue today?",
            buttons: ["🔧 Technical Help", "📄 Billing Invoice", "👨‍💼 Connect Agent"]
          }
        },
        {
          id: "node-tech",
          type: "messageNode",
          position: { x: 100, y: 380 },
          data: { text: "🔧 For Meta API setup, ensure your Bearer token has whatsapp_business_messaging scope." }
        },
        {
          id: "node-agent",
          type: "apiNode",
          position: { x: 500, y: 380 },
          data: { url: "https://api.cortestack.com/support/create-ticket" }
        }
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
        { id: "e-b0", source: "2", sourceHandle: "btn-0", target: "node-tech", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
        { id: "e-b2", source: "2", sourceHandle: "btn-2", target: "node-agent", animated: true, style: { stroke: "#ec4899", strokeWidth: 2 } }
      ]
    }
  },
  {
    id: "tpl-auto-testdrive",
    name: "🚗 Automobile Test Drive & Booking Bot",
    category: "auto",
    categoryLabel: "Automobile & Dealerships",
    icon: Car,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    badge: "🚘 High Conversion",
    tagline: "Book vehicle test drives, send digital brochures, and locate nearest showroom",
    description:
      "Automates car & bike dealership customer inquiries. Customers can view vehicle specs, calculate EMI estimates, and book test drives.",
    conversionLift: "+310% Test Drives",
    nodesCount: 5,
    whatsappMessagePreview: {
      text: "🚗 Welcome to Cortex Motors! What vehicle details would you like to explore?",
      buttons: ["🏎️ Luxury EV SUV", "📄 Download Brochure", "📅 Book Test Drive"]
    },
    flowData: {
      nodes: [
        { id: "1", type: "startNode", position: { x: 300, y: 30 }, data: { label: "Vehicle Inquiry Trigger" } },
        {
          id: "2",
          type: "messageNode",
          position: { x: 300, y: 150 },
          data: {
            text: "🚗 Welcome to Cortex Motors! What vehicle details would you like to explore?",
            buttons: ["🏎️ Luxury EV SUV", "📄 Download Brochure", "📅 Book Test Drive"]
          }
        },
        {
          id: "node-ev",
          type: "messageNode",
          position: { x: 100, y: 380 },
          data: { text: "⚡ Cortex CyberEV SUV: 520 km range, 0-100 in 3.8s, dual motor AWD." }
        },
        {
          id: "node-drive",
          type: "apiNode",
          position: { x: 500, y: 380 },
          data: { url: "https://api.cortestack.com/auto/book-test-drive" }
        }
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
        { id: "e-b0", source: "2", sourceHandle: "btn-0", target: "node-ev", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
        { id: "e-b2", source: "2", sourceHandle: "btn-2", target: "node-drive", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } }
      ]
    }
  }
];

interface WhatsAppTemplateLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: TemplateItem) => void;
}

export function WhatsAppTemplateLibraryModal({
  isOpen,
  onClose,
  onSelectTemplate
}: WhatsAppTemplateLibraryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);

  if (!isOpen) return null;

  const categories = [
    { id: "all", label: "All AiSensy Templates" },
    { id: "ecommerce", label: "🛒 E-Commerce & D2C" },
    { id: "realestate", label: "🏡 Real Estate" },
    { id: "healthcare", label: "🏥 Healthcare & Clinics" },
    { id: "edtech", label: "🎓 EdTech & Courses" },
    { id: "support", label: "🛠️ Customer Support" },
    { id: "auto", label: "🚗 Automobile" }
  ];

  const filteredTemplates = TEMPLATE_CATALOG.filter((t) => {
    if (selectedCategory !== "all" && t.category !== selectedCategory) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.categoryLabel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 w-full max-w-6xl h-[88vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans text-white"
      >
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 font-bold">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                AiSensy WhatsApp Chatbot Template Library
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  {TEMPLATE_CATALOG.length} Ready Templates
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                1-Click apply pre-built conversational flow trees, interactive WhatsApp buttons, and Meta triggers.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AiSensy templates..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-500"
            />
          </div>
        </div>

        {/* Content Body: Grid of Template Cards */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="group bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Image Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={tpl.image}
                    alt={tpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-500/90 text-slate-950 text-[10px] font-extrabold uppercase shadow-lg">
                    {tpl.badge}
                  </span>

                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-slate-900/90 text-slate-300 text-[10px] font-mono border border-slate-700">
                    {tpl.categoryLabel}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors mb-1.5">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{tpl.tagline}</p>

                  {/* Metrics Row */}
                  <div className="flex items-center justify-between text-[11px] bg-slate-900 p-2.5 rounded-xl border border-slate-800 mb-4">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> {tpl.conversionLift}
                    </span>
                    <span className="text-slate-400 font-mono flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" /> {tpl.nodesCount} Flow Nodes
                    </span>
                  </div>

                  {/* Message Preview Box */}
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px]">
                    <span className="text-[9px] uppercase font-extrabold text-emerald-400 block mb-1">
                      💬 Outbound WhatsApp Message:
                    </span>
                    <p className="text-slate-200 leading-snug mb-2 font-sans">{tpl.whatsappMessagePreview.text}</p>
                    <div className="flex flex-wrap gap-1">
                      {tpl.whatsappMessagePreview.buttons.map((btn, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                          {btn}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setPreviewTemplate(tpl)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-all flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button
                  onClick={() => {
                    onSelectTemplate(tpl);
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-900/40 transition-all flex items-center justify-center gap-1.5"
                >
                  Use This Template <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Preview Modal Popup */}
      {previewTemplate && (
        <div className="fixed inset-0 z-[999999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl p-6 relative text-white space-y-4 shadow-2xl">
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <img src={previewTemplate.image} alt="" className="w-14 h-14 rounded-2xl object-cover border border-slate-800" />
              <div>
                <h3 className="text-lg font-bold text-white">{previewTemplate.name}</h3>
                <span className="text-xs text-emerald-400 font-semibold">{previewTemplate.badge}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{previewTemplate.description}</p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-sans text-xs space-y-2">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">Interactive WhatsApp Phone Screen Mockup</span>
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-100 max-w-xs">
                <p className="whitespace-pre-line">{previewTemplate.whatsappMessagePreview.text}</p>
                <div className="mt-2 space-y-1">
                  {previewTemplate.whatsappMessagePreview.buttons.map((b, i) => (
                    <div key={i} className="px-3 py-1 rounded-lg bg-emerald-900 text-emerald-200 text-[10px] font-semibold text-center border border-emerald-500/40">
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  onSelectTemplate(previewTemplate);
                  setPreviewTemplate(null);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-900/40 flex items-center gap-2"
              >
                Load Into Canvas <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
