"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Plus,
  Trash2,
  Eye,
  Edit3,
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle2,
  Calendar,
  User,
  Tag,
  BookOpen,
} from "lucide-react";
import toast from "react-hot-toast";

interface SubtitleSection {
  title: string;
  content: string;
}

const SAMPLE_PRESETS = [
  {
    name: "AI & Neural Networks",
    url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Cloud & DevSecOps",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Modern Web Solutions",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Modern Workstation",
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function CreateBlogPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Web Architecture");
  const [author, setAuthor] = useState("Cortex Web Solutions");

  // 2-3 Images State
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
  );
  const [image2, setImage2] = useState(
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  );
  const [image3, setImage3] = useState(
    "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop"
  );

  // 3-4 Subtitles State
  const [subtitles, setSubtitles] = useState<SubtitleSection[]>([
    {
      title: "1. Modern Architecture Paradigm",
      content:
        "Building scalable enterprise applications requires decoupling the UI layer from underlying microservices. By combining Next.js 15, edge runtimes, and real-time streaming, teams can achieve sub-100ms response times worldwide.",
    },
    {
      title: "2. Database Resilience and Distributed Caching",
      content:
        "Data persistence is the foundation of high-availability solutions. Utilizing PostgreSQL with connection pooling and intelligent read replicas ensures transaction safety without throughput bottlenecks.",
    },
    {
      title: "3. Integrating AI Workflows & Automation Agents",
      content:
        "Autonomous agents empower businesses to process customer requests, handle webhooks, and trigger background tasks autonomously. Implementing deterministic guardrails guarantees reliability.",
    },
    {
      title: "4. Deployment, Security & Production Readiness",
      content:
        "Rigorous QA testing, automated static analysis, and zero-trust authentication form the final pillar before production release. Always verify cryptographic signatures on third-party webhooks.",
    },
  ]);

  const handleSubtitleChange = (
    index: number,
    field: "title" | "content",
    value: string
  ) => {
    setSubtitles((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addSubtitle = () => {
    setSubtitles((prev) => [
      ...prev,
      {
        title: `${prev.length + 1}. New Subtitle Section`,
        content: "Write detailed content for this section...",
      },
    ]);
  };

  const removeSubtitle = (index: number) => {
    if (subtitles.length <= 1) {
      toast.error("At least one subtitle section is required.");
      return;
    }
    setSubtitles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFillSample = () => {
    setTitle("Architecting Next-Generation Web Platforms for 2026 and Beyond");
    setExcerpt(
      "A comprehensive guide exploring modern web development, intelligent agentic workflows, distributed databases, and high-performance user experiences."
    );
    setCategory("Engineering & AI");
    setAuthor("Cortex Architecture Team");
    setCoverImage(
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
    );
    setImage2(
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
    );
    setImage3(
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop"
    );
    toast.success("Sample blog data populated!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a blog title.");
      return;
    }

    if (!coverImage.trim()) {
      toast.error("Please provide at least the main cover image (Image 1).");
      return;
    }

    const filledSubtitles = subtitles.filter(
      (s) => s.title.trim() && s.content.trim()
    );

    if (filledSubtitles.length < 2) {
      toast.error("Please provide at least 2 to 3 subtitle sections with content.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: title.trim(),
        excerpt: excerpt.trim() || title.trim(),
        category,
        author: author.trim() || "Cortex Engineering",
        coverImage: coverImage.trim(),
        image2: image2.trim() || undefined,
        image3: image3.trim() || undefined,
        subtitles: filledSubtitles,
      };

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Blog published successfully!");
        // Store in localStorage for immediate client sync
        try {
          const current = JSON.parse(
            localStorage.getItem("cortex_custom_blogs_cache") || "[]"
          );
          current.unshift({
            ...payload,
            slug: data.slug,
            date: new Date().toISOString(),
          });
          localStorage.setItem(
            "cortex_custom_blogs_cache",
            JSON.stringify(current)
          );
        } catch (e) {
          // ignore
        }

        setTimeout(() => {
          router.push(`/blog/${data.slug}`);
        }, 600);
      } else {
        toast.error(data.error || "Failed to publish blog.");
      }
    } catch (err: any) {
      toast.error("Network error while publishing blog.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070709] text-zinc-900 dark:text-zinc-100 pt-28 pb-24 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-600 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog Listing
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Create New <span className="text-orange-600">Blog Post</span>
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Add title, 2-3 images, and 3-4 subtitles to share your knowledge.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleFillSample}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Fill Sample
            </button>

            {/* Tab Switcher */}
            <div className="bg-zinc-200 dark:bg-white/5 p-1 rounded-xl flex items-center">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "edit"
                    ? "bg-white dark:bg-zinc-800 text-orange-600 shadow"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "preview"
                    ? "bg-white dark:bg-zinc-800 text-orange-600 shadow"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Live Preview
              </button>
            </div>
          </div>
        </div>

        {/* ===================== TAB 1: FORM EDITOR ===================== */}
        {activeTab === "edit" ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Main Details Card */}
            <div className="bg-white dark:bg-[#0E0E12] border border-zinc-200 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-4">
                <BookOpen className="w-4 h-4" />
                <span>Step 1: Blog Overview</span>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Blog Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Master Modern Web Architecture with Microservices"
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/10 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Web Development, AI, Cloud"
                      className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Cortex Team"
                      className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Short Excerpt / Summary
                  </label>
                  <textarea
                    rows={3}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Provide a compelling 1-2 sentence introduction..."
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Visual Media Section (2-3 Images) */}
            <div className="bg-white dark:bg-[#0E0E12] border border-zinc-200 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                  <ImageIcon className="w-4 h-4" />
                  <span>Step 2: Blog Images (2 to 3 Images)</span>
                </div>
                <span className="text-xs text-zinc-400">
                  Provide URLs or click presets below
                </span>
              </div>

              {/* Sample Presets Quick Select */}
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="text-xs font-medium text-zinc-400 self-center mr-1">
                  Quick Presets:
                </span>
                {SAMPLE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (!coverImage) setCoverImage(preset.url);
                      else if (!image2) setImage2(preset.url);
                      else setImage3(preset.url);
                      toast.success(`Loaded: ${preset.name}`);
                    }}
                    className="px-2.5 py-1 text-xs rounded-lg bg-zinc-100 dark:bg-white/5 hover:bg-orange-500/10 hover:text-orange-500 transition border border-zinc-200 dark:border-white/5"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Image 1: Main Cover */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Image 1: Main Cover <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10">
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as any).src =
                            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-zinc-400">
                        Cover Preview
                      </div>
                    )}
                  </div>
                </div>

                {/* Image 2: Section Image */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Image 2: Section Visual <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10">
                    {image2 ? (
                      <img
                        src={image2}
                        alt="Section preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as any).src =
                            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop";
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-zinc-400">
                        Section Preview
                      </div>
                    )}
                  </div>
                </div>

                {/* Image 3: Gallery / Supporting */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Image 3: Closing Visual (Optional)
                  </label>
                  <input
                    type="url"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10">
                    {image3 ? (
                      <img
                        src={image3}
                        alt="Gallery preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as any).src =
                            "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop";
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-zinc-400">
                        Image 3 Preview
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Subtitles & Content (3-4 Subtitles) */}
            <div className="bg-white dark:bg-[#0E0E12] border border-zinc-200 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Step 3: Subtitles & Sections ({subtitles.length} Sections)</span>
                </div>

                <button
                  type="button"
                  onClick={addSubtitle}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-orange-600/10 text-orange-600 hover:bg-orange-600 hover:text-white transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Another Subtitle
                </button>
              </div>

              <p className="text-xs text-zinc-400 mb-6">
                Divide your blog into 3 to 4 clear subtitles with comprehensive explanations.
              </p>

              <div className="space-y-6">
                {subtitles.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 relative group"
                  >
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
                        Subtitle #{idx + 1}
                      </span>
                      {subtitles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSubtitle(idx)}
                          className="text-zinc-400 hover:text-red-500 p-1 transition"
                          title="Delete this section"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        value={sub.title}
                        onChange={(e) =>
                          handleSubtitleChange(idx, "title", e.target.value)
                        }
                        placeholder={`Enter Subtitle ${idx + 1} Heading...`}
                        className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />

                      <textarea
                        rows={4}
                        value={sub.content}
                        onChange={(e) =>
                          handleSubtitleChange(idx, "content", e.target.value)
                        }
                        placeholder={`Write in-depth content for subtitle ${idx + 1}...`}
                        className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 leading-relaxed"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Link
                href="/blog"
                className="px-6 py-3 rounded-2xl border border-zinc-300 dark:border-white/10 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-white/5 transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-xl shadow-orange-600/20 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Publishing Blog...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Publish Blog Post
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* ===================== TAB 2: LIVE PREVIEW ===================== */
          <div className="bg-white dark:bg-[#0E0E12] border border-zinc-200 dark:border-white/5 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
            <div className="border-b border-zinc-200 dark:border-white/5 pb-6">
              <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 font-bold uppercase">
                  {category || "Category"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Today
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {author || "Author"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                {title || "Your Blog Title Appears Here"}
              </h1>

              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                {excerpt || "Your blog excerpt/introduction will appear here..."}
              </p>
            </div>

            {/* Main Cover Image Preview */}
            {coverImage && (
              <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-2xl">
                <img
                  src={coverImage}
                  alt={title || "Cover"}
                  className="w-full object-cover max-h-[500px]"
                />
              </div>
            )}

            {/* Subtitles & Embedded Visuals */}
            <div className="space-y-10 pt-4 max-w-3xl mx-auto">
              {subtitles.map((sub, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    {sub.title || `Subtitle Section #${index + 1}`}
                  </h2>

                  <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    {sub.content || "Content paragraph..."}
                  </p>

                  {/* Section Image after Subtitle 1 */}
                  {index === 0 && image2 && (
                    <div className="my-8 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-lg">
                      <img
                        src={image2}
                        alt="Section Visual"
                        className="w-full max-h-[420px] object-cover"
                      />
                      <p className="text-xs text-center text-zinc-400 py-2 bg-zinc-50 dark:bg-zinc-900">
                        Section Visual & Analysis
                      </p>
                    </div>
                  )}

                  {/* Closing Image after Subtitle 2 */}
                  {index === 1 && image3 && (
                    <div className="my-8 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-lg">
                      <img
                        src={image3}
                        alt="Supporting Visual"
                        className="w-full max-h-[420px] object-cover"
                      />
                      <p className="text-xs text-center text-zinc-400 py-2 bg-zinc-50 dark:bg-zinc-900">
                        Key Architecture Highlights
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Preview Action Bar */}
            <div className="border-t border-zinc-200 dark:border-white/5 pt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className="text-sm font-semibold text-orange-600 hover:underline flex items-center gap-1.5"
              >
                <Edit3 className="w-4 h-4" />
                Back to Edit
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-xl shadow-orange-600/20 active:scale-95 transition-all"
              >
                Confirm & Publish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

