"use client"
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbLocation } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import LocateUs from "../ui/LocateUs";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function Navbar() {
    const { shopSettings, loading } = useWebsiteData();
    const pathname = usePathname();
    
    // Pages where the logo text should stay even on scroll
    const keepTitlePages = ['/privacy-policy', '/terms-and-conditions'];
    const keepTitle = keepTitlePages.includes(pathname);
    const sections = [
        { name: "Offers", path: "/" },
        { name: "Initiatives", path: "#initiatives" },
        { name: "Blog", path: "/updates" },
    ]
    const [activeSection, setActiveSection] = useState("/");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = `#${entry.target.id}`
                        setActiveSection(id);
                    }
                });
            },
            {
                rootMargin: "-50% 0px -50% 0px",
                threshold: 0,
            }
        );

        const sectionEls = document.querySelectorAll("section[id]");
        sectionEls.forEach((el) => observer.observe(el));

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            sectionEls.forEach((el) => observer.disconnect());
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* Floating Navigation */}
            <motion.nav 
                layout
                initial={false}
                animate={{
                    top: isScrolled ? 16 : 0,
                    width: isScrolled ? "auto" : "100%",
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Smooth custom cubic bezier
                className="fixed left-1/2 -translate-x-1/2 z-50 will-change-transform"
            >
                <motion.div 
                    layout
                    className={`relative overflow-hidden border border-black/5 ${
                        isScrolled 
                            ? 'backdrop-blur-xl bg-white/10 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.12)] border-white/30 px-6 h-14' 
                            : 'bg-white/0 backdrop-blur-lg border-b h-16 w-full'
                    }`}
                >
                    <div className={`flex items-center justify-between h-full max-w-7xl mx-auto ${
                        isScrolled ? 'gap-8' : 'px-6'
                    }`}>

                            {/* Logo Section */}
                            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                                <motion.div layout>
                                    <Image 
                                        src="/hope_logo_cropped.png" 
                                        alt="Hope Medicos" 
                                        width={44} 
                                        height={32} 
                                        className={`${isScrolled ? 'h-7' : 'h-8'} w-auto object-contain transition-all duration-500 group-hover:scale-110`}
                                        priority
                                    />
                                </motion.div>
                                <motion.span 
                                    initial={false}
                                    animate={{ 
                                        opacity: (isScrolled && !keepTitle) ? 0 : 1,
                                        width: (isScrolled && !keepTitle) ? 0 : "auto",
                                        marginLeft: (isScrolled && !keepTitle) ? 0 : 4,
                                        display: (isScrolled && !keepTitle) ? "none" : "flex"
                                    }}
                                    transition={{ duration: 0.6 }}
                                    className="text-xl font-medium tracking-tight text-black overflow-hidden whitespace-nowrap items-center"
                                >
                                    Hope Medicos
                                </motion.span>
                            </Link>

                            {/* Desktop Menu Items */}
                            <div className="hidden lg:flex items-center gap-8">
                                {sections.map((section, idx) => (
                                    <Link
                                        key={idx}
                                        href={section.path}
                                        className={`relative text-xs uppercase tracking-[0.12em] font-normal transition-colors pb-1 ${
                                            activeSection === section.path
                                                ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#f58518]"
                                                : "text-black/50 hover:text-[#f58518]"
                                        }`}
                                    >
                                        {section.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Right side: Locate Us + Shop */}
                            <div className="hidden lg:flex items-center">
                                {/* Actions Area */}
                                <motion.div 
                                    layout
                                    className="flex items-center gap-4"
                                >
                                    {/* Desktop Text Links (Visible when NOT scrolled) */}
                                    <motion.div 
                                        animate={{ opacity: isScrolled ? 0 : 1, x: isScrolled ? 20 : 0, display: isScrolled ? "none" : "flex" }}
                                        className="flex items-center gap-4 whitespace-nowrap"
                                    >
                                        <LocateUs />
                                        <Link
                                            href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
                                            className="text-xs uppercase tracking-[0.12em] font-normal text-black/50 hover:text-[#f58518] transition-colors"
                                        >
                                            Shop
                                        </Link>
                                    </motion.div>

                                    {/* Compact Icons (Visible when scrolled) */}
                                    <motion.div 
                                        animate={{ opacity: isScrolled ? 1 : 0, scale: isScrolled ? 1 : 0.8, display: isScrolled ? "flex" : "none" }}
                                        className="flex items-center gap-3"
                                    >
                                        <button 
                                            onClick={() => window.open(`https://www.google.com/maps/dir//Hope+Medicos+(A+Unit+of+GlobalHope+Biotech+OPC+Private+Limited),+near+Sarvodya+Hospital,+opp.+Red+Cross+Delhi+Road,+Bank+Colony,+Urban+Estate+II,+Hisar,+Haryana+125001/@29.1409169,75.5271844,61152m/data=!3m1!1e3!4m16!1m7!3m6!1s0x3912333e978e712d:0x40b39f644e6f74c9!2sHope+Medicos+(A+Unit+of+GlobalHope+Biotech+OPC+Private+Limited)!8m2!3d29.1409796!4d75.733467!16s%2Fg%2F11f_0vryzn!4m7!1m0!1m5!1m1!1s0x3912333e978e712d:0x40b39f644e6f74c9!2m2!1d75.733467!2d29.1409796?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D`, "_blank")}
                                            className="p-2 bg-black/5 hover:bg-[#f58518] hover:text-white rounded-full transition-all duration-300"
                                            title="Your Location is auto set!"
                                        >
                                            <TbLocation className="text-lg" />
                                        </button>
                                        <Link
                                            href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
                                            className="p-2 bg-black/5 hover:bg-[#f58518] hover:text-white rounded-full transition-all duration-300"
                                            title="Shop"
                                        >
                                            <HiOutlineShoppingBag className="text-lg" />
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Mobile Menu Button - minimal × grid icon */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 text-black transition-colors"
                            >
                                {isMobileMenuOpen ? (
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
                                        <line x1="4" y1="4" x2="16" y2="16" />
                                        <line x1="16" y1="4" x2="4" y2="16" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
                                        <line x1="3" y1="6" x2="17" y2="6" />
                                        <line x1="3" y1="10" x2="17" y2="10" />
                                        <line x1="3" y1="14" x2="17" y2="14" />
                                    </svg>
                                )}
                            </button>

                    </div>
                </motion.div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/10 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-black/5">
                        <div className="flex flex-col py-2">
                            {sections.map((section, idx) => (
                                <Link
                                    key={idx}
                                    href={section.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-6 py-4 text-xs uppercase tracking-[0.12em] transition-colors ${
                                        activeSection === section.path
                                            ? "text-black font-medium bg-black/5"
                                            : "text-black/60 hover:text-black hover:bg-black/5"
                                    }`}
                                >
                                    {section.name}
                                </Link>
                            ))}
                            <div className="px-6 py-4 border-t border-black/5 flex items-center justify-between">
                                <LocateUs />
                                <Link
                                    href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
                                    className="text-xs uppercase tracking-[0.12em] text-black/60"
                                >
                                    Shop
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
