'use client';

import Image from "next/image";
import { AiFillShop } from "react-icons/ai";
import { CgShoppingBag } from "react-icons/cg";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function ShopNow() {
    const { texts, shopSettings, loading } = useWebsiteData();

    if (loading) return null;

    return (
        <section id="shopnow" className="min-h-screen relative bg-[linear-gradient(to_bottom,_#ffffff,_var(--brand-light))] px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center justify-center">
            <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 w-full max-w-6xl flex items-center justify-between opacity-90 px-4">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <div key={idx} className="relative">
                        {/* Light image */}
                        <Image 
                            src="/light.svg" 
                            alt="decorative light" 
                            width={70} 
                            height={70} 
                            className="select-none relative z-20 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28" 
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* Heading */}
            <h2 className="text-center text-brand text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight relative z-10 px-4 max-w-6xl">
                {texts.shopNowTitle || "Healthcare for Everyone, Everywhere"}
            </h2>

            {/* Subheading */}
            <p className="mt-4 sm:mt-6 max-w-5xl text-center text-black/70 text-lg sm:text-xl lg:text-2xl leading-relaxed relative z-10 px-4">
                {texts.shopNowSubtitle || "Whether you're a customer seeking trusted over-the-counter medicines or a business in need of reliable wholesale supply, Hope Medicos is here to serve. Quality, affordability, and care — all under one roof."}
            </p>

            {/* CTAs */}
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative z-10 px-4 w-full sm:w-auto">
                <a
                    href="https://wa.me/919812080390"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-brand text-white px-8 py-4 rounded-2xl text-lg sm:text-xl font-bold shadow-2xl w-full sm:w-auto justify-center hover:bg-brand-dark hover:scale-105 transition-all duration-300"
                >
                    <AiFillShop className="text-2xl" />
                    <span>{texts.wholesaleCtaText || "Wholesale Enquiries"}</span>
                </a>
                
                <div className="hidden sm:block h-12 w-px bg-brand/30"></div>
                
                <a
                    href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-brand text-white px-8 py-4 rounded-2xl text-lg sm:text-xl font-bold shadow-2xl w-full sm:w-auto justify-center hover:bg-brand-dark hover:scale-105 transition-all duration-300"
                >
                    <CgShoppingBag className="text-2xl" />
                    <span>{texts.shopOnlineCtaText || "Shop Online"}</span>
                </a>

                <div className="hidden sm:block h-12 w-px bg-brand/30"></div>

                <a
                    href="https://maps.google.com/?q=Hope+Medicos+Hisar+Haryana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-brand text-white px-8 py-4 rounded-2xl text-lg sm:text-xl font-bold shadow-2xl w-full sm:w-auto justify-center hover:bg-brand-dark hover:scale-105 transition-all duration-300"
                >
                    <CgShoppingBag className="text-2xl" />
                    <span>{texts.shopOtcCtaText || "Visit Store (OTC)"}</span>
                </a>
            </div>
        </section>
    )
}