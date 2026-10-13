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
  Database,
  Activity,
  Check,
  AlertCircle,
  Copy,
} from "lucide-react";
import { JeenuProfileData, JeenuVlogData, JeenuGalleryData, JeenuSocialLinkData, JeenuAdLeadData } from "@/lib/db";

interface DbStatusInfo {
  connected: boolean;
  database: string;
  latencyMs: number;
  engine: string;
  counts?: {
    profiles: number;
    vlogs: number;
    gallery: number;
    socials: number;
    leads: number;
  };
}

export default function AdminJeenuSoniPage() {
  // Active Tab: "leads" | "profile" | "vlogs" | "gallery" | "socials"
  const [activeTab, setActiveTab] = useState<"leads" | "profile" | "vlogs" | "gallery" | "socials">("leads");

  // Current Active Role (ADMIN & SONI allowed, USER/CLIENT/EDITOR denied)
  const [currentRole, setCurrentRole] = useState<string>("ADMIN");
  const [authError, setAuthError] = useState<string | null>(null);

  // Database Connection Status
  const [dbStatus, setDbStatus] = useState<DbStatusInfo | null>(null);

  // Data States
  const [profile, setProfile] = useState<JeenuProfileData | null>(null);
  const [vlogs, setVlogs] = useState<JeenuVlogData[]>([]);
  const [gallery, setGallery] = useState<JeenuGalleryData[]>([]);
  const [socials, setSocials] = useState<JeenuSocialLinkData[]>([]);
  const [leads, setLeads] = useState<JeenuAdLeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Filters & Selected Lead
  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState<JeenuAdLeadData | null>(null);
  const [editingLead, setEditingLead] = useState<JeenuAdLeadData | null>(null);

  // Lead Create Modal & State
  const [isLeadCreateModalOpen, setIsLeadCreateModalOpen] = useState(false);
  const [leadFormName, setLeadFormName] = useState("");
  const [leadFormPhone, setLeadFormPhone] = useState("");
  const [leadFormLocation, setLeadFormLocation] = useState("");
  const [leadFormBusiness, setLeadFormBusiness] = useState("");
  const [leadFormType, setLeadFormType] = useState("Sponsored Reel & Story");
  const [leadFormBudget, setLeadFormBudget] = useState("₹50,000 - ₹1,00,000");
  const [leadFormMethod, setLeadFormMethod] = useState("WhatsApp");
  const [leadFormMessage, setLeadFormMessage] = useState("");

  // Vlog Modal & State
  const [isVlogModalOpen, setIsVlogModalOpen] = useState(false);
  const [editingVlog, setEditingVlog] = useState<JeenuVlogData | null>(null);
  const [vlogTitle, setVlogTitle] = useState("");
  const [vlogDesc, setVlogDesc] = useState("");
  const [vlogThumb, setVlogThumb] = useState("");
  const [vlogVideo, setVlogVideo] = useState("");
  const [vlogCategory, setVlogCategory] = useState("Fashion & Style");
  const [vlogPublished, setVlogPublished] = useState(true);
  const [vlogOrder, setVlogOrder] = useState(1);

  // Gallery Modal & State
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<JeenuGalleryData | null>(null);
  const [galImage, setGalImage] = useState("");
  const [galTitle, setGalTitle] = useState("");
  const [galCaption, setGalCaption] = useState("");
  const [galPublished, setGalPublished] = useState(true);
  const [galOrder, setGalOrder] = useState(1);

  // Social Links Form State & Modal
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<JeenuSocialLinkData | null>(null);
  const [socPlatform, setSocPlatform] = useState("Instagram");
  const [socUrl, setSocUrl] = useState("");
  const [socLabel, setSocLabel] = useState("");
  const [socIcon, setSocIcon] = useState("instagram");
  const [socActive, setSocActive] = useState(true);
  const [socOrder, setSocOrder] = useState(1);

  // Profile Form State
  const [profileForm, setProfileForm] = useState<Partial<JeenuProfileData>>({});

  // Auth Headers
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "x-user-role": currentRole,
    "x-user-id": currentRole === "SONI" ? "usr_soni_01" : "usr_admin_01",
    "x-user-email": currentRole === "SONI" ? "soni@cortex.com" : "admin@cortex.com",
    Authorization: `Bearer ${currentRole.toLowerCase()}-token`,
  });

  // Fetch Database Status & Data
  const fetchData = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      const headers = getAuthHeaders();

      const [profRes, vlogRes, galRes, socRes, leadRes, statusRes] = await Promise.all([
        fetch("/api/vlog/jeenusoni/profile", { headers, cache: "no-store" }),
        fetch("/api/vlog/jeenusoni/vlogs?all=true", { headers, cache: "no-store" }),
        fetch("/api/vlog/jeenusoni/gallery?all=true", { headers, cache: "no-store" }),
        fetch("/api/vlog/jeenusoni/socials?all=true", { headers, cache: "no-store" }),
        fetch(`/api/vlog/jeenusoni/leads?status=${leadStatusFilter}&search=${encodeURIComponent(leadSearch)}`, { headers, cache: "no-store" }),
        fetch("/api/vlog/jeenusoni/status", { headers, cache: "no-store" }).catch(() => null),
      ]);

      const profJson = await profRes.json();
      const vlogJson = await vlogRes.json();
      const galJson = await galRes.json();
      const socJson = await socRes.json();
      const leadJson = await leadRes.json();

      if (statusRes && statusRes.ok) {
        const statJson = await statusRes.json();
        if (statJson.success && statJson.data) setDbStatus(statJson.data);
      }

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
      showToast("Error loading data from database", "error");
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
        showToast("Image uploaded successfully!", "success");
      } else {
        showToast(json.error || "Upload failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error uploading file", "error");
    } finally {
      setUploading(false);
    }
  };

  // --------------------------------------------------------------------------
  // PROFILE CRUD
  // --------------------------------------------------------------------------
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
        showToast("Profile & Design Settings saved to PostgreSQL!", "success");
        fetchData();
      } else {
        showToast(json.error || "Failed to update profile", "error");
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  // --------------------------------------------------------------------------
  // AD LEADS CRUD
  // --------------------------------------------------------------------------
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadFormName.trim() || !leadFormPhone.trim() || !leadFormLocation.trim()) {
      return showToast("Client name, phone and location are required", "error");
    }

    try {
      const res = await fetch("/api/vlog/jeenusoni/leads", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          clientName: leadFormName,
          phone: leadFormPhone,
          location: leadFormLocation,
          businessName: leadFormBusiness,
          advertisementType: leadFormType,
          budget: leadFormBudget,
          contactMethod: leadFormMethod,
          message: leadFormMessage,
        }),
      });

      const json = await res.json();
      if (json.success) {
        showToast("New Ad Lead created in PostgreSQL!", "success");
        setIsLeadCreateModalOpen(false);
        setLeadFormName("");
        setLeadFormPhone("");
        setLeadFormLocation("");
        setLeadFormBusiness("");
        setLeadFormMessage("");
        fetchData();
      } else {
        showToast(json.error || "Failed to create lead", "error");
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;

    try {
      const res = await fetch(`/api/vlog/jeenusoni/leads/${editingLead.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(editingLead),
      });

      const json = await res.json();
      if (json.success) {
        showToast("Lead details updated in PostgreSQL!", "success");
        setEditingLead(null);
        setSelectedLead(null);
        fetchData();
      } else {
        showToast(json.error || "Failed to update lead", "error");
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleLeadStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/vlog/jeenusoni/leads/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      const json = await res.json();
      if (json.success) {
        showToast(`Lead status updated to ${newStatus}`, "info");
        fetchData();
      } else {
        showToast(json.error || "Failed to update status", "error");
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ad lead from the database?")) return;
    try {
      const res = await fetch(`/api/vlog/jeenusoni/leads/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Lead deleted from database", "success");
        setSelectedLead(null);
        fetchData();
      } else {
        showToast(json.error || "Failed to delete lead", "error");
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  // --------------------------------------------------------------------------
  // VLOG CRUD
  // --------------------------------------------------------------------------
  const handleVlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vlogTitle.trim()) return showToast("Vlog title is required", "error");

    try {
      const payload = {
        title: vlogTitle,
        description: vlogDesc,
        thumbnail: vlogThumb || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
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
        showToast(editingVlog ? "Vlog updated in PostgreSQL!" : "New Vlog published in PostgreSQL!", "success");
        setIsVlogModalOpen(false);
        setEditingVlog(null);
        resetVlogForm();
        fetchData();
      } else {
        showToast(json.error || "Operation failed", "error");
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleToggleVlogPublish = async (vlog: JeenuVlogData) => {
    try {
      const res = await fetch(`/api/vlog/jeenusoni/vlogs/${vlog.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ published: !vlog.published }),
      });
      if ((await res.json()).success) {
        showToast(`Vlog ${!vlog.published ? "Published" : "Moved to Draft"}`, "info");
        fetchData();
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleDeleteVlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vlog?")) return;
    try {
      const res = await fetch(`/api/vlog/jeenusoni/vlogs/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if ((await res.json()).success) {
        showToast("Vlog deleted from database", "success");
        fetchData();
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const resetVlogForm = () => {
    setVlogTitle("");
    setVlogDesc("");
    setVlogThumb("");
    setVlogVideo("");
    setVlogCategory("Fashion & Style");
    setVlogPublished(true);
    setVlogOrder(vlogs.length + 1);
  };

  // --------------------------------------------------------------------------
  // GALLERY CRUD
  // --------------------------------------------------------------------------
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galImage.trim()) return showToast("Image URL is required", "error");

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
        showToast(editingGallery ? "Gallery item updated!" : "New Gallery image saved in PostgreSQL!", "success");
        setIsGalleryModalOpen(false);
        setEditingGallery(null);
        setGalImage("");
        setGalTitle("");
        setGalCaption("");
        fetchData();
      } else {
        showToast(json.error || "Operation failed", "error");
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleToggleGalleryPublish = async (item: JeenuGalleryData) => {
    try {
      const res = await fetch(`/api/vlog/jeenusoni/gallery/${item.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ published: !item.published }),
      });
      if ((await res.json()).success) {
        showToast(`Image ${!item.published ? "Published" : "Hidden"}`, "info");
        fetchData();
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery image?")) return;
    try {
      const res = await fetch(`/api/vlog/jeenusoni/gallery/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if ((await res.json()).success) {
        showToast("Gallery image deleted", "success");
        fetchData();
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  // --------------------------------------------------------------------------
  // SOCIAL LINKS CRUD
  // --------------------------------------------------------------------------
  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socPlatform.trim() || !socUrl.trim()) return showToast("Platform and URL are required", "error");

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
        showToast(editingSocial ? "Social link updated!" : "Social link saved in PostgreSQL!", "success");
        setIsSocialModalOpen(false);
        setEditingSocial(null);
        resetSocialForm();
        fetchData();
      } else {
        showToast(json.error || "Operation failed", "error");
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleToggleSocialActive = async (social: JeenuSocialLinkData) => {
    try {
      const res = await fetch(`/api/vlog/jeenusoni/socials/${social.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive: !social.isActive }),
      });
      if ((await res.json()).success) {
        showToast(`Social link ${!social.isActive ? "Activated" : "Disabled"}`, "info");
        fetchData();
      }
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handleDeleteSocial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this social link?")) return;
    try {
      const res = await fetch(`/api/vlog/jeenusoni/socials/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if ((await res.json()).success) {
        showToast("Social link deleted", "success");
        fetchData();
      }
    } catch (err: any) {
      showToast(err.message, "error");
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

      {/* Floating Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div
            className={`px-5 py-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 text-xs font-semibold ${
              toast.type === "success"
                ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-200"
                : toast.type === "error"
                ? "bg-rose-950/90 border-rose-500/40 text-rose-200"
                : "bg-zinc-900/90 border-white/20 text-white"
            }`}
          >
            {toast.type === "success" && <CheckCircle2 size={16} className="text-emerald-400" />}
            {toast.type === "error" && <AlertCircle size={16} className="text-rose-400" />}
            {toast.type === "info" && <Activity size={16} className="text-[#E8C39E]" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10 max-w-7xl space-y-8">
        {/* Top Header Bar & Real-time Database Status */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-rose-500/10">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E8C39E] bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/20">
                <Crown size={14} className="text-[#E8C39E]" />
                Jeenu Soni Luxury Vlog Control Console
              </div>

              {/* PostgreSQL Live Connection Badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border ${
                  dbStatus?.connected
                    ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-300"
                    : "bg-amber-950/50 border-amber-500/30 text-amber-300"
                }`}
                title="PostgreSQL 18 Database Connectivity"
              >
                <span className={`w-2 h-2 rounded-full ${dbStatus?.connected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                <Database size={12} />
                <span>{dbStatus?.connected ? "PostgreSQL 18: cortex_db" : "DB Fallback Engine"}</span>
                {dbStatus?.latencyMs !== undefined && (
                  <span className="text-[10px] text-emerald-400/80 bg-emerald-900/50 px-1.5 py-0.2 rounded font-mono">
                    {dbStatus.latencyMs}ms
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
              Brand & Influencer Management
            </h1>
            <p className="text-xs text-zinc-400">
              PostgreSQL-powered CRUD operations for ad leads, profile customization, video vlogs, gallery lookbook & social channels.
            </p>
          </div>

          {/* Role Authorization Switcher & Public Link */}
          <div className="flex flex-wrap items-center gap-3 bg-[#11060B] p-2 rounded-2xl border border-rose-500/20">
            <div className="text-[11px] font-mono text-zinc-400 pl-2 flex items-center gap-1.5">
              <Lock size={12} className="text-rose-400" />
              Role:
            </div>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="bg-black text-[#FCE7D4] text-xs font-bold font-mono px-3 py-1.5 rounded-xl border border-rose-500/30 focus:outline-none cursor-pointer"
            >
              <option value="ADMIN">ADMIN (Allowed)</option>
              <option value="SONI">SONI (Allowed)</option>
              <option value="USER">USER (Denied)</option>
              <option value="CLIENT">CLIENT (Denied)</option>
              <option value="EDITOR">EDITOR (Denied)</option>
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
                <div className="text-[11px] text-zinc-400 font-mono">Theme Preset</div>
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
                {/* Search & Actions Bar */}
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

                  <div className="flex flex-wrap items-center gap-2">
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
                      onClick={() => setIsLeadCreateModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] text-xs font-semibold flex items-center gap-1.5 border border-rose-500/30 hover:scale-[1.02] transition-all"
                    >
                      <Plus size={14} /> Add Lead
                    </button>

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
                              No client advertisement leads found in database.
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
                                  title="View / Edit Lead Details"
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

            {/* TAB 2: PROFILE & DESIGN SYSTEM */}
            {activeTab === "profile" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Column */}
                <div className="lg:col-span-2 space-y-6">
                  <form onSubmit={handleProfileSave} className="space-y-6">
                    {/* Design Presets */}
                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-rose-500/20 space-y-4">
                      <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                        <Sparkles size={16} className="text-[#E8C39E]" /> Aesthetic Design Preset
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

                    {/* Profile Basic Info */}
                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-rose-500/20 space-y-6">
                      <h3 className="text-lg font-serif font-bold text-white">Jeenu Soni Identity</h3>

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
                          <label className="font-bold text-zinc-300 block mb-1">Slug URL</label>
                          <input
                            type="text"
                            value={profileForm.slug || "jeenusoni"}
                            onChange={(e) => setProfileForm({ ...profileForm, slug: e.target.value })}
                            className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono text-[11px]"
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
                          className="w-full p-3 rounded-xl bg-black border border-white/10 text-white leading-relaxed"
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
                              className="flex-1 p-3 rounded-xl bg-black border border-white/10 text-white font-mono text-[11px]"
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
                              className="flex-1 p-3 rounded-xl bg-black border border-white/10 text-white font-mono text-[11px]"
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

                      {/* Social Channels */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="font-bold text-zinc-300 block mb-1">Instagram URL</label>
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
                            placeholder="Gajsinghpur, Rajasthan • Digital Creator"
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
                        <Save size={16} /> Save Profile Changes to PostgreSQL
                      </button>
                    </div>
                  </form>
                </div>

                {/* Live Card Preview Column */}
                <div className="space-y-4">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#E8C39E]" /> Live Profile Card Preview
                  </div>
                  <div className="p-6 rounded-3xl bg-gradient-to-b from-[#180812] to-[#0A0408] border border-rose-500/20 space-y-4 shadow-2xl relative overflow-hidden">
                    <div className="h-28 w-full rounded-2xl overflow-hidden bg-black/60 relative">
                      {profileForm.coverImage ? (
                        <img src={profileForm.coverImage} alt="Cover" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-rose-900 to-rose-950" />
                      )}
                    </div>

                    <div className="flex items-end gap-3 -mt-10 px-2 relative z-10">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#E8C39E] bg-black shadow-xl">
                        {profileForm.profileImage ? (
                          <img src={profileForm.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-rose-900" />
                        )}
                      </div>
                      <div className="pb-1">
                        <div className="font-serif font-bold text-white text-base">{profileForm.name || "Jeenu Soni"}</div>
                        <div className="text-[10px] text-[#E8C39E] font-mono">@{profileForm.slug || "jeenusoni"}</div>
                      </div>
                    </div>

                    <div className="space-y-1.5 px-2">
                      <div className="text-xs font-semibold text-rose-200">{profileForm.heroSubtitle || "Design Vlogs • Style"}</div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-3">{profileForm.bio || "Creator bio..."}</p>
                      <div className="text-[10px] text-zinc-500 font-mono pt-1">{profileForm.location}</div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between px-2">
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={11} /> Published Active
                      </span>
                      <span className="text-[10px] font-mono text-[#E8C39E] uppercase">
                        {profileForm.preset || "luxury-love"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: VLOGS MANAGER */}
            {activeTab === "vlogs" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">Vlog Entries ({vlogs.length})</h3>
                    <p className="text-xs text-zinc-400">Manage high-fashion videos, brand reels & travel stories stored in PostgreSQL.</p>
                  </div>
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
                    <div key={vlog.id} className="p-5 rounded-3xl bg-white/[0.02] border border-rose-500/10 space-y-4 hover:border-rose-500/30 transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black">
                          <img src={vlog.thumbnail} alt={vlog.title} className="w-full h-full object-cover" />
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 text-[#E8C39E] backdrop-blur-sm">
                            {vlog.category}
                          </span>
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-zinc-300">
                            #{vlog.sortOrder}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-serif font-bold text-white line-clamp-1">{vlog.title}</h4>
                          <p className="text-xs text-zinc-400 line-clamp-2">{vlog.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <button
                          onClick={() => handleToggleVlogPublish(vlog)}
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border transition-all ${
                            vlog.published
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : "bg-zinc-800 text-zinc-400 border-zinc-700"
                          }`}
                        >
                          {vlog.published ? "Published" : "Draft"}
                        </button>
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
                            title="Edit Vlog"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteVlog(vlog.id)}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-500/30"
                            title="Delete Vlog"
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
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">Gallery Lookbook ({gallery.length})</h3>
                    <p className="text-xs text-zinc-400">High-resolution portfolio images displayed in the public aesthetic gallery.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingGallery(null);
                      setGalImage("");
                      setGalTitle("");
                      setGalCaption("");
                      setGalOrder(gallery.length + 1);
                      setGalPublished(true);
                      setIsGalleryModalOpen(true);
                    }}
                    className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] font-semibold text-xs border border-rose-500/30 flex items-center gap-2 shadow-lg"
                  >
                    <Plus size={16} /> Upload Gallery Image
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {gallery.map((item) => (
                    <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-black aspect-square border border-white/10 hover:border-rose-500/40 transition-all">
                      <img src={item.imageUrl} alt={item.title || "Gallery"} className="w-full h-full object-cover" />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-[#E8C39E]">#{item.sortOrder}</span>
                          <button
                            onClick={() => handleToggleGalleryPublish(item)}
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                              item.published ? "bg-emerald-500/40 text-emerald-200" : "bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            {item.published ? "Live" : "Hidden"}
                          </button>
                        </div>
                        <div>
                          <div className="text-xs font-serif font-bold text-white truncate">{item.title || "Untitled"}</div>
                          <div className="text-[10px] text-zinc-300 line-clamp-1">{item.caption}</div>
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => {
                                setEditingGallery(item);
                                setGalImage(item.imageUrl);
                                setGalTitle(item.title || "");
                                setGalCaption(item.caption || "");
                                setGalOrder(item.sortOrder);
                                setGalPublished(item.published);
                                setIsGalleryModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30"
                              title="Edit Image"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteGallery(item.id)}
                              className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                              title="Delete Image"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
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
                    <p className="text-xs text-zinc-400">Direct influencer links dynamically updated from PostgreSQL cortex_db.</p>
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
                    <div key={soc.id} className="p-5 rounded-3xl bg-white/[0.02] border border-rose-500/10 space-y-4 flex flex-col justify-between hover:border-rose-500/30 transition-all">
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

      {/* CREATE AD LEAD MODAL */}
      {isLeadCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12070D] border border-rose-500/30 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-serif font-bold text-white">Add New Ad Lead (PostgreSQL)</h3>
              <button onClick={() => setIsLeadCreateModalOpen(false)} className="p-1 text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Client Name *</label>
                  <input
                    type="text"
                    value={leadFormName}
                    onChange={(e) => setLeadFormName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                    placeholder="e.g. Rajveer Singhania"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    value={leadFormPhone}
                    onChange={(e) => setLeadFormPhone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono"
                    placeholder="+919876543210"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Location *</label>
                  <input
                    type="text"
                    value={leadFormLocation}
                    onChange={(e) => setLeadFormLocation(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                    placeholder="e.g. Jaipur, Rajasthan"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Business Name</label>
                  <input
                    type="text"
                    value={leadFormBusiness}
                    onChange={(e) => setLeadFormBusiness(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                    placeholder="e.g. Royal Silks & Jewels"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Ad Campaign Type</label>
                  <select
                    value={leadFormType}
                    onChange={(e) => setLeadFormType(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black border border-white/10 text-white cursor-pointer"
                  >
                    <option value="Sponsored Reel & Story">Sponsored Reel & Story</option>
                    <option value="Full Vlog Feature">Full Vlog Feature</option>
                    <option value="Brand Ambassadorship">Brand Ambassadorship</option>
                    <option value="Event Appearance">Event Appearance</option>
                    <option value="Custom Collaboration">Custom Collaboration</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Budget Range</label>
                  <select
                    value={leadFormBudget}
                    onChange={(e) => setLeadFormBudget(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black border border-white/10 text-white cursor-pointer font-mono"
                  >
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                    <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                    <option value="₹2,50,000+">₹2,50,000+</option>
                    <option value="Flexible / Negotiable">Flexible / Negotiable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Campaign Brief / Message</label>
                <textarea
                  rows={2}
                  value={leadFormMessage}
                  onChange={(e) => setLeadFormMessage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                  placeholder="Details about the campaign, shoot requirements..."
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-white font-serif font-bold text-xs shadow-lg"
                >
                  Save Lead to PostgreSQL
                </button>
                <button
                  type="button"
                  onClick={() => setIsLeadCreateModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-white/10 text-white font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LEAD DETAILS / EDIT MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12070D] border border-rose-500/30 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-serif font-bold text-white">
                {editingLead ? "Edit Ad Lead (PostgreSQL)" : "Client Ad Lead Request"}
              </h3>
              <button
                onClick={() => {
                  setSelectedLead(null);
                  setEditingLead(null);
                }}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {editingLead ? (
              <form onSubmit={handleUpdateLead} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-zinc-300 block mb-1">Client Name</label>
                    <input
                      type="text"
                      value={editingLead.clientName}
                      onChange={(e) => setEditingLead({ ...editingLead, clientName: e.target.value })}
                      className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-zinc-300 block mb-1">Phone</label>
                    <input
                      type="text"
                      value={editingLead.phone}
                      onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                      className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-zinc-300 block mb-1">Location</label>
                    <input
                      type="text"
                      value={editingLead.location}
                      onChange={(e) => setEditingLead({ ...editingLead, location: e.target.value })}
                      className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-zinc-300 block mb-1">Status</label>
                    <select
                      value={editingLead.status}
                      onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value as any })}
                      className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-zinc-300 block mb-1">Business Name</label>
                    <input
                      type="text"
                      value={editingLead.businessName || ""}
                      onChange={(e) => setEditingLead({ ...editingLead, businessName: e.target.value })}
                      className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-zinc-300 block mb-1">Budget</label>
                    <input
                      type="text"
                      value={editingLead.budget || ""}
                      onChange={(e) => setEditingLead({ ...editingLead, budget: e.target.value })}
                      className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Message / Brief</label>
                  <textarea
                    rows={3}
                    value={editingLead.message || ""}
                    onChange={(e) => setEditingLead({ ...editingLead, message: e.target.value })}
                    className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                  />
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-white font-serif font-bold text-xs"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingLead(null)}
                    className="px-5 py-3 rounded-xl bg-white/10 text-white font-semibold text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-zinc-400 block font-mono text-[10px]">Client Name</span>
                  <span className="text-lg font-serif font-bold text-white">{selectedLead.clientName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Phone</span>
                    <a href={`tel:${selectedLead.phone}`} className="text-emerald-400 font-bold hover:underline">
                      {selectedLead.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Location</span>
                    <span className="text-white">{selectedLead.location}</span>
                  </div>
                </div>
                {selectedLead.businessName && (
                  <div>
                    <span className="text-zinc-400 block font-mono text-[10px]">Business Name</span>
                    <span className="text-white font-semibold">{selectedLead.businessName}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Advertisement Type</span>
                    <span className="text-rose-300 font-bold">{selectedLead.advertisementType}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Budget</span>
                    <span className="text-[#E8C39E] font-bold">{selectedLead.budget}</span>
                  </div>
                </div>
                {selectedLead.message && (
                  <div>
                    <span className="text-zinc-400 block font-mono text-[10px]">Message / Brief</span>
                    <p className="p-3 rounded-xl bg-black/60 border border-white/5 text-zinc-300 font-sans leading-relaxed">
                      {selectedLead.message}
                    </p>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setEditingLead(selectedLead)}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Edit size={14} /> Edit Lead
                  </button>
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
                    className="px-5 py-2.5 rounded-xl bg-white/5 text-zinc-400 text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CREATE / EDIT VLOG MODAL */}
      {isVlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12070D] border border-rose-500/30 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-serif font-bold text-white">
                {editingVlog ? "Edit Vlog Entry (PostgreSQL)" : "Create New Vlog Entry (PostgreSQL)"}
              </h3>
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Category</label>
                  <select
                    value={vlogCategory}
                    onChange={(e) => setVlogCategory(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black border border-white/10 text-white cursor-pointer"
                  >
                    <option value="Fashion & Style">Fashion & Style</option>
                    <option value="Brand Collab">Brand Collab</option>
                    <option value="Travel & Lifestyle">Travel & Lifestyle</option>
                    <option value="Haute Couture">Haute Couture</option>
                    <option value="Behind The Scenes">Behind The Scenes</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={vlogOrder}
                    onChange={(e) => setVlogOrder(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono"
                  />
                </div>
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
                  <label className="p-3 rounded-xl bg-rose-950 border border-rose-500/30 text-white font-bold cursor-pointer hover:bg-rose-900">
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
                  Publish Immediately on Public Website
                </label>
              </div>
              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-white font-serif font-bold text-xs"
                >
                  Save Vlog Entry
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

      {/* CREATE / EDIT GALLERY IMAGE MODAL */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12070D] border border-rose-500/30 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-serif font-bold text-white">
                {editingGallery ? "Edit Gallery Image (PostgreSQL)" : "Upload Gallery Image (PostgreSQL)"}
              </h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="p-1 text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleGallerySubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Image URL *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={galImage}
                    onChange={(e) => setGalImage(e.target.value)}
                    className="flex-1 p-3 rounded-xl bg-black border border-white/10 text-white font-mono text-[11px]"
                    required
                  />
                  <label className="p-3 rounded-xl bg-rose-950 border border-rose-500/30 text-white font-bold cursor-pointer hover:bg-rose-900">
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Title</label>
                  <input
                    type="text"
                    value={galTitle}
                    onChange={(e) => setGalTitle(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                    placeholder="e.g. Royal Glam"
                  />
                </div>
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={galOrder}
                    onChange={(e) => setGalOrder(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-black border border-white/10 text-white font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Caption</label>
                <input
                  type="text"
                  value={galCaption}
                  onChange={(e) => setGalCaption(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
                  placeholder="e.g. Editorial portrait shoot"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="galPublishCheck"
                  checked={galPublished}
                  onChange={(e) => setGalPublished(e.target.checked)}
                  className="accent-rose-500"
                />
                <label htmlFor="galPublishCheck" className="text-zinc-300 font-bold cursor-pointer">
                  Display in Public Gallery
                </label>
              </div>
              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 text-white font-serif font-bold text-xs"
                >
                  Save Gallery Image
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
                {editingSocial ? "Edit Social Link (PostgreSQL)" : "Add New Social Link (PostgreSQL)"}
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
