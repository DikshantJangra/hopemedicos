"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineShop, AiTwotoneBulb } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineDiscount, MdMenu, MdClose } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";
import LocateUs from "../ui/LocateUs";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { isStoreOpen } from "@/utils/websiteData";

export default function Navbar(){
    const { shopSettings, loading } = useWebsiteData();
    const isOpen = isStoreOpen(shopSettings);
    const sections = [
        {name: "Hope", path:"/", icon:<AiOutlineShop className="inline text-lg" />},
        {name: "Blogs", path:"/updates", icon:<FaNewspaper className="inline text-lg" />},
        {name: "Offers", path:"#offers", icon:<MdOutlineDiscount className="inline text-lg" />},
        {name: "Initiatives", path:"#initiatives", icon:<AiTwotoneBulb className="inline text-lg" />},
        {name: "Shop Now", path:"#shopnow", icon:<BiShoppingBag className="inline text-lg" />},
    ]
    const [activeSection, setActiveSection] = useState("#hope");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
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
          rootMargin: "-50% 0px -50% 0px", // triggers when middle of section hits viewport
          threshold: 0,
        }
      );
  
      const sectionEls = document.querySelectorAll("section[id]");
      sectionEls.forEach((el) => observer.observe(el));
  
      return () => {
          sectionEls.forEach((el) => observer.disconnect());
        };
    }, []);
    
    return(
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-lg">
            <div className="flex items-center gap-3">
                {loading ? (
                    <>
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                    </>
                ) : (
                    <>
                        <Link href="/" className="flex items-center gap-2">
                            <Image 
                                src="/hope_logo.png" 
                                alt="Hope Medicos Logo" 
                                width={40} 
                                height={40}
                                className="object-contain"
                            />
                            <span className="text-brand font-bold text-2xl sm:text-3xl">
                                {shopSettings.siteName || "Hope Medicos"}
                            </span>
                        </Link>
                        <div className="hidden sm:flex gap-1.5 items-center text-black/60 py-0.5 px-2 bg-brand-light rounded-md text-[10px] uppercase font-black tracking-wider border border-brand/10">
                            <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-brand animate-pulse' : 'bg-red-500'}`} />
                            {isOpen ? "Open Now" : "Closed"}
                        </div>
                    </>
                )}
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-6 xl:gap-8">
                {loading ? (
                    <>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                        ))}
                    </>
                ) : (
                    sections.map((section, idx)=>(
                        <Link className={`${activeSection == section.path ? "text-brand font-semibold": "hover:text-brand"} transition-colors`} key={idx} href={section.path}>{section.icon} {section.name}</Link>
                    ))
                )}
            </div>

            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-brand hover:bg-brand/10 rounded-lg transition-colors"
            >
                {isMobileMenuOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-t border-gray-200 lg:hidden">
                    <div className="flex flex-col py-4">
                        {sections.map((section, idx)=>(
                            <Link 
                                key={idx} 
                                href={section.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`${activeSection == section.path ? "text-brand font-semibold bg-brand/10": "text-gray-700 hover:text-brand hover:bg-gray-50"} px-6 py-3 transition-colors flex items-center gap-2`}
                            >
                                {section.icon} {section.name}
                            </Link>
                        ))}
                        <div className="px-6 py-3">
                            <LocateUs />
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop LocateUs */}
            {loading ? (
                <div className="hidden lg:block h-10 w-32 bg-gray-200 rounded-xl animate-pulse" />
            ) : (
                <div className="hidden lg:block">
                    <LocateUs />
                </div>
            )}
        </nav>
    )
}