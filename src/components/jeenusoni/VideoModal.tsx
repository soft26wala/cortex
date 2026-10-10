"use client";

import React from "react";
import { X, Instagram, ExternalLink, Play } from "lucide-react";
import { JeenuVlogData } from "@/lib/db";

interface VideoModalProps {
  vlog: JeenuVlogData | null;
  onClose: () => void;
}

export default function VideoModal({ vlog, onClose }: VideoModalProps) {
  if (!vlog) return null;

  const isInstagram = vlog.videoUrl.includes("instagram.com");
  const isDirectMp4 = vlog.videoUrl.endsWith(".mp4") || vlog.videoUrl.endsWith(".webm");

  // YouTube embed helper
  let embedUrl = vlog.videoUrl;
  if (vlog.videoUrl.includes("youtube.com/watch?v=")) {
    const videoId = vlog.videoUrl.split("v=")[1]?.split("&")[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } else if (vlog.videoUrl.includes("youtu.be/")) {
    const videoId = vlog.videoUrl.split("youtu.be/")[1]?.split("?")[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }

  // Instagram Reel embed format helper
  let igEmbedUrl = vlog.videoUrl;
  if (isInstagram) {
    if (!igEmbedUrl.includes("/embed")) {
      const cleanUrl = igEmbedUrl.split("?")[0].replace(/\/$/, "");
      igEmbedUrl = `${cleanUrl}/embed`;
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
      >
        <X size={24} />
      </button>

      <div className="max-w-4xl w-full bg-[#0D0609] border border-rose-500/30 rounded-3xl overflow-hidden shadow-2xl space-y-4">
        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {isInstagram ? (
            <div className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-rose-950 via-[#1A0914] to-black">
              {/* Instagram Embedded Background Thumbnail */}
              {vlog.thumbnail && (
                <img
                  src={vlog.thumbnail}
                  alt={vlog.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
                />
              )}
              <div className="relative z-10 space-y-4 max-w-md">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E1306C] via-[#FD1D1D] to-[#F56040] text-white flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(225,48,108,0.6)] animate-pulse">
                  <Instagram size={32} />
                </div>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-rose-500/30 text-xs font-mono text-[#E8C39E]">
                    @jot_soni_0_0 Official Reel
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white">{vlog.title}</h3>
                </div>
                <a
                  href={vlog.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F56040] text-white font-semibold text-xs shadow-xl hover:scale-105 transition-all"
                >
                  <Play size={16} className="fill-current" />
                  <span>Watch Reel on Instagram (@jot_soni_0_0)</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ) : isDirectMp4 ? (
            <video src={vlog.videoUrl} controls autoPlay className="w-full h-full object-contain" />
          ) : (
            <iframe
              src={embedUrl}
              title={vlog.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          )}
        </div>

        {/* Description Box */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-950 text-[#E8C39E] border border-rose-500/20">
                {vlog.category}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {new Date(vlog.createdAt).toLocaleDateString()}
              </span>
            </div>
            {isInstagram && (
              <a
                href={vlog.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#E1306C] hover:underline flex items-center gap-1"
              >
                Open in Instagram app <ExternalLink size={12} />
              </a>
            )}
          </div>
          <h3 className="text-xl font-serif font-bold text-white">{vlog.title}</h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">{vlog.description}</p>
        </div>
      </div>
    </div>
  );
}
