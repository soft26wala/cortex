"use client";

import React, { useState, useEffect } from "react";
import LuxuryHero from "@/components/jeenusoni/LuxuryHero";
import AboutSection from "@/components/jeenusoni/AboutSection";
import VlogSection from "@/components/jeenusoni/VlogSection";
import GallerySection from "@/components/jeenusoni/GallerySection";
import AdLeadForm from "@/components/jeenusoni/AdLeadForm";
import SocialSection from "@/components/jeenusoni/SocialSection";
import VideoModal from "@/components/jeenusoni/VideoModal";
import { JeenuProfileData, JeenuVlogData, JeenuGalleryData, JeenuSocialLinkData } from "@/lib/db";
import Link from "next/link";
import { Crown, Sparkles, Lock, Mail } from "lucide-react";

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

  // Dynamic live fetch from DB
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
      {/* Top Floating Branding Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-rose-500/10 px-6 py-4 flex items-center justify-between">
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
          <Link
            href="/admin/jeenusoni"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 text-xs flex items-center gap-1"
            title="Admin Console (Restricted to ADMIN and SONI)"
          >
            <Lock size={14} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <LuxuryHero
        profile={profile}
        onExploreClick={() => scrollToSection("vlog-section")}
        onCollabClick={() => scrollToSection("collab-form")}
      />

      {/* About Section */}
      <AboutSection profile={profile} />

      {/* Vlogs Showcase */}
      <VlogSection vlogs={vlogs} onSelectVlog={(vlog) => setActiveVlog(vlog)} />

      {/* Gallery Section */}
      {gallery.length > 0 && <GallerySection gallery={gallery} />}

      {/* Client Advertisement Lead Form */}
      <AdLeadForm />

      {/* Social Media Links */}
      {socials.length > 0 ? (
        <SocialSection socials={socials} />
      ) : (
        <SocialSection
          socials={[
            ...(profile.instagramUrl ? [{ id: "soc-1", platform: "Instagram", url: profile.instagramUrl, label: "@jot_soni_0_0", icon: "instagram", sortOrder: 1, isActive: true, createdAt: "", updatedAt: "" }] : []),
            ...(profile.youtubeUrl ? [{ id: "soc-2", platform: "YouTube", url: profile.youtubeUrl, label: "Jeenu Soni Vlogs", icon: "youtube", sortOrder: 2, isActive: true, createdAt: "", updatedAt: "" }] : []),
            ...(profile.whatsappNumber ? [{ id: "soc-3", platform: "WhatsApp", url: profile.whatsappNumber.startsWith("http") ? profile.whatsappNumber : `https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, "")}`, label: "WhatsApp Collab", icon: "whatsapp", sortOrder: 3, isActive: true, createdAt: "", updatedAt: "" }] : []),
            ...(profile.facebookUrl ? [{ id: "soc-4", platform: "Facebook", url: profile.facebookUrl, label: "Jeenu Soni Page", icon: "facebook", sortOrder: 4, isActive: true, createdAt: "", updatedAt: "" }] : []),
          ]}
        />
      )}

      {/* Video Modal Lightbox */}
      <VideoModal vlog={activeVlog} onClose={() => setActiveVlog(null)} />

      {/* Footer */}
      <footer className="py-12 px-4 bg-black border-t border-rose-500/10 text-center text-xs font-mono text-zinc-500 relative">
        <div className="container mx-auto space-y-5 flex flex-col items-center">
          {/* Animated Red Envelope Notification Badge (From User Image Spec) */}
          <button
            onClick={() => scrollToSection("collab-form")}
            className="group relative inline-flex items-center justify-center p-3.5 rounded-2xl bg-[#E54848] text-white shadow-[0_0_30px_rgba(229,72,72,0.6)] hover:shadow-[0_0_45px_rgba(229,72,72,0.9)] hover:scale-110 active:scale-95 transition-all duration-300"
            title="Send Message / Collaborate"
          >
            <Mail size={30} className="fill-[#E54848] text-[#FEE2E2]" />
            {/* Animated Red Pulsing Notification Dot */}
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 border-2 border-black flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            </span>
          </button>

          <p>© {new Date().getFullYear()} Jeenu Soni. All Rights Reserved. Powered by Cortex Web Solutions.</p>
          <div className="flex justify-center gap-4 text-[11px] text-zinc-400">
            <Link href="/vlog/jeenusoni" className="hover:underline">Public Vlog</Link>
            <span>•</span>
            <Link href="/admin/jeenusoni" className="hover:underline">Admin Console</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
