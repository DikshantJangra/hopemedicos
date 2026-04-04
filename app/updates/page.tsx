'use client';

import { FaNewspaper } from "react-icons/fa";
import { MdCelebration, MdHealthAndSafety, MdCampaign, MdFilterList, MdGroups } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { useState, useMemo } from "react";

export default function UpdatesPage() {
    const { blogs, loading, texts } = useWebsiteData();
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const getCategoryIcon = (category: string) => {
        const lowerCat = category.toLowerCase();
        if (lowerCat.includes('celebrat')) return <MdCelebration className="text-xl" />;
        if (lowerCat.includes('health')) return <MdHealthAndSafety className="text-xl" />;
        if (lowerCat.includes('announc')) return <MdCampaign className="text-xl" />;
        if (lowerCat.includes('commun')) return <MdGroups className="text-xl" />;
        if (lowerCat.includes('aware') || lowerCat.includes('med')) return <GiMedicines className="text-xl" />;
        return <FaNewspaper className="text-xl" />;
    };

    const getCategoryLabel = (category: string) => {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    // Extract unique categories from blogs
    const categories = useMemo(() => {
        const cats = new Set(blogs.map(b => b.category));
        return Array.from(cats);
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        if (activeCategory === 'all') return blogs;
        return blogs.filter(b => b.category === activeCategory);
    }, [blogs, activeCategory]);

    if (loading) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading updates...</p>
                </div>
            </main>
        );
    }

    return(
        <main className="min-h-screen bg-gradient-to-b from-brand-soft to-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-brand to-brand-dark text-white px-4 sm:px-6 py-16 sm:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <FaNewspaper className="text-3xl sm:text-4xl" />
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                            Community Updates
                        </h1>
                    </div>
                    <p className="text-lg sm:text-xl text-white/90 max-w-3xl">
                        Your trusted source for health insights, community news, and important announcements from Hope Medicos.
                    </p>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm overflow-x-auto">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-gray-600 font-medium whitespace-nowrap">
                            <MdFilterList className="text-xl" />
                            <span className="text-sm sm:text-base">Filter:</span>
                        </div>
                        <button 
                            onClick={() => setActiveCategory('all')}
                            className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium whitespace-nowrap transition-all ${
                                activeCategory === 'all' 
                                ? 'bg-brand text-white shadow-md' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            All Updates
                        </button>
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium whitespace-nowrap transition-all ${
                                    activeCategory === cat 
                                    ? 'bg-brand text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {getCategoryLabel(cat)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Updates Grid */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                        <FaNewspaper className="text-4xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">No updates found in this category.</p>
                        <button 
                            onClick={() => setActiveCategory('all')}
                            className="mt-4 text-brand font-bold hover:underline"
                        >
                            View all updates
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {filteredBlogs.map((blog) => (
                            <article 
                                key={blog.id}
                                className="bg-white rounded-xl border border-gray-200 hover:border-brand hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full"
                            >
                                {/* Image */}
                                {blog.featuredImage && (
                                    <div className="relative w-full h-48 bg-brand-soft overflow-hidden">
                                        <Image 
                                            src={blog.featuredImage} 
                                            alt={blog.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                <div className="p-5 flex flex-col flex-1">
                                    {/* Category Badge */}
                                    <div className="flex items-center gap-2 text-brand bg-brand-light px-3 py-1 rounded-full w-fit mb-3 text-xs sm:text-sm">
                                        {getCategoryIcon(blog.category)}
                                        <span className="font-medium">{getCategoryLabel(blog.category)}</span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-brand transition-colors line-clamp-2">
                                        {blog.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    <div className="mt-auto">
                                        {/* Meta Info */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                                            <span className="font-medium">{blog.author}</span>
                                            <span>{formatDate(blog.createdAt)}</span>
                                        </div>

                                        {/* Read More Link */}
                                        <Link 
                                            href={`/updates/${blog.id}`}
                                            className="inline-flex items-center text-brand hover:text-brand-dark font-semibold text-sm sm:text-base group-hover:gap-2 transition-all"
                                        >
                                            Read Full Update
                                            <span className="ml-1 group-hover:ml-0 transition-all">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Optional: Load More removed as it's currently showing up to 10 latest Blogs from context */}
                {blogs.length >= 10 && activeCategory === 'all' && (
                    <div className="text-center mt-12">
                        <button className="bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white px-8 py-3 rounded-lg text-base sm:text-lg font-semibold transition-all">
                            View Older Updates
                        </button>
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="bg-brand-light px-4 sm:px-6 py-12 mt-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        Stay Connected with Hope Medicos
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg mb-6">
                        Never miss an update. Follow us for the latest health tips, community events, and important announcements.
                    </p>
                    <Link 
                        href="/"
                        className="inline-block bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-lg text-base sm:text-lg font-semibold transition-colors shadow-lg"
                    >
                        Back to Home
                    </Link>
                </div>
            </section>
        </main>
    )
}
