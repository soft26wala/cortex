"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Maximize2, X } from "lucide-react";
import { JeenuGalleryData } from "@/lib/db";

interface GallerySectionProps {
  gallery: JeenuGalleryData[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  const [activeImage, setActiveImage] = useState<JeenuGalleryData | null>(null);

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#060204] via-[#0E0509] to-[#0A0507] relative">
      <div className="container mx-auto max-w-6xl space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/20 text-xs font-mono uppercase tracking-widest text-[#E8C39E]">
            <Camera size={14} className="text-[#E8C39E]" />
            Visual Aesthetics & Gallery
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            High-Fashion <span className="bg-gradient-to-r from-[#FCE7D4] to-[#E8C39E] bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-zinc-400 text-sm font-light">
            A curated lookbook of design moments, haute couture, travel destinations, and editorial portraits.
          </p>
        </div>

        {/* Gallery Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-zinc-950 border border-white/10 hover:border-rose-400/40 shadow-xl transition-all duration-500 ${
                idx % 3 === 0 ? "sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto sm:h-[450px]" : "h-72"
              }`}
            >
              <Image
                src={item.imageUrl}
                alt={item.title || "Jeenu Soni Gallery"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

              {/* Hover Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {item.title && <h4 className="text-lg font-serif font-bold text-[#FCE7D4]">{item.title}</h4>}
                {item.caption && <p className="text-xs text-zinc-300 font-light line-clamp-2 mt-1">{item.caption}</p>}
                <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono text-rose-300">
                  <Maximize2 size={12} /> View High Resolution
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <X size={24} />
          </button>
          <div className="max-w-4xl w-full max-h-[85vh] relative flex flex-col items-center">
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden">
              <Image src={activeImage.imageUrl} alt={activeImage.title || "Gallery Item"} fill className="object-contain" />
            </div>
            {(activeImage.title || activeImage.caption) && (
              <div className="mt-4 text-center space-y-1">
                {activeImage.title && <h3 className="text-xl font-serif font-bold text-[#FCE7D4]">{activeImage.title}</h3>}
                {activeImage.caption && <p className="text-sm text-zinc-300 font-light">{activeImage.caption}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
