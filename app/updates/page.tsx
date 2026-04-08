'use client';

import { useWebsiteData } from "@/context/WebsiteDataContext";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface YouTubeVideo {
    videoId: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
}

export default function UpdatesPage() {
    const { blogs, loading } = useWebsiteData();
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [latestVideo, setLatestVideo] = useState<YouTubeVideo | null>(null);
    const [videoLoading, setVideoLoading] = useState(true);

    // Extract unique categories from blogs
    const categories = useMemo(() => {
        const cats = new Set(blogs.map(b => b.category));
        return Array.from(cats);
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        if (activeCategory === 'all') return blogs;
        return blogs.filter(b => b.category === activeCategory);
    }, [blogs, activeCategory]);

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    // Fetch latest YouTube video
    useEffect(() => {
        const fetchLatestVideo = async () => {
            try {
                const response = await fetch('/api/youtube');
                if (response.ok) {
                    const data = await response.json();
                    setLatestVideo(data);
                }
            } catch (error) {
                console.error('Failed to fetch latest video:', error);
            } finally {
                setVideoLoading(false);
            }
        };

        fetchLatestVideo();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#faf9f7] flex items-center justify-center font-inter">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-[#f58518] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">Loading Updates</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#faf9f7] font-inter pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                
                {/* Refined Aesthetic Header */}
                <header className="mb-24 flex flex-col lg:flex-row lg:items-center justify-between gap-16">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-[1px] bg-[#f58518]" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#f58518] font-semibold">
                                Community Journal
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-black leading-[1.1] mb-6">
                            Community Updates <br />
                            <span className="font-serif italic font-light">& Health Awareness.</span>
                        </h1>
                        <p className="text-base text-black/60 leading-relaxed">
                            Stay informed with the latest insights, announcements, and health awareness initiatives directly from the Hope Medicos team.
                        </p>
                    </div>

                    {/* YouTube Feature - Aesthetic Sidebar */}
                    <div className="flex-1 w-full lg:max-w-md group">
                        <div className="relative aspect-video bg-black rounded-sm overflow-hidden shadow-2xl border border-black/5 ring-1 ring-black/5">
                            {videoLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                                    <div className="w-8 h-8 border-2 border-[#f58518] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : latestVideo ? (
                                <iframe 
                                    className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                                    src={`https://www.youtube.com/embed/${latestVideo.videoId}`}
                                    title={latestVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                                    <p className="text-xs text-black/40">Video unavailable</p>
                                </div>
                            )}
                            {/* Overlay tag */}
                            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                                <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-[9px] uppercase tracking-[0.15em] text-[#f58518] font-bold border border-black/5 shadow-sm">
                                    Watch & Learn
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-[10px] uppercase tracking-[0.1em] text-black/40 font-medium">
                                {latestVideo ? 'Latest Video' : 'Official Updates'}
                            </p>
                            <a 
                                href="https://www.youtube.com/@HopeMedicoshisar" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[10px] uppercase tracking-[0.1em] text-[#f58518] font-bold hover:underline"
                            >
                                Visit Channel
                            </a>
                        </div>
                    </div>
                </header>

                {/* Aesthetic Filter Bar */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-16 border-b border-black/5 pb-6">
                    <button 
                        onClick={() => setActiveCategory('all')}
                        className={`text-[11px] uppercase tracking-[0.15em] transition-all relative pb-2 ${activeCategory === 'all' ? 'text-black font-semibold' : 'text-black/40 hover:text-black'}`}
                    >
                        All Articles
                        {activeCategory === 'all' && (
                            <motion.div layoutId="activeFilter" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f58518]" />
                        )}
                    </button>
                    {categories.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-[11px] uppercase tracking-[0.15em] transition-all relative pb-2 ${activeCategory === cat ? 'text-black font-semibold' : 'text-black/40 hover:text-black'}`}
                        >
                            {cat.replace(/-/g, ' ')}
                            {activeCategory === cat && (
                                <motion.div layoutId="activeFilter" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f58518]" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                    <AnimatePresence mode="popLayout">
                        {filteredBlogs.map((blog) => (
                            <motion.article 
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                key={blog.id}
                                className="group flex flex-col"
                            >
                                {/* Aesthetic Image Card */}
                                <Link href={`/updates/${blog.id}`} className="relative block aspect-[4/5] overflow-hidden bg-black/5 mb-8">
                                    {blog.featuredImage ? (
                                        <Image 
                                            src={blog.featuredImage} 
                                            alt={blog.title}
                                            fill
                                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-white border border-black/5">
                                            <span className="text-[10px] uppercase tracking-[0.1em] text-black/20">No Image</span>
                                        </div>
                                    )}
                                    {/* Category Overlay */}
                                    <div className="absolute top-6 left-6">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] uppercase tracking-[0.15em] text-black font-medium border border-black/5">
                                            {blog.category.replace(/-/g, ' ')}
                                        </span>
                                    </div>
                                </Link>

                                {/* Article Info */}
                                <div className="flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.15em] text-black/40 mb-4">
                                        <span>{formatDate(blog.createdAt)}</span>
                                        <div className="w-1 h-1 rounded-full bg-[#f58518]" />
                                        <span>{blog.author}</span>
                                    </div>
                                    
                                    <Link href={`/updates/${blog.id}`}>
                                        <h2 className="text-2xl font-normal leading-tight tracking-tight text-black group-hover:text-[#f58518] transition-colors mb-4 line-clamp-2">
                                            {blog.title}
                                        </h2>
                                    </Link>
                                    
                                    <p className="text-black/60 text-sm leading-relaxed mb-8 line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    <Link 
                                        href={`/updates/${blog.id}`}
                                        className="mt-auto text-[10px] uppercase tracking-[0.2em] font-semibold text-black flex items-center gap-2 group/btn"
                                    >
                                        Read Full Article
                                        <motion.span 
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                            className="text-[#f58518]"
                                        >
                                            →
                                        </motion.span>
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredBlogs.length === 0 && (
                    <div className="text-center py-32 border-2 border-dashed border-black/5">
                        <p className="text-black/40 text-[11px] uppercase tracking-[0.2em]">No articles found in this category</p>
                    </div>
                )}

                {/* Minimal Pagination / Footer CTA */}
                <div className="mt-40 pt-16 border-t border-black/5 text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-8">End of Journal</p>
                    <Link 
                        href="/"
                        className="inline-flex items-center gap-4 text-black hover:text-[#f58518] transition-all group"
                    >
                        <span className="text-3xl font-serif italic font-light">Back to Overview</span>
                        <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
