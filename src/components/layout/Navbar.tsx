"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineShop, AiTwotoneBulb } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineDiscount, MdMenu, MdClose } from "react-icons/md";
import LocateUs from "../ui/LocateUs";

export default function Navbar(){
    const sections = [
        {name: "Hope", path:"#hope", icon:<AiOutlineShop className="inline text-lg" />},
        {name: "Initiatives", path:"#initiatives", icon:<AiTwotoneBulb className="inline text-lg" />},
        {name: "Offers", path:"#offers", icon:<MdOutlineDiscount className="inline text-lg" />},
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
          sectionEls.forEach((el) => observer.observe(el));
        };
    }, []);
    
    return(
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-lg">
            <h1 className="text-[#1DAA85] font-bold text-2xl sm:text-3xl">Hope Medicos</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-6 xl:gap-8">
                {sections.map((section, idx)=>(
                    <Link className={`${activeSection == section.path ? "text-[#1DAA85] font-semibold": "hover:text-[#1DAA85]"} transition-colors`} key={idx} href={section.path}>{section.icon} {section.name}</Link>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#1DAA85] hover:bg-[#1DAA85]/10 rounded-lg transition-colors"
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
                                className={`${activeSection == section.path ? "text-[#1DAA85] font-semibold bg-[#1DAA85]/10": "text-gray-700 hover:text-[#1DAA85] hover:bg-gray-50"} px-6 py-3 transition-colors flex items-center gap-2`}
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
            <div className="hidden lg:block">
                <LocateUs />
            </div>
        </nav>
    )
}