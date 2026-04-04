'use client';

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import { useState, useEffect } from 'react';
import { useWebsiteData } from "@/context/WebsiteDataContext";

interface OfferDisplay {
    id: string;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    price?: number;
    discounted_price?: number;
}

export default function Offers() {
    const [offers, setOffers] = useState<OfferDisplay[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { texts, loading: contextLoading, offerProducts, shopSettings } = useWebsiteData();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOffers = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log('🔍 Offers Component - offerProducts from context:', offerProducts);
                
                // Priority 1: Use featured offer products from context (from websiteConfig)
                if (offerProducts && offerProducts.length > 0) {
                    console.log('✅ Using offerProducts from context:', offerProducts);
                    const mappedOffers = offerProducts.map(p => {
                        console.log('📦 Mapping product:', p);
                        return {
                            id: p.id,
                            title: p.name,
                            description: p.description,
                            image_url: p.imageUrl || (p.images && p.images[0]) || "",
                            created_at: p.created_at || new Date().toISOString(),
                            price: p.price,
                            discounted_price: p.offerPrice || p.discounted_price
                        };
                    });
                    console.log('✨ Mapped offers:', mappedOffers);
                    setOffers(mappedOffers);
                    setLoading(false);
                    return;
                }

                console.log('⚠️ No offerProducts in context, trying fetchLatestOffers...');
                // Priority 2: Fallback - show empty if no featured offers
                setOffers([]);
            } catch (error: any) {
                console.error("Error fetching offers:", error);
                setError(error.message || "Failed to fetch offers");
            } finally {
                setLoading(false);
            }
        };

        if (!contextLoading) {
            console.log('🚀 Loading offers... contextLoading:', contextLoading);
            loadOffers();
        }
    }, [offerProducts, contextLoading]);

    return (
        <section id="offers" className="min-h-screen bg-white relative py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2 items-center text-black/80 py-2 px-4 backdrop-blur-md rounded-lg w-fit text-sm sm:text-base bg-white/60 border border-white/40 shadow-sm">
                        <MdOutlineDiscount />
                        <p>{texts.offersTitle || "Today's Offers"}</p>
                    </div>
                    <a
                        href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-brand text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-brand-dark hover:shadow-lg transition-all duration-300"
                    >
                        Visit Shop →
                    </a>
                </div>

                {(loading || contextLoading) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md">
                                <div className="aspect-square bg-gray-200 animate-pulse" />
                                <div className="p-4 space-y-3">
                                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {error && (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-red-500 mb-2">Unable to load offers</p>
                            <p className="text-gray-500 text-sm">Please check Firebase configuration</p>
                        </div>
                    </div>
                )}
                
                {!loading && !contextLoading && !error && offers.length === 0 && (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <p className="text-center text-gray-500">No offers available at the moment.</p>
                    </div>
                )}

                {/* Offers Grid */}
                {offers.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {offers.map((offer) => {
                            const discount = offer.price && offer.discounted_price
                                ? Math.round(((offer.price - offer.discounted_price) / offer.price) * 100)
                                : null;

                            return (
                                <div key={offer.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                                    {/* Product Image */}
                                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                                        {offer.image_url && (
                                            <Image
                                                src={offer.image_url}
                                                alt={offer.title}
                                                fill
                                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                            />
                                        )}
                                        {/* Discount Badge */}
                                        {discount && (
                                            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                {discount}% OFF
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4">
                                        <h3 className="text-base font-bold text-black mb-2 line-clamp-2 min-h-[3rem]">
                                            {offer.title}
                                        </h3>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className="text-[#F5B301] text-xs" />
                                            ))}
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-2xl font-black text-brand">
                                                ₹{offer.discounted_price}
                                            </span>
                                            {offer.price && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    ₹{offer.price}
                                                </span>
                                            )}
                                        </div>

                                        {/* Buy Button */}
                                        <a
                                            href={`${shopSettings.shopUrl || "https://shop.hopemedicos.org"}/products/${offer.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full block text-center bg-brand text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-brand-dark hover:shadow-lg transition-all duration-300"
                                        >
                                            Buy Now
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}