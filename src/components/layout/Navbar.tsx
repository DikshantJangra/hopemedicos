"use client"
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbLocation, TbNews, TbPhone, TbBolt } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import LocateUs from "../ui/LocateUs";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { usePathCoordinates } from "@/hooks/usePathCoordinates";

export default function Navbar() {
    const { shopSettings } = useWebsiteData();
    const pathname = usePathname();

    // Pages where the logo text should stay even on scroll
    const keepTitlePages = ['/privacy-policy', '/terms-and-conditions', '/about', '/updates'];
    const keepTitle = keepTitlePages.includes(pathname);
    const sections = useMemo(() => [
        { name: "Latest", path: "/#community-updates" },
        { name: "Initiatives", path: "/#mission" },
        { name: "Mission", path: "/#mission-statement" },
    ], []);
    const [activeSection, setActiveSection] = useState("/");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Sinuous Navigator state & refs
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const locateRef = useRef<HTMLElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const [isLocateHovered, setIsLocateHovered] = useState(false);
    const { path: snakePath, clipRect } = usePathCoordinates(svgRef, logoRef, locateRef, isScrolled, isLocateHovered);

    // Stable callback ref — always points to whichever Locate button is in the DOM.
    // This prevents the ref from going null mid-transition when AnimatePresence swaps elements.
    const locateCallbackRef = (el: HTMLElement | null) => {
        (locateRef as React.MutableRefObject<HTMLElement | null>).current = el;
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = `/#${entry.target.id}`;
                        // Map section IDs to their respective paths
                        let mappedPath = id;
                        if (id === '/#community-updates') mappedPath = '/#community-updates';
                        if (id === '/#mission') mappedPath = '/#mission';
                        if (id === '/#mission-statement') mappedPath = '/#mission-statement';
                        
                        if (sections.some(s => s.path === mappedPath)) {
                            setActiveSection(mappedPath);
                        }
                    }
                });
            },
            {
                rootMargin: "-20% 0px -70% 0px",
                threshold: 0,
            }
        );

        const sectionEls = document.querySelectorAll("section[id]");
        sectionEls.forEach((el) => observer.observe(el));

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            sectionEls.forEach((el) => observer.unobserve(el));
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname, sections]);

    // Update active section based on current path
    useEffect(() => {
        if (pathname === '/') {
            if (!window.location.hash) {
                setActiveSection('/');
            }
        }
    }, [pathname]);

    // Stagger variants for mobile menu items
    const menuContainerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const menuItemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -10 }
    };

    return (
        <>
            {/* Top Utility Bar - Hides on scroll */}
            <AnimatePresence>
                {!isScrolled && (
                    <motion.div 
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-0 left-0 right-0 z-[60] h-10 bg-[#f58518] text-white overflow-hidden hidden md:block"
                    >
                        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.12em]">
                            <div className="flex items-center gap-4">
                                <Link href="/#offers" className="flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                                    <TbBolt className="text-sm animate-pulse" />
                                    Special Offers
                                </Link>
                                <Link href="/updates" className="flex items-center gap-2 px-4 py-1.5 hover:bg-white/10 rounded-full transition-all">
                                    <TbNews className="text-sm" />
                                    Latest Updates
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <a href="tel:+919812080390" className="flex items-center gap-2 px-4 py-1.5 hover:bg-white/10 rounded-full transition-all">
                                    <TbPhone className="text-sm" />
                                    Support: +91 98120 80390
                                </a>
                            </div>
                        </div>
                        {/* Merging Gas Effect */}
                        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[1px] animate-pulse" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Navigation */}
            <motion.nav 
                initial={false}
                animate={{
                    top: isScrolled ? 16 : 40,
                }}
                transition={{ 
                    duration: 0.5, 
                    ease: [0.16, 1, 0.3, 1]
                }} 
                className={`fixed left-0 right-0 z-50 will-change-transform flex justify-center pointer-events-none px-4 transition-all duration-500`}
            >
                {/* Localized Gas particle glow - attached to the pill itself */}
                {!isScrolled && (
                    <div className="absolute inset-0 flex justify-center pointer-events-none">
                        <div className="w-full max-w-md h-full bg-[#f58518]/20 blur-3xl animate-pulse rounded-full" />
                        <div className="absolute -top-10 w-24 h-20 bg-gradient-to-b from-[#f58518]/30 to-transparent blur-xl animate-pulse" />
                    </div>
                )}
                <svg ref={svgRef} className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10 w-full overflow-visible">
                    <motion.path
                        d={snakePath}
                        stroke="#f58518"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        fill="none"
                        initial={{ opacity: 0, strokeDashoffset: 40 }}
                        animate={{
                            opacity: isLocateHovered ? 0.6 : 0,
                            strokeDashoffset: isLocateHovered ? 0 : 40
                        }}
                        transition={{
                            strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" },
                            opacity: { duration: 0.3 }
                        }}
                    />
                </svg>

                <motion.div 
                    ref={containerRef}
                    layout
                    initial={false}
                    animate={{
                        height: isScrolled ? 56 : 64,
                        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.5)",
                        borderRadius: isScrolled ? 32 : 12,
                        width: isScrolled ? "fit-content" : "100%",
                        maxWidth: isScrolled ? "90%" : "1280px",
                        borderColor: isScrolled ? "rgba(245, 133, 24, 0.2)" : "rgba(0, 0, 0, 0.05)",
                    }}
                    transition={{ 
                        duration: 0.5, 
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="relative overflow-hidden border backdrop-blur-2xl shadow-[0_8px_32px_rgba(245,133,24,0.12)] pointer-events-auto"
                >
                    <div className={`relative z-20 flex items-center justify-between h-full max-w-7xl mx-auto px-6 ${
                        isScrolled ? 'gap-8' : ''
                    }`}>

                            {/* Logo Section */}
                            <Link 
                                href="/" 
                                ref={logoRef}
                                className="flex items-center gap-2.5 shrink-0 group"
                            >
                                <motion.div layout>
                                    <Image 
                                        src="/hope_logo_cropped.png" 
                                        alt="Hope Medicos" 
                                        width={44} 
                                        height={32} 
                                        className={`${isScrolled ? 'h-7' : 'h-8'} w-auto object-contain group-hover:scale-110 transition-transform duration-300`}
                                        priority
                                    />
                                </motion.div>
                                <AnimatePresence mode="popLayout">
                                    {(!isScrolled || keepTitle) && (
                                        <motion.span 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            className="text-xl font-medium tracking-tight text-black overflow-hidden whitespace-nowrap flex items-center ml-1"
                                        >
                                            Hope <span className="text-[#f58518] ml-1.5">Medicos</span>
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>

                            {/* Desktop Menu Items */}
                        <motion.div
                            animate={{ opacity: isLocateHovered ? 0.2 : 1 }}
                            className="hidden lg:flex items-center gap-10"
                        >
                            {sections.map((section, idx) => (
                                <Link
                                    key={idx}
                                    href={section.path}
                                    className={`relative text-[11px] uppercase tracking-[0.18em] font-bold transition-all py-1 ${activeSection === section.path
                                            ? "text-[#f58518]"
                                            : "text-black/50 hover:text-[#f58518]"
                                        }`}
                                >
                                    {section.name}
                                    {activeSection === section.path && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f58518] rounded-full"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </motion.div>

                        {/* Right side: Locate Us + Shop */}
                        <div className="hidden lg:flex items-center">
                            <motion.div layout className="flex items-center gap-4">
                                <AnimatePresence mode="popLayout">
                                    {!isScrolled ? (
                                        <motion.div
                                            key="desktop-links"
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="flex items-center gap-4 whitespace-nowrap"
                                        >
                                            <div
                                                ref={locateCallbackRef as any}
                                                onMouseEnter={() => setIsLocateHovered(true)}
                                                onMouseLeave={() => setIsLocateHovered(false)}
                                            >
                                                <LocateUs />
                                            </div>
                                            <motion.div
                                                animate={{ opacity: isLocateHovered ? 0.2 : 1 }}
                                            >
                                                <Link
                                                    href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
                                                >
                                                    <motion.button
                                                        whileHover="hover"
                                                        initial="initial"
                                                        className="relative px-8 py-2.5 rounded-full bg-[#f58518] border border-[#f58518] text-[10px] uppercase tracking-[0.15em] font-bold text-white hover:bg-white hover:text-[#f58518] transition-all duration-300 overflow-hidden flex items-center justify-center min-w-[140px] cursor-pointer"
                                                    >
                                                        <motion.span
                                                            variants={{
                                                                initial: { x: 0 },
                                                                hover: { x: -10 }
                                                            }}
                                                            className="relative z-10"
                                                        >
                                                            Shop Online
                                                        </motion.span>
                                                        <motion.div
                                                            variants={{
                                                                initial: { x: 40, opacity: 0 },
                                                                hover: { x: 42, opacity: 1 }
                                                            }}
                                                            className="absolute flex items-center"
                                                        >
                                                            <HiOutlineShoppingBag className="text-sm" />
                                                        </motion.div>
                                                    </motion.button>
                                                </Link>
                                            </motion.div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="compact-icons"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="flex items-center gap-3"
                                        >
                                            <button
                                                ref={locateCallbackRef as any}
                                                onMouseEnter={() => setIsLocateHovered(true)}
                                                onMouseLeave={() => setIsLocateHovered(false)}
                                                onClick={() => window.open(`https://www.google.com/maps/dir//Hope+Medicos+(A+Unit+of+GlobalHope+Biotech+OPC+Private+Limited),+near+Sarvodya+Hospital,+opp.+Red+Cross+Delhi+Road,+Bank+Colony,+Urban+Estate+II,+Hisar,+Haryana+125001/@29.1409169,75.5271844,61152m/data=!3m1!1e3!4m16!1m7!3m6!1s0x3912333e978e712d:0x40b39f644e6f74c9!2sHope+Medicos+(A+Unit+of+GlobalHope+Biotech+OPC+Private+Limited)!8m2!3d29.1409796!4d75.733467!16s%2Fg%2F11f_0vryzn!4m7!1m0!1m5!1m1!1s0x3912333e978e712d:0x40b39f644e6f74c9!2m2!1d75.733467!2d29.1409796?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D`, "_blank")}
                                                className="p-2.5 bg-black/5 hover:bg-[#f58518] hover:text-white rounded-full transition-all duration-300 group"
                                                title="Locate Us"
                                            >
                                                <TbLocation className="text-xl group-hover:scale-110 transition-transform" />
                                            </button>
                                            <motion.div
                                                animate={{ opacity: isLocateHovered ? 0.2 : 1 }}
                                            >
                                                <Link
                                                    href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
                                                    className="p-2.5 bg-[#f58518] text-white rounded-full shadow-md shadow-[#f58518]/20 hover:scale-105 transition-all duration-300 group flex items-center justify-center"
                                                    title="Shop"
                                                >
                                                    <HiOutlineShoppingBag className="text-xl group-hover:scale-110 transition-transform" />
                                                </Link>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-black transition-colors focus:outline-none"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                {isMobileMenuOpen ? (
                                    <path d="M18 6L6 18M6 6l12 12" />
                                ) : (
                                    <>
                                        <path d="M4 8h16" />
                                        <path d="M4 16h16" />
                                    </>
                                )}
                            </svg>
                        </button>

                    </div>
                </motion.div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-black/30 backdrop-blur-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            variants={menuContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#f58518]/20 shadow-2xl overflow-hidden"
                        >
                            <div className="flex flex-col p-4">
                                {sections.map((section, idx) => (
                                    <motion.div key={idx} variants={menuItemVariants}>
                                        <Link
                                            href={section.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center px-6 py-5 text-[11px] uppercase tracking-[0.2em] transition-all rounded-2xl font-bold ${activeSection === section.path
                                                    ? "text-[#f58518] bg-[#f58518]/5"
                                                    : "text-black/60 hover:text-black hover:bg-black/5"
                                                }`}
                                        >
                                            {section.name}
                                            {activeSection === section.path && (
                                                <motion.div
                                                    layoutId="mobile-active"
                                                    className="ml-auto w-1.5 h-1.5 bg-[#f58518] rounded-full"
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    variants={menuItemVariants}
                                    className="mt-4 pt-4 border-t border-black/5 flex flex-col gap-3"
                                >
                                    <div className="px-6 flex items-center justify-between">
                                        <LocateUs />
                                        <Link
                                            href={shopSettings.shopUrl || "https://shop.hopemedicos.org"}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="px-6 py-3 bg-[#f58518] text-white rounded-full text-xs uppercase tracking-[0.15em] font-bold shadow-lg shadow-[#f58518]/20"
                                        >
                                            Shop Online
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
