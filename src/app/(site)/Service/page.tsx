"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getProjectsByClientEmail,
  createProject,
  ProjectItem,
} from "@/lib/projectStore";
import Signin from "@/components/Auth/SignIn";
import {
  Sparkles,
  Lock,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  Code2,
  Terminal,
  Cpu,
  FileText,
  Zap,
  Send,
  AlertCircle,
  FolderOpen,
  ArrowRight,
  X,
} from "lucide-react";

export default function ServiceClientPortalPage() {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "quotation">("projects");
  const [clientProjects, setClientProjects] = useState<ProjectItem[]>([]);

  // Quotation form state
  const [selectedType, setSelectedType] = useState<"Website" | "Custom Software">("Custom Software");
  const [selectedScale, setSelectedScale] = useState<"Startup" | "Growth Enterprise" | "Custom Agency">("Growth Enterprise");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "WhatsApp AI Automation Bot",
    "Sub-50ms Edge Global CDN",
    "Payment Gateway & Webhook Sync",
  ]);
  const [customNotes, setCustomNotes] = useState("");
  const [quotationSubmitted, setQuotationSubmitted] = useState(false);

  // Load client projects from store matching logged-in user email
  const loadClientProjects = (email: string) => {
    if (!email) return;
    const projects = getProjectsByClientEmail(email);
    setClientProjects(projects);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser || storedToken) {
        try {
          const parsed = storedUser ? JSON.parse(storedUser) : { name: "Client", email: "" };
          setUser(parsed);
          if (parsed.email) {
            loadClientProjects(parsed.email);
          }
        } catch {
          setUser(null);
        }
      }
      setIsAuthChecked(true);
    }

    const handleUpdate = () => {
      if (user?.email) {
        loadClientProjects(user.email);
      }
    };
    window.addEventListener("cortex_projects_updated", handleUpdate);
    return () => window.removeEventListener("cortex_projects_updated", handleUpdate);
  }, [user?.email]);

  // Pricing calculations
  const basePrices = {
    Website: { Startup: 45000, "Growth Enterprise": 95000, "Custom Agency": 180000 },
    "Custom Software": { Startup: 85000, "Growth Enterprise": 195000, "Custom Agency": 350000 },
  };

  const calculatedBase = basePrices[selectedType][selectedScale];
  const featuresAddon = selectedFeatures.length * 15000;
  const estimatedTotal = calculatedBase + featuresAddon;

  const downPayment40 = Math.round(estimatedTotal * 0.4);
  const midPayment50 = Math.round(estimatedTotal * 0.5);
  const finalPayment10 = Math.round(estimatedTotal * 0.1);

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const [clientPhone, setClientPhone] = useState("6376930459");

  const handleQuotationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;

    // Create request entry in DB & store (with 0 price initially until fixed by Admin on call)
    createProject({
      clientEmail: user.email,
      clientName: user.name || "Valued Client",
      clientPhone: clientPhone || "6376930459",
      name: `${selectedType} (${selectedScale})`,
      type: selectedType,
      scale: selectedScale,
      totalQuotation: 0, // Price to be fixed by Admin on call
      priceFixedByAdmin: false,
      progressPercent: 0,
      status: "Quotation Under Discussion",
      assignedTeam: {
        architect: "Anmol Singh Thind (CTO)",
        qaLead: "Dharamveer Singh (Lead QA)",
        designer: "Pawan Kumar (UI Lead)",
      },
      payments: {
        downPayment40: { amount: 0, status: "PENDING" },
        midPayment50: { amount: 0, status: "PENDING" },
        finalPayment10: { amount: 0, status: "PENDING" },
      },
      updatesWarranty: {
        active: true,
        validUntil: `${new Date().getFullYear() + 1}-08-10 (1 Year Free)`,
      },
      testDetails: {
        passedSuites: 0,
        totalSuites: 40,
        lastAudit: "Request Saved to DB - Admin Alert Dispatched to 6376930459",
      },
      notes: `Contact Phone: ${clientPhone || "6376930459"} | Selected Modules: ${selectedFeatures.join(", ")} | Notes: ${customNotes}`,
    });

    setQuotationSubmitted(true);
    setTimeout(() => {
      setQuotationSubmitted(false);
      setActiveTab("projects");
      if (user.email) loadClientProjects(user.email);
    }, 2000);
  };

  if (!isAuthChecked) {
    return (
      <main className="bg-[#050505] text-white min-h-screen pt-36 pb-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  // NOT LOGGED IN ACCESS GATE (NO DEMO BYPASS)
  if (!user || !user.email) {
    return (
      <main className="bg-[#050505] text-white min-h-screen pt-32 pb-24 relative overflow-hidden bg-noise">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#6C63FF]/20 via-[#00D4FF]/10 to-transparent blur-[160px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111115] border border-white/[0.1] text-[#00D4FF] text-xs font-bold uppercase tracking-widest mb-6">
            <Lock size={14} className="text-[#6C63FF]" />
            Client Authentication Required
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Client Project & <span className="bg-gradient-to-r from-[#6C63FF] via-[#00D4FF] to-[#38BDF8] bg-clip-text text-transparent">Quotation Portal</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Please log in with your client account to access live tracking of your assigned projects, engineers, QA testing status, and quotation details.
          </p>

          {/* Luxury Card Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0B0B0F]/90 backdrop-blur-xl border border-white/[0.1] max-w-2xl mx-auto shadow-2xl text-left">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/[0.08]">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] p-0.5 flex-shrink-0">
                <div className="w-full h-full bg-[#0B0B0F] rounded-[14px] flex items-center justify-center text-[#00D4FF]">
                  <ShieldCheck size={28} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Client Portal Policy</h3>
                <p className="text-xs text-zinc-400">Strict payment milestones & 1-Year updates warranty</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                <CheckCircle2 size={18} className="text-[#00D4FF] flex-shrink-0 mt-0.5" />
                <span><strong>40% Upfront Down-Payment</strong> to start project & database architecture.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                <CheckCircle2 size={18} className="text-[#6C63FF] flex-shrink-0 mt-0.5" />
                <span><strong>50% Milestone Payment at 90% Completion</strong> post QA & load testing.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>10% Final Balance on 100% Delivery</strong> & source code handoff.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                <CheckCircle2 size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span><strong>1-Year Free Updates & Maintenance Warranty</strong> for Websites & Custom Software.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setIsSignInModalOpen(true)}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-sm text-center shadow-[0_0_25px_rgba(108,99,255,0.3)] hover:shadow-[0_0_35px_rgba(0,212,255,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95"
              >
                <UserCheck size={16} /> Log In to Access Your Client Projects
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-zinc-500">
            Looking for general services? <Link href="/services-overview" className="text-[#00D4FF] hover:underline font-semibold">View Services Showcase →</Link>
          </div>
        </div>

        {/* Local Fixed Sign In Modal Popup */}
        {isSignInModalOpen && (
          <div className="fixed inset-0 z-[999999] w-screen h-screen bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative mx-auto my-auto w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B0B0F] border border-white/[0.12] p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] custom-scrollbar">
              <button
                onClick={() => setIsSignInModalOpen(false)}
                className="hover:bg-white/10 p-2 rounded-full absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close Sign In Modal"
              >
                <X size={20} />
              </button>
              <Signin signInOpen={(value: boolean) => setIsSignInModalOpen(value)} />
            </div>
          </div>
        )}
      </main>
    );
  }

  // LOGGED-IN CLIENT PORTAL DASHBOARD (STRICTLY FILTERED BY USER EMAIL)
  return (
    <main className="bg-[#050505] text-white min-h-screen pt-28 pb-24 relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-[#6C63FF]/15 via-[#00D4FF]/10 to-transparent blur-[180px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* User Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Client Dashboard • Logged In
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Welcome, <span className="bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] bg-clip-text text-transparent">{user.name || "Client"}</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1">Client Email: <strong className="text-white">{user.email}</strong></p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 bg-[#0B0B0F] p-1.5 rounded-2xl border border-white/[0.08]">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "projects"
                  ? "bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Cpu size={15} /> Your Projects ({clientProjects.length})
            </button>
            <button
              onClick={() => setActiveTab("quotation")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "quotation"
                  ? "bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FileText size={15} /> Request New Quotation
            </button>
          </div>
        </div>

        {/* Policy Bar */}
        <div className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-[#0E0E18] to-[#121224] border border-[#6C63FF]/30 grid md:grid-cols-4 gap-6 items-center shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/20 border border-[#6C63FF]/40 flex items-center justify-center text-[#00D4FF]">
              <CreditCard size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-white">40% Down Payment</div>
              <div className="text-[11px] text-zinc-400">Kickoff & DB Architecture</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/20 border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF]">
              <Clock size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-white">50% at 90% Completion</div>
              <div className="text-[11px] text-zinc-400">Post QA & Load Testing</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-white">10% Final Delivery</div>
              <div className="text-[11px] text-zinc-400">100% Production Handover</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-white">1-Year Free Updates</div>
              <div className="text-[11px] text-zinc-400">Websites & Software Warranty</div>
            </div>
          </div>
        </div>

        {/* TAB 1: CLIENT SPECIFIC PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Terminal className="text-[#00D4FF]" size={22} />
                Live Projects Assigned To {user.email}
              </h2>
            </div>

            {clientProjects.length === 0 ? (
              <div className="p-16 rounded-3xl bg-[#0B0B0F]/90 border border-white/[0.08] text-center space-y-4 shadow-2xl max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-[#14141F] border border-white/[0.08] flex items-center justify-center mx-auto text-[#00D4FF]">
                  <FolderOpen size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">No Active Projects Found</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                  There are currently no active projects linked to <strong className="text-white">{user.email}</strong>. Calculate and submit a project quotation to get started!
                </p>
                <button
                  onClick={() => setActiveTab("quotation")}
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white text-xs font-bold shadow-lg"
                >
                  Request Project Quotation →
                </button>
              </div>
            ) : (
              <div className="grid gap-8">
                {clientProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-8 rounded-3xl bg-[#0B0B0F]/90 backdrop-blur-xl border border-white/[0.1] hover:border-[#6C63FF]/40 transition-all duration-300 shadow-2xl space-y-8"
                  >
                    {/* Top Bar */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#14141F] text-[#00D4FF] border border-white/[0.1]">
                            {project.id}
                          </span>
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#6C63FF]/20 text-[#6C63FF] border border-[#6C63FF]/30">
                            {project.type}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                              project.status === "Deployed (100%)"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>

                        <h3 className="text-2xl font-black text-white">{project.name}</h3>
                      </div>

                      <div className="text-left lg:text-right">
                        <div className="text-xs text-zinc-400">Total Quotation Budget</div>
                        <div className="text-2xl sm:text-3xl font-black text-white">
                          {project.priceFixedByAdmin || (project.totalQuotation && project.totalQuotation > 0) ? (
                            `₹${project.totalQuotation?.toLocaleString()}`
                          ) : (
                            <span className="text-amber-400 text-lg">Under Discussion (Admin Call Scheduled)</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quotation Pending Call Alert Banner */}
                    {(!project.priceFixedByAdmin || project.totalQuotation === 0) && (
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
                        <Clock size={20} className="text-amber-400 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Request Saved in DB & Alert Dispatched (6376930459):</strong> Admin will call you directly at <strong className="text-white">{project.clientPhone || "your mobile number"}</strong> to finalize your project quotation. Once Admin updates the agreed price from Admin Panel, live development progress will unlock below!
                        </div>
                      </div>
                    )}

                    {/* Progress & Assigned Engineer ("Kis ke pass hai") */}
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Overall Progress */}
                      <div className="p-6 rounded-2xl bg-[#12121A] border border-white/[0.06] space-y-4">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-zinc-300">Project Completion Progress</span>
                          <span className="text-[#00D4FF] font-mono">{project.progressPercent}%</span>
                        </div>

                        <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-white/[0.08]">
                          <div
                            className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] rounded-full transition-all duration-1000"
                            style={{ width: `${project.progressPercent}%` }}
                          />
                        </div>

                        <div className="text-xs text-zinc-400 pt-2 flex items-center gap-2">
                          <Clock size={14} className="text-[#6C63FF]" />
                          <span>Current Stage: <strong className="text-white">{project.status}</strong></span>
                        </div>
                      </div>

                      {/* Assigned Engineers ("Kis ke pass hai") */}
                      <div className="p-6 rounded-2xl bg-[#12121A] border border-white/[0.06] space-y-3">
                        <div className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                          <UserCheck size={16} className="text-[#00D4FF]" />
                          <span>Assigned Engineers ("Kis ke pass hai")</span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between text-zinc-400">
                            <span>Lead Architect:</span>
                            <strong className="text-white">{project.assignedTeam?.architect || "Anmol Singh Thind (CTO)"}</strong>
                          </div>
                          <div className="flex justify-between text-zinc-400">
                            <span>QA Testing Lead:</span>
                            <strong className="text-amber-400">{project.assignedTeam?.qaLead || "Dharamveer Singh"}</strong>
                          </div>
                          <div className="flex justify-between text-zinc-400">
                            <span>UI Lead:</span>
                            <strong className="text-white">{project.assignedTeam?.designer || "Pawan Kumar"}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Testing Status */}
                      <div className="p-6 rounded-2xl bg-[#12121A] border border-white/[0.06] space-y-3">
                        <div className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                          <Zap size={16} className="text-amber-400" />
                          <span>QA & Testing Status</span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between text-zinc-400">
                            <span>Passed Test Suites:</span>
                            <strong className="text-emerald-400 font-mono">
                              {project.testDetails?.passedSuites || 0} / {project.testDetails?.totalSuites || 40} Passed
                            </strong>
                          </div>
                          <div className="flex justify-between text-zinc-400">
                            <span>Last Audit:</span>
                            <strong className="text-white">{project.testDetails?.lastAudit || "Audit Active"}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Milestones Payment Status with Coming Soon Integration */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                          <CreditCard size={16} className="text-[#6C63FF]" />
                          Enforced Payment Schedule & Milestones
                        </h4>
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#6C63FF]/20 text-[#00D4FF] border border-[#6C63FF]/30">
                          🚀 Payment Gateway Integration Coming Soon (Razorpay & Cashfree)
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        {/* 40% */}
                        <div className="p-5 rounded-2xl bg-[#12121A] border border-white/[0.08] flex items-center justify-between">
                          <div>
                            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                              40% Kickoff Down-Payment
                            </div>
                            <div className="text-lg font-black text-white">
                              {project.totalQuotation ? `₹${Math.round(project.totalQuotation * 0.4).toLocaleString()}` : "Pending Quote"}
                            </div>
                            <div className="text-[10px] text-zinc-400">Project Kickoff & DB Setup</div>
                          </div>
                          <button
                            disabled
                            className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-white/[0.06] text-zinc-400 border border-white/[0.1] cursor-not-allowed flex items-center gap-1"
                          >
                            <Lock size={12} /> Pay 40% (Coming Soon)
                          </button>
                        </div>

                        {/* 50% */}
                        <div className="p-5 rounded-2xl bg-[#12121A] border border-white/[0.08] flex items-center justify-between">
                          <div>
                            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                              50% Mid Payment (at 90% QA)
                            </div>
                            <div className="text-lg font-black text-white">
                              {project.totalQuotation ? `₹${Math.round(project.totalQuotation * 0.5).toLocaleString()}` : "Pending Quote"}
                            </div>
                            <div className="text-[10px] text-zinc-400">Triggered Post QA Testing</div>
                          </div>
                          <button
                            disabled
                            className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-white/[0.06] text-zinc-400 border border-white/[0.1] cursor-not-allowed flex items-center gap-1"
                          >
                            <Lock size={12} /> Pay 50% (Coming Soon)
                          </button>
                        </div>

                        {/* 10% */}
                        <div className="p-5 rounded-2xl bg-[#12121A] border border-white/[0.08] flex items-center justify-between">
                          <div>
                            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                              10% Final Delivery Payment
                            </div>
                            <div className="text-lg font-black text-white">
                              {project.totalQuotation ? `₹${Math.round(project.totalQuotation * 0.1).toLocaleString()}` : "Pending Quote"}
                            </div>
                            <div className="text-[10px] text-zinc-400">At 100% Production Handover</div>
                          </div>
                          <button
                            disabled
                            className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-white/[0.06] text-zinc-400 border border-white/[0.1] cursor-not-allowed flex items-center gap-1"
                          >
                            <Lock size={12} /> Pay 10% (Coming Soon)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 1-Year Free Updates Warranty Badge */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-[#141424] to-[#0E1520] border border-[#00D4FF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/20 border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF] flex-shrink-0">
                          <ShieldCheck size={22} />
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-white">
                            1-Year Free Updates & Maintenance Warranty Included
                          </div>
                          <div className="text-xs text-zinc-400">
                            Covers security patches, edge performance updates, and bug fixes until{" "}
                            <span className="text-[#00D4FF] font-semibold">{project.updatesWarranty?.validUntil}</span>
                          </div>
                        </div>
                      </div>

                      <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 self-start sm:self-auto">
                        WARRANTY ACTIVE
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROJECT QUOTATION BUILDER */}
        {activeTab === "quotation" && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#0B0B0F]/90 backdrop-blur-xl border border-white/[0.1] shadow-2xl space-y-8">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <FileText className="text-[#6C63FF]" size={22} />
                  Calculate & Submit Project Quotation
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Submitting a quotation request will automatically link the project to <strong className="text-white">{user.email}</strong>.
                </p>
              </div>

              {quotationSubmitted && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-3">
                  <CheckCircle2 size={18} />
                  Project quotation created and linked to your email ({user.email})! Redirecting...
                </div>
              )}

              <form onSubmit={handleQuotationSubmit} className="space-y-6">
                {/* Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    1. Select Project Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedType("Website")}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        selectedType === "Website"
                          ? "bg-[#6C63FF]/15 border-[#6C63FF] text-white shadow-[0_0_20px_rgba(108,99,255,0.2)]"
                          : "bg-[#12121A] border-white/[0.08] text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Code2 size={24} className={selectedType === "Website" ? "text-[#00D4FF] mb-2" : "mb-2"} />
                      <div className="font-bold text-sm">Enterprise Website</div>
                      <div className="text-[11px] text-zinc-400">High-converting Web & Landing</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedType("Custom Software")}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        selectedType === "Custom Software"
                          ? "bg-[#6C63FF]/15 border-[#6C63FF] text-white shadow-[0_0_20px_rgba(108,99,255,0.2)]"
                          : "bg-[#12121A] border-white/[0.08] text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Cpu size={24} className={selectedType === "Custom Software" ? "text-[#00D4FF] mb-2" : "mb-2"} />
                      <div className="font-bold text-sm">Custom Software / SaaS</div>
                      <div className="text-[11px] text-zinc-400">Fullstack Web App & AI Automation</div>
                    </button>
                  </div>
                </div>

                {/* Scale */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    2. Select Scope & Scale
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    {(["Startup", "Growth Enterprise", "Custom Agency"] as const).map((scale) => (
                      <button
                        key={scale}
                        type="button"
                        onClick={() => setSelectedScale(scale)}
                        className={`p-4 rounded-xl border text-center transition-all ${
                          selectedScale === scale
                            ? "bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] border-transparent text-white font-bold shadow-lg"
                            : "bg-[#12121A] border-white/[0.08] text-zinc-400 hover:text-white text-xs"
                        }`}
                      >
                        <div className="text-xs">{scale}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    3. Modules & AI Addons
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "WhatsApp AI Automation Bot",
                      "Sub-50ms Edge Global CDN",
                      "Payment Gateway & Webhook Sync",
                      "Vector RAG Knowledge Base Search",
                      "Multi-Tenant Role Permissions",
                      "Automated CI/CD Deployment",
                    ].map((feat) => {
                      const isChecked = selectedFeatures.includes(feat);
                      return (
                        <button
                          key={feat}
                          type="button"
                          onClick={() => toggleFeature(feat)}
                          className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isChecked
                              ? "bg-[#161625] border-[#00D4FF]/60 text-white font-semibold"
                              : "bg-[#12121A] border-white/[0.06] text-zinc-400"
                          }`}
                        >
                          <span>{feat}</span>
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isChecked ? "bg-[#00D4FF] border-[#00D4FF] text-black" : "border-white/20"
                            }`}
                          >
                            {isChecked && <CheckCircle2 size={12} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Phone Number Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                    Contact Phone Number (For Direct Admin Call & Price Discussion)
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. 6376930459 / Your Phone Number"
                    className="w-full p-4 rounded-xl bg-[#12121A] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-[#00D4FF]"
                    required
                  />
                  <p className="text-[10px] text-zinc-400">Admin will call this phone number to discuss requirements & finalize quotation.</p>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Special Requirements / Custom Features
                  </label>
                  <textarea
                    rows={3}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Describe specific features..."
                    className="w-full p-4 rounded-xl bg-[#12121A] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-[#6C63FF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(108,99,255,0.4)] hover:shadow-[0_0_35px_rgba(0,212,255,0.6)] transition-all"
                >
                  <Send size={16} /> Submit Project Request (Alert Sent to Admin 6376930459)
                </button>
              </form>
            </div>

            {/* Summary Box */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0B0B0F]/90 backdrop-blur-xl border border-[#6C63FF]/40 shadow-2xl space-y-8 sticky top-28">
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Quotation Under Discussion
                </span>
                <h3 className="text-2xl font-black text-white mt-3">
                  Price Fixed via Call with Admin
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  No arbitrary automatic price shown. Submitting this request dispatches a direct alert to Admin (<strong className="text-white">6376930459</strong>). Admin will call you at your phone number to discuss requirements and fix the final custom price.
                </p>
              </div>

              {/* Milestones */}
              <div className="space-y-4 pt-6 border-t border-white/[0.08]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Enforced Payment Milestones (Coming Soon)
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#12121A] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">40% Upfront Down-Payment</div>
                      <div className="text-[10px] text-zinc-400">Project Kickoff & DB Architecture</div>
                    </div>
                    <span className="font-mono font-bold text-[#00D4FF] text-xs bg-[#00D4FF]/10 px-2 py-1 rounded border border-[#00D4FF]/30">
                      🔒 Coming Soon
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#12121A] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">50% Mid Payment (at 90% QA)</div>
                      <div className="text-[10px] text-zinc-400">Post QA & Load Testing</div>
                    </div>
                    <span className="font-mono font-bold text-amber-400 text-xs bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30">
                      🔒 Coming Soon
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#12121A] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">10% Final Release Payment</div>
                      <div className="text-[10px] text-zinc-400">100% Production Handover</div>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 text-xs bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                      🔒 Coming Soon
                    </span>
                  </div>
                </div>
              </div>

              {/* Warranty */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
                <div className="font-bold flex items-center gap-2">
                  <ShieldCheck size={16} /> 1-Year Free Updates Warranty Included
                </div>
                <p className="text-[11px] text-amber-200/80 leading-relaxed">
                  All websites and software engineered by Cortex include 365 days of free maintenance, security patching, and edge updates.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
