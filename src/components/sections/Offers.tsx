'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function Offers() {
  const { offerProducts, loading: contextLoading, shopSettings } = useWebsiteData();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
    }
    return () => {
      if (container) container.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, [offerProducts]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!contextLoading && (!offerProducts || offerProducts.length === 0)) {
    return null;
  }

  return (
    <section className="bg-white py-8 px-6 border-t border-black/5">
      <div className="max-w-[1500px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-medium tracking-[-0.02em] text-black mb-1">
              Featured <span className="font-serif italic font-light opacity-40">Today</span>
            </h2>
            <p className="text-xs uppercase tracking-[0.12em] text-black/40">
              {contextLoading ? (
                <span className="inline-block h-3 w-24 bg-[#f58518]/10 animate-pulse rounded" />
              ) : (
                `${offerProducts.length} Special Deals`
              )}
            </p>
          </div>

          {/* Navigation Arrows - Always visible if more than 5 products */}
          {!contextLoading && offerProducts.length > 5 && (
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
                aria-label="Scroll left"
              >
                <HiChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
                aria-label="Scroll right"
              >
                <HiChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {contextLoading ? (
              // Skeletons
              [...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="flex-shrink-0 w-[240px] bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
                >
                  <div className="w-full h-[200px] bg-gray-100 rounded mb-3" />
                  <div className="h-3 w-full bg-gray-100 rounded mb-2" />
                  <div className="h-3 w-2/3 bg-gray-100 rounded mb-3" />
                  <div className="h-4 w-1/2 bg-gray-100 rounded mb-3" />
                  <div className="h-9 w-full bg-gray-100 rounded" />
                </div>
              ))
            ) : (
              offerProducts.map((product: any) => {
                const productId = product.id;
                const savings = product.savings || (product.price - (product.offerPrice || product.discounted_price || product.price));
                const savingsPercent = product.savingsPercent || (product.price ? ((savings / product.price) * 100).toFixed(0) : "0");
                const hasOffer = product.offerPrice || product.discounted_price;

                return (
                  <div
                    key={productId}
                    className="flex-shrink-0 w-[240px] bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-gray-300 group relative flex flex-col"
                  >
                    {/* Discount Badge */}
                    {hasOffer && (
                      <div className="absolute top-2 left-2 z-10">
                        <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {savingsPercent}% off
                        </div>
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative w-full h-[200px] mb-3 flex items-center justify-center bg-white">
                      <Image
                        src={product.imageUrl || (product.images && product.images[0]) || "/placeholder-medicine.png"}
                        alt={product.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>

                    {/* Product Name */}
                    <h3 className="text-sm text-gray-900 line-clamp-2 mb-2 min-h-[40px] leading-tight">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-2">
                      {hasOffer ? (
                        <>
                          <span className="text-lg font-semibold text-gray-900">
                            ₹{product.offerPrice || product.discounted_price}
                          </span>
                          <span className="text-xs text-gray-500 line-through">
                            ₹{product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-semibold text-gray-900">
                          ₹{product.price}
                        </span>
                      )}
                    </div>

                    {/* Rating placeholder (optional) */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-yellow-400 text-xs">
                        ★★★★☆
                      </div>
                      <span className="text-xs text-gray-500">(4.0)</span>
                    </div>

                    {/* Buy Now Button */}
                    <a
                      href={`${shopSettings.shopUrl || "https://shop.hopemedicos.org"}/products/${productId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full text-center px-4 py-2.5 bg-[#f58518] text-white text-xs font-semibold hover:bg-[#e07615] transition-all rounded-md shadow-sm hover:shadow active:scale-95"
                    >
                      Buy Now
                    </a>
                  </div>
                );
              })
            )}
          </div>

          {/* Gradient Overlays for scroll indication */}
          {!contextLoading && offerProducts.length > 5 && (
            <>
              {canScrollLeft && (
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
              )}
              {canScrollRight && (
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
              )}
            </>
          )}
        </div>

        {/* View All Link */}
        <div className="mt-4 text-center">
          <a
            href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#f58518] hover:text-[#e07615] hover:underline"
          >
            See more
          </a>
        </div>
      </div>
    </section>
  )
}
