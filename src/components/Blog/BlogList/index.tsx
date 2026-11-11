import React from 'react';
import Link from 'next/link';
import { getAllPosts } from "@/utils/markdown";
import { getAllCustomBlogs } from "@/lib/db";
import { PenTool, Sparkles } from "lucide-react";
import BlogListClient from './BlogListClient';

const BlogList: React.FC = async () => {
    const mdPosts = getAllPosts(["title", "date", "excerpt", "coverImage", "category", "slug"]);
    const dbPosts = await getAllCustomBlogs().catch(() => []);

    // Merge and deduplicate by slug
    const map = new Map<string, any>();
    [...dbPosts, ...mdPosts].forEach((p) => {
        if (p?.slug && !map.has(p.slug)) {
            map.set(p.slug, p);
        }
    });

    const initialPosts = Array.from(map.values()).sort((a, b) => {
        const d1 = new Date(a.date || 0).getTime();
        const d2 = new Date(b.date || 0).getTime();
        return d2 - d1;
    });

    return (
        <section className="pt-6 pb-20 dark:bg-[#070709] transition-colors" id="blog">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Action Bar / Write Blog Banner */}
                <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
                            <Sparkles className="w-4 h-4" />
                            <span>Community & Publications</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                            Publish Your Own Knowledge & Insights
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
                            IT, Share Market, Digital Marketing ya kisi bhi topic par apna blog 2-3 images aur subtitles ke sath publish karein.
                        </p>
                    </div>

                    <Link
                        href="/blog/create"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-xl shadow-orange-600/25 active:scale-95 transition-all whitespace-nowrap"
                    >
                        <PenTool className="w-4 h-4" />
                        Write & Post a Blog
                    </Link>
                </div>

                {/* Category Filter + Blog Cards */}
                <BlogListClient initialPosts={initialPosts} />
            </div>
        </section>
    );
}

export default BlogList;
