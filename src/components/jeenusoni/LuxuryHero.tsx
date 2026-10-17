"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Sparkles, ArrowDown, Send, Play, Heart, Camera } from "lucide-react";
import { JeenuProfileData } from "@/lib/db";

interface LuxuryHeroProps {
  profile: JeenuProfileData;
  onExploreClick: () => void;
  onCollabClick: () => void;
  canEdit?: boolean;
  onEditProfilePic?: () => void;
}

export default function LuxuryHero({
  profile,
  onExploreClick,
  onCollabClick,
  canEdit = false,
  onEditProfilePic,
}: LuxuryHeroProps) {
  const instagramUrl = profile.instagramUrl?.trim();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Ambient Romantic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#8B0032]/25 via-[#D4AF37]/15 to-[#FFB6C1]/20 blur-[140px] pointer-events-none rounded-full animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#4A0E17]/30 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-[#E8C39E]/10 blur-[90px] pointer-events-none rounded-full" />

      {/* Floating Sparkles & Light Beams */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Bio Teaser */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-rose-950/60 to-wine-900/40 border border-rose-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(232,195,158,0.15)]">
              <Sparkles size={14} className="text-[#E8C39E] animate-spin" style={{ animationDuration: "6s" }} />
              <span className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-[#FCE7D4] via-[#E8C39E] to-rose-200 bg-clip-text text-transparent">
                Design Vlogger & Creative Influencer
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white leading-[1.08] text-shadow">
              <span className="bg-gradient-to-r from-white via-[#FCE7D4] to-[#E8C39E] bg-clip-text text-transparent block">
                {profile.heroTitle || profile.name}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-2xl font-light text-rose-200/90 italic tracking-wide font-serif">
              "{profile.heroSubtitle || "Design Vlogs • Creative Profession • Style"}"
            </p>

            {/* Location & Short Bio */}
            <div className="space-y-3 pt-1">
              <p className="text-sm text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
                {profile.bio || "Professional Digital Creator & Design Vlogger based in Gajsinghpur. Specializing in high-end brand collaborations, fashion vlogging, visual storytelling, and creative direction."}
              </p>
              {profile.location && (
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E8C39E]/80 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  {profile.location}
                </div>
              )}
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Dynamic Instagram Button */}
              {instagramUrl ? (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F56040] text-white font-semibold text-sm shadow-[0_0_30px_rgba(225,48,108,0.4)] hover:shadow-[0_0_45px_rgba(253,29,29,0.7)] hover:scale-105 transition-all duration-300"
                >
                  <Instagram size={18} className="group-hover:rotate-12 transition-transform" />
                  <span>Instagram</span>
                  <span className="w-2 h-2 rounded-full bg-white/80 animate-ping" />
                </a>
              ) : null}

              {/* Explore Button */}
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-rose-300/30 text-rose-100 font-semibold text-sm backdrop-blur-md hover:border-rose-400/50 transition-all duration-300"
              >
                <Play size={15} className="fill-current text-[#E8C39E]" />
                Explore Vlogs
              </button>

              {/* Collaborate / Advertise CTA */}
              <button
                onClick={onCollabClick}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-950 via-[#4A0E17] to-zinc-950 text-[#FCE7D4] font-semibold text-sm border border-[#E8C39E]/30 hover:border-[#E8C39E]/70 shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Send size={15} className="text-[#E8C39E]" />
                Collaborate & Ads
              </button>
            </div>
          </div>

          {/* Right Column: Female Portrait Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div
              className={`relative group w-72 sm:w-80 md:w-96 aspect-[3/4] rounded-[2.5rem] overflow-hidden p-2 bg-gradient-to-b from-[#E8C39E]/30 via-rose-900/20 to-black/40 border border-[#E8C39E]/30 shadow-[0_0_50px_rgba(139,0,50,0.3)] backdrop-blur-xl ${
                canEdit ? "cursor-pointer" : ""
              }`}
              onClick={() => {
                if (canEdit && onEditProfilePic) onEditProfilePic();
              }}
            >
              {/* Inner Portrait Container */}
              <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-zinc-950">
                <Image
                  src={profile.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"}
                  alt={profile.name || "Jeenu Soni"}
                  fill
                  priority
                  unoptimized
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0507] via-transparent to-transparent opacity-80" />

                {/* Instagram-style Change Photo Badge (For Admin & Soni) */}
                {canEdit && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onEditProfilePic) onEditProfilePic();
                    }}
                    className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F56040] hover:scale-105 active:scale-95 text-white text-xs font-semibold shadow-2xl border border-white/20 transition-all cursor-pointer"
                    title="Change Profile Photo (Instagram Style)"
                  >
                    <Camera size={14} className="animate-pulse" />
                    <span>Change Photo</span>
                  </button>
                )}

                {/* Glassmorphic Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif italic text-[#FCE7D4]">Official Vlog Page</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Verified Profile
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white tracking-wide">{profile.name}</h3>
                  <p className="text-[11px] text-zinc-300 font-light truncate">
                    {profile.heroSubtitle || "Design Vlogs • Style • Gajsinghpur"}
                  </p>
                </div>
              </div>

              {/* Glowing Corner Accents */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#E8C39E]/20 blur-xl pointer-events-none rounded-full" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-rose-600/30 blur-xl pointer-events-none rounded-full" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 text-center">
          <button
            onClick={onExploreClick}
            className="inline-flex flex-col items-center gap-2 text-zinc-400 hover:text-rose-200 text-xs font-mono tracking-widest uppercase transition-colors"
          >
            <span>Scroll To Discover</span>
            <ArrowDown size={14} className="animate-bounce text-[#E8C39E]" />
          </button>
        </div>
      </div>
    </section>
  );
}
