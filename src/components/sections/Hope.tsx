'use client';

import { useState } from "react";
import { AiOutlineShop } from "react-icons/ai"
import { CgShoppingBag } from "react-icons/cg"
import { MdOutlineDiscount } from "react-icons/md"
import WeeklyOffer from "../ui/WeeklyOffer"
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function Hope() {
    const [showOffer, setShowOffer] = useState(true);
    const { texts, shopSettings, loading } = useWebsiteData();

    if (loading) {
        return (
            <section className="min-h-screen w-full bg-brand-light flex items-center justify-center">
                <div className="animate-pulse text-brand font-bold text-2xl">LOADING HOPE...</div>
            </section>
        );
    }

    return (
        <section id="hope" className="min-h-screen w-full bg-[linear-gradient(to_bottom,_var(--brand-light)_-20%,_#ffffff_80%)] grid grid-cols-1 lg:grid-cols-[60%_40%] pl-4 sm:pl-6 pr-4 sm:pr-6 pt-6 sm:pt-8 lg:pt-4">
            <div className="relative z-10 flex flex-col pt-20 sm:pt-28 lg:pt-40 w-full">
                <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex gap-2 items-center text-black/80 py-1 px-2 backdrop-blur-md rounded-lg w-fit text-sm sm:text-base bg-white/60 border border-white/40 shadow-sm">
                        <AiOutlineShop />
                        <p>{shopSettings.siteName || "Hope Medicos"}</p>
                    </div>
                </div>

                <h1 className="pt-6 text-brand font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                    {texts.heroTitle || "Your everyday health needs,"} <span className="text-black/80">{texts.heroSubtitle || "covered."}</span>
                </h1>

                <div className="flex flex-wrap gap-3 sm:gap-4 mt-10">
                    <a
                        href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl text-sm sm:text-base font-bold shadow-lg hover:bg-brand-dark hover:scale-105 transition-all duration-300"
                    >
                        <CgShoppingBag className="text-xl" />
                        {texts.heroButtonText || "Shop Now"}
                    </a>
                    <button
                        onClick={() => setShowOffer(!showOffer)}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm sm:text-base font-bold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer ${showOffer ? 'bg-brand text-white' : 'bg-white/40 backdrop-blur-md text-brand border border-white/40 hover:bg-white/60'}`}
                    >
                        <MdOutlineDiscount className="text-lg" />
                        Today&apos;s Offers
                    </button>
                </div>
            </div>

            {/* Right side: offer card slides in here */}
            <div className="relative z-0 flex flex-col justify-center items-center mt-12 sm:mt-16 lg:mt-0">
                <WeeklyOffer isOpen={showOffer} />
            </div>
        </section>
    )
}