'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { MdOutlineDiscount } from "react-icons/md";
import { useWebsiteData } from "@/context/WebsiteDataContext";

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
    const [mounted, setMounted] = useState(false);
    const { offerProducts, loading: contextLoading, shopSettings } = useWebsiteData();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!contextLoading && offerProducts && offerProducts.length > 0) {
            console.log('🎁 WeeklyOffer - offerProducts:', offerProducts);
            const product = offerProducts[0];
            const mappedOffer: Offer = {
                id: product.id,
                title: product.name,
                description: product.description,
                image_url: product.imageUrl || (product.images && product.images[0]) || "",
                price: product.price,
                discounted_price: product.offerPrice || product.discounted_price
            };
            console.log('✨ WeeklyOffer - Mapped offer:', mappedOffer);
            setOffer(mappedOffer);
        }
    }, [offerProducts, contextLoading]);

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return null;
    }

    if (contextLoading) {
        return (
            <div className={`transition-all duration-300 ease-out ${isOpen ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-[100px] rotate-180'}`}>
                <div className="flex flex-col gap-4">
                    {/* Shimmer badges */}
                    <div className="flex items-center justify-between">
                        <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    {/* Shimmer card */}
                    <div className="w-96 h-[26rem] bg-gray-200 rounded-3xl animate-pulse" />
                    {/* Shimmer button */}
                    <div className="h-14 w-full bg-gray-200 rounded-2xl animate-pulse" />
                </div>
            </div>
        );
    }
    
    // If no offer data, don't render anything
    if (!offer) {
        return null;
    }

    const discount = offer.price && offer.discounted_price
        ? Math.round(((offer.price - offer.discounted_price) / offer.price) * 100)
        : null;

    return (
        <div 
            className={`transition-all duration-300 ease-out ${
                isOpen 
                    ? 'opacity-100 translate-x-0 rotate-0 scale-100' 
                    : 'opacity-0 translate-x-[100px] rotate-180 scale-90 pointer-events-none'
            }`}
        >
            <div className="flex flex-col gap-4">
                {/* Featured Badge - Outside */}
                <div className="flex items-center justify-between">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md">
                        FEATURED OFFER
                    </div>
                    {discount && (
                        <div className="bg-brand text-white text-sm font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-1">
                            <MdOutlineDiscount className="text-base" />
                            {discount}% OFF
                        </div>
                    )}
                </div>

                {/* Product Card */}
                <div className="relative bg-white rounded-3xl w-96 h-[26rem] shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                    {offer.image_url ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={offer.image_url}
                                alt={offer.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            
                            {/* Product Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-xl font-bold leading-tight mb-3 drop-shadow-lg line-clamp-2">{offer.title}</h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-black drop-shadow-lg">₹{offer.discounted_price}</span>
                                    {offer.price && (
                                        <span className="text-base text-white/70 line-through">₹{offer.price}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative w-full h-full bg-gradient-to-br from-brand to-brand-dark flex flex-col items-center justify-center p-8 text-white text-center">
                            <MdOutlineDiscount className="text-7xl mb-4 opacity-20" />
                            <h3 className="text-2xl font-bold leading-tight mb-3 line-clamp-2">{offer.title}</h3>
                            <p className="text-white/80 text-sm mb-6 line-clamp-2">{offer.description}</p>
                            
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-black">₹{offer.discounted_price}</span>
                                {offer.price && (
                                    <span className="text-base text-white/60 line-through">₹{offer.price}</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Buy Now Button - Outside */}
                <a
                    href={`${shopSettings.shopUrl || "https://shop.hopemedicos.org"}/products/${offer.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-brand text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg hover:bg-brand-dark hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-2 group/btn"
                >
                    Buy Now
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300 text-xl">→</span>
                </a>
            </div>
        </div>
    );
}
