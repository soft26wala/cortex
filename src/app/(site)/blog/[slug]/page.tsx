import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  Tag,
  PenTool,
  Bookmark,
  CheckCircle,
} from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import fs from "fs";
import { join } from "path";

type Props = {
  params: Promise<{ slug: string }>;
};

// Estimate reading time from text
function calculateReadingTime(text: string) {
  const words = text ? text.trim().split(/\s+/).length : 0;
  const time = Math.ceil(words / 200);
  return time > 0 ? `${time} min read` : "3 min read";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, ["title", "excerpt"]);
  if (!post) {
    return { title: "Blog Not Found | Cortex Web Solutions" };
  }
  return {
    title: `${post.title} | Cortex Web Solutions`,
    description: post.excerpt || "Explore industry insights and tutorials.",
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params;

  let post = getPostBySlug(slug, []);

  // Fallback to customBlogs.json if not found in markdown files
  if (!post) {
    try {
      const jsonPath = join(process.cwd(), "src/data/customBlogs.json");
      if (fs.existsSync(jsonPath)) {
        const list = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
        post = list.find((b: any) => b.slug === slug);
      }
    } catch (e) {
      // ignore
    }
  }

  if (!post) {
    return notFound();
  }

  // Parse structured subtitles if available
  let subtitlesList: Array<{ title: string; content: string }> = [];
  if (post.subtitlesData) {
    try {
      subtitlesList = JSON.parse(post.subtitlesData);
    } catch {
      subtitlesList = [];
    }
  } else if (Array.isArray(post.subtitles)) {
    subtitlesList = post.subtitles;
  }

  // Render HTML content for legacy markdown or markdown body
  const htmlContent = post.rawContent
    ? await markdownToHtml(post.rawContent)
    : post.content
    ? await markdownToHtml(post.content)
    : "";

  const formattedDate = post.date
    ? format(new Date(post.date), "dd MMMM yyyy")
    : "Recently Published";

  const readingTime = calculateReadingTime(
    (post.title || "") + " " + (post.content || "") + " " + JSON.stringify(subtitlesList)
  );

  return (
    <article className="min-h-screen bg-white dark:bg-[#070709] text-zinc-900 dark:text-zinc-100 pt-32 pb-24 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation */}
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

        {/* Header Metadata */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-zinc-500">
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 uppercase tracking-wider font-bold">
              {post.category || "Technology"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              {readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] text-zinc-950 dark:text-white">
            {post.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {(post.author || "C")[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">
                {post.author || "Cortex Engineering Team"}
              </p>
              <p className="text-xs text-zinc-400">Technical Writer & Solutions Lead</p>
            </div>
          </div>
        </div>

        {/* Hero Cover Image (Image 1) */}
        {post.coverImage && (
          <div className="mb-12 rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-2xl bg-zinc-100 dark:bg-zinc-900">
            <img
              src={post.coverImage}
              alt={post.title || "Blog Cover"}
              className="w-full object-cover max-h-[500px]"
            />
          </div>
        )}

        {/* Excerpt Block */}
        {post.excerpt && (
          <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-orange-500/[0.04] dark:bg-orange-500/[0.03] border-l-4 border-orange-500 text-lg sm:text-xl font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
            "{post.excerpt}"
          </div>
        )}

        {/* Structured Subtitles Display (If user created with 3-4 subtitles) */}
        {subtitlesList.length > 0 ? (
          <div className="space-y-12">
            {subtitlesList.map((sub, idx) => (
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

                {/* Embedded Image 2 after first subtitle */}
                {idx === 0 && post.image2 && (
                  <div className="my-8 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-xl bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={post.image2}
                      alt="Architecture Diagram"
                      className="w-full object-cover max-h-[440px]"
                    />
                    <div className="px-4 py-2 bg-zinc-50 dark:bg-[#0c0c10] border-t border-zinc-200 dark:border-white/5 text-xs text-center text-zinc-400">
                      Visual Illustration & Technical Concept
                    </div>
                  </div>
                )}

                {/* Embedded Image 3 after second subtitle */}
                {idx === 1 && post.image3 && (
                  <div className="my-8 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-xl bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={post.image3}
                      alt="Supporting Diagram"
                      className="w-full object-cover max-h-[440px]"
                    />
                    <div className="px-4 py-2 bg-zinc-50 dark:bg-[#0c0c10] border-t border-zinc-200 dark:border-white/5 text-xs text-center text-zinc-400">
                      Workflow Execution & Result Highlights
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>
        ) : (
          /* Markdown Content Fallback for standard mdx blogs */
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-orange-600 prose-img:rounded-3xl prose-img:shadow-xl"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}

        {/* Footer / Share & Navigation */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Bookmark className="w-4 h-4 text-orange-500" />
            <span>Thank you for reading Cortex Web Solutions publications.</span>
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

