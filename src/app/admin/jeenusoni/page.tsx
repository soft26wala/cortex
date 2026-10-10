"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Crown,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Plus,
  Edit,
  Trash2,
  Search,
  ExternalLink,
  Save,
  X,
  Phone,
  MessageCircle,
  Upload,
  RefreshCw,
  Film,
  Camera,
  Users,
  LayoutDashboard,
  Settings,
  Filter,
  CheckCircle2,
  Eye,
  Lock,
  Globe,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";
import { JeenuProfileData, JeenuVlogData, JeenuGalleryData, JeenuSocialLinkData, JeenuAdLeadData } from "@/lib/db";

export default function AdminJeenuSoniPage() {
  // Active Tab: "leads" | "profile" | "vlogs" | "gallery" | "socials"
  const [activeTab, setActiveTab] = useState<"leads" | "profile" | "vlogs" | "gallery" | "socials">("leads");

  // Current Active Role for Testing Authorization Requirement (ADMIN & SONI allowed, USER/CLIENT/EDITOR denied)
  const [currentRole, setCurrentRole] = useState<string>("ADMIN");
  const [authError, setAuthError] = useState<string | null>(null);

  // Data States
  const [profile, setProfile] = useState<JeenuProfileData | null>(null);
  const [vlogs, setVlogs] = useState<JeenuVlogData[]>([]);
  const [gallery, setGallery] = useState<JeenuGalleryData[]>([]);
  const [socials, setSocials] = useState<JeenuSocialLinkData[]>([]);
  const [leads, setLeads] = useState<JeenuAdLeadData[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Modals
  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState<JeenuAdLeadData | null>(null);

  // Modal Flags
  const [isVlogModalOpen, setIsVlogModalOpen] = useState(false);
  const [editingVlog, setEditingVlog] = useState<JeenuVlogData | null>(null);

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<JeenuGalleryData | null>(null);

  // Social Links Form State & Modal
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<JeenuSocialLinkData | null>(null);
  const [socPlatform, setSocPlatform] = useState("Instagram");
  const [socUrl, setSocUrl] = useState("");
  const [socLabel, setSocLabel] = useState("");
  const [socIcon, setSocIcon] = useState("instagram");
  const [socActive, setSocActive] = useState(true);
  const [socOrder, setSocOrder] = useState(1);

  const [uploading, setUploading] = useState(false);

  // Vlog Form State
  const [vlogTitle, setVlogTitle] = useState("");
  const [vlogDesc, setVlogDesc] = useState("");
  const [vlogThumb, setVlogThumb] = useState("");
  const [vlogVideo, setVlogVideo] = useState("");
  const [vlogCategory, setVlogCategory] = useState("Lifestyle");
  const [vlogPublished, setVlogPublished] = useState(true);
  const [vlogOrder, setVlogOrder] = useState(1);

  // Gallery Form State
  const [galImage, setGalImage] = useState("");
  const [galTitle, setGalTitle] = useState("");
  const [galCaption, setGalCaption] = useState("");
  const [galPublished, setGalPublished] = useState(true);
  const [galOrder, setGalOrder] = useState(1);

  // Profile Form State
  const [profileForm, setProfileForm] = useState<Partial<JeenuProfileData>>({});

  // Helper headers with current role for server-side auth checking
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "x-user-role": currentRole,
    "x-user-id": currentRole === "SONI" ? "usr_soni_01" : "usr_admin_01",
    "x-user-email": currentRole === "SONI" ? "soni@cortex.com" : "admin@cortex.com",
    Authorization: `Bearer ${currentRole.toLowerCase()}-token`,
  });

  const fetchData = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      const headers = getAuthHeaders();

      const [profRes, vlogRes, galRes, socRes, leadRes] = await Promise.all([
        fetch("/api/vlog/jeenusoni/profile", { headers, cache: "no-store" }),
        fetch("/api/vlog/jeenusoni/vlogs?all=true", { headers, cache: "no-store" }),
        fetch("/api/vlog/jeenusoni/gallery?all=true", { headers, cache: "no-store" }),
        fetch("/api/vlog/jeenusoni/socials?all=true", { headers, cache: "no-store" }),
        fetch(`/api/vlog/jeenusoni/leads?status=${leadStatusFilter}&search=${encodeURIComponent(leadSearch)}`, { headers, cache: "no-store" }),
      ]);

      const profJson = await profRes.json();
      const vlogJson = await vlogRes.json();
      const galJson = await galRes.json();
      const socJson = await socRes.json();
      const leadJson = await leadRes.json();

      // If leads endpoint returned auth forbidden error, set auth error
      if (leadRes.status === 403 || leadRes.status === 401 || (!leadJson.success && leadJson.error?.includes("Denied"))) {
        setAuthError(leadJson.error || "403 Forbidden: Role not authorized");
      } else {
        if (profJson.success && profJson.data) {
          setProfile(profJson.data);
          setProfileForm(profJson.data);
        }
        if (vlogJson.success && Array.isArray(vlogJson.data)) setVlogs(vlogJson.data);
        if (galJson.success && Array.isArray(galJson.data)) setGallery(galJson.data);
        if (socJson.success && Array.isArray(socJson.data)) setSocials(socJson.data);
        if (leadJson.success && Array.isArray(leadJson.data)) setLeads(leadJson.data);
      }
    } catch (err: any) {
      console.error("Error fetching Jeenu Soni admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentRole, leadStatusFilter, leadSearch]);

  // Image Upload Helper
  const handleFileUpload = async (file: File, callback: (url: string) => void) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.url) {
        callback(json.url);
      } else {
        alert(json.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  // Save Profile
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/vlog/jeenusoni/profile", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(profileForm),
      });

      const json = await res.json();
      if (json.success) {
        alert("Profile & Customizations saved successfully!");
        fetchData();
      } else {
        alert(json.error || "Failed to update profile");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Lead Status Change
  const handleLeadStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/vlog/jeenusoni/leads/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      const json = await res.json();
      if (json.success) {
        fetchData();
      } else {
        alert(json.error || "Failed to update lead status");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Delete Lead
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ad lead request?")) return;
    try {
      const res = await fetch(`/api/vlog/jeenusoni/leads/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const json = await res.json();
      if (json.success) {
        setSelectedLead(null);
        fetchData();
      } else {
        alert(json.error || "Failed to delete lead");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Vlog Create/Edit Submit
  const handleVlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vlogTitle.trim()) return alert("Vlog title is required");

    try {
      const payload = {
        title: vlogTitle,
        description: vlogDesc,
        thumbnail: vlogThumb || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
        videoUrl: vlogVideo || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: vlogCategory,
        published: vlogPublished,
        sortOrder: Number(vlogOrder || 1),
      };

      const url = editingVlog ? `/api/vlog/jeenusoni/vlogs/${editingVlog.id}` : "/api/vlog/jeenusoni/vlogs";
      const method = editingVlog ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setIsVlogModalOpen(false);
        setEditingVlog(null);
        resetVlogForm();
        fetchData();
      } else {
        alert(json.error || "Operation failed");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteVlog = async (id: string) => {
    if (!confirm("Delete this vlog entry?")) return;
    try {
      const res = await fetch(`/api/vlog/jeenusoni/vlogs/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if ((await res.json()).success) fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const resetVlogForm = () => {
    setVlogTitle("");
    setVlogDesc("");
    setVlogThumb("");
    setVlogVideo("");
    setVlogCategory("Lifestyle");
    setVlogPublished(true);
    setVlogOrder(vlogs.length + 1);
  };

  // Gallery Create/Edit Submit
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galImage.trim()) return alert("Image URL is required");

    try {
      const payload = {
        imageUrl: galImage,
        title: galTitle,
        caption: galCaption,
        published: galPublished,
        sortOrder: Number(galOrder || 1),
      };

      const url = editingGallery ? `/api/vlog/jeenusoni/gallery/${editingGallery.id}` : "/api/vlog/jeenusoni/gallery";
      const method = editingGallery ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setIsGalleryModalOpen(false);
        setEditingGallery(null);
        setGalImage("");
        setGalTitle("");
        setGalCaption("");
        fetchData();
      } else {
        alert(json.error || "Operation failed");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;
    try {
      const res = await fetch(`/api/vlog/jeenusoni/gallery/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if ((await res.json()).success) fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Social Link Create/Edit Submit
  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socPlatform.trim() || !socUrl.trim()) return alert("Platform and URL are required");

    try {
      const payload = {
        platform: socPlatform,
        url: socUrl,
        label: socLabel || socPlatform,
        icon: socIcon || socPlatform.toLowerCase(),
        isActive: socActive,
        sortOrder: Number(socOrder || 1),
      };

      const url = editingSocial ? `/api/vlog/jeenusoni/socials/${editingSocial.id}` : "/api/vlog/jeenusoni/socials";
      const method = editingSocial ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setIsSocialModalOpen(false);
        setEditingSocial(null);
        resetSocialForm();
        fetchData();
      } else {
        alert(json.error || "Operation failed");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteSocial = async (id: string) => {
    if (!confirm("Delete this social link?")) return;
    try {
      const res = await fetch(`/api/vlog/jeenusoni/socials/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if ((await res.json()).success) fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleToggleSocialActive = async (social: JeenuSocialLinkData) => {
    try {
      const res = await fetch(`/api/vlog/jeenusoni/socials/${social.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive: !social.isActive }),
      });
      if ((await res.json()).success) fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const resetSocialForm = () => {
    setSocPlatform("Instagram");
    setSocUrl("");
    setSocLabel("");
    setSocIcon("instagram");
    setSocActive(true);
    setSocOrder(socials.length + 1);
  };

  const isRoleAllowed = ["ADMIN", "SONI", "SUPER ADMIN", "SUPERADMIN"].includes(currentRole.trim().toUpperCase());

  return (
    <main className="bg-[#050305] text-white min-h-screen pt-24 pb-20 relative overflow-hidden font-sans">
      {/* Background Lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-rose-950/20 via-[#E8C39E]/10 to-transparent blur-[180px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl space-y-8">
        {/* Top Header Bar & Role Testing Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-rose-500/10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E8C39E] bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/20">
              <Crown size={14} className="text-[#E8C39E]" />
              Jeenu Soni Luxury Vlog Control Console
            </div>
            <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
              Brand & Influencer Management
            </h1>
            <p className="text-xs text-zinc-400">
              Manage ad leads, customize profile presets, edit vlogs, gallery lookbook & social links.
            </p>
          </div>

          {/* Role Authorization Switcher (Demonstrates Strict Security Requirements) */}
          <div className="flex flex-wrap items-center gap-3 bg-[#11060B] p-2 rounded-2xl border border-rose-500/20">
            <div className="text-[11px] font-mono text-zinc-400 pl-2 flex items-center gap-1.5">
              <Lock size={12} className="text-rose-400" />
              Role Authorization Test:
            </div>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="bg-black text-[#FCE7D4] text-xs font-bold font-mono px-3 py-1.5 rounded-xl border border-rose-500/30 focus:outline-none cursor-pointer"
            >
              <option value="ADMIN">ADMIN (Allowed)</option>
              <option value="SONI">SONI (Allowed)</option>
              <option value="USER">USER (Denied)</option>
              <option value="CUSTOMER">CUSTOMER (Denied)</option>
              <option value="EDITOR">EDITOR (Denied)</option>
              <option value="CLIENT">CLIENT (Denied)</option>
              <option value="TEACHER">TEACHER (Denied)</option>
            </select>

            <Link
              href="/vlog/jeenusoni"
              target="_blank"
              className="py-1.5 px-3 rounded-xl bg-rose-950 hover:bg-rose-900 text-[#FCE7D4] text-xs font-semibold flex items-center gap-1.5 border border-rose-500/30 transition-all"
            >
              <ExternalLink size={13} /> View Public Page
            </Link>
          </div>
        </div>

        {/* Access Denied Alert when testing unauthorized roles */}
        {!isRoleAllowed || authError ? (
          <div className="p-8 rounded-3xl bg-rose-950/60 border border-rose-500/40 text-center space-y-4 shadow-2xl">
            <ShieldAlert size={48} className="mx-auto text-rose-500 animate-bounce" />
            <h2 className="text-2xl font-serif font-bold text-white">403 Forbidden: Access Denied</h2>
            <p className="text-xs text-rose-200 max-w-lg mx-auto leading-relaxed">
              {authError || `Current role '${currentRole}' is strictly forbidden from accessing Jeenu Soni admin section. Only ADMIN and SONI roles are authorized.`}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentRole("ADMIN")}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-900 to-rose-950 text-white font-bold text-xs border border-rose-400/30 shadow-lg hover:scale-105 transition-all"
              >
                Switch to Authorized ADMIN Role
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Dashboard Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-rose-500/10 space-y-1">
                <div className="text-[11px] text-zinc-400 font-mono">Total Ad Leads</div>
                <div className="text-2xl font-serif font-bold text-white">{leads.length}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-rose-500/10 space-y-1">
                <div className="text-[11px] text-zinc-400 font-mono">New Unread Leads</div>
                <div className="text-2xl font-serif font-bold text-rose-400">
                  {leads.filter((l) => l.status === "NEW").length}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-rose-500/10 space-y-1">
                <div className="text-[11px] text-zinc-400 font-mono">Total Vlogs</div>
                <div className="text-2xl font-serif font-bold text-[#E8C39E]">{vlogs.length}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-rose-500/10 space-y-1">
                <div className="text-[11px] text-zinc-400 font-mono">Published Vlogs</div>
                <div className="text-2xl font-serif font-bold text-emerald-400">
                  {vlogs.filter((v) => v.published).length}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-rose-500/10 space-y-1">
                <div className="text-[11px] text-zinc-400 font-mono">Gallery Items</div>
                <div className="text-2xl font-serif font-bold text-purple-400">{gallery.length}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-rose-500/10 space-y-1">
                <div className="text-[11px] text-zinc-400 font-mono">Active Theme Preset</div>
                <div className="text-xs font-serif font-bold text-[#E8C39E] uppercase tracking-wider mt-2">
                  {profile?.preset || "Luxury Love"}
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0F070B] border border-rose-500/15 w-fit overflow-x-auto">
              <button
                onClick={() => setActiveTab("leads")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "leads"
                    ? "bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] border border-rose-500/30 shadow-[0_0_15px_rgba(139,0,50,0.3)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Users size={15} /> Ad Leads ({leads.length})
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] border border-rose-500/30 shadow-[0_0_15px_rgba(139,0,50,0.3)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Settings size={15} /> Profile & Customizer
              </button>

              <button
                onClick={() => setActiveTab("vlogs")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "vlogs"
                    ? "bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] border border-rose-500/30 shadow-[0_0_15px_rgba(139,0,50,0.3)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Film size={15} /> Vlogs ({vlogs.length})
              </button>

              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "gallery"
                    ? "bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] border border-rose-500/30 shadow-[0_0_15px_rgba(139,0,50,0.3)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Camera size={15} /> Gallery ({gallery.length})
              </button>

              <button
                onClick={() => setActiveTab("socials")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "socials"
                    ? "bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] border border-rose-500/30 shadow-[0_0_15px_rgba(139,0,50,0.3)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Globe size={15} /> Social Links ({socials.length})
              </button>
            </div>

            {/* TAB 1: AD LEADS MANAGER */}
            {activeTab === "leads" && (
              <div className="space-y-6">
                {/* Search & Status Filters */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-rose-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Search leads by client name, phone, location, business..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#E8C39E]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter size={14} className="text-zinc-400" />
                    <select
                      value={leadStatusFilter}
                      onChange={(e) => setLeadStatusFilter(e.target.value)}
                      className="bg-black border border-white/10 text-white text-xs px-3 py-2 rounded-xl focus:outline-none cursor-pointer"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>

                    <button
                      onClick={fetchData}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold flex items-center gap-1"
                    >
                      <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
                    </button>
                  </div>
                </div>

                {/* Leads Table */}
                <div className="rounded-3xl bg-white/[0.02] border border-rose-500/10 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-rose-950/40 text-rose-200 uppercase tracking-wider font-mono border-b border-rose-500/10">
                        <tr>
                          <th className="p-4">Client / Brand</th>
                          <th className="p-4">Contact Info</th>
                          <th className="p-4">Location</th>
                          <th className="p-4">Ad Type & Budget</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-zinc-300 font-sans">
                        {leads.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-zinc-500 font-mono">
                              No client advertisement leads found.
                            </td>
                          </tr>
                        ) : (
                          leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="p-4">
                                <div className="font-serif font-bold text-white">{lead.clientName}</div>
                                {lead.businessName && (
                                  <div className="text-[11px] text-zinc-400 font-mono">{lead.businessName}</div>
                                )}
                              </td>
                              <td className="p-4 space-y-1">
                                <div className="font-mono text-emerald-400 flex items-center gap-1.5">
                                  <Phone size={12} />
                                  <a href={`tel:${lead.phone}`} className="hover:underline">
                                    {lead.phone}
                                  </a>
                                </div>
                                <div className="text-[10px] text-zinc-500">Method: {lead.contactMethod || "WhatsApp"}</div>
                              </td>
                              <td className="p-4 font-mono text-zinc-300">{lead.location}</td>
                              <td className="p-4 space-y-0.5">
                                <div className="font-semibold text-rose-200">{lead.advertisementType || "Sponsorship"}</div>
                                <div className="text-[10px] text-[#E8C39E] font-mono">{lead.budget || "Flexible"}</div>
                              </td>
                              <td className="p-4">
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase border focus:outline-none cursor-pointer ${
                                    lead.status === "NEW"
                                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                                      : lead.status === "CONTACTED"
                                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                                      : lead.status === "IN_PROGRESS"
                                      ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                                      : lead.status === "COMPLETED"
                                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                      : "bg-zinc-800 text-zinc-400 border-zinc-700"
                                  }`}
                                >
                                  <option value="NEW">NEW</option>
                                  <option value="CONTACTED">CONTACTED</option>
                                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                                  <option value="COMPLETED">COMPLETED</option>
                                  <option value="CANCELLED">CANCELLED</option>
                                </select>
                              </td>
                              <td className="p-4 font-mono text-[11px] text-zinc-500">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </td>
                              <td className="p-4 text-right space-x-2">
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                                  title="View Full Details"
                                >
                                  <Eye size={14} />
                                </button>
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 inline-block rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/30"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageCircle size={14} />
                                </a>
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-500/30"
                                  title="Delete Lead"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PROFILE & CUSTOMIZATION SYSTEM */}
            {activeTab === "profile" && (
              <div className="max-w-4xl space-y-8">
                <form onSubmit={handleProfileSave} className="space-y-6">
                  {/* Preset Selector (Luxury Love, Soft Romantic, Dark Glam) */}
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-rose-500/20 space-y-4">
                    <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                      <Sparkles size={16} className="text-[#E8C39E]" /> Select Design Preset
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: "luxury-love", label: "Luxury Elegance", colors: "Wine & Rose Gold", bg: "bg-[#8B0032]" },
                        { id: "soft-romantic", label: "Soft Rose", colors: "Pink & Cream", bg: "bg-rose-400" },
                        { id: "dark-glam", label: "Dark Glam", colors: "Midnight & Gold", bg: "bg-[#D4AF37]" },
                      ].map((preset) => (
                        <label
                          key={preset.id}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                            profileForm.preset === preset.id
                              ? "border-[#E8C39E] bg-rose-950/40 shadow-lg"
                              : "border-white/10 bg-black/40 hover:border-white/20"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="text-xs font-serif font-bold text-white">{preset.label}</div>
                            <div className="text-[10px] text-zinc-400 font-mono">{preset.colors}</div>
                          </div>
                          <input
                            type="radio"
                            name="preset"
                            value={preset.id}
                            checked={profileForm.preset === preset.id}
                            onChange={(e) => setProfileForm({ ...profileForm, preset: e.target.value })}
                            className="accent-rose-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Profile Fields */}
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-rose-500/20 space-y-6">
                    <h3 className="text-lg font-serif font-bold text-white">Jeenu Soni Profile Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="font-bold text-zinc-300 block mb-1">Full Name</label>
                        <input
                          type="text"
                          value={profileForm.name || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-zinc-300 block mb-1">Slug (e.g. jeenusoni)</label>
                        <input
                          type="text"
                          value={profileForm.slug || "jeenusoni"}
                          onChange={(e) => setProfileForm({ ...profileForm, slug: e.target.value })}
                          className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="font-bold text-zinc-300 block mb-1">Hero Title</label>
                        <input
                          type="text"
                          value={profileForm.heroTitle || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, heroTitle: e.target.value })}
                          className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-zinc-300 block mb-1">Hero Subtitle</label>
                        <input
                          type="text"
                          value={profileForm.heroSubtitle || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, heroSubtitle: e.target.value })}
                          className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <div className="text-xs space-y-1">
                      <label className="font-bold text-zinc-300 block mb-1">Bio / Story</label>
                      <textarea
                        rows={3}
                        value={profileForm.bio || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                      />
                    </div>

                    {/* Image Uploads */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                      <div>
                        <label className="font-bold text-zinc-300 block mb-1">Profile Image</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={profileForm.profileImage || ""}
                            onChange={(e) => setProfileForm({ ...profileForm, profileImage: e.target.value })}
                            className="flex-1 p-3 rounded-xl bg-black border border-white/10 text-white"
                          />
                          <label className="p-3 rounded-xl bg-rose-950 border border-rose-500/30 text-xs font-bold text-white cursor-pointer hover:bg-rose-900 transition-colors">
                            <Upload size={14} />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleFileUpload(e.target.files[0], (url) =>
                                    setProfileForm({ ...profileForm, profileImage: url })
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-zinc-300 block mb-1">Cover Image</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={profileForm.coverImage || ""}
                            onChange={(e) => setProfileForm({ ...profileForm, coverImage: e.target.value })}
                            className="flex-1 p-3 rounded-xl bg-black border border-white/10 text-white"
                          />
                          <label className="p-3 rounded-xl bg-rose-950 border border-rose-500/30 text-xs font-bold text-white cursor-pointer hover:bg-rose-900 transition-colors">
                            <Upload size={14} />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleFileUpload(e.target.files[0], (url) =>
                                    setProfileForm({ ...profileForm, coverImage: url })
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Social URLs (Instagram, YouTube, FB, WA) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="font-bold text-zinc-300 block mb-1">Instagram URL (Dynamic DB value)</label>
                        <input
                          type="text"
                          placeholder="https://www.instagram.com/..."
                          value={profileForm.instagramUrl || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, instagramUrl: e.target.value })}
                          className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-zinc-300 block mb-1">YouTube URL</label>
                        <input
                          type="text"
                          placeholder="https://youtube.com/..."
                          value={profileForm.youtubeUrl || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, youtubeUrl: e.target.value })}
                          className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-zinc-300 block mb-1">WhatsApp Number</label>
                        <input
                          type="text"
                          placeholder="+919876543210"
                          value={profileForm.whatsappNumber || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, whatsappNumber: e.target.value })}
                          className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-zinc-300 block mb-1">Facebook Page URL</label>
                        <input
                          type="text"
                          placeholder="https://facebook.com/..."
                          value={profileForm.facebookUrl || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, facebookUrl: e.target.value })}
                          className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono text-[11px]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-bold text-zinc-300 block mb-1">Location Tag</label>
                        <input
                          type="text"
                          placeholder="Mumbai • New Delhi • Dubai"
                          value={profileForm.location || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] font-serif font-bold text-xs border border-rose-500/40 shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                    >
                      <Save size={16} /> Save Profile & Publish Settings
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: VLOG MANAGER */}
            {activeTab === "vlogs" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-serif font-bold text-white">Vlog Entries ({vlogs.length})</h3>
                  <button
                    onClick={() => {
                      resetVlogForm();
                      setEditingVlog(null);
                      setIsVlogModalOpen(true);
                    }}
                    className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] font-semibold text-xs border border-rose-500/30 flex items-center gap-2 shadow-lg"
                  >
                    <Plus size={16} /> Add New Vlog Entry
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vlogs.map((vlog) => (
                    <div key={vlog.id} className="p-5 rounded-3xl bg-white/[0.02] border border-rose-500/10 space-y-4">
                      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black">
                        <img src={vlog.thumbnail} alt={vlog.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-[#E8C39E]">
                          {vlog.category}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-serif font-bold text-white line-clamp-1">{vlog.title}</h4>
                        <p className="text-xs text-zinc-400 line-clamp-2">{vlog.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className={`text-[10px] font-mono font-bold ${vlog.published ? "text-emerald-400" : "text-zinc-500"}`}>
                          {vlog.published ? "Published" : "Draft"}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingVlog(vlog);
                              setVlogTitle(vlog.title);
                              setVlogDesc(vlog.description);
                              setVlogThumb(vlog.thumbnail);
                              setVlogVideo(vlog.videoUrl);
                              setVlogCategory(vlog.category);
                              setVlogPublished(vlog.published);
                              setVlogOrder(vlog.sortOrder);
                              setIsVlogModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteVlog(vlog.id)}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: GALLERY MANAGER */}
            {activeTab === "gallery" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-serif font-bold text-white">Gallery Images ({gallery.length})</h3>
                  <button
                    onClick={() => {
                      setEditingGallery(null);
                      setGalImage("");
                      setGalTitle("");
                      setGalCaption("");
                      setIsGalleryModalOpen(true);
                    }}
                    className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] font-semibold text-xs border border-rose-500/30 flex items-center gap-2 shadow-lg"
                  >
                    <Plus size={16} /> Upload Gallery Image
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {gallery.map((item) => (
                    <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-black aspect-square border border-white/10">
                      <img src={item.imageUrl} alt={item.title || "Gallery"} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-serif font-bold text-white">{item.title}</div>
                          <div className="text-[10px] text-zinc-300 line-clamp-2">{item.caption}</div>
                        </div>
                        <button
                          onClick={() => handleDeleteGallery(item.id)}
                          className="self-end p-1.5 rounded-lg bg-rose-600 text-white"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: SOCIAL LINKS MANAGER */}
            {activeTab === "socials" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">Social Links ({socials.length})</h3>
                    <p className="text-xs text-zinc-400">Manage all platform links dynamically rendered on the public website footer & social grid.</p>
                  </div>
                  <button
                    onClick={() => {
                      resetSocialForm();
                      setEditingSocial(null);
                      setIsSocialModalOpen(true);
                    }}
                    className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] font-semibold text-xs border border-rose-500/30 flex items-center gap-2 shadow-lg w-fit"
                  >
                    <Plus size={16} /> Add Social Link
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {socials.map((soc) => (
                    <div key={soc.id} className="p-5 rounded-3xl bg-white/[0.02] border border-rose-500/10 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300 bg-rose-950/60 px-2.5 py-1 rounded-full border border-rose-500/20">
                            {soc.platform}
                          </span>
                          <button
                            onClick={() => handleToggleSocialActive(soc)}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                              soc.isActive ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                            }`}
                          >
                            {soc.isActive ? "Active" : "Disabled"}
                          </button>
                        </div>

                        <div>
                          <div className="text-sm font-serif font-bold text-white line-clamp-1">{soc.label || soc.platform}</div>
                          <a href={soc.url} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-zinc-400 hover:text-rose-300 truncate block flex items-center gap-1 mt-1">
                            <span className="truncate">{soc.url}</span>
                            <ExternalLink size={12} className="shrink-0" />
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <span className="text-[10px] font-mono text-zinc-500">Order: #{soc.sortOrder}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingSocial(soc);
                              setSocPlatform(soc.platform);
                              setSocUrl(soc.url);
                              setSocLabel(soc.label);
                              setSocIcon(soc.icon || soc.platform.toLowerCase());
                              setSocActive(soc.isActive);
                              setSocOrder(soc.sortOrder);
                              setIsSocialModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                            title="Edit Social Link"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteSocial(soc.id)}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-500/30"
                            title="Delete Social Link"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* LEAD DETAILS DRAWER / MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12070D] border border-rose-500/30 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-serif font-bold text-white">Client Ad Lead Request</h3>
              <button onClick={() => setSelectedLead(null)} className="p-1 text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-zinc-400 block font-mono">Client Name</span>
                <span className="text-base font-serif font-bold text-white">{selectedLead.clientName}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div>
                  <span className="text-zinc-400 block">Phone</span>
                  <a href={`tel:${selectedLead.phone}`} className="text-emerald-400 font-bold hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>
                <div>
                  <span className="text-zinc-400 block">Location</span>
                  <span className="text-white">{selectedLead.location}</span>
                </div>
              </div>
              {selectedLead.businessName && (
                <div>
                  <span className="text-zinc-400 block font-mono">Business Name</span>
                  <span className="text-white font-semibold">{selectedLead.businessName}</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div>
                  <span className="text-zinc-400 block">Advertisement Type</span>
                  <span className="text-rose-300 font-bold">{selectedLead.advertisementType}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Budget</span>
                  <span className="text-[#E8C39E] font-bold">{selectedLead.budget}</span>
                </div>
              </div>
              {selectedLead.message && (
                <div>
                  <span className="text-zinc-400 block font-mono">Message / Brief</span>
                  <p className="p-3 rounded-xl bg-black/60 border border-white/5 text-zinc-300 font-sans leading-relaxed">
                    {selectedLead.message}
                  </p>
                </div>
              )}
            </div>
            <div className="pt-2 flex gap-2">
              <a
                href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={15} /> Chat on WhatsApp
              </a>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT VLOG MODAL */}
      {isVlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12070D] border border-rose-500/30 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-serif font-bold text-white">{editingVlog ? "Edit Vlog Entry" : "Create New Vlog Entry"}</h3>
              <button onClick={() => setIsVlogModalOpen(false)} className="p-1 text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleVlogSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Title</label>
                <input
                  type="text"
                  value={vlogTitle}
                  onChange={(e) => setVlogTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Category</label>
                <input
                  type="text"
                  value={vlogCategory}
                  onChange={(e) => setVlogCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Thumbnail Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={vlogThumb}
                    onChange={(e) => setVlogThumb(e.target.value)}
                    className="flex-1 p-3 rounded-xl bg-black border border-white/10 text-white font-mono text-[11px]"
                  />
                  <label className="p-3 rounded-xl bg-rose-950 border border-rose-500/30 text-white font-bold cursor-pointer">
                    <Upload size={14} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleFileUpload(e.target.files[0], (url) => setVlogThumb(url));
                      }}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Video URL (YouTube or MP4)</label>
                <input
                  type="text"
                  value={vlogVideo}
                  onChange={(e) => setVlogVideo(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={vlogDesc}
                  onChange={(e) => setVlogDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="vlogPublishCheck"
                  checked={vlogPublished}
                  onChange={(e) => setVlogPublished(e.target.checked)}
                  className="accent-rose-500"
                />
                <label htmlFor="vlogPublishCheck" className="text-zinc-300 font-bold cursor-pointer">
                  Publish Immediately
                </label>
              </div>
              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-white font-serif font-bold text-xs"
                >
                  Save Vlog
                </button>
                <button
                  type="button"
                  onClick={() => setIsVlogModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-white/10 text-white font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE GALLERY IMAGE MODAL */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12070D] border border-rose-500/30 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-serif font-bold text-white">Upload Gallery Image</h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="p-1 text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleGallerySubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={galImage}
                    onChange={(e) => setGalImage(e.target.value)}
                    className="flex-1 p-3 rounded-xl bg-black border border-white/10 text-white font-mono text-[11px]"
                    required
                  />
                  <label className="p-3 rounded-xl bg-rose-950 border border-rose-500/30 text-white font-bold cursor-pointer">
                    <Upload size={14} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleFileUpload(e.target.files[0], (url) => setGalImage(url));
                      }}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Title (Optional)</label>
                <input
                  type="text"
                  value={galTitle}
                  onChange={(e) => setGalTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Caption (Optional)</label>
                <input
                  type="text"
                  value={galCaption}
                  onChange={(e) => setGalCaption(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                />
              </div>
              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-white font-serif font-bold text-xs"
                >
                  Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-white/10 text-white font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT SOCIAL LINK MODAL */}
      {isSocialModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12070D] border border-rose-500/30 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-serif font-bold text-white">
                {editingSocial ? "Edit Social Link" : "Add New Social Link"}
              </h3>
              <button onClick={() => setIsSocialModalOpen(false)} className="p-1 text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSocialSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Platform Name</label>
                <select
                  value={socPlatform}
                  onChange={(e) => setSocPlatform(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-white cursor-pointer"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Snapchat">Snapchat</option>
                  <option value="Website">Website</option>
                  <option value="Twitter">Twitter / X</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Display Label</label>
                <input
                  type="text"
                  placeholder="e.g. @jot_soni_0_0"
                  value={socLabel}
                  onChange={(e) => setSocLabel(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Destination URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={socUrl}
                  onChange={(e) => setSocUrl(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono text-[11px]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={socOrder}
                    onChange={(e) => setSocOrder(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-zinc-300">
                    <input
                      type="checkbox"
                      checked={socActive}
                      onChange={(e) => setSocActive(e.target.checked)}
                      className="accent-rose-500 w-4 h-4"
                    />
                    Is Active
                  </label>
                </div>
              </div>
              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-white font-serif font-bold text-xs"
                >
                  Save Link
                </button>
                <button
                  type="button"
                  onClick={() => setIsSocialModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-white/10 text-white font-semibold text-xs"
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
