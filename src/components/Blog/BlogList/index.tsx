import React from 'react';
import Link from 'next/link';
import BlogCard from '@/components/SharedComponent/Blog/blogCard';
import { getAllPosts } from "@/utils/markdown";
import { PenTool, Sparkles, BookOpen } from "lucide-react";

const BlogList: React.FC = () => {
    const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "category", "slug"]);

    return (
        <section className="pt-6 pb-20 dark:bg-[#070709] transition-colors" id="blog">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Action Bar / Write Blog Banner */}
                <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
                            <Sparkles className="w-4 h-4" />
                            <span>Community & Publications</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                            Publish Your Own Knowledge & Insights
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
                            Share in-depth tutorials and case studies with 2-3 images, organized subtitles, and instant publication.
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

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((blog, i) => (
                            <div key={blog.slug || i} className="w-full">
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-zinc-50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-zinc-300 dark:border-white/10">
                        <BookOpen className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-zinc-700 dark:text-zinc-300">No blog posts found</h3>
                        <p className="text-sm text-zinc-400 mt-1 mb-6">Be the first to publish a technical article!</p>
                        <Link
                            href="/blog/create"
                            className="px-6 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold"
                        >
                            Create First Post
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

export default BlogList;
