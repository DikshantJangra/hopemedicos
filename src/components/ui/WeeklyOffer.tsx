'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import { fetchLatestOffers } from '@/utils/websiteData';
import Link from "next/link";
import { MdOutlineDiscount } from "react-icons/md";

interface Offer {
    id: string;
    title: string;
    description: string;
    image_url: string;
    price?: number;
    discounted_price?: number;
}

export default function WeeklyOffer({ isOpen }: { isOpen: boolean }) {
    const [offer, setOffer] = useState<Offer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOffer = async () => {
            try {
                const offers = await fetchLatestOffers(1);
                if (offers.length > 0) {
                    setOffer(offers[0]);
                }
            } catch (err) {
                console.error("Failed to fetch weekly offer:", err);
            } finally {
                setLoading(false);
            }
        };
        loadOffer();
    }, []);

    if (loading) {
        return (
            <div className={`transition-all duration-300 ease-out ${isOpen ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-[100px] rotate-180'}`}>
                <div className="w-80 h-96 bg-white/30 rounded-2xl animate-pulse" />
            </div>
        );
    }
    
    // Fallback dummy offer for preview
    const displayOffer = offer || {
        id: 'dummy',
        title: 'Vitamin D3 + K2',
        description: 'Premium supplement for bone health & immunity',
        image_url: '',
        price: 599,
        discounted_price: 489,
    };

    const discount = displayOffer.price && displayOffer.discounted_price
        ? Math.round(((displayOffer.price - displayOffer.discounted_price) / displayOffer.price) * 100)
        : null;

    return (
        <div 
            className={`transition-all duration-300 ease-out ${
                isOpen 
                    ? 'opacity-100 translate-x-0 rotate-0 scale-100' 
                    : 'opacity-0 translate-x-[100px] rotate-180 scale-90 pointer-events-none'
            }`}
        >
            <div className="relative bg-white rounded-2xl w-80 h-96 shadow-2xl overflow-hidden group hover:scale-105 transition-transform duration-300">
                {/* Discount badge */}
                {discount && (
                    <div className="absolute top-4 right-4 z-20 bg-brand text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <MdOutlineDiscount className="text-sm" />
                        {discount}% OFF
                    </div>
                )}

                {/* Product image - takes priority if available */}
                {displayOffer.image_url ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={displayOffer.image_url}
                            alt={displayOffer.title}
                            fill
                            className="object-cover"
                        />
                        {/* Gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Minimal text overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="text-lg font-black leading-tight mb-1">{displayOffer.title}</h3>
                            <div className="flex items-center gap-2 mb-3">
                                {displayOffer.discounted_price && (
                                    <span className="text-2xl font-black">₹{displayOffer.discounted_price}</span>
                                )}
                                {displayOffer.price && (
                                    <span className="text-sm text-white/60 line-through">₹{displayOffer.price}</span>
                                )}
                            </div>
                            <Link
                                href="#offers"
                                className="inline-block text-xs font-bold text-white/90 hover:text-white underline underline-offset-2"
                            >
                                View Details →
                            </Link>
                        </div>
                    </div>
                ) : (
                    // Fallback design without image
                    <div className="relative w-full h-full bg-gradient-to-br from-brand to-brand-dark flex flex-col items-center justify-center p-8 text-white text-center">
                        <MdOutlineDiscount className="text-6xl mb-4 opacity-20" />
                        <h3 className="text-xl font-black leading-tight mb-2">{displayOffer.title}</h3>
                        <p className="text-white/70 text-xs mb-4 line-clamp-2">{displayOffer.description}</p>
                        
                        <div className="flex flex-col items-center gap-1 mb-4">
                            {displayOffer.discounted_price && (
                                <span className="text-3xl font-black">₹{displayOffer.discounted_price}</span>
                            )}
                            {displayOffer.price && (
                                <span className="text-sm text-white/50 line-through">₹{displayOffer.price}</span>
                            )}
                        </div>
                        
                        <Link
                            href="#offers"
                            className="text-xs font-bold text-white/90 hover:text-white underline underline-offset-2"
                        >
                            View Details →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
