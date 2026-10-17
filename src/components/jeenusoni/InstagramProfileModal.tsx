"use client";

import React, { useState, useRef } from "react";
import { Camera, Upload, X, Check, Image as ImageIcon, Trash2, Loader2, Sparkles } from "lucide-react";

interface InstagramProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  onImageUpdated: (newImageUrl: string) => void;
  authToken?: string | null;
}

export default function InstagramProfileModal({
  isOpen,
  onClose,
  currentImage,
  onImageUpdated,
  authToken,
}: InstagramProfileModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage);
  const [urlInput, setUrlInput] = useState<string>("");
  const [useUrlMode, setUseUrlMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file (JPEG, PNG, WebP).");
        return;
      }
      setError(null);
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleUrlApply = () => {
    if (!urlInput.trim()) return;
    setError(null);
    setSelectedFile(null);
    setPreviewUrl(urlInput.trim());
  };

  const handleRemovePhoto = () => {
    const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop";
    setSelectedFile(null);
    setPreviewUrl(defaultAvatar);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      let finalImageUrl = previewUrl;

      // 1. If user picked a local file, upload it first
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadJson = await uploadRes.json();
        if (!uploadJson.success || !uploadJson.url) {
          throw new Error(uploadJson.error || "Failed to upload image file");
        }
        finalImageUrl = uploadJson.url;
      }

      // 2. Persist new profile photo in PostgreSQL
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const res = await fetch("/api/vlog/jeenusoni/profile", {
        method: "PUT",
        headers,
        body: JSON.stringify({ profileImage: finalImageUrl }),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to save profile picture");
      }

      onImageUpdated(finalImageUrl);
      onClose();
    } catch (err: any) {
      console.error("Profile pic update error:", err);
      setError(err.message || "Failed to update profile photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#12070E] border border-rose-500/30 rounded-3xl max-w-md w-full overflow-hidden shadow-[0_0_50px_rgba(225,48,108,0.25)] text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white">
              <Camera size={16} />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">Change Profile Photo</h3>
              <p className="text-[11px] text-zinc-400">Instagram-style instant photo update</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex flex-col items-center">
          {/* Instagram-style Avatar Circular Preview with Gradient Ring */}
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-36 h-36 rounded-full p-[3px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                <img
                  src={previewUrl || currentImage}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold gap-1">
                  <Upload size={18} />
                  <span>Choose Photo</span>
                </div>
              </div>
            </div>

            {/* Camera Floating Badge */}
            <div className="absolute bottom-1 right-1 p-2 rounded-full bg-gradient-to-r from-[#E1306C] to-[#FD1D1D] text-white shadow-lg border-2 border-[#12070E]">
              <Camera size={14} />
            </div>
          </div>

          <p className="text-xs text-zinc-400 text-center">
            Photo will update live on your public vlog profile and luxury console.
          </p>

          {error && (
            <div className="w-full p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 text-center">
              {error}
            </div>
          )}

          {/* Action Options */}
          <div className="w-full space-y-2.5">
            {/* Native File Selector Button */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F56040] hover:brightness-110 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Upload size={15} />
              <span>📁 Upload from Device (Computer / Phone)</span>
            </button>

            {/* Toggle Web URL Input */}
            <button
              type="button"
              onClick={() => setUseUrlMode(!useUrlMode)}
              className="w-full py-2.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <ImageIcon size={14} />
              <span>{useUrlMode ? "Hide Image Link Option" : "🔗 Paste Image URL Instead"}</span>
            </button>

            {useUrlMode && (
              <div className="flex gap-2 pt-1 animate-in fade-in duration-150">
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-rose-400"
                />
                <button
                  type="button"
                  onClick={handleUrlApply}
                  className="px-3.5 py-2.5 rounded-xl bg-rose-950 text-rose-200 border border-rose-500/30 text-xs font-bold hover:bg-rose-900"
                >
                  Apply
                </button>
              </div>
            )}

            {/* Remove / Reset Photo */}
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="w-full py-2 px-4 rounded-xl text-zinc-400 hover:text-rose-400 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Trash2 size={13} />
              <span>Reset to Default Avatar</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-black/40 border-t border-white/10 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 hover:from-rose-800 hover:to-rose-900 text-[#FCE7D4] border border-rose-500/40 text-xs font-serif font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin text-[#E8C39E]" />
                <span>Updating Photo...</span>
              </>
            ) : (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>Save Profile Photo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
