"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, PenTool, Bookmark } from "lucide-react";

export default function BlogDetailClientFallback({ slug }: { slug: string }) {
  const [post, setPost] = useState<any>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let found: any = null;
    try {
      const cached = JSON.parse(
        localStorage.getItem("cortex_custom_blogs_cache") || "[]"
      );
      if (Array.isArray(cached)) {
        found = cached.find((b: any) => b.slug === slug);
      }
    } catch {
      // ignore
    }

    if (found) {
      setPost(found);
      setChecked(true);
      return;
    }

    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.posts)) {
          const match = data.posts.find((b: any) => b.slug === slug);
          if (match) setPost(match);
        }
      })
      .finally(() => setChecked(true));
  }, [slug]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#070709] pt-24">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#070709] text-zinc-900 dark:text-white pt-24 px-4">
        <h1 className="text-3xl font-black mb-3">Blog Post Not Found</h1>
        <p className="text-zinc-500 mb-6 text-center">
          Yeh blog article maujood nahi hai ya remove kar diya gaya hai.
        </p>
        <div className="flex gap-3">
          <Link
            href="/blog"
            className="px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-white/10 text-sm font-bold"
          >
            Back to Blogs
          </Link>
          <Link
            href="/blog/create"
            className="px-6 py-2.5 rounded-xl bg-orange-600 text-white text-sm font-bold"
          >
            Create New Blog
          </Link>
        </div>
      </div>
    );
  }

  const subtitlesList = Array.isArray(post.subtitles) ? post.subtitles : [];
  const formattedDate =
    post.date && !isNaN(new Date(post.date).getTime())
      ? format(new Date(post.date), "dd MMMM yyyy")
      : "Recently Published";

  return (
    <article className="min-h-screen bg-white dark:bg-[#070709] text-zinc-900 dark:text-zinc-100 pt-32 pb-24 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-white/5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Blogs
          </Link>

          <Link
            href="/blog/create"
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition shadow-sm"
          >
            <PenTool className="w-3.5 h-3.5" />
            Write a Post
          </Link>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-zinc-500">
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 uppercase tracking-wider font-bold">
              {post.category || "Article"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />3 min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] text-zinc-950 dark:text-white">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {(post.author || "A")[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">
                {post.author || "Author"}
              </p>
              <p className="text-xs text-zinc-400">Published Author</p>
            </div>
          </div>
        </div>

        {post.coverImage && (
          <div className="mb-12 rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-2xl bg-zinc-100 dark:bg-zinc-900">
            <img
              src={post.coverImage}
              alt={post.title || "Blog Cover"}
              className="w-full object-cover max-h-[500px]"
            />
          </div>
        )}

        {post.excerpt && (
          <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-orange-500/[0.04] dark:bg-orange-500/[0.03] border-l-4 border-orange-500 text-lg sm:text-xl font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
            "{post.excerpt}"
          </div>
        )}

        <div className="space-y-12">
          {subtitlesList.map((sub: any, idx: number) => (
            <section key={idx} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 font-extrabold flex items-center justify-center text-sm">
                  {idx + 1}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                  {sub.title}
                </h2>
              </div>

              <div className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line pl-11">
                {sub.content}
              </div>

              {idx === 0 && post.image2 && (
                <div className="my-8 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-xl bg-zinc-100 dark:bg-zinc-900">
                  <img
                    src={post.image2}
                    alt="Section Visual"
                    className="w-full object-cover max-h-[440px]"
                  />
                </div>
              )}

              {idx === 1 && post.image3 && (
                <div className="my-8 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-xl bg-zinc-100 dark:bg-zinc-900">
                  <img
                    src={post.image3}
                    alt="Supporting Visual"
                    className="w-full object-cover max-h-[440px]"
                  />
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Bookmark className="w-4 h-4 text-orange-500" />
            <span>Thank you for reading!</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-white/10 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-white/5 transition"
            >
              All Articles
            </Link>
            <Link
              href="/blog/create"
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-lg shadow-orange-600/20 transition"
            >
              Write Another Post
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

