'use client';

import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function ShopNow() {
    const { shopSettings, loading } = useWebsiteData();


    return (
        <section id="shopnow" className="bg-white px-6 py-32">
            <div className="max-w-4xl mx-auto text-center">
                {/* Editorial heading */}
                <div className="mb-4">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-black/40 mb-8">
                        Our mission
                    </p>
                </div>

                {/* Quote-style centered headline with italic */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.02em] text-black leading-[1.05] mb-6">
                    Healthcare for{' '}
                    <span className="font-serif italic font-light">everyone</span>,{' '}
                    everywhere.
                </h2>

                <p className="text-base text-black/60 mb-12 max-w-2xl mx-auto">
                    Whether you're a customer or a business — quality, affordability, and care. All under one roof.
                </p>

                {/* Three buttons - two ghost, one solid */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://wa.me/919812080390"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border-2 border-[#f58518] text-black text-xs uppercase tracking-[0.12em] font-normal hover:bg-[#f58518] hover:text-white transition-all w-full sm:w-auto text-center"
                    >
                        Wholesale enquiries
                    </a>
                    
                    <a
                        href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-[#f58518] text-white text-xs uppercase tracking-[0.12em] font-normal hover:bg-[#e07615] transition-all w-full sm:w-auto text-center shadow-lg hover:shadow-xl"
                    >
                        Shop online
                    </a>
                    
                    <a
                        href="https://www.google.com/maps/dir//Hope+Medicos+(A+Unit+of+GlobalHope+Biotech+OPC+Private+Limited),+near+Sarvodya+Hospital,+opp.+Red+Cross+Delhi+Road,+Bank+Colony,+Urban+Estate+II,+Hisar,+Haryana+125001/@29.1409169,75.5271844,61152m/data=!3m1!1e3!4m16!1m7!3m6!1s0x3912333e978e712d:0x40b39f644e6f74c9!2sHope+Medicos+(A+Unit+of+GlobalHope+Biotech+OPC+Private+Limited)!8m2!3d29.1409796!4d75.733467!16s%2Fg%2F11f_0vryzn!4m7!1m0!1m5!1m1!1s0x3912333e978e712d:0x40b39f644e6f74c9!2m2!1d75.733467!2d29.1409796?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border-2 border-[#f58518] text-black text-xs uppercase tracking-[0.12em] font-normal hover:bg-[#f58518] hover:text-white transition-all w-full sm:w-auto text-center"
                        title="Your Location is auto set!"
                    >
                        Visit store
                    </a>
                </div>
            </div>
        </section>
    )
}
