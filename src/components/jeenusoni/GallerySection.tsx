"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Camera, Maximize2, X, Plus, Edit, Sparkles, Upload, Loader2, ImagePlus, ShieldAlert } from "lucide-react";
import { JeenuGalleryData } from "@/lib/db";
import toast from "react-hot-toast";

interface GallerySectionProps {
  gallery: JeenuGalleryData[];
  canEdit?: boolean;
  onAddNewPhoto?: () => void;
  onEditPhoto?: (item: JeenuGalleryData) => void;
  onGalleryUploaded?: (item: JeenuGalleryData) => void;
  authToken?: string | null;
  currentUserRole?: string | null;
}

export default function GallerySection({
  gallery,
  canEdit = false,
  onAddNewPhoto,
  onEditPhoto,
  onGalleryUploaded,
  authToken,
  currentUserRole,
}: GallerySectionProps) {
  const [activeImage, setActiveImage] = useState<JeenuGalleryData | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fast 1-Click Gallery File Upload for Soni / Admin
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPEG, PNG, WebP).");
      return;
    }

    setUploading(true);
    const toastId = toast.loading("Uploading photo to lookbook gallery via .env API...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "gallery");
      formData.append("title", "Jeenu Soni Lookbook");
      formData.append("caption", "High-fashion aesthetic moment");

      const headers: Record<string, string> = {};
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }
      if (currentUserRole) {
        headers["x-user-role"] = currentUserRole;
      }

      const res = await fetch("/api/vlog/jeenusoni/upload", {
        method: "POST",
        headers,
        body: formData,
      });

      const json = await res.json();
      if (!json.success || !json.data) {
        throw new Error(json.error || "Failed to upload photo to gallery");
      }

      toast.success("Photo successfully added to lookbook gallery!", { id: toastId });
      if (onGalleryUploaded) {
        onGalleryUploaded(json.data);
      }
    } catch (err: any) {
      console.error("Gallery direct upload error:", err);
      toast.error(err.message || "Failed to upload gallery photo", { id: toastId });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFastUploadClick = () => {
    if (fileInputRef.current && !uploading) {
      fileInputRef.current.click();
    }
  };

  return (
    <section id="gallery-section" className="py-24 px-4 bg-gradient-to-b from-[#060204] via-[#0E0509] to-[#0A0507] relative">
      {/* Hidden file input for direct gallery photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="container mx-auto max-w-6xl space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center sm:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/20 text-xs font-mono uppercase tracking-widest text-[#E8C39E]">
              <Camera size={14} className="text-[#E8C39E]" />
              Visual Aesthetics & Lookbook
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              High-Fashion <span className="bg-gradient-to-r from-[#FCE7D4] to-[#E8C39E] bg-clip-text text-transparent">Gallery</span>
            </h2>
            <p className="text-zinc-400 text-sm font-light">
              A curated lookbook of design moments, haute couture, travel destinations, and editorial portraits.
            </p>
          </div>

          {/* Action Buttons (Strictly for Soni & Admin) */}
          {canEdit && (
            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
              {/* Direct Fast Upload File Button */}
              <button
                type="button"
                onClick={handleFastUploadClick}
                disabled={uploading}
                className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 hover:border-rose-400/50 shadow-lg transition-all cursor-pointer disabled:opacity-50"
                title="Quick Upload Photo Directly from Device"
              >
                {uploading ? (
                  <>
                    <Loader2 size={15} className="animate-spin text-[#E8C39E]" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload size={14} className="text-[#E8C39E]" />
                    <span>Quick Upload</span>
                  </>
                )}
              </button>

              {/* Instagram-style Modal Add New Photo Button */}
              <button
                type="button"
                onClick={onAddNewPhoto}
                disabled={uploading}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F56040] hover:scale-105 active:scale-95 text-white font-semibold text-xs shadow-[0_0_30px_rgba(225,48,108,0.4)] border border-white/20 transition-all cursor-pointer"
                title="Add New Photo with Custom Title & Caption"
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                <span>+ Add Photo Details</span>
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </button>
            </div>
          )}
        </div>

        {/* Gallery Content or Empty State */}
        {gallery.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-[2.5rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-950/70 to-rose-900/30 border border-rose-500/20 flex items-center justify-center text-[#E8C39E] shadow-xl">
              <ImagePlus size={36} />
            </div>

            <div className="space-y-1.5 max-w-md">
              <h3 className="text-xl font-serif font-bold text-white">
                {canEdit ? "Lookbook Gallery Awaiting Content" : "Visual Lookbook Collection"}
              </h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                {canEdit
                  ? "Demo pictures have been removed. This gallery is ready for high-resolution photographs to be uploaded."
                  : "A curated lookbook of high-fashion editorial portraits, style moments, and travel diaries."}
              </p>
            </div>

            {canEdit && (
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleFastUploadClick}
                  disabled={uploading}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F56040] text-white text-xs font-bold hover:scale-105 active:scale-95 shadow-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  {uploading ? (
                    <>
                      <Loader2 size={15} className="animate-spin text-white" />
                      <span>Uploading to API...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      <span>+ Upload First Lookbook Photo</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onAddNewPhoto}
                  className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold border border-white/10 transition-all cursor-pointer"
                >
                  Custom Photo Details
                </button>
              </div>
            )}
          </div>
        ) : (
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
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Instagram-style Edit/Change Action Button (Strictly for Soni/Admin) */}
                {canEdit && (
                  <div className="absolute top-3 right-3 z-20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onEditPhoto) onEditPhoto(item);
                      }}
                      className="p-2 rounded-full bg-black/70 hover:bg-rose-600 text-white backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 transition-all cursor-pointer"
                      title="Change Photo or Edit Caption"
                    >
                      <Edit size={14} />
                    </button>
                  </div>
                )}

                {/* Hover Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {item.title && <h4 className="text-lg font-serif font-bold text-[#FCE7D4]">{item.title}</h4>}
                  {item.caption && <p className="text-xs text-zinc-300 font-light line-clamp-2 mt-1">{item.caption}</p>}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-rose-300">
                      <Maximize2 size={12} /> View High Resolution
                    </div>
                    {canEdit && (
                      <span className="text-[10px] font-mono text-[#E8C39E] bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                        Click ✏️ to edit or replace
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <X size={24} />
          </button>
          <div className="max-w-4xl w-full max-h-[85vh] relative flex flex-col items-center">
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden">
              <Image
                src={activeImage.imageUrl}
                alt={activeImage.title || "Gallery Item"}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            {(activeImage.title || activeImage.caption) && (
              <div className="mt-4 text-center space-y-1">
                {activeImage.title && <h3 className="text-xl font-serif font-bold text-[#FCE7D4]">{activeImage.title}</h3>}
                {activeImage.caption && <p className="text-sm text-zinc-300 font-light">{activeImage.caption}</p>}
              </div>
            )}
            {canEdit && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    const toEdit = activeImage;
                    setActiveImage(null);
                    if (onEditPhoto) onEditPhoto(toEdit);
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-900 to-rose-950 text-[#FCE7D4] border border-rose-500/40 text-xs font-semibold flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
                >
                  <Edit size={14} /> Change / Replace This Photo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
