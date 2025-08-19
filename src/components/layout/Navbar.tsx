"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineShop, AiTwotoneBulb } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineDiscount } from "react-icons/md";
import { TbLocation } from "react-icons/tb";

export default function Navbar(){
    const sections = [
        {name: "Hope", path:"#hope", icon:<AiOutlineShop className="inline text-lg" />},
        {name: "Initiatives", path:"#initiatives", icon:<AiTwotoneBulb className="inline text-lg" />},
        {name: "Offers", path:"#offers", icon:<MdOutlineDiscount className="inline text-lg" />},
        {name: "Shop Now", path:"#shopnow", icon:<BiShoppingBag className="inline text-lg" />},
    ]
    const [activeSection, setActiveSection] = useState("#hope");
    const handleLocateClick = () => {
        // Build the Google Maps navigation URL
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=Hope+Medicos,+opp.+Red+Cross+Delhi+Road,+Bank+Colony,+Urban+Estate+II,+Hisar,+Haryana`;
        // Open it in a new tab (or app on mobile)
        window.open(mapsUrl, "_blank");
      };

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
          sectionEls.forEach((el) => observer.unobserve(el));
        };
    }, []);
    

    
    return(
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 backdrop-blur-lg">
            <h1 className="text-[#1DAA85] font-bold text-3xl">hope medicos</h1>
            <div className="flex gap-8">
                {sections.map((section, idx)=>(
                    <Link className={`${activeSection == section.path ? "text-[#1DAA85] font-semibold": "hover:text-[#1DAA85]"}`} key={idx} href={section.path}>{section.icon} {section.name}</Link>
                ))}
            </div>
            <button onClick={handleLocateClick} className="bg-[#838383]/8 px-3 py-2 rounded-lg cursor-pointer hover:scale-105 hover:text-[#1DAA85] hover:border-[#1DAA85] border-[#838383]/10 hover:bg-white/0 hover:font-medium border transition-all duration-400">Locate Us  <TbLocation className="inline text-lg" /></button>
        </nav>
    )
}