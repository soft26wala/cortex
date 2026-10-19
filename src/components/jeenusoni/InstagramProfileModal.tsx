"use client";

import React, { useState, useEffect, useRef } from "react";
import { Camera, Upload, X, Check, Image as ImageIcon, Trash2, Loader2, Sparkles, User, FileText, MapPin, Tag } from "lucide-react";
import { JeenuProfileData } from "@/lib/db";
import toast from "react-hot-toast";

interface InstagramProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: JeenuProfileData;
  currentImage?: string;
  onProfileUpdated?: (updatedData: Partial<JeenuProfileData>) => void;
  onImageUpdated?: (newImageUrl: string) => void;
  authToken?: string | null;
  currentUserRole?: string | null;
}

export default function InstagramProfileModal({
  isOpen,
  onClose,
  profile,
  currentImage,
  onProfileUpdated,
  onImageUpdated,
  authToken,
  currentUserRole,
}: InstagramProfileModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || profile?.profileImage || "");
  const [name, setName] = useState<string>(profile?.name || "Jeenu Soni");
  const [heroSubtitle, setHeroSubtitle] = useState<string>(profile?.heroSubtitle || "Design Vlogs • Creative Profession • Style");
  const [bio, setBio] = useState<string>(profile?.bio || "");
  const [location, setLocation] = useState<string>(profile?.location || "Gajsinghpur, Rajasthan • Digital Creator");
  const [urlInput, setUrlInput] = useState<string>("");
  const [useUrlMode, setUseUrlMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPreviewUrl(currentImage || profile?.profileImage || "");
      setName(profile?.name || "Jeenu Soni");
      setHeroSubtitle(profile?.heroSubtitle || "Design Vlogs • Creative Profession • Style");
      setBio(profile?.bio || "");
      setLocation(profile?.location || "Gajsinghpur, Rajasthan • Digital Creator");
      setSelectedFile(null);
      setError(null);
      setUseUrlMode(false);
      setUrlInput("");
    }
  }, [isOpen, profile, currentImage]);

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
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let finalImageUrl = previewUrl;

      // 1. If user picked a new local file, upload it directly via .env Cloudinary API
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("type", "profile");

        const uploadHeaders: Record<string, string> = {};
        if (authToken) {
          uploadHeaders["Authorization"] = `Bearer ${authToken}`;
        }
        if (currentUserRole) {
          uploadHeaders["x-user-role"] = currentUserRole;
        }

        const uploadRes = await fetch("/api/vlog/jeenusoni/upload", {
          method: "POST",
          headers: uploadHeaders,
          body: formData,
        });

        const uploadJson = await uploadRes.json();
        if (!uploadJson.success || !uploadJson.url) {
          throw new Error(uploadJson.error || "Failed to upload image file");
        }
        finalImageUrl = uploadJson.url;
      }

      // 2. Persist updated card details & photo in PostgreSQL
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }
      if (currentUserRole) {
        headers["x-user-role"] = currentUserRole;
      }

      const payload = {
        profileImage: finalImageUrl,
        name: name.trim() || "Jeenu Soni",
        heroSubtitle: heroSubtitle.trim(),
        bio: bio.trim(),
        location: location.trim(),
      };

      const res = await fetch("/api/vlog/jeenusoni/profile", {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to save profile details");
      }

      toast.success("Profile card updated successfully in DB!");
      if (onProfileUpdated) onProfileUpdated(payload);
      if (onImageUpdated) onImageUpdated(finalImageUrl);
      onClose();
    } catch (err: any) {
      console.error("Profile update error:", err);
      setError(err.message || "Failed to update profile details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#12070E] border border-rose-500/30 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-[0_0_60px_rgba(225,48,108,0.35)] text-white">
        {/* Header */}
        <div className="sticky top-0 bg-[#12070E]/95 backdrop-blur-md z-10 flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-lg">
              <Camera size={18} />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">Change Profile & Details</h3>
              <p className="text-[11px] text-zinc-400">Strictly Restricted: ADMIN & SONI Roles</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-950/70 border border-rose-500/40 text-xs text-rose-300">
              {error}
            </div>
          )}

          {/* Photo Section */}
          <div className="flex flex-col items-center gap-4 pb-2">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-32 h-32 rounded-full p-[3px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-black relative flex items-center justify-center">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-2 text-zinc-400 text-xs flex flex-col items-center">
                      <Camera size={26} className="text-[#E8C39E] mb-1" />
                      <span>No Photo</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold gap-1">
                    <Upload size={18} />
                    <span>Change Photo</span>
                  </div>
                </div>
              </div>

              {/* Floating Camera Badge */}
              <div className="absolute bottom-1 right-1 p-2 rounded-full bg-gradient-to-r from-[#E1306C] to-[#FD1D1D] text-white shadow-lg border-2 border-[#12070E]">
                <Camera size={14} />
              </div>
            </div>

            {/* Hidden Native File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#E1306C] to-[#FD1D1D] hover:brightness-110 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Upload size={13} />
                <span>Upload Device Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setUseUrlMode(!useUrlMode)}
                className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
              >
                <ImageIcon size={13} />
              </button>

              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="py-2 px-3 rounded-xl text-zinc-400 hover:text-rose-400 text-xs font-semibold transition-colors cursor-pointer"
                  title="Remove Photo"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>

            {useUrlMode && (
              <div className="w-full flex gap-2 pt-1 animate-in fade-in duration-150">
                <input
                  type="text"
                  placeholder="https://example.com/photo.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-rose-400"
                />
                <button
                  type="button"
                  onClick={handleUrlApply}
                  className="px-3.5 py-2.5 rounded-xl bg-rose-950 text-rose-200 border border-rose-500/30 text-xs font-bold hover:bg-rose-900 cursor-pointer"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-4 space-y-3.5 text-xs">
            {/* Name */}
            <div>
              <label className="text-zinc-300 font-bold block mb-1 flex items-center gap-1.5">
                <User size={13} className="text-[#E8C39E]" /> Profile Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jeenu Soni"
                required
                className="w-full p-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-rose-400 text-xs"
              />
            </div>

            {/* Hero Subtitle */}
            <div>
              <label className="text-zinc-300 font-bold block mb-1 flex items-center gap-1.5">
                <Tag size={13} className="text-[#E8C39E]" /> Tagline / Subtitle
              </label>
              <input
                type="text"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                placeholder="Design Vlogs • Creative Profession • Style"
                className="w-full p-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-rose-400 text-xs"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-zinc-300 font-bold block mb-1 flex items-center gap-1.5">
                <MapPin size={13} className="text-[#E8C39E]" /> Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Gajsinghpur, Rajasthan • Digital Creator"
                className="w-full p-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-rose-400 text-xs"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="text-zinc-300 font-bold block mb-1 flex items-center gap-1.5">
                <FileText size={13} className="text-[#E8C39E]" /> Short Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Professional Digital Creator & Design Vlogger..."
                className="w-full p-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-rose-400 text-xs"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-900 via-[#8B0032] to-rose-950 hover:from-rose-800 hover:to-rose-900 text-[#FCE7D4] border border-rose-500/40 text-xs font-serif font-bold shadow-lg flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin text-[#E8C39E]" />
                  <span>Saving to DB...</span>
                </>
              ) : (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
