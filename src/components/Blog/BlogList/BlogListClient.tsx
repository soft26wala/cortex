"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "@/components/SharedComponent/Blog/blogCard";
import { Blog } from "@/types/blog";
import { BookOpen } from "lucide-react";
import Link from "next/link";

const FILTER_CATEGORIES = [
  "All",
  "IT & Software",
  "Share Market & Trading",
  "Marketing & Digital Growth",
  "AI & Automation",
  "Web & App Development",
  "Finance & Investment",
  "Business & Startups",
];

export default function BlogListClient({
  initialPosts,
}: {
  initialPosts: Blog[];
}) {
  const [posts, setPosts] = useState<Blog[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    let merged = [...initialPosts];
    const map = new Map<string, Blog>();
    merged.forEach((p) => {
      if (p.slug) map.set(p.slug, p);
    });

    // 1. Merge from localStorage cache (instant after publishing)
    try {
      const cached = JSON.parse(
        localStorage.getItem("cortex_custom_blogs_cache") || "[]"
      );
      if (Array.isArray(cached)) {
        cached.forEach((p: Blog) => {
          if (p?.slug && !map.has(p.slug)) {
            map.set(p.slug, p);
          }
        });
      }
    } catch {
      // ignore
    }

    // 2. Fetch fresh list from /api/blogs
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.posts)) {
          data.posts.forEach((p: Blog) => {
            if (p?.slug) map.set(p.slug, p);
          });
          const sorted = Array.from(map.values()).sort((a, b) => {
            const d1 = new Date(a.date || 0).getTime();
            const d2 = new Date(b.date || 0).getTime();
            return d2 - d1;
          });
          setPosts(sorted);
        }
      })
      .catch(() => {
        setPosts(Array.from(map.values()));
      });

    setPosts(Array.from(map.values()));
  }, [initialPosts]);

  // Dynamic categories list combining standard + any custom ones in posts
  const dynamicCategories = Array.from(
    new Set([
      ...FILTER_CATEGORIES,
      ...posts.map((p) => p.category).filter((c): c is string => Boolean(c)),
    ])
  );

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter(
          (p) =>
            (p.category || "").toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {dynamicCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              selectedCategory === cat
                ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/20"
                : "bg-white dark:bg-[#0E0E12] text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((blog, i) => (
            <div key={blog.slug || i} className="w-full">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-zinc-300 dark:border-white/10">
          <BookOpen className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
            Is category mein abhi koi blog nahi hai
          </h3>
          <p className="text-sm text-zinc-400 mt-1 mb-6">
            "{selectedCategory}" par apna pehla blog post karein!
          </p>
          <Link
            href="/blog/create"
            className="px-6 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold"
          >
            Create Blog Post
          </Link>
        </div>
      )}
    </>
  );
}

