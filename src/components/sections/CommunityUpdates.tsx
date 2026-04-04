'use client';

import { FaNewspaper } from "react-icons/fa";
import { HiOutlineUser, HiOutlineCalendar } from "react-icons/hi";
import SpotlightCard from "../layout/SpotlightCard/SpotlightCard";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '@/utils/firebase';

import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function CommunityUpdates() {
    const { blogs, loading, texts } = useWebsiteData();

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    if (loading) {
        return (
            <section id="community-updates" className="min-h-screen bg-white px-4 sm:px-6 py-16">
                <div className="flex gap-2 items-center text-gray-500 mb-4 text-sm font-medium backdrop-blur-md py-1 px-2 rounded-lg w-fit bg-white/60 border border-white/40 shadow-sm">
                    <FaNewspaper className="text-brand" />
                    <span>Community Updates</span>
                </div>
                <div className="text-center py-20">
                    <p className="text-gray-500">Loading updates...</p>
                </div>
            </section>
        );
    }

    return(
        <section id="community-updates" className="min-h-screen bg-white px-4 sm:px-6 py-16">
            <div className="flex gap-2 items-center text-gray-500 mb-4 text-sm font-medium backdrop-blur-md py-1 px-2 rounded-lg w-fit bg-white/60 border border-white/40 shadow-sm">
                <FaNewspaper className="text-brand" />
                <span>Community Updates</span>
            </div>

            <div className="mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                    {texts.aboutTitle || "Latest Updates"}
                </h2>
                <p className="text-gray-500 text-base max-w-2xl">
                    {texts.aboutDescription || "Stay connected with our community celebrations, health insights, and announcements."}
                </p>
            </div>

            {blogs.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500">No updates available at the moment.</p>
                </div>
            ) : (
                <>
                    {/* Featured Updates Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog, idx) => (
                            <SpotlightCard 
                                key={idx} 
                                spotlightColor="rgba(245, 133, 24, 0.1)" 
                                className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl p-0 flex flex-col h-full overflow-hidden"
                            >
                                <div className="flex flex-col h-full">
                                    {/* Image Container */}
                                    {blog.featuredImage && (
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image 
                                                src={blog.featuredImage} 
                                                alt={blog.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-brand uppercase border border-gray-100">
                                                {blog.category.replace('-', ' ')}
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 mb-3 text-[11px] text-gray-400 font-medium">
                                            <div className="flex items-center gap-1">
                                                <HiOutlineCalendar className="text-sm" />
                                                <span>{formatDate(blog.createdAt)}</span>
                                            </div>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <HiOutlineUser className="text-sm" />
                                                <span>{blog.author}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                                            {blog.title}
                                        </h3>

                                        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                            {blog.excerpt}
                                        </p>

                                        <Link 
                                            href={`/updates/${blog.id}`}
                                            className="text-brand font-bold text-sm hover:underline inline-flex items-center gap-1"
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="mt-12">
                        <Link 
                            href="/updates"
                            className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm transition-colors border border-gray-200"
                        >
                            View All Community Updates
                        </Link>
                    </div>
                </>
            )}
        </section>
    )
}
