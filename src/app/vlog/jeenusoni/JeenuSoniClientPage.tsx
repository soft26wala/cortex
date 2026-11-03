"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
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
import Signin from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import { JeenuProfileData, JeenuVlogData, JeenuGalleryData, JeenuSocialLinkData } from "@/lib/db";
import Link from "next/link";
import { Crown, Sparkles, Lock, Mail, ShieldCheck, Camera, LogOut, CheckCircle2, AlertCircle, User, X } from "lucide-react";

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

  // Unified NextAuth Session
  const { data: session, status: sessionStatus } = useSession();

  // Authentication State
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string; role: string } | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

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

  const isAuthorizedRole = (user: any): boolean => {
    if (!user) return false;
    const r = (user.role || user.userRole || user.type || "").toString().trim().toUpperCase();
    const e = (user.email || "").toString().trim().toLowerCase();
    // Strictly allowed roles: ADMIN or SONI
    if (["ADMIN", "SONI", "SUPER ADMIN", "SUPERADMIN"].includes(r)) return true;
    // Explicit master admin owner email
    if (e === "anmolsingh26ff@gmail.com" || e === "anmol@cortexwebsolutions.com") return true;
    return false;
  };

  const canEdit = isAuthorizedRole(currentUser);

  // Unified Auth Sync: Shares login across cortestack.com, NextAuth Google/GitHub, and credentials
  useEffect(() => {
    let isMounted = true;

    async function syncAuth() {
      try {
        // Priority 1: NextAuth Session from cookie (logged in on cortestack.com)
        if (session?.user) {
          const email = (session.user.email || "").toLowerCase().trim();
          const sessionRole = ((session.user as any).role || "").toString().toUpperCase().trim();
          const isMasterAdmin = email === "anmolsingh26ff@gmail.com" || email === "anmol@cortexwebsolutions.com";
          const resolvedRole = isMasterAdmin ? "ADMIN" : (sessionRole || "USER");

          const unifiedUser = {
            id: (session.user as any).id || (session.user as any)._id || "usr_session",
            name: session.user.name || (resolvedRole === "SONI" ? "Jeenu Soni" : "User"),
            email: session.user.email || "",
            role: resolvedRole,
          };

          if (isMounted) {
            setCurrentUser(unifiedUser);
            if ((session.user as any).token) setAuthToken((session.user as any).token);
          }

          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(unifiedUser));
            document.cookie = `cortex_role=${resolvedRole}; path=/; max-age=2592000`;
          }
          return;
        }

        // Priority 2: Check server-side auth status (reads NextAuth cookies, jeenu_session, or bearer)
        const res = await fetch("/api/vlog/jeenusoni/auth", { cache: "no-store" }).catch(() => null);
        if (res && res.ok) {
          const json = await res.json().catch(() => ({}));
          if (json.success && json.authenticated && json.user) {
            const resolvedRole = (json.user.role || (json.canEdit ? "ADMIN" : "USER")).toString().toUpperCase();
            const serverUser = {
              id: json.user.id || "usr_auth",
              name: json.user.name || (resolvedRole === "SONI" ? "Jeenu Soni" : "User"),
              email: json.user.email || "",
              role: resolvedRole,
            };
            if (isMounted) {
              setCurrentUser(serverUser);
            }
            if (typeof window !== "undefined") {
              localStorage.setItem("user", JSON.stringify(serverUser));
              document.cookie = `cortex_role=${resolvedRole}; path=/; max-age=2592000`;
            }
            return;
          }
        }

        // Priority 3: Fallback check localStorage (the / page login storage)
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("user") || localStorage.getItem("jeenu_user");
          const storedToken = localStorage.getItem("token") || localStorage.getItem("jeenu_token");

          if (storedUser) {
            try {
              const parsed = JSON.parse(storedUser);
              if (parsed && (parsed.email || parsed.name)) {
                const email = (parsed.email || "").toLowerCase().trim();
                const isMasterAdmin = email === "anmolsingh26ff@gmail.com" || email === "anmol@cortexwebsolutions.com";
                const userRole = (isMasterAdmin ? "ADMIN" : (parsed.role || parsed.userRole || "USER")).toString().toUpperCase();

                if (isMounted) {
                  setCurrentUser({
                    id: parsed.id || parsed._id || "usr_auth",
                    name: parsed.name || (userRole === "SONI" ? "Jeenu Soni" : "User"),
                    email: parsed.email || "",
                    role: userRole,
                  });
                  if (storedToken) setAuthToken(storedToken);
                }
                return;
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

    syncAuth();

    return () => {
      isMounted = false;
    };
  }, [session, sessionStatus]);

  // Keyboard shortcut listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("login") === "true" || params.get("admin") === "true") {
        setIsAuthModalOpen(true);
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.altKey && e.key.toLowerCase() === "a") || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "l")) {
          e.preventDefault();
          setIsAuthModalOpen(true);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  // Restore uploaded photos from localStorage cache immediately on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const cachedProfileImg = localStorage.getItem("jeenu_profile_image");
      if (cachedProfileImg && cachedProfileImg.trim() !== "") {
        setProfile((prev) => {
          if (!prev.profileImage || prev.profileImage.trim() === "") {
            return { ...prev, profileImage: cachedProfileImg };
          }
          return prev;
        });
      }

      const cachedGallery = localStorage.getItem("jeenu_gallery_photos");
      if (cachedGallery) {
        const parsed = JSON.parse(cachedGallery);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setGallery((prev) => {
            const map = new Map<string, JeenuGalleryData>();
            for (const item of parsed) {
              map.set(item.id || item.imageUrl, item);
            }
            for (const item of prev) {
              if (!map.has(item.id || item.imageUrl)) {
                map.set(item.id || item.imageUrl, item);
              }
            }
            return Array.from(map.values()).sort((a, b) => (a.sortOrder || 1) - (b.sortOrder || 1));
          });
        }
      }
    } catch (e) {
      console.warn("Error reading cache:", e);
    }
  }, []);

  // Live DB sync with reload protection (never overwrites valid uploaded photos with empty response)
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

        if (profJson.success && profJson.data) {
          setProfile((prev) => {
            const cachedImg = typeof window !== "undefined" ? localStorage.getItem("jeenu_profile_image") : null;
            const finalImg =
              profJson.data.profileImage && profJson.data.profileImage.trim() !== ""
                ? profJson.data.profileImage
                : prev.profileImage || cachedImg || "";

            if (typeof window !== "undefined" && finalImg) {
              localStorage.setItem("jeenu_profile_image", finalImg);
            }

            // If server lacked the image due to serverless cold start, sync back to server in background
            if (canEdit && (!profJson.data.profileImage || profJson.data.profileImage.trim() === "") && finalImg) {
              fetch("/api/vlog/jeenusoni/profile", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
                  ...(currentUser?.role ? { "x-user-role": currentUser.role } : {}),
                },
                body: JSON.stringify({ profileImage: finalImg }),
              }).catch(() => {});
            }

            return {
              ...profJson.data,
              profileImage: finalImg,
            };
          });
        }

        if (vlogJson.success && Array.isArray(vlogJson.data)) setVlogs(vlogJson.data);

        if (galJson.success && Array.isArray(galJson.data)) {
          setGallery((prev) => {
            const cachedGalleryRaw = typeof window !== "undefined" ? localStorage.getItem("jeenu_gallery_photos") : null;
            let cachedList: JeenuGalleryData[] = [];
            if (cachedGalleryRaw) {
              try {
                cachedList = JSON.parse(cachedGalleryRaw);
              } catch (_) {}
            }

            const map = new Map<string, JeenuGalleryData>();
            for (const item of galJson.data) {
              map.set(item.id || item.imageUrl, item);
            }
            for (const item of cachedList) {
              if (!map.has(item.id || item.imageUrl)) {
                map.set(item.id || item.imageUrl, item);
              }
            }
            for (const item of prev) {
              if (!map.has(item.id || item.imageUrl)) {
                map.set(item.id || item.imageUrl, item);
              }
            }
            const merged = Array.from(map.values()).sort((a, b) => (a.sortOrder || 1) - (b.sortOrder || 1));
            if (typeof window !== "undefined") {
              localStorage.setItem("jeenu_gallery_photos", JSON.stringify(merged));
            }
            return merged;
          });
        }

        if (socJson.success && Array.isArray(socJson.data)) setSocials(socJson.data);
      } catch (err) {
        console.error("Live DB sync warning:", err);
      }
    }

    loadLiveData();
  }, [canEdit, authToken, currentUser?.role]);

  const handleLogout = async () => {
    try {
      await fetch("/api/vlog/jeenusoni/auth", { method: "DELETE" }).catch(() => null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("jeenu_token");
        localStorage.removeItem("jeenu_user");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        document.cookie = "cortex_role=; path=/; max-age=0";
      }
      setCurrentUser(null);
      setAuthToken(null);
      if (session) {
        await signOut({ redirect: false });
      }
      showToast("Logged out successfully", "info");
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileImageUpdated = (newUrl: string) => {
    setProfile((prev) => {
      const updated = { ...prev, profileImage: newUrl };
      if (typeof window !== "undefined") {
        localStorage.setItem("jeenu_profile_image", newUrl);
        localStorage.setItem("jeenu_profile_data", JSON.stringify(updated));
      }
      return updated;
    });
    showToast("Profile photo updated successfully!", "success");
  };

  const handleGallerySuccess = (item: JeenuGalleryData, isDelete = false) => {
    if (isDelete) {
      setGallery((prev) => {
        const filtered = prev.filter((g) => g.id !== item.id && g.imageUrl !== item.imageUrl);
        if (typeof window !== "undefined") {
          localStorage.setItem("jeenu_gallery_photos", JSON.stringify(filtered));
        }
        return filtered;
      });
      showToast("Photo removed from gallery", "info");
    } else {
      setGallery((prev) => {
        const exists = prev.some((g) => g.id === item.id || g.imageUrl === item.imageUrl);
        const updated = exists
          ? prev.map((g) => ((g.id === item.id || g.imageUrl === item.imageUrl) ? item : g))
          : [item, ...prev];
        if (typeof window !== "undefined") {
          localStorage.setItem("jeenu_gallery_photos", JSON.stringify(updated));
        }
        return updated;
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
        <div
          onDoubleClick={() => {
            if (!canEdit) setIsAuthModalOpen(true);
          }}
          className="flex items-center gap-2 group cursor-pointer select-none"
          title="Jeenu Soni Official"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-900 to-[#E8C39E] flex items-center justify-center text-white shadow-md">
            <Crown size={16} />
          </div>
          <span className="font-serif font-bold text-lg text-white group-hover:text-[#E8C39E] transition-colors">
            Jeenu Soni
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <button
            onClick={() => scrollToSection("vlog-section")}
            className="text-xs font-semibold text-zinc-300 hover:text-white hidden sm:block transition-colors cursor-pointer"
          >
            Vlogs
          </button>
          <button
            onClick={() => scrollToSection("collab-form")}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-950 to-zinc-900 text-[#FCE7D4] border border-[#E8C39E]/30 text-xs font-serif font-bold hover:scale-105 transition-all shadow-md cursor-pointer"
          >
            Collaborate & Ads
          </button>

          {/* User Auth Buttons / Profile Indicator (Matching / page) */}
          {!currentUser ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setIsSignInOpen(true)}
                className="px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsSignUpOpen(true)}
                className="px-3.5 sm:px-5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-900 via-[#8B0032] to-rose-950 border border-[#E8C39E]/40 hover:border-[#E8C39E] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Admin Link: Strictly visible ONLY when logged in as ADMIN or SONI */}
              {canEdit && (
                <Link
                  href="/admin/jeenusoni"
                  className="p-2 rounded-full bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-500/40 text-xs flex items-center gap-1 shadow-md"
                  title="Open Admin Console"
                >
                  <ShieldCheck size={14} className="text-emerald-400" />
                </Link>
              )}

              {/* Logged-In User Indicator Pill with Logout */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
                <User size={13} className="text-[#E8C39E]" />
                <span className="text-zinc-200 font-medium truncate max-w-[90px] sm:max-w-[130px]">
                  {currentUser.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-1 rounded-full text-zinc-400 hover:text-rose-400 hover:bg-white/10 transition-colors cursor-pointer"
                  title="Log Out"
                >
                  <LogOut size={12} />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <LuxuryHero
        profile={profile}
        onExploreClick={() => scrollToSection("vlog-section")}
        onCollabClick={() => scrollToSection("collab-form")}
        canEdit={canEdit}
        onRequestLogin={() => setIsAuthModalOpen(true)}
        onEditProfilePic={() => setIsProfileModalOpen(true)}
        onProfilePicUploaded={(newUrl) => handleProfileImageUpdated(newUrl)}
        authToken={authToken}
        currentUserRole={currentUser?.role || null}
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
        onGalleryUploaded={(newItem) => handleGallerySuccess(newItem, false)}
        authToken={authToken}
        currentUserRole={currentUser?.role || null}
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

      {/* Instagram-style Profile Picture & Details Modal (Strictly for ADMIN & SONI) */}
      {canEdit && (
        <InstagramProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          profile={profile}
          onProfileUpdated={(updated) => {
            setProfile((prev) => ({ ...prev, ...updated }));
            showToast("Profile details updated successfully!", "success");
          }}
          authToken={authToken}
          currentUserRole={currentUser?.role || null}
        />
      )}

      {/* Instagram-style Gallery Modal (Add & Change Photo, Strictly for ADMIN & SONI) */}
      {canEdit && (
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
      )}

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

      {/* Standard Cortex Sign In Modal (Exact same as / page) */}
      {isSignInOpen && (
        <div
          onClick={() => setIsSignInOpen(false)}
          className="fixed inset-0 z-[999999] w-screen h-screen bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto my-auto w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B0B0F] border border-white/[0.12] p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
          >
            <button
              type="button"
              onClick={() => setIsSignInOpen(false)}
              className="hover:bg-white/10 p-2 rounded-full absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Sign In Modal"
            >
              <X size={18} />
            </button>
            <Signin signInOpen={(val: boolean) => setIsSignInOpen(val)} />
          </div>
        </div>
      )}

      {/* Standard Cortex Sign Up Modal (Exact same as / page) */}
      {isSignUpOpen && (
        <div
          onClick={() => setIsSignUpOpen(false)}
          className="fixed inset-0 z-[999999] w-screen h-screen bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto my-auto w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B0B0F] border border-white/[0.12] p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
          >
            <button
              type="button"
              onClick={() => setIsSignUpOpen(false)}
              className="hover:bg-white/10 p-2 rounded-full absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Sign Up Modal"
            >
              <X size={18} />
            </button>
            <SignUp signUpOpen={(val: boolean) => setIsSignUpOpen(val)} />
          </div>
        </div>
      )}

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
