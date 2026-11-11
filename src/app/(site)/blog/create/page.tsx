"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Eye,
  Edit3,
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  Calendar,
  User,
  BookOpen,
  FileCheck,
  RefreshCw,
  RotateCcw,
  Tag,
} from "lucide-react";
import toast from "react-hot-toast";

interface SubtitleSection {
  title: string;
  content: string;
}

const BLOG_CATEGORIES = [
  "IT & Software",
  "Share Market & Trading",
  "Marketing & Digital Growth",
  "AI & Automation",
  "Web & App Development",
  "Finance & Investment",
  "Business & Startups",
  "SEO & Social Media",
  "Cybersecurity & Cloud",
  "Design & UI/UX",
  "Education & Career",
  "News & Trends",
];

export default function CreateBlogPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [loading, setLoading] = useState(false);

  // Form State - 100% empty on initial load (Zero demo data / Zero auto-selected images)
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [author, setAuthor] = useState("");

  // Step 2: 2-3 Image Files State (Starts completely empty - User picks own images)
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");

  const [image2File, setImage2File] = useState<File | null>(null);
  const [image2Preview, setImage2Preview] = useState<string>("");

  const [image3File, setImage3File] = useState<File | null>(null);
  const [image3Preview, setImage3Preview] = useState<string>("");

  // Refs for file inputs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const image2InputRef = useRef<HTMLInputElement>(null);
  const image3InputRef = useRef<HTMLInputElement>(null);

  // Step 3: Subtitles State - Starts completely empty (3 clean slots ready to type)
  const [subtitles, setSubtitles] = useState<SubtitleSection[]>([
    { title: "", content: "" },
    { title: "", content: "" },
    { title: "", content: "" },
  ]);

  const handleCategorySelect = (val: string) => {
    if (val === "__CUSTOM__") {
      setIsCustomCategory(true);
      setCategory("");
    } else {
      setIsCustomCategory(false);
      setCategory(val);
    }
  };

  // File selection handlers
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "image2" | "image3"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    if (type === "cover") {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
      setCoverFile(file);
      setCoverPreview(previewUrl);
      toast.success(`Image 1 selected: ${file.name}`);
    } else if (type === "image2") {
      if (image2Preview) URL.revokeObjectURL(image2Preview);
      setImage2File(file);
      setImage2Preview(previewUrl);
      toast.success(`Image 2 selected: ${file.name}`);
    } else if (type === "image3") {
      if (image3Preview) URL.revokeObjectURL(image3Preview);
      setImage3File(file);
      setImage3Preview(previewUrl);
      toast.success(`Image 3 selected: ${file.name}`);
    }
  };

  const removeFile = (type: "cover" | "image2" | "image3") => {
    if (type === "cover") {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
      setCoverFile(null);
      setCoverPreview("");
      if (coverInputRef.current) coverInputRef.current.value = "";
    } else if (type === "image2") {
      if (image2Preview) URL.revokeObjectURL(image2Preview);
      setImage2File(null);
      setImage2Preview("");
      if (image2InputRef.current) image2InputRef.current.value = "";
    } else if (type === "image3") {
      if (image3Preview) URL.revokeObjectURL(image3Preview);
      setImage3File(null);
      setImage3Preview("");
      if (image3InputRef.current) image3InputRef.current.value = "";
    }
  };

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
    setSubtitles((prev) => [...prev, { title: "", content: "" }]);
  };

  const removeSubtitle = (index: number) => {
    if (subtitles.length <= 1) {
      toast.error("Kam se kam 1 subtitle section hona zaroori hai.");
      return;
    }
    setSubtitles((prev) => prev.filter((_, i) => i !== index));
  };

  // Reset form to completely empty state
  const handleResetForm = () => {
    setTitle("");
    setExcerpt("");
    setCategory("");
    setIsCustomCategory(false);
    setAuthor("");
    removeFile("cover");
    removeFile("image2");
    removeFile("image3");
    setSubtitles([
      { title: "", content: "" },
      { title: "", content: "" },
      { title: "", content: "" },
    ]);
    toast.success("Form completely clear kar diya gaya hai!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a blog title.");
      return;
    }

    if (!category.trim()) {
      toast.error("Please select a blog category (e.g. IT, Share Market, Marketing).");
      return;
    }

    if (!coverFile) {
      toast.error("Please upload Image 1 (Main Cover Image file).");
      return;
    }

    const filledSubtitles = subtitles.filter(
      (s) => s.title.trim() && s.content.trim()
    );

    if (filledSubtitles.length < 1) {
      toast.error("Please fill at least 1-2 subtitle sections with title and content.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("excerpt", excerpt.trim() || title.trim());
      formData.append("category", category.trim());
      formData.append("author", author.trim() || "Author");
      formData.append("subtitles", JSON.stringify(filledSubtitles));

      formData.append("coverImageFile", coverFile);
      if (image2File) formData.append("image2File", image2File);
      if (image3File) formData.append("image3File", image3File);

      const res = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Aapka naya blog successfully publish ho gaya!");
        // Cache in localStorage for instant rendering across serverless instances
        try {
          const existing = JSON.parse(
            localStorage.getItem("cortex_custom_blogs_cache") || "[]"
          );
          const filtered = existing.filter((b: any) => b.slug !== data.slug);
          if (data.blog) {
            filtered.unshift(data.blog);
            localStorage.setItem(
              "cortex_custom_blogs_cache",
              JSON.stringify(filtered.slice(0, 30))
            );
          }
        } catch {
          // ignore storage quota errors
        }

        setTimeout(() => {
          router.push(`/blog/${data.slug}`);
        }, 600);
      } else {
        toast.error(data.error || "Blog publish karne mein issue aaya.");
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
              Apna blog title, category, images aur subtitles likhein aur publish karein.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetForm}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 transition flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400"
              title="Form ko khali karein"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear Form
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
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-8">
            {/* Step 1: Blog Overview */}
            <div className="bg-white dark:bg-[#0E0E12] border border-zinc-200 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-4">
                <BookOpen className="w-4 h-4" />
                <span>Step 1: Blog Overview & Category</span>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Blog Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="blog_title_field"
                    autoComplete="off"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Apna blog title yahan likhein..."
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/10 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                {/* Category Selection (IT, Share Market, Marketing, etc.) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>

                  {/* Quick Category Pills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {BLOG_CATEGORIES.map((cat) => {
                      const active = !isCustomCategory && category === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleCategorySelect(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                            active
                              ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20"
                              : "bg-zinc-50 dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:border-orange-500 hover:text-orange-600"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => handleCategorySelect("__CUSTOM__")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                        isCustomCategory
                          ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20"
                          : "bg-zinc-50 dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:border-orange-500 hover:text-orange-600"
                      }`}
                    >
                      + Custom Category
                    </button>
                  </div>

                  {/* Dropdown Fallback + Custom Input */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <select
                        value={isCustomCategory ? "__CUSTOM__" : category}
                        onChange={(e) => handleCategorySelect(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#14141a] border border-zinc-300 dark:border-white/10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required={!isCustomCategory}
                      >
                        <option value="" disabled>
                          -- Select Category (IT, Share Market, Marketing...) --
                        </option>
                        {BLOG_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                        <option value="__CUSTOM__">Other (Type Custom Category)</option>
                      </select>
                    </div>

                    {isCustomCategory ? (
                      <input
                        type="text"
                        autoComplete="off"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Apni custom category likhein..."
                        className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-orange-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    ) : (
                      <input
                        type="text"
                        name="blog_author_field"
                        autoComplete="off"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Author Name (e.g. Aapka Naam)"
                        className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    )}
                  </div>

                  {isCustomCategory && (
                    <div className="mt-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                        Author Name
                      </label>
                      <input
                        type="text"
                        name="blog_author_field"
                        autoComplete="off"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Author Name (e.g. Aapka Naam)"
                        className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Short Excerpt / Summary
                  </label>
                  <textarea
                    rows={3}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Blog ka chhota summary ya introduction yahan likhein..."
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Blog Images (File Uploads 2-3 Images - ZERO pre-selected images) */}
            <div className="bg-white dark:bg-[#0E0E12] border border-zinc-200 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                    <UploadCloud className="w-4 h-4" />
                    <span>Step 2: Upload Blog Images (2 to 3 Image Files)</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Koi image auto-select nahi hai — apne blog ke hisaab se apni device se image files select karein.
                  </p>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-500/10 px-3 py-1 rounded-full w-fit">
                  Device File Upload
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Image 1: Main Cover File */}
                <div className="flex flex-col justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                        Image 1: Main Cover <span className="text-red-500">*</span>
                      </span>
                      {coverPreview && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Selected
                        </span>
                      )}
                    </div>

                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="coverImageUpload"
                      onChange={(e) => handleFileChange(e, "cover")}
                    />

                    {coverPreview ? (
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-300 dark:border-white/10 group mb-3">
                        <img
                          src={coverPreview}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label
                            htmlFor="coverImageUpload"
                            className="p-2 rounded-lg bg-white/20 backdrop-blur hover:bg-white/40 text-white cursor-pointer transition"
                            title="Change Image"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </label>
                          <button
                            type="button"
                            onClick={() => removeFile("cover")}
                            className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition"
                            title="Remove Image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="coverImageUpload"
                        className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-zinc-300 dark:border-white/15 hover:border-orange-500 dark:hover:border-orange-500 bg-white dark:bg-zinc-900/50 cursor-pointer transition-all group mb-3 p-4 text-center"
                      >
                        <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-orange-500 transition-colors mb-2" />
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-orange-600">
                          Choose Cover File
                        </span>
                        <span className="text-[10px] text-zinc-400 mt-0.5">
                          No image selected yet
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="text-[11px] text-zinc-500 truncate flex items-center justify-between">
                    <span>
                      {coverFile
                        ? `${coverFile.name} (${(coverFile.size / 1024 / 1024).toFixed(1)} MB)`
                        : "Required for header"}
                    </span>
                    {coverPreview && (
                      <button
                        type="button"
                        onClick={() => removeFile("cover")}
                        className="text-red-500 hover:underline text-[10px] ml-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Image 2: Section Visual File */}
                <div className="flex flex-col justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                        Image 2: Section Visual
                      </span>
                      {image2Preview && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Selected
                        </span>
                      )}
                    </div>

                    <input
                      ref={image2InputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image2Upload"
                      onChange={(e) => handleFileChange(e, "image2")}
                    />

                    {image2Preview ? (
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-300 dark:border-white/10 group mb-3">
                        <img
                          src={image2Preview}
                          alt="Section preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label
                            htmlFor="image2Upload"
                            className="p-2 rounded-lg bg-white/20 backdrop-blur hover:bg-white/40 text-white cursor-pointer transition"
                            title="Change Image"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </label>
                          <button
                            type="button"
                            onClick={() => removeFile("image2")}
                            className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition"
                            title="Remove Image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="image2Upload"
                        className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-zinc-300 dark:border-white/15 hover:border-orange-500 dark:hover:border-orange-500 bg-white dark:bg-zinc-900/50 cursor-pointer transition-all group mb-3 p-4 text-center"
                      >
                        <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-orange-500 transition-colors mb-2" />
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-orange-600">
                          Choose Image 2 File
                        </span>
                        <span className="text-[10px] text-zinc-400 mt-0.5">
                          Shows after Subtitle 1
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="text-[11px] text-zinc-500 truncate flex items-center justify-between">
                    <span>
                      {image2File
                        ? `${image2File.name} (${(image2File.size / 1024 / 1024).toFixed(1)} MB)`
                        : "No image selected"}
                    </span>
                    {image2Preview && (
                      <button
                        type="button"
                        onClick={() => removeFile("image2")}
                        className="text-red-500 hover:underline text-[10px] ml-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Image 3: Supporting Visual File */}
                <div className="flex flex-col justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                        Image 3: Supporting <span className="text-zinc-400">(Optional)</span>
                      </span>
                      {image3Preview && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Selected
                        </span>
                      )}
                    </div>

                    <input
                      ref={image3InputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image3Upload"
                      onChange={(e) => handleFileChange(e, "image3")}
                    />

                    {image3Preview ? (
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-300 dark:border-white/10 group mb-3">
                        <img
                          src={image3Preview}
                          alt="Supporting preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label
                            htmlFor="image3Upload"
                            className="p-2 rounded-lg bg-white/20 backdrop-blur hover:bg-white/40 text-white cursor-pointer transition"
                            title="Change Image"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </label>
                          <button
                            type="button"
                            onClick={() => removeFile("image3")}
                            className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition"
                            title="Remove Image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="image3Upload"
                        className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-zinc-300 dark:border-white/15 hover:border-orange-500 dark:hover:border-orange-500 bg-white dark:bg-zinc-900/50 cursor-pointer transition-all group mb-3 p-4 text-center"
                      >
                        <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-orange-500 transition-colors mb-2" />
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-orange-600">
                          Choose Image 3 File
                        </span>
                        <span className="text-[10px] text-zinc-400 mt-0.5">
                          Shows after Subtitle 2
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="text-[11px] text-zinc-500 truncate flex items-center justify-between">
                    <span>
                      {image3File
                        ? `${image3File.name} (${(image3File.size / 1024 / 1024).toFixed(1)} MB)`
                        : "Optional visual"}
                    </span>
                    {image3Preview && (
                      <button
                        type="button"
                        onClick={() => removeFile("image3")}
                        className="text-red-500 hover:underline text-[10px] ml-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Subtitles & Sections (Clean Empty Slots Ready to Type) */}
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
                  Add Subtitle Section
                </button>
              </div>

              <p className="text-xs text-zinc-400 mb-6">
                Har section ka apna subtitle heading aur content likhein (3-4 sections recommended).
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
                          title="Is section ko delete karein"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        autoComplete="off"
                        value={sub.title}
                        onChange={(e) =>
                          handleSubtitleChange(idx, "title", e.target.value)
                        }
                        placeholder={`Subtitle ${idx + 1} ka title likhein...`}
                        className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />

                      <textarea
                        rows={4}
                        value={sub.content}
                        onChange={(e) =>
                          handleSubtitleChange(idx, "content", e.target.value)
                        }
                        placeholder={`Subtitle ${idx + 1} ki detail aur paragraph content yahan likhein...`}
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
                    Publishing...
                  </>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4" />
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
                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 font-bold uppercase flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {category || "Category Not Selected"}
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
                {title || "Aapka Blog Title yahan dikhega"}
              </h1>

              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                {excerpt || "Aapka blog excerpt/summary yahan dikhega..."}
              </p>
            </div>

            {coverPreview && (
              <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-2xl">
                <img
                  src={coverPreview}
                  alt={title || "Cover"}
                  className="w-full object-cover max-h-[500px]"
                />
              </div>
            )}

            <div className="space-y-10 pt-4 max-w-3xl mx-auto">
              {subtitles.map((sub, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    {sub.title || `Subtitle Section #${index + 1}`}
                  </h2>

                  <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    {sub.content || "Is section ka content yahan dikhega..."}
                  </p>

                  {index === 0 && image2Preview && (
                    <div className="my-8 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-lg">
                      <img
                        src={image2Preview}
                        alt="Section Visual"
                        className="w-full max-h-[420px] object-cover"
                      />
                    </div>
                  )}

                  {index === 1 && image3Preview && (
                    <div className="my-8 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-lg">
                      <img
                        src={image3Preview}
                        alt="Supporting Visual"
                        className="w-full max-h-[420px] object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

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
