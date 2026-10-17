"use client";

import React, { useState, useEffect } from "react";
import LuxuryHero from "@/components/jeenusoni/LuxuryHero";
import AboutSection from "@/components/jeenusoni/AboutSection";
import VlogSection from "@/components/jeenusoni/VlogSection";
import GallerySection from "@/components/jeenusoni/GallerySection";
import AdLeadForm from "@/components/jeenusoni/AdLeadForm";
import SocialSection from "@/components/jeenusoni/SocialSection";
import VideoModal from "@/components/jeenusoni/VideoModal";
import InstagramProfileModal from "@/components/jeenusoni/InstagramProfileModal";
import InstagramGalleryModal from "@/components/jeenusoni/InstagramGalleryModal";
import JeenuAuthModal from "@/components/jeenusoni/JeenuAuthModal";
import { JeenuProfileData, JeenuVlogData, JeenuGalleryData, JeenuSocialLinkData } from "@/lib/db";
import Link from "next/link";
import { Crown, Sparkles, Lock, Mail, ShieldCheck, Camera, LogOut, CheckCircle2, AlertCircle } from "lucide-react";

interface JeenuSoniClientPageProps {
  initialProfile: JeenuProfileData;
  initialVlogs: JeenuVlogData[];
  initialGallery: JeenuGalleryData[];
  initialSocials: JeenuSocialLinkData[];
}

