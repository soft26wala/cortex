import React, { FC } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
    const { title, coverImage, excerpt, date, slug, category } = blog;

    const safeDate = date && !isNaN(new Date(date).getTime())
        ? format(new Date(date), "dd MMM yyyy")
        : "Recently";

    const imageSrc = coverImage && coverImage.trim().length > 0
        ? coverImage
        : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";

    return (
        <div className="group relative bg-white dark:bg-[#0E0E12] border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <Link href={`/blog/${slug}`} aria-label={title || "Blog cover"} className="block w-full h-full">
                    <img
                        src={imageSrc}
                        alt={title || "Blog image"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                </Link>

                <div className="absolute top-3 left-3 bg-orange-600/90 backdrop-blur-md py-1 px-3 rounded-full shadow-md">
                    <span className="text-white font-bold text-xs uppercase tracking-wider">
                        {category || "Articles"}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                    <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mb-2 block">
                        {safeDate}
                    </span>

                    <h3 className="line-clamp-2">
                        <Link
                            href={`/blog/${slug}`}
                            className="text-lg font-bold text-zinc-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-500 transition-colors leading-snug"
                        >
                            {title}
                        </Link>
                    </h3>

                    {excerpt && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                            {excerpt}
                        </p>
                    )}
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs">
                    <Link
                        href={`/blog/${slug}`}
                        className="font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                        Read Article →
                    </Link>
                    <span className="text-zinc-400 font-medium">Cortex Insights</span>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
