"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineShop, AiTwotoneBulb } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineDiscount } from "react-icons/md";
import { TbLocation } from "react-icons/tb";

export default function Navbar(){
    const sections = [
        {name: "Hope", path:"#hope", icon:<AiOutlineShop className="inline" />},
        {name: "Initiatives", path:"#initiatives", icon:<AiTwotoneBulb className="inline" />},
        {name: "Offers", path:"#offers", icon:<MdOutlineDiscount className="inline" />},
        {name: "Shop Now", path:"#shopnow", icon:<BiShoppingBag className="inline" />},
    ]
    const [activeSection, setActiveSection] = useState("#hope");

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
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4">
            <h1 className="text-[#1DAA85] font-bold text-3xl">hope medicos</h1>
            <div className="flex gap-6">
                {sections.map((section, idx)=>(
                    <Link className={`${activeSection == section.path ? "text-[#1DAA85] font-semibold": "hover:text-[#1DAA85]"}`} key={idx} href={section.path}>{section.icon} {section.name}</Link>
                ))}
            </div>
            <button className="bg-[#838383]/8 px-3 py-2 rounded-lg cursor-pointer hover:scale-105 transition-all duration-400">Locate Us  <TbLocation className="inline" /></button>
        </nav>
    )
}