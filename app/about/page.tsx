import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

export const metadata: Metadata = {
    title: 'About Us | Hope Medicos',
    description: 'Learn about Hope Medicos, our mission, vision, and our commitment to serving the healthcare needs of Hisar since 2010.',
};

export default function AboutUs() {
    return (
        <div className="bg-[#faf9f7] min-h-screen pt-32 pb-24 px-6 font-inter">
            <div className="max-w-4xl mx-auto">
                {/* Header with Proprietor Image */}
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="max-w-xl">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#f58518] font-semibold mb-6">
                            Legacy & Trust
                        </p>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black leading-[1.05]">
                            Our <span className="font-serif italic font-light">Story</span> & <br /> Commitment.
                        </h1>
                        <div className="mt-8 flex items-center gap-4 text-xs text-black/40">
                            <span>Established 2010</span>
                            <div className="w-1 h-1 rounded-full bg-black/10" />
                            <span>Hisar, Haryana</span>
                        </div>
                    </div>

                    {/* Masked Portrait */}
                    <div className="relative w-48 h-64 md:w-56 md:h-72 shrink-0 group">
                        <div className="absolute inset-0 bg-[#f58518]/10 -rotate-3 rounded-[60px_20px_60px_20px] transition-transform group-hover:rotate-0 duration-500" />
                        <div className="relative w-full h-full overflow-hidden rounded-[60px_20px_60px_20px] border border-black/5 shadow-2xl">
                            <Image 
                                src="/kkr.jpg" 
                                alt="Krishan Kumar Jangra" 
                                fill
                                priority
                                className="object-cover object-[center_15%] scale-[1.15] transition-transform duration-700 group-hover:scale-[1.25]"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-16 text-base leading-relaxed text-black/80">
                    {/* Welcome Section */}
                    <section>
                        <h2 className="text-xl font-medium text-black mb-6">Welcome to Hope Medicos</h2>
                        <div className="space-y-4">
                            <p>
                                Founded in 2010, Hope Medicos has established itself as a cornerstone of the healthcare community in Hisar, Haryana. Under the visionary leadership of our proprietor, <strong>Krishan Kumar Jangra</strong>, we have grown from a local chemist into a leading pharmaceutical retailer and manufacturer dedicated to serving our community with integrity and excellence.
                            </p>
                        </div>
                    </section>

                    {/* Mission Section */}
                    <section className="bg-white p-8 md:p-12 border border-black/5 rounded-sm shadow-sm italic font-serif text-2xl text-black leading-snug">
                       <p className="text-lg font-inter not-italic text-black/60 leading-relaxed">
                          At Hope Medicos, we believe in exceptional care and quality. Our mission is to provide high-quality, effective, and affordable medicines to every patient who walks through our doors. We strive to bridge the gap between world-class pharmaceutical products and the people who need them most.
                       </p>
                    </section>

                    {/* What We Offer Section */}
                    <section>
                        <h2 className="text-xl font-medium text-black mb-8 border-b border-black/5 pb-4">What We Offer</h2>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-[#f58518] font-bold mb-3">Comprehensive Pharmacy</h3>
                                <p className="text-sm leading-relaxed">A wide range of pharmaceutical tablets, capsules, and injectables sourced from reputable manufacturers.</p>
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-[#f58518] font-bold mb-3">Personalized Care</h3>
                                <p className="text-sm leading-relaxed">Our knowledgeable staff is always ready to guide you through your healthcare needs with a patient-first approach.</p>
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-[#f58518] font-bold mb-3">Quality & Safety</h3>
                                <p className="text-sm leading-relaxed">We prioritize safe packaging and authenticated products to ensure that every medicine you receive is of the highest standard.</p>
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-[#f58518] font-bold mb-3">Accessibility</h3>
                                <p className="text-sm leading-relaxed">Conveniently located in the heart of Hisar, near Sarvodaya Hospital, we are open seven days a week to serve you.</p>
                            </div>
                        </div>
                    </section>

                    {/* Why Choose Us */}
                    <section className="relative rounded-2xl bg-white border border-[#f58518]/10 overflow-hidden">
                        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-2">
                                    <FcGoogle className="w-5 h-5" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">Verified on Google</span>
                                </div>
                                
                                <h2 className="text-3xl font-normal text-black leading-tight tracking-tight">
                                    Recognized for <br /> <span className="font-serif italic text-[#f58518]">Excellence.</span>
                                </h2>
                                
                                <p className="text-black/60 text-base leading-relaxed max-w-md">
                                    Whether it&apos;s life-saving medication or daily essentials, we are a name you can trust.
                                </p>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <a 
                                        href="https://www.google.com/search?q=hope+medicos+google+reviews#lrd=0x3912333e978e712d:0x40b39f644e6f74c9,3" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-[#f58518] text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm transition-opacity hover:opacity-90"
                                    >
                                        Write a Review
                                    </a>
                                    <a 
                                        href="https://www.google.com/search?q=hope+medicos+google+reviews#lrd=0x3912333e978e712d:0x40b39f644e6f74c9,1" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 border border-black/5 text-black text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-black/[0.02]"
                                    >
                                        View All
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
                                <div className="bg-[#faf9f7] p-6 rounded-xl border border-black/5 text-center">
                                    <span className="block text-3xl font-medium text-black">15+</span>
                                    <span className="text-[10px] uppercase tracking-widest text-black/40 mt-1 block">Years Experience</span>
                                </div>
                                <div className="bg-black p-6 rounded-xl text-center">
                                    <span className="block text-3xl font-medium text-[#f58518]">146+</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1 block">Verified Reviews</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Fact Sheet Table */}
                    <section className="pt-8">
                        <h2 className="text-xl font-medium text-black mb-8">Business Information</h2>
                        <div className="border border-black/5 divide-y divide-black/5">
                            {[
                                { l: "Full Business Name", v: "Hope Medicos" },
                                { l: "Proprietor", v: "Mr. Krishan Kumar Jangra" },
                                { l: "Tagline", v: "Trusted Healthcare Partner" },
                                { l: "Operating Hours", v: "7:00 AM – 10:30 PM (Mon-Sun)" },
                                { l: "Core Services", v: "Retail Pharmacy & Pharmaceutical Manufacturing" },
                                { l: "GST Number", v: "06AQMPK0456A2Z7" },
                                { l: "Location", v: "Near Sarvodaya Hospital, Delhi Road, Hisar" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row md:items-center py-4 px-6 hover:bg-black/[0.02] transition-colors">
                                    <span className="text-[11px] uppercase tracking-wider text-black/40 w-full md:w-1/3 mb-1 md:mb-0">{item.l}</span>
                                    <span className="text-sm text-black font-medium">{item.v}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Footer Note */}
                    <section className="pt-8 border-t border-black/5">
                        <p className="text-sm text-black/60 italic">
                           &quot;Bridging the gap between world-class pharmaceutical products and the people who need them most.&quot;
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
