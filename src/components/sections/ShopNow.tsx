'use client';

import { useWebsiteData } from "@/context/WebsiteDataContext";
import { FiArrowRight, FiMapPin, FiMessageSquare } from "react-icons/fi";

export default function ShopNow() {
    const { shopSettings, loading } = useWebsiteData();

    return (
        <section id="shopnow" className="bg-white px-6 py-40 border-t border-black/5">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                {/* Editorial heading */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-[1px] bg-[#f58518]" />
                        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#f58518]">
                            Our mission
                        </span>
                        <div className="w-8 h-[1px] bg-[#f58518]" />
                    </div>
                </div>

                {/* Quote-style centered headline with italic */}
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.04em] text-black leading-[0.95]">
                    Healthcare for{' '}
                    <span className="font-serif italic font-light text-[#f58518]">everyone</span>,{' '}
                    everywhere.
                </h2>

                <p className="text-lg text-black/60 max-w-2xl mx-auto leading-relaxed font-light">
                    Whether you&apos;re a customer or a business — we bring quality, affordability, and care under one roof.
                </p>

                {/* High-Impact Hierarchical Layout: 1 Primary Top, 2 Secondary Bottom */}
                <div className="flex flex-col items-center gap-12 pt-4">
                    {/* Primary Action (Top) */}
                    <a
                        href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-12 py-5 bg-[#f58518] text-white text-[11px] uppercase tracking-[0.25em] font-bold rounded-full transition-all duration-300 hover:opacity-95 hover:shadow-xl hover:shadow-[#f58518]/10 flex items-center gap-3 active:scale-[0.98]"
                    >
                        Shop online 
                        <FiArrowRight className="w-4 h-4" />
                    </a>
                    
                    {/* Secondary Actions (Bottom Row) */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                        <a
                            href="https://wa.me/919812080390"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 hover:text-black transition-colors duration-200"
                        >
                            <FiMessageSquare className="w-4 h-4 text-[#f58518]" />
                            Wholesale enquiries
                        </a>
                        
                        <div className="hidden sm:block w-[1px] h-4 bg-black/10" />
                        
                        <a
                            href="https://www.google.com/maps/dir//Hope+Medicos+(A+Unit+of+GlobalHope+Biotech+OPC+Private+Limited),+near+Sarvodya+Hospital,+opp.+Red+Cross+Delhi+Road,+Bank+Colony,+Urban+Estate+II,+Hisar,+Haryana+125001"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 hover:text-black transition-colors duration-200"
                            title="Your Location is auto set!"
                        >
                            <FiMapPin className="w-4 h-4 text-[#f58518]" />
                            Visit our store
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
