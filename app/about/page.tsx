import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

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
                       <p className="mb-4">"फ़िक्र आपकी"</p>
                       <p className="text-lg font-inter not-italic text-black/60 leading-relaxed">
                          At Hope Medicos, we believe in "We care for you". Our mission is to provide high-quality, effective, and affordable medicines to every patient who walks through our doors. We strive to bridge the gap between world-class pharmaceutical products and the people who need them most.
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
                    <section className="bg-black text-white p-10 md:p-16">
                        <div className="flex items-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <svg key={s} className="w-4 h-4 text-[#f58518] fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <h2 className="text-3xl font-normal leading-tight mb-6">Recognized for Excellence</h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-8">
                            With a stellar 4.9-star rating from our loyal customers, we are recognized for our responsive service, reasonable pricing, and extensive product range. Whether it's life-saving medication or daily healthcare essentials, Hope Medicos is a name you can trust.
                        </p>
                        <div className="flex gap-10 border-t border-white/10 pt-8 mt-8">
                            <div>
                                <span className="block text-2xl font-medium">15+</span>
                                <span className="text-[10px] uppercase tracking-widest text-white/40">Years Experience</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-medium">146+</span>
                                <span className="text-[10px] uppercase tracking-widest text-white/40">Verified Reviews</span>
                            </div>
                        </div>

                        {/* Review Actions */}
                        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 mt-12">
                            <a 
                                href="https://www.google.com/search?q=hope+medicos+google+reviews#lrd=0x3912333e978e712d:0x40b39f644e6f74c9,3" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-[#f58518] text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#e07615] transition-all"
                            >
                                Write a Review
                            </a>
                            <a 
                                href="https://www.google.com/search?q=hope+medicos+google+reviews#lrd=0x3912333e978e712d:0x40b39f644e6f74c9,1" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-6 py-3 border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-all"
                            >
                                View All Reviews
                            </a>
                        </div>
                    </section>

                    {/* Fact Sheet Table */}
                    <section className="pt-8">
                        <h2 className="text-xl font-medium text-black mb-8">Business Information</h2>
                        <div className="border border-black/5 divide-y divide-black/5">
                            {[
                                { l: "Full Business Name", v: "Hope Medicos" },
                                { l: "Proprietor", v: "Mr. Krishan Kumar Jangra" },
                                { l: "Tagline", v: " फ़िक्र आपकी (Your Care)" },
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
                           "Bridging the gap between world-class pharmaceutical products and the people who need them most."
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
