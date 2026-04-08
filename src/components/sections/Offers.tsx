'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
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
  const { offerProducts, loading: contextLoading, shopSettings } = useWebsiteData();
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const loadOffers = async () => {
      setLoading(true);

      try {
        if (offerProducts && offerProducts.length > 0) {
          const mappedOffers = offerProducts.map(p => ({
            id: p.id,
            title: p.name,
            description: p.description,
            image_url: p.imageUrl || (p.images && p.images[0]) || "",
            created_at: p.created_at || new Date().toISOString(),
            price: p.price,
            discounted_price: p.offerPrice || p.discounted_price
          }));
          setOffers(mappedOffers);
        } else {
          setOffers([]);
        }
      } catch (error: any) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!contextLoading) {
      loadOffers();
    }
  }, [offerProducts, contextLoading]);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [offers]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  if (!loading && !contextLoading && offers.length === 0) return null;

  return (
    <section className="bg-[#faf9f7] py-12 px-6 border-y border-black/5">
      <div className="max-w-7xl mx-auto">
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-medium tracking-[-0.02em] text-black mb-1">
              Today's <span className="font-serif italic font-light">Offers</span>
            </h2>
            <p className="text-xs uppercase tracking-[0.12em] text-black/40">
              {(loading || contextLoading) ? (
                <span className="inline-block h-3 w-24 bg-[#f58518]/10 animate-pulse rounded" />
              ) : (
                `${offers.length} Special Deals`
              )}
            </p>
          </div>

          {/* Scroll Navigation Buttons */}
          {(!loading && !contextLoading && offers.length > 3) && (
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'border-[#f58518] text-[#f58518] hover:bg-[#f58518] hover:text-white'
                    : 'border-black/10 text-black/20 cursor-not-allowed'
                }`}
                aria-label="Scroll left"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 4l-8 6 8 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'border-[#f58518] text-[#f58518] hover:bg-[#f58518] hover:text-white'
                    : 'border-black/10 text-black/20 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 4l8 6-8 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {(loading || contextLoading) ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0 w-[280px] snap-start mb-4">
                  {/* Product Image Skeleton */}
                  <div className="relative aspect-square bg-[#f58518]/5 mb-4 rounded-lg animate-pulse border border-black/5" />
                  
                  {/* Label Skeleton */}
                  <div className="h-2 w-16 bg-[#f58518]/10 rounded animate-pulse mb-3" />
                  
                  {/* Title Skeleton */}
                  <div className="h-4 w-48 bg-[#f58518]/10 rounded animate-pulse mb-2" />
                  <div className="h-4 w-32 bg-[#f58518]/10 rounded animate-pulse mb-4" />
                  
                  {/* Price Skeleton */}
                  <div className="h-6 w-24 bg-[#f58518]/10 rounded animate-pulse mb-5" />
                  
                  {/* Button Skeleton */}
                  <div className="h-[38px] w-full bg-[#f58518]/10 rounded-full animate-pulse" />
                </div>
              ))
            ) : (
              offers.map((offer) => {
                const discount = offer.price && offer.discounted_price
                  ? Math.round(((offer.price - offer.discounted_price) / offer.price) * 100)
                  : null;

                return (
                  <div
                    key={offer.id}
                    className="flex-shrink-0 w-[280px] snap-start group"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square bg-white mb-4 overflow-hidden border border-black/5 rounded-lg">
                      {offer.image_url && (
                        <Image
                          src={offer.image_url}
                          alt={offer.title}
                          fill
                          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      {/* Discount Badge */}
                      {discount && (
                        <div className="absolute top-3 right-3 bg-[#f58518] text-white text-xs font-medium px-2 py-1 rounded-full">
                          {discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Muted label */}
                    <p className="text-[10px] uppercase tracking-[0.15em] text-black/40 mb-2">
                      {discount ? 'Flash deal' : 'Special offer'}
                    </p>

                    {/* Product name */}
                    <h3 className="text-sm font-medium text-black mb-3 line-clamp-2 min-h-[2.5rem]">
                      {offer.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-lg font-medium text-black">
                        ₹{offer.discounted_price}
                      </span>
                      {offer.price && (
                        <span className="text-sm text-black/40 line-through">
                          ₹{offer.price}
                        </span>
                      )}
                    </div>

                    {/* Buy Now Button */}
                    <a
                      href={`${shopSettings.shopUrl || "https://shop.hopemedicos.org"}/products/${offer.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-4 py-2.5 bg-[#f58518] text-white text-xs uppercase tracking-[0.12em] font-medium hover:bg-[#e07615] transition-all rounded-full shadow-md hover:shadow-lg"
                    >
                      Buy Now
                    </a>
                  </div>
                );
              })
            )}
          </div>

          {/* Scroll Indicators (optional gradient fade) */}
          {offers.length > 3 && (
            <>
              {canScrollLeft && (
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#faf9f7] to-transparent pointer-events-none" />
              )}
              {canScrollRight && (
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#faf9f7] to-transparent pointer-events-none" />
              )}
            </>
          )}
        </div>

        {/* View All Link */}
        <div className="mt-8 text-center">
          <a
            href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm uppercase tracking-[0.12em] text-[#f58518] hover:text-[#e07615] underline hover:no-underline font-medium transition-colors"
          >
            View All Products →
          </a>
        </div>
      </div>
    </section>
  )
}
