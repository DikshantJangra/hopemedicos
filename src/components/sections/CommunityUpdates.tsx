'use client';

import Link from "next/link";
import Image from "next/image";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function CommunityUpdates() {
    const { blogs, loading } = useWebsiteData();

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).toUpperCase();
    };

    if (loading) {
        return (
            <section id="community-updates" className="bg-white px-6 py-20">
                <div className="max-w-5xl mx-auto">
                    <div className="h-10 w-48 bg-black/5 rounded animate-pulse mb-12" />
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 bg-black/5 rounded animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (blogs.length === 0) return null;

    return (
        <section id="community-updates" className="bg-white px-6 py-20">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-end justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-normal tracking-[-0.02em] text-black">
                        Latest from Hope
                    </h2>
                    <Link
                        href="/updates"
                        className="text-xs uppercase tracking-[0.12em] text-[#f58518] hover:text-[#e07615] transition-colors font-medium"
                    >
                        View all →
                    </Link>
                </div>

                {/* Editorial Row List */}
                <div className="space-y-0">
                    {blogs.slice(0, 5).map((blog, idx) => (
                        <Link
                            key={blog.id}
                            href={`/updates/${blog.id}`}
                            className="group flex gap-6 py-6 border-t border-black/5 hover:bg-[#faf9f7] transition-colors -mx-6 px-6"
                        >
                            {/* Small square thumbnail */}
                            {blog.featuredImage && (
                                <div className="relative w-20 h-20 shrink-0 bg-[#faf9f7] overflow-hidden">
                                    <Image
                                        src={blog.featuredImage}
                                        alt={blog.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* Text content */}
                            <div className="flex-1 min-w-0">
                                {/* Date + category in 10px uppercase muted */}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] uppercase tracking-[0.15em] text-black/40">
                                        {blog.category}
                                    </span>
                                    <span className="text-black/20">·</span>
                                    <span className="text-[10px] uppercase tracking-[0.15em] text-black/40">
                                        {formatDate(blog.createdAt)}
                                    </span>
                                </div>

                                {/* Title in 13px medium */}
                                <h3 className="text-[13px] font-medium text-black mb-1 group-hover:underline leading-snug">
                                    {blog.title}
                                </h3>

                                {/* One-line excerpt */}
                                <p className="text-xs text-black/60 line-clamp-1">
                                    {blog.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