export default function JeenuSoniClientPage({
  initialProfile,
  initialVlogs,
  initialGallery,
  initialSocials,
}: JeenuSoniClientPageProps) {
  const [profile, setProfile] = useState<JeenuProfileData>(initialProfile);
  const [vlogs, setVlogs] = useState<JeenuVlogData[]>(initialVlogs);
  const [gallery, setGallery] = useState<JeenuGalleryData[]>(initialGallery);
  const [socials, setSocials] = useState<JeenuSocialLinkData[]>(initialSocials);
  const [activeVlog, setActiveVlog] = useState<JeenuVlogData | null>(null);

  // Authentication State (Only ADMIN & SONI roles can edit)
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string; role: string } | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Instagram-style Modals
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryItemToEdit, setGalleryItemToEdit] = useState<JeenuGalleryData | null>(null);

  // Notification Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Check Auth on Mount
  useEffect(() => {
    async function checkAuth() {
      try {
        // 1. Check server-side auth status
        const res = await fetch("/api/vlog/jeenusoni/auth", { cache: "no-store" });
        const json = await res.json();

        if (json.success && json.authenticated && json.user) {
          const roleUpper = (json.user.role || "").toUpperCase();
          if (["ADMIN", "SONI", "SUPER ADMIN", "SUPERADMIN"].includes(roleUpper)) {
            setCurrentUser(json.user);
            return;
          }
        }

        // 2. Fallback check localStorage
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("jeenu_user") || localStorage.getItem("user");
          const storedToken = localStorage.getItem("jeenu_token") || localStorage.getItem("token");

          if (storedUser) {
            try {
              const parsed = JSON.parse(storedUser);
              const roleUpper = (parsed.role || "").toUpperCase();
              if (["ADMIN", "SONI", "SUPER ADMIN", "SUPERADMIN"].includes(roleUpper)) {
                setCurrentUser(parsed);
                if (storedToken) setAuthToken(storedToken);
              }
            } catch (e) {
              console.warn(e);
            }
          }
        }
      } catch (err) {
        console.warn("Auth verify exception:", err);
      }
    }

    checkAuth();
  }, []);

  // Live DB sync
  useEffect(() => {
    async function loadLiveData() {
      try {
        const [profRes, vlogRes, galRes, socRes] = await Promise.all([
          fetch("/api/vlog/jeenusoni/profile", { cache: "no-store" }),
          fetch("/api/vlog/jeenusoni/vlogs", { cache: "no-store" }),
          fetch("/api/vlog/jeenusoni/gallery", { cache: "no-store" }),
          fetch("/api/vlog/jeenusoni/socials", { cache: "no-store" }),
        ]);

        const [profJson, vlogJson, galJson, socJson] = await Promise.all([
          profRes.json(),
          vlogRes.json(),
          galRes.json(),
          socRes.json(),
        ]);

        if (profJson.success && profJson.data) setProfile(profJson.data);
        if (vlogJson.success && Array.isArray(vlogJson.data)) setVlogs(vlogJson.data);
        if (galJson.success && Array.isArray(galJson.data)) setGallery(galJson.data);
        if (socJson.success && Array.isArray(socJson.data)) setSocials(socJson.data);
      } catch (err) {
        console.error("Live DB sync warning:", err);
      }
    }

    loadLiveData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/vlog/jeenusoni/auth", { method: "DELETE" });
      if (typeof window !== "undefined") {
        localStorage.removeItem("jeenu_token");
        localStorage.removeItem("jeenu_user");
      }
      setCurrentUser(null);
      setAuthToken(null);
      showToast("Logged out successfully", "info");
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileImageUpdated = (newUrl: string) => {
    setProfile((prev) => ({ ...prev, profileImage: newUrl }));
    showToast("Profile photo updated successfully!", "success");
  };

  const handleGallerySuccess = (item: JeenuGalleryData, isDelete = false) => {
    if (isDelete) {
      setGallery((prev) => prev.filter((g) => g.id !== item.id));
      showToast("Photo removed from gallery", "info");
    } else {
      setGallery((prev) => {
        const exists = prev.some((g) => g.id === item.id);
        if (exists) {
          return prev.map((g) => (g.id === item.id ? item : g));
        } else {
          return [item, ...prev];
        }
      });
      showToast("Gallery lookbook updated successfully!", "success");
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const canEdit = Boolean(
    currentUser &&
      ["ADMIN", "SONI", "SUPER ADMIN", "SUPERADMIN"].includes((currentUser.role || "").toUpperCase())
  );

  // Determine Preset Theme Styling
  const preset = profile.preset || "luxury-love";

  let presetThemeClasses = "bg-[#080305] text-[#FCE7D4]";
  if (preset === "soft-romantic") {
    presetThemeClasses = "bg-[#0F080C] text-[#FFF0F5]";
  } else if (preset === "dark-glam") {
    presetThemeClasses = "bg-[#050505] text-[#FFD700]";
  }

  return (
    <main className={`min-h-screen selection:bg-rose-500 selection:text-white relative font-sans ${presetThemeClasses}`}>
      {/* Toast Notification */}
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
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Authorized Admin / Soni Floating Banner */}
      {canEdit && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-rose-950/95 via-black/95 to-rose-950/95 border-b border-rose-500/30 backdrop-blur-md px-4 py-2 flex flex-wrap items-center justify-between text-xs font-sans text-rose-200 shadow-xl">
          <div className="flex items-center gap-2">
            <Crown size={14} className="text-[#E8C39E] shrink-0" />
            <span>
              Logged in as <strong className="text-white">{currentUser?.name}</strong> (Role:{" "}
              <strong className="text-[#E8C39E] font-mono">{currentUser?.role}</strong>)
            </span>
            <span className="hidden sm:inline-block text-[11px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30">
              ✓ Direct Editing Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-[11px] font-semibold text-[#E8C39E] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Camera size={13} /> Change Profile Photo
            </button>
            <span className="text-zinc-600">•</span>
            <Link
              href="/admin/jeenusoni"
              className="text-[11px] font-bold text-white hover:text-rose-300 underline flex items-center gap-1"
            >
              Open Admin Console
            </Link>
            <span className="text-zinc-600">•</span>
            <button
              onClick={handleLogout}
              className="text-[11px] text-zinc-400 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
              title="Log out"
            >
              <LogOut size={12} /> Log Out
            </button>
          </div>
        </div>
      )}

      {/* Top Floating Branding Nav */}
      <header
        className={`fixed left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-rose-500/10 px-6 py-4 flex items-center justify-between transition-all ${
          canEdit ? "top-10" : "top-0"
        }`}
      >
        <Link href="/vlog/jeenusoni" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-900 to-[#E8C39E] flex items-center justify-center text-white shadow-md">
            <Crown size={16} />
          </div>
          <span className="font-serif font-bold text-lg text-white group-hover:text-[#E8C39E] transition-colors">
            Jeenu Soni
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection("vlog-section")}
            className="text-xs font-semibold text-zinc-300 hover:text-white hidden sm:block transition-colors"
          >
            Vlogs
          </button>
          <button
            onClick={() => scrollToSection("collab-form")}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-950 to-zinc-900 text-[#FCE7D4] border border-[#E8C39E]/30 text-xs font-serif font-bold hover:scale-105 transition-all shadow-md"
          >
            Collaborate & Ads
          </button>

          {/* Admin Button: If logged in, links to admin. If not, opens login modal */}
          {canEdit ? (
            <Link
              href="/admin/jeenusoni"
              className="p-2 rounded-full bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-500/40 text-xs flex items-center gap-1 shadow-md"
              title="Open Admin Console"
            >
              <ShieldCheck size={14} className="text-emerald-400" />
            </Link>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 text-xs flex items-center gap-1 cursor-pointer"
              title="Admin & Soni Login"
            >
              <Lock size={14} />
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <LuxuryHero
        profile={profile}
        onExploreClick={() => scrollToSection("vlog-section")}
        onCollabClick={() => scrollToSection("collab-form")}
        canEdit={canEdit}
        onEditProfilePic={() => setIsProfileModalOpen(true)}
      />

      {/* About Section */}
      <AboutSection profile={profile} />

      {/* Vlogs Showcase */}
      <VlogSection vlogs={vlogs} onSelectVlog={(vlog) => setActiveVlog(vlog)} />

      {/* Gallery Section */}
      <GallerySection
        gallery={gallery}
        canEdit={canEdit}
        onAddNewPhoto={() => {
          setGalleryItemToEdit(null);
          setIsGalleryModalOpen(true);
        }}
        onEditPhoto={(item) => {
          setGalleryItemToEdit(item);
          setIsGalleryModalOpen(true);
        }}
      />

      {/* Client Advertisement Lead Form */}
      <AdLeadForm />

      {/* Social Media Links */}
      {socials.length > 0 ? (
        <SocialSection socials={socials} />
      ) : (
        <SocialSection
          socials={[
            ...(profile.instagramUrl
              ? [
                  {
                    id: "soc-1",
                    platform: "Instagram",
                    url: profile.instagramUrl,
                    label: "@jot_soni_0_0",
                    icon: "instagram",
                    sortOrder: 1,
                    isActive: true,
                    createdAt: "",
                    updatedAt: "",
                  },
                ]
              : []),
            ...(profile.youtubeUrl
              ? [
                  {
                    id: "soc-2",
                    platform: "YouTube",
                    url: profile.youtubeUrl,
                    label: "Jeenu Soni Vlogs",
                    icon: "youtube",
                    sortOrder: 2,
                    isActive: true,
                    createdAt: "",
                    updatedAt: "",
                  },
                ]
              : []),
            ...(profile.whatsappNumber
              ? [
                  {
                    id: "soc-3",
                    platform: "WhatsApp",
                    url: profile.whatsappNumber.startsWith("http")
                      ? profile.whatsappNumber
                      : `https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, "")}`,
                    label: "WhatsApp Collab",
                    icon: "whatsapp",
                    sortOrder: 3,
                    isActive: true,
                    createdAt: "",
                    updatedAt: "",
                  },
                ]
              : []),
            ...(profile.facebookUrl
              ? [
                  {
                    id: "soc-4",
                    platform: "Facebook",
                    url: profile.facebookUrl,
                    label: "Jeenu Soni Page",
                    icon: "facebook",
                    sortOrder: 4,
                    isActive: true,
                    createdAt: "",
                    updatedAt: "",
                  },
                ]
              : []),
          ]}
        />
      )}

      {/* Video Modal Lightbox */}
      <VideoModal vlog={activeVlog} onClose={() => setActiveVlog(null)} />

      {/* Instagram-style Profile Picture Modal */}
      <InstagramProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentImage={profile.profileImage}
        onImageUpdated={handleProfileImageUpdated}
        authToken={authToken}
      />

      {/* Instagram-style Gallery Modal (Add & Change Photo) */}
      <InstagramGalleryModal
        isOpen={isGalleryModalOpen}
        onClose={() => {
          setIsGalleryModalOpen(false);
          setGalleryItemToEdit(null);
        }}
        itemToEdit={galleryItemToEdit}
        onSuccess={handleGallerySuccess}
        authToken={authToken}
      />

      {/* Admin / Soni Login Modal */}
      <JeenuAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user, token) => {
          setCurrentUser(user);
          setAuthToken(token);
          showToast(`Welcome back, ${user.name}! Direct editing enabled.`, "success");
        }}
      />

      {/* Footer */}
      <footer className="py-12 px-4 bg-black border-t border-rose-500/10 text-center text-xs font-mono text-zinc-500 relative">
        <div className="container mx-auto space-y-5 flex flex-col items-center">
          {/* Animated Red Envelope Notification Badge */}
          <button
            onClick={() => scrollToSection("collab-form")}
            className="group relative inline-flex items-center justify-center p-3.5 rounded-2xl bg-[#E54848] text-white shadow-[0_0_30px_rgba(229,72,72,0.6)] hover:shadow-[0_0_45px_rgba(229,72,72,0.9)] hover:scale-110 active:scale-95 transition-all duration-300"
            title="Send Message / Collaborate"
          >
            <Mail size={30} className="fill-[#E54848] text-[#FEE2E2]" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 border-2 border-black flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            </span>
          </button>

          <p>© {new Date().getFullYear()} Jeenu Soni. All Rights Reserved. Powered by Cortex Web Solutions.</p>
          <div className="flex justify-center gap-4 text-[11px] text-zinc-400">
            <Link href="/vlog/jeenusoni" className="hover:underline">
              Public Vlog
            </Link>
            <span>•</span>
            {canEdit ? (
              <Link href="/admin/jeenusoni" className="hover:underline text-rose-300">
                Admin Console (Active)
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hover:underline text-zinc-400 hover:text-white cursor-pointer"
              >
                Admin & Soni Login
              </button>
            )}
          </div>
        </div>
      </footer>
    </main>
  );
}
