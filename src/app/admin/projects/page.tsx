"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getAllProjects,
  updateProject,
  deleteProject,
  createProject,
  ProjectItem,
} from "@/lib/projectStore";
import {
  ShieldCheck,
  Sparkles,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  User,
  CreditCard,
  Search,
  ExternalLink,
  Terminal,
  Cpu,
  Code2,
  Bot,
  Layers,
  Zap,
  X,
  Save,
  RefreshCw,
} from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New project form state
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<"Website" | "Custom Software" | "AI Automation">("Custom Software");
  const [newScale, setNewScale] = useState<"Startup" | "Growth Enterprise" | "Custom Agency">("Growth Enterprise");
  const [newTotalQuotation, setNewTotalQuotation] = useState<number>(195000);

  const reloadData = () => {
    setProjects(getAllProjects());
  };

  useEffect(() => {
    reloadData();
    const handleUpdate = () => reloadData();
    window.addEventListener("cortex_projects_updated", handleUpdate);
    return () => window.removeEventListener("cortex_projects_updated", handleUpdate);
  }, []);

  // Filter projects by search term & status
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientEmail || !newName) return;

    const down40 = Math.round(newTotalQuotation * 0.4);
    const mid50 = Math.round(newTotalQuotation * 0.5);
    const final10 = Math.round(newTotalQuotation * 0.1);

    createProject({
      clientEmail: newClientEmail.trim(),
      clientName: newClientName.trim() || "Client",
      name: newName,
      type: newType,
      scale: newScale,
      totalQuotation: newTotalQuotation,
      progressPercent: 10,
      status: "Architecture & Setup",
      assignedTeam: {
        architect: "Anmol Singh Thind (CTO)",
        qaLead: "Dharamveer Singh (Lead QA)",
        designer: "Pawan Kumar (UI Lead)",
      },
      payments: {
        downPayment40: { amount: down40, status: "PAID" },
        midPayment50: { amount: mid50, status: "PENDING" },
        finalPayment10: { amount: final10, status: "PENDING" },
      },
      updatesWarranty: {
        active: true,
        validUntil: `${new Date().getFullYear() + 1}-08-10 (1 Year Free)`,
      },
      testDetails: {
        passedSuites: 5,
        totalSuites: 50,
        lastAudit: "Architecture Verified",
      },
    });

    setIsCreateModalOpen(false);
    setNewClientEmail("");
    setNewClientName("");
    setNewName("");
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const total = Number(editingProject.totalQuotation || 0);
    const isFixed = total > 0;

    const updated: ProjectItem = {
      ...editingProject,
      priceFixedByAdmin: isFixed,
      totalQuotation: total,
      status:
        isFixed && editingProject.status === "Quotation Under Discussion"
          ? "Architecture & Setup"
          : editingProject.status,
      payments: {
        downPayment40: {
          amount: Math.round(total * 0.4),
          status: editingProject.payments?.downPayment40?.status || "PENDING",
        },
        midPayment50: {
          amount: Math.round(total * 0.5),
          status: editingProject.payments?.midPayment50?.status || "PENDING",
        },
        finalPayment10: {
          amount: Math.round(total * 0.1),
          status: editingProject.payments?.finalPayment10?.status || "PENDING",
        },
      },
    };

    updateProject(editingProject.id, updated);
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this client project?")) {
      deleteProject(id);
    }
  };

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-28 pb-24 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-[#6C63FF]/15 via-[#00D4FF]/10 to-transparent blur-[180px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D4FF] bg-[#00D4FF]/10 px-3 py-1 rounded-full border border-[#00D4FF]/20 mb-2">
              <ShieldCheck size={14} className="text-[#6C63FF]" />
              Super Admin Management Console
            </div>
            <h1 className="text-3xl font-black text-white">Client Project Control Panel</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Assign projects, update engineer assignments ("kis ke pass hai"), progress %, testing stage, and payment milestones.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/Service"
              target="_blank"
              className="py-2.5 px-4 rounded-xl bg-[#14141F] hover:bg-[#1C1C2B] text-zinc-300 text-xs font-bold border border-white/[0.1] flex items-center gap-2 transition-all"
            >
              <ExternalLink size={14} /> View Client Portal (/Service)
            </Link>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(108,99,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all"
            >
              <Plus size={16} /> Create Client Project
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0B0B0F]/90 border border-white/[0.08] space-y-1">
            <div className="text-xs text-zinc-400">Total Client Projects</div>
            <div className="text-2xl font-black text-white">{projects.length}</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B0B0F]/90 border border-white/[0.08] space-y-1">
            <div className="text-xs text-zinc-400">In QA & Testing</div>
            <div className="text-2xl font-black text-amber-400">
              {projects.filter((p) => p.status === "In QA & Testing").length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B0B0F]/90 border border-white/[0.08] space-y-1">
            <div className="text-xs text-zinc-400">Deployed (100%)</div>
            <div className="text-2xl font-black text-emerald-400">
              {projects.filter((p) => p.status === "Deployed (100%)").length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B0B0F]/90 border border-white/[0.08] space-y-1">
            <div className="text-xs text-zinc-400">Total Quotation Value</div>
            <div className="text-2xl font-black text-[#00D4FF]">
              ₹{projects.reduce((acc, p) => acc + (p.totalQuotation || 0), 0).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-[#0B0B0F]/90 border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by client email, name, project ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#14141F] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-[#6C63FF]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <span className="text-xs text-zinc-400 font-bold whitespace-nowrap">Filter Status:</span>
            {[
              "ALL",
              "Quotation Requested",
              "Architecture & Setup",
              "In Development",
              "In QA & Testing",
              "Awaiting 90% Payment",
              "Deployed (100%)",
            ].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? "bg-[#6C63FF] text-white"
                    : "bg-[#14141F] text-zinc-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List Table */}
        <div className="rounded-3xl bg-[#0B0B0F]/90 border border-white/[0.08] overflow-hidden shadow-2xl">
          {filteredProjects.length === 0 ? (
            <div className="p-16 text-center text-zinc-500 text-sm space-y-3">
              <Terminal size={32} className="mx-auto text-zinc-600" />
              <div>No projects match your search query.</div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6C63FF] text-white text-xs font-bold"
              >
                <Plus size={14} /> Add First Client Project
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-[#14141F] text-zinc-400 font-bold uppercase tracking-wider border-b border-white/[0.08]">
                  <tr>
                    <th className="p-4">Client Name & Email</th>
                    <th className="p-4">Project Title</th>
                    <th className="p-4">Assigned Engineers ("Kis ke pass hai")</th>
                    <th className="p-4">Progress & Status</th>
                    <th className="p-4">Milestones Payment</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredProjects.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Client Info */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 font-extrabold text-white text-sm">
                          <User size={14} className="text-[#00D4FF]" />
                          <span>{p.clientName || "Valued Client"}</span>
                        </div>
                        <div className="text-xs text-zinc-300 font-mono mt-0.5">
                          📱 {p.clientPhone || "6376930459"}
                        </div>
                        <div className="text-[11px] text-zinc-400 font-mono">{p.clientEmail}</div>
                        <div className="text-[10px] text-zinc-600 font-mono">ID: {p.id}</div>
                      </td>

                      {/* Project Title & Price */}
                      <td className="p-4">
                        <div className="font-extrabold text-white text-sm">{p.name}</div>
                        <div className="mt-1">
                          {p.priceFixedByAdmin || (p.totalQuotation && p.totalQuotation > 0) ? (
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              Fixed Price: ₹{p.totalQuotation?.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                              📞 Call Client & Fix Price (6376930459)
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Assigned Engineers ("Kis ke pass hai") */}
                      <td className="p-4 space-y-1">
                        <div className="text-[11px] text-zinc-300">
                          <strong>Arch:</strong> {p.assignedTeam?.architect || "Unassigned"}
                        </div>
                        <div className="text-[11px] text-amber-400">
                          <strong>QA Lead:</strong> {p.assignedTeam?.qaLead || "Dharamveer Singh"}
                        </div>
                      </td>

                      {/* Progress & Stage */}
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white">{p.progressPercent}%</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.status === "Deployed (100%)"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                        <div className="w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF]"
                            style={{ width: `${p.progressPercent}%` }}
                          />
                        </div>
                      </td>

                      {/* Payment Schedule */}
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="text-zinc-400">40%:</span>
                          <strong className={p.payments?.downPayment40?.status === "PAID" ? "text-emerald-400" : "text-amber-400"}>
                            {p.payments?.downPayment40?.status || "PENDING"}
                          </strong>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="text-zinc-400">50%:</span>
                          <strong className={p.payments?.midPayment50?.status === "PAID" ? "text-emerald-400" : "text-amber-400"}>
                            {p.payments?.midPayment50?.status || "PENDING"}
                          </strong>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingProject(p)}
                            className="p-2 rounded-lg bg-[#14141F] hover:bg-[#6C63FF] text-zinc-300 hover:text-white border border-white/[0.08] transition-all"
                            title="Edit Project"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 rounded-lg bg-[#14141F] hover:bg-rose-600 text-zinc-300 hover:text-white border border-white/[0.08] transition-all"
                            title="Delete Project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* EDIT PROJECT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B0B0F] border border-white/[0.1] rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-xl font-bold text-white">Edit Client Project: {editingProject.id}</h3>
                <p className="text-xs text-zinc-400">Update live progress, engineers assigned, and payment status</p>
              </div>
              <button onClick={() => setEditingProject(null)} className="p-2 text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSave} className="space-y-4 text-xs">
              {/* Client Email & Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Target Client Email</label>
                  <input
                    type="email"
                    value={editingProject.clientEmail}
                    onChange={(e) => setEditingProject({ ...editingProject, clientEmail: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editingProject.clientName}
                    onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                  />
                </div>
              </div>

              {/* Project Name & Total Budget */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Project Name</label>
                  <input
                    type="text"
                    value={editingProject.name}
                    onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Total Quotation Amount (₹)</label>
                  <input
                    type="number"
                    value={editingProject.totalQuotation}
                    onChange={(e) => setEditingProject({ ...editingProject, totalQuotation: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                    required
                  />
                </div>
              </div>

              {/* Progress & Stage Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Progress Percentage ({editingProject.progressPercent}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingProject.progressPercent}
                    onChange={(e) => setEditingProject({ ...editingProject, progressPercent: Number(e.target.value) })}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#6C63FF]"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Project Active Stage</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                  >
                    <option value="Quotation Requested">Quotation Requested</option>
                    <option value="Architecture & Setup">Architecture & Setup</option>
                    <option value="In Development">In Development</option>
                    <option value="In QA & Testing">In QA & Testing</option>
                    <option value="Awaiting 90% Payment">Awaiting 90% Payment</option>
                    <option value="Deployed (100%)">Deployed (100%)</option>
                  </select>
                </div>
              </div>

              {/* Assigned Engineers ("Kis ke pass hai") */}
              <div className="p-4 rounded-2xl bg-[#14141F] border border-white/[0.06] space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <User size={14} className="text-[#00D4FF]" /> Assigned Engineers & Team ("Kis ke pass hai")
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Lead Architect</label>
                    <input
                      type="text"
                      value={editingProject.assignedTeam?.architect || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          assignedTeam: { ...editingProject.assignedTeam, architect: e.target.value },
                        })
                      }
                      className="w-full p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">QA Testing Lead</label>
                    <input
                      type="text"
                      value={editingProject.assignedTeam?.qaLead || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          assignedTeam: { ...editingProject.assignedTeam, qaLead: e.target.value },
                        })
                      }
                      className="w-full p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">UI Lead</label>
                    <input
                      type="text"
                      value={editingProject.assignedTeam?.designer || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          assignedTeam: { ...editingProject.assignedTeam, designer: e.target.value },
                        })
                      }
                      className="w-full p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Schedule Status */}
              <div className="p-4 rounded-2xl bg-[#14141F] border border-white/[0.06] space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <CreditCard size={14} className="text-emerald-400" /> Payment Milestones Status
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">40% Down Payment</label>
                    <select
                      value={editingProject.payments?.downPayment40?.status || "PENDING"}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          payments: {
                            ...editingProject.payments,
                            downPayment40: {
                              ...editingProject.payments?.downPayment40,
                              amount: editingProject.payments?.downPayment40?.amount || Math.round(editingProject.totalQuotation * 0.4),
                              status: e.target.value as any,
                            },
                          },
                        })
                      }
                      className="w-full p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                    >
                      <option value="PAID">PAID</option>
                      <option value="PENDING">PENDING</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">50% Mid Payment (at 90% QA)</label>
                    <select
                      value={editingProject.payments?.midPayment50?.status || "PENDING"}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          payments: {
                            ...editingProject.payments,
                            midPayment50: {
                              ...editingProject.payments?.midPayment50,
                              amount: editingProject.payments?.midPayment50?.amount || Math.round(editingProject.totalQuotation * 0.5),
                              status: e.target.value as any,
                            },
                          },
                        })
                      }
                      className="w-full p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                    >
                      <option value="PAID">PAID</option>
                      <option value="DUE">DUE</option>
                      <option value="PENDING">PENDING</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">10% Final Payment</label>
                    <select
                      value={editingProject.payments?.finalPayment10?.status || "PENDING"}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          payments: {
                            ...editingProject.payments,
                            finalPayment10: {
                              ...editingProject.payments?.finalPayment10,
                              amount: editingProject.payments?.finalPayment10?.amount || Math.round(editingProject.totalQuotation * 0.1),
                              status: e.target.value as any,
                            },
                          },
                        })
                      }
                      className="w-full p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                    >
                      <option value="PAID">PAID</option>
                      <option value="PENDING">PENDING</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Save size={16} /> Save Changes & Sync Client View
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-6 py-3.5 rounded-xl bg-[#14141F] text-zinc-300 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW PROJECT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0B0F] border border-white/[0.1] rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-xl font-bold text-white">Create Client Project</h3>
                <p className="text-xs text-zinc-400">Directly link project to a client email address</p>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-2 text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Client Email (Required)</label>
                <input
                  type="email"
                  placeholder="e.g. client@company.com"
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-white block mb-1">Client Full Name (Required)</label>
                <input
                  type="text"
                  placeholder="e.g. Rohan Verma / Anmol Singh"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white focus:border-[#00D4FF]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g. E-Commerce & WhatsApp AI Automation"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                  >
                    <option value="Custom Software">Custom Software</option>
                    <option value="Website">Website</option>
                    <option value="AI Automation">AI Automation</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Total Quotation (₹)</label>
                  <input
                    type="number"
                    value={newTotalQuotation}
                    onChange={(e) => setNewTotalQuotation(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Create & Assign to Client Email
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-6 py-3.5 rounded-xl bg-[#14141F] text-zinc-300 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
