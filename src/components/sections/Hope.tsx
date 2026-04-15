'use client';

import { useWebsiteData } from "@/context/WebsiteDataContext";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

const MISSION_LINES = [
  "Bridging the gap between world-class pharmaceutical products and the people who need them most.",
  "विश्व-स्तरीय दवाओं और ज़रूरतमंद लोगों के बीच की दूरी को कम करना।",
  "Your health is our ultimate priority and promise.",
  "आपका स्वास्थ्य हमारी सर्वोच्च प्राथमिकता और वादा है।",
  "Quality healthcare solutions, accessible to everyone.",
  "सभी के लिए सुलभ, गुणवत्तापूर्ण स्वास्थ्य समाधान।",
  "Excellence in pharmaceutical care since 2010.",
  "2010 से फार्मास्युटिकल देखभाल में उत्कृष्टता।",
  "A decade of commitment to community wellness.",
  "सामुदायिक कल्याण के लिए एक दशक की प्रतिबद्धता।"
];

export default function Hope() {
  const { shopSettings, loading, featuredProduct } = useWebsiteData();
  const [lineIndex, setLineIndex] = useState(0);
  const [isFounderHovered, setIsFounderHovered] = useState(false);
  
  const learnMoreRef = useRef<HTMLAnchorElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const [pathData, setPathData] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % MISSION_LINES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Calculate Zig-Zag Path
  useEffect(() => {
    if (!isFounderHovered) return;

    const calculatePath = () => {
      if (!learnMoreRef.current || !founderRef.current) return;

      const learnRect = learnMoreRef.current.getBoundingClientRect();
      const founderRect = founderRef.current.getBoundingClientRect();
      
      // Start directly from below the image center
      const startX = founderRect.left + (founderRect.width / 2); 
      const startY = founderRect.bottom - 180; 

      // End at Learn More button (Bottom Center)
      const endX = learnRect.left + (learnRect.width / 2);
      const endY = learnRect.bottom + 15; 

      // Create a deeper, more dramatic sinuous curve
      // Control Point 1: Deep dip directly down from start
      const cp1X = startX;
      const cp1Y = startY + 300; 

      // Control Point 2: Sweep wide and then rise up to point at the button
      const cp2X = endX;
      const cp2Y = startY + 300; 

      setPathData(`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`);
    };

    calculatePath();
    window.addEventListener('scroll', calculatePath);
    window.addEventListener('resize', calculatePath);
    
    return () => {
      window.removeEventListener('scroll', calculatePath);
      window.removeEventListener('resize', calculatePath);
    };
  }, [isFounderHovered]);

  return (
    <section id="about" className="relative min-h-screen pt-24 pb-20 px-6 bg-white overflow-hidden">
      {/* Zig Zag Connection Line */}
      <AnimatePresence>
        {isFounderHovered && pathData && (
          <svg className="fixed inset-0 w-full h-full pointer-events-none z-[100] overflow-visible">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#f58518" />
              </marker>
            </defs>
            <motion.path
              d={pathData}
              fill="none"
              stroke="#f58518"
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#arrowhead)"
              initial={{ strokeDashoffset: 40, opacity: 0 }}
              animate={{ 
                strokeDashoffset: 0, 
                opacity: 0.6 
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" },
                opacity: { duration: 0.3 }
              }}
            />
            {/* Animated Glow following the line */}
            <motion.circle
              r="4"
              fill="#f58518"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{ offsetPath: `path("${pathData}")`, opacity: 0.4 }}
            />
          </svg>
        )}
      </AnimatePresence>

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
              ref={learnMoreRef}
              className="px-8 py-3.5 border border-black/10 text-black text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm transition-colors duration-200 hover:bg-black/[0.02]"
            >
              Learn more
            </Link>
          </div>
        </div>

        {/* Right Column: Trust & Face Value (Proprietor) */}
        <div 
          ref={founderRef}
          onMouseEnter={() => setIsFounderHovered(true)}
          onMouseLeave={() => setIsFounderHovered(false)}
          className="relative h-[500px] lg:h-[700px] flex items-start justify-end pt-24"
        >          <div className="relative flex flex-col items-center group">
            {/* Stagnant Trust Tagline */}
            <div className="mb-14 text-center">
              <p className="text-xl md:text-2xl font-serif italic text-[#f58518] tracking-tight select-none opacity-80">
                A legacy of care, built on trust.
              </p>
              <div className="w-12 h-[1px] bg-[#f58518]/20 mx-auto mt-2" />
            </div>

            {/* Editorial Frame for the Image */}
            <div className="relative w-64 h-80 md:w-72 md:h-96 shrink-0">
              {/* Artistic Background Shape */}
              <div className="absolute inset-0 bg-[#f58518]/5 -rotate-6 rounded-[40px_10px_40px_10px] transition-transform group-hover:rotate-0 duration-700" />
              
              {/* Main Image Container */}
              <div className="relative w-full h-full overflow-hidden rounded-[40px_10px_40px_10px] border border-black/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                <Image 
                  src="/kkr.jpg" 
                  alt="Krishan Kumar Jangra" 
                  fill
                  priority
                  className="object-cover object-[center_15%] scale-[1.15] transition-transform duration-1000 group-hover:scale-[1.25]"
                />
                
                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* Founder Tag - Floating Editorial Badge */}
              <div className="absolute -bottom-4 -right-4 bg-black text-white px-6 py-4 rounded-sm shadow-2xl z-20">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#f58518] mb-1">Proprietor</p>
                <p className="text-sm font-medium whitespace-nowrap">Krishan Kumar Jangra</p>
              </div>
            </div>

            {/* Signature Quote / Trust Statement (Scrolling) */}
            <div className="mt-12 max-w-[280px] text-center space-y-4">
              <div className="relative min-h-[80px] flex items-center justify-center">
                <span className="absolute -top-4 -left-2 text-4xl text-[#f58518]/20 font-serif leading-none">&ldquo;</span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={lineIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm font-serif italic text-black/80 leading-relaxed"
                  >
                    {MISSION_LINES[lineIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-[1px] bg-[#f58518]/30" />
                <p className="text-[10px] uppercase tracking-[0.15em] text-black/40">Trusted since 2010</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legacy: Today's Featured (Commented)
        <div className="relative h-[500px] lg:h-[600px] flex items-center justify-end">
          {loading ? (
            <div className="w-64 h-80 bg-black/5 animate-pulse" />
          ) : featuredProduct?.imageUrl ? (
            <div className="relative flex flex-col items-center pt-12">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white px-4 py-2">
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-20 h-[1px] bg-[#f58518]" />
                <span className="text-[9px] uppercase tracking-[0.15em] text-black/40 whitespace-nowrap">
                  Today&apos;s Featured
                </span>
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-20 h-[1px] bg-[#f58518]" />
              </div>

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

              {featuredProduct.offerPrice && featuredProduct.price && (
                <div className="absolute top-16 right-4 z-20 bg-[#22c55e] text-white px-3 py-1.5 text-xs font-bold tracking-wide shadow-lg">
                  {Math.round(((featuredProduct.price - featuredProduct.offerPrice) / featuredProduct.price) * 100)}% OFF
                </div>
              )}

              <div className="relative w-64 h-64 mb-6 mt-4 group">
                <Image 
                  src={featuredProduct.imageUrl}
                  alt={featuredProduct.name}
                  fill 
                  priority
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="text-sm font-medium text-black mb-2 text-center max-w-xs line-clamp-2">
                {featuredProduct.name}
              </h3>

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

              <div className="flex items-center gap-2 mb-6">
                <Link
                  href={`${shopSettings.shopUrl || "https://shop.hopemedicos.org"}/products/${featuredProduct.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-[#f58518] text-white text-[10px] uppercase tracking-[0.12em] font-medium hover:bg-[#e07615] transition-all duration-300 cursor-pointer"
                >
                  Buy Now
                </Link>

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
        */}
      </div>
    </section>
  )
}
