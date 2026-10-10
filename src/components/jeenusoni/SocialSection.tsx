"use client";

import React from "react";
import { Instagram, Youtube, Facebook, MessageCircle, ExternalLink, Globe } from "lucide-react";
import { JeenuSocialLinkData } from "@/lib/db";

interface SocialSectionProps {
  socials: JeenuSocialLinkData[];
}

export default function SocialSection({ socials }: SocialSectionProps) {
  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("instagram")) return <Instagram className="text-rose-400" size={24} />;
    if (p.includes("youtube")) return <Youtube className="text-red-500" size={24} />;
    if (p.includes("facebook")) return <Facebook className="text-blue-500" size={24} />;
    if (p.includes("whatsapp")) return <MessageCircle className="text-emerald-400" size={24} />;
    return <Globe className="text-purple-400" size={24} />;
  };

  return (
    <section className="py-20 px-4 bg-[#0A0507] border-t border-rose-500/10">
      <div className="container mx-auto max-w-5xl space-y-8 text-center">
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold text-white">Connect Across Platforms</h3>
          <p className="text-xs text-zinc-400">Follow Jeenu Soni for daily stories, fashion updates & behind-the-scenes vlogs.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {socials.filter(s => s.isActive !== false).map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-rose-400/40 flex items-center gap-3 transition-all duration-300 shadow-md hover:scale-105"
            >
              {getSocialIcon(s.platform)}
              <div className="text-left">
                <div className="text-xs font-serif font-bold text-white group-hover:text-[#FCE7D4] transition-colors">
                  {s.label || s.platform}
                </div>
                <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                  <span>{s.platform}</span>
                  <ExternalLink size={10} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
