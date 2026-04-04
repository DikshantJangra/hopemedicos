'use client';

import { FiArrowLeft, FiUser, FiCalendar, FiShare2 } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Blog, fetchBlogById } from "@/utils/websiteData";
import { useParams } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function UpdateDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlog = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await fetchBlogById(id);
                setBlog(data);
            } catch (error) {
                console.error("Error loading blog detail:", error);
            } finally {
                setLoading(false);
            }
        };

        loadBlog();
    }, [id]);

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                </div>
            </main>
        );
    }

    if (!blog) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
                    <p className="text-gray-500 mb-6 font-medium">The update you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/updates" className="text-brand font-bold">
                        ← Back to Updates
                    </Link>
                </div>
            </main>
        );
    }

    return(
        <main className="min-h-screen bg-white pb-20">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
                    <Link 
                        href="/updates"
                        className="inline-flex items-center gap-1.5 text-gray-500 hover:text-brand font-bold text-xs uppercase tracking-widest transition-colors"
                    >
                        <FiArrowLeft className="text-lg" />
                        <span>All Updates</span>
                    </Link>
                </div>
            </nav>

            <article className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
                {/* Category & Date */}
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-xs font-black text-brand uppercase tracking-widest px-2.5 py-1 bg-brand-soft rounded border border-brand/10">
                        {blog.category.replace('-', ' ')}
                    </span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase tracking-widest">
                        <FiCalendar />
                        <span>{formatDate(blog.createdAt)}</span>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
                    {blog.title}
                </h1>

                {/* Author & Share */}
                <div className="flex items-center justify-between py-6 border-y border-gray-50 mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                            <FiUser className="text-gray-400" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Author</p>
                            <p className="text-sm font-bold text-gray-900">{blog.author}</p>
                        </div>
                    </div>
                    
                    <button className="flex items-center gap-2 text-gray-400 hover:text-brand transition-colors">
                        <FiShare2 className="text-lg" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Share</span>
                    </button>
                </div>

                {/* Featured Image */}
                {blog.featuredImage && (
                    <div className="relative w-full aspect-[21/9] mb-12 rounded-2xl overflow-hidden shadow-sm">
                        <Image 
                            src={blog.featuredImage} 
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div 
                    className="prose prose-lg max-w-none
                        prose-headings:text-gray-900 prose-headings:font-black prose-headings:tracking-tight
                        prose-h1:text-4xl prose-h1:mb-6
                        prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-12
                        prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
                        prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:mb-6
                        prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                        prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                        prose-li:text-gray-600 prose-li:mb-2
                        prose-strong:text-gray-900 prose-strong:font-bold
                        prose-a:text-brand prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:pl-4 prose-blockquote:italic
                        prose-code:text-brand prose-code:bg-brand-soft prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                        prose-img:rounded-2xl prose-img:shadow-lg"
                >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {blog.content}
                    </ReactMarkdown>
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-gray-50">
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag, idx) => (
                                <span 
                                    key={idx}
                                    className="px-3 py-1.5 bg-gray-50 text-gray-500 font-bold rounded-lg text-[11px] uppercase tracking-wider border border-gray-100"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>

            {/* Subtle CTA */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
                <div className="bg-gray-50 rounded-[2rem] p-10 sm:p-14 border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div className="max-w-md text-center sm:text-left">
                        <h3 className="text-2xl font-black text-gray-900 mb-3">Healthcare is personal.</h3>
                        <p className="text-gray-500 font-medium">Have questions about this topic? Our team is available 24/7 for your help.</p>
                    </div>
                    <Link 
                        href="https://wa.me/919812080390"
                        className="whitespace-nowrap px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-lg hover:bg-black transition-all active:scale-95"
                    >
                        Talk to us
                    </Link>
                </div>
            </div>
        </main>
    )
}
