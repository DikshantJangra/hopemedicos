'use client';

import { useWebsiteData } from "@/context/WebsiteDataContext";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function Hope() {
  const { shopSettings, loading, featuredProduct } = useWebsiteData();

  return (
    <section id="about" className="relative min-h-screen pt-24 pb-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Column: Editorial Headline */}
        <div className="flex flex-col space-y-8">
          {/* Eyebrow with rule line */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-black/20" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-black/40">
              Trusted since 2010
            </span>
          </div>

          {/* Large editorial heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-[-0.02em] text-black">
            Your everyday health,{' '}
            <span className="font-serif italic font-light text-[#f58518]">simply</span> covered.
          </h1>
          
          <p className="text-base text-black/60 max-w-lg leading-relaxed">
            Over-the-counter medicines, health products, and community care — all in one place.
          </p>

          {/* Simple Minimal Buttons - No shadows, no complex hover */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
              className="px-8 py-3.5 bg-[#f58518] text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm transition-opacity duration-200 hover:opacity-90"
            >
              Shop now
            </Link>
            <Link 
              href="/about"
              className="px-8 py-3.5 border border-black/10 text-black text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm transition-colors duration-200 hover:bg-black/[0.02]"
            >
              Learn more
            </Link>
          </div>
        </div>

        {/* Right Column: Minimal Product Showcase */}
        <div className="relative h-[500px] lg:h-[600px] flex items-center justify-end">
          {loading ? (
            <div className="w-64 h-80 bg-black/5 animate-pulse" />
          ) : featuredProduct?.imageUrl ? (
            <div className="relative flex flex-col items-center pt-12">
              {/* Label at Top - Outside the box */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white px-4 py-2">
                {/* Left extending line */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-20 h-[1px] bg-[#f58518]" />
                
                <span className="text-[9px] uppercase tracking-[0.15em] text-black/40 whitespace-nowrap">
                  Today&apos;s Featured
                </span>
                
                {/* Right extending line that connects to discount badge */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-20 h-[1px] bg-[#f58518]" />
              </div>

              {/* Animated Dashed Border around entire product */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  fill="none"
                  stroke="#f58518"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  strokeDashoffset="0"
                  opacity="0.4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="16"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>

              {/* Discount Badge - Over the image top right */}
              {featuredProduct.offerPrice && featuredProduct.price && (
                <div className="absolute top-16 right-4 z-20 bg-[#22c55e] text-white px-3 py-1.5 text-xs font-bold tracking-wide shadow-lg">
                  {Math.round(((featuredProduct.price - featuredProduct.offerPrice) / featuredProduct.price) * 100)}% OFF
                </div>
              )}

              {/* Product Image - Free floating */}
              <div className="relative w-64 h-64 mb-6 mt-4 group">
                <Image 
                  src={featuredProduct.imageUrl}
                  alt={featuredProduct.name}
                  fill 
                  priority
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-sm font-medium text-black mb-2 text-center max-w-xs line-clamp-2">
                {featuredProduct.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-medium text-black">
                  ₹{featuredProduct.offerPrice || featuredProduct.price}
                </span>
                {featuredProduct.offerPrice && featuredProduct.price && (
                  <span className="text-sm text-black/40 line-through">
                    ₹{featuredProduct.price}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mb-6">
                {/* Buy Now Button */}
                <Link
                  href={`${shopSettings.shopUrl || "https://shop.hopemedicos.org"}/products/${featuredProduct.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-[#f58518] text-white text-[10px] uppercase tracking-[0.12em] font-medium hover:bg-[#e07615] transition-all duration-300 cursor-pointer"
                >
                  Buy Now
                </Link>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/${shopSettings.supportPhone?.replace(/[^0-9]/g, '') || '919812080390'}?text=${encodeURIComponent(`Hi, I'm interested in ${featuredProduct.name} (₹${featuredProduct.offerPrice || featuredProduct.price})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 bg-[#f58518] text-white rounded-full hover:bg-[#25D366] transition-all group/wa"
                  title="Chat on WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4 transition-transform group-hover/wa:scale-110" />
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
