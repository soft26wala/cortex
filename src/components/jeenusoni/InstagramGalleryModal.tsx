"use client";

import React, { useState, useEffect, useRef } from "react";
import { Camera, Upload, X, Check, Image as ImageIcon, Trash2, Loader2, Sparkles, Plus, RefreshCw } from "lucide-react";
import { JeenuGalleryData } from "@/lib/db";

interface InstagramGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit?: JeenuGalleryData | null;
  onSuccess: (savedItem: JeenuGalleryData, isDelete?: boolean) => void;
  authToken?: string | null;
}

export default function InstagramGalleryModal({
  isOpen,
  onClose,
  itemToEdit,
  onSuccess,
  authToken,
}: InstagramGalleryModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [published, setPublished] = useState<boolean>(true);
  const [useUrlMode, setUseUrlMode] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (itemToEdit) {
      setPreviewUrl(itemToEdit.imageUrl || "");
      setTitle(itemToEdit.title || "");
      setCaption(itemToEdit.caption || "");
      setSortOrder(itemToEdit.sortOrder || 1);
      setPublished(itemToEdit.published ?? true);
      setUrlInput(itemToEdit.imageUrl || "");
    } else {
      setPreviewUrl("");
      setTitle("");
      setCaption("");
      setSortOrder(1);
      setPublished(true);
      setUrlInput("");
    }
    setSelectedFile(null);
    setError(null);
    setUseUrlMode(false);
  }, [itemToEdit, isOpen]);

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
      const objUrl = URL.createObjectURL(file);
      setPreviewUrl(objUrl);
    }
  };

  const handleUrlApply = () => {
    if (!urlInput.trim()) return;
    setError(null);
    setSelectedFile(null);
    setPreviewUrl(urlInput.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) {
      setError("Please select a photo from your computer or provide an image link.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let finalImageUrl = previewUrl;

      // 1. Upload local file if picked
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

      // 2. Prepare payload
      const payload = {
        imageUrl: finalImageUrl,
        title: title.trim() || "Jeenu Soni Lookbook",
        caption: caption.trim(),
        sortOrder: Number(sortOrder || 1),
        published,
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const url = itemToEdit
        ? `/api/vlog/jeenusoni/gallery/${itemToEdit.id}`
        : "/api/vlog/jeenusoni/gallery";
      const method = itemToEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success || !json.data) {
        throw new Error(json.error || "Failed to save gallery photo");
      }

      onSuccess(json.data);
      onClose();
    } catch (err: any) {
      console.error("Gallery save error:", err);
      setError(err.message || "Failed to save photo");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!itemToEdit) return;
    if (!confirm("Are you sure you want to remove this photo from the gallery?")) return;

    setLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

      const res = await fetch(`/api/vlog/jeenusoni/gallery/${itemToEdit.id}`, {
        method: "DELETE",
        headers,
      });

      const json = await res.json();
      if (json.success) {
        onSuccess(itemToEdit, true);
        onClose();
      } else {
        setError(json.error || "Failed to delete photo");
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#12070E] border border-rose-500/30 rounded-3xl max-w-lg w-full max-h-[92vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(225,48,108,0.25)] text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white">
              {itemToEdit ? <RefreshCw size={15} /> : <Plus size={16} />}
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                {itemToEdit ? "Change & Edit Gallery Photo" : "Add New Instagram Photo"}
              </h3>
              <p className="text-[11px] text-zinc-400">
                {itemToEdit ? "Replace image or update caption" : "Share a new picture to the lookbook"}
              </p>
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300">
              {error}
            </div>
          )}

          {/* Photo Preview & Change Box (Instagram Post Style) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-zinc-300 text-xs">Photo Preview</label>
              {previewUrl && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] font-semibold text-rose-300 hover:text-rose-200 flex items-center gap-1 cursor-pointer"
                >
                  <Camera size={13} /> Change Photo
                </button>
              )}
            </div>

            {previewUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/60 border border-rose-500/30 group cursor-pointer shadow-inner"
              >
                <img
                  src={previewUrl}
                  alt="Post Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold gap-1.5">
                  <Camera size={20} className="text-[#E8C39E]" />
                  <span>Click to choose different photo</span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square w-full rounded-2xl border-2 border-dashed border-rose-500/30 hover:border-rose-400/60 bg-black/30 flex flex-col items-center justify-center text-zinc-400 text-xs gap-3 p-6 cursor-pointer transition-all hover:bg-rose-950/10"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-lg">
                  <Upload size={24} />
                </div>
                <div className="text-center space-y-1">
                  <div className="font-bold text-white text-sm">Select photo from device</div>
                  <div className="text-[11px] text-zinc-500">Supports JPEG, PNG, WebP</div>
                </div>
              </div>
            )}
          </div>

          {/* Hidden File Input & Upload Action */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F56040] hover:brightness-110 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Upload size={14} />
              <span>{previewUrl ? "📁 Choose Different File" : "📁 Choose File from Device"}</span>
            </button>

            <button
              type="button"
              onClick={() => setUseUrlMode(!useUrlMode)}
              className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold flex items-center gap-1 border border-white/10"
              title="Paste image link"
            >
              <ImageIcon size={14} /> Link
            </button>
          </div>

          {useUrlMode && (
            <div className="flex gap-2 animate-in fade-in duration-150">
              <input
                type="text"
                placeholder="Paste image URL https://..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 p-2.5 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-rose-400 font-mono text-[11px]"
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

          {/* Details (Instagram style caption & title) */}
          <div className="space-y-3 text-xs pt-1">
            <div>
              <label className="font-bold text-zinc-300 block mb-1">Title / Look Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Haute Couture Glamour"
                className="w-full p-2.5 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-rose-400"
              />
            </div>

            <div>
              <label className="font-bold text-zinc-300 block mb-1">Write a Caption</label>
              <textarea
                rows={2}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Share the story behind this design moment..."
                className="w-full p-2.5 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-rose-400 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Sort Order</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-black border border-white/10 text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="galPublishedCheck"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="accent-rose-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="galPublishedCheck" className="text-zinc-300 font-semibold cursor-pointer">
                  Publicly Visible
                </label>
              </div>
            </div>
          </div>

          {/* Footer Submit Bar */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            {itemToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="p-2.5 rounded-xl text-rose-400 hover:bg-rose-950/40 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Delete this look"
              >
                <Trash2 size={14} /> Delete
              </button>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-900 to-rose-950 hover:from-rose-800 hover:to-rose-900 text-[#FCE7D4] border border-rose-500/40 text-xs font-serif font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-[#E8C39E]" />
                    <span>Saving Photo...</span>
                  </>
                ) : (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>{itemToEdit ? "Update Lookbook Photo" : "Share to Gallery"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
