"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineShop, AiTwotoneBulb } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineDiscount } from "react-icons/md";
import LocateUs from "../ui/LocateUs";

export default function Navbar(){
    const sections = [
        {name: "Hope", path:"#hope", icon:<AiOutlineShop className="inline text-lg" />},
        {name: "Initiatives", path:"#initiatives", icon:<AiTwotoneBulb className="inline text-lg" />},
        {name: "Offers", path:"#offers", icon:<MdOutlineDiscount className="inline text-lg" />},
        {name: "Shop Now", path:"#shopnow", icon:<BiShoppingBag className="inline text-lg" />},
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
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 backdrop-blur-lg">
            <h1 className="text-[#1DAA85] font-bold text-3xl">hope medicos</h1>
            <div className="flex gap-8">
                {sections.map((section, idx)=>(
                    <Link className={`${activeSection == section.path ? "text-[#1DAA85] font-semibold": "hover:text-[#1DAA85]"}`} key={idx} href={section.path}>{section.icon} {section.name}</Link>
                ))}
            </div>
            <LocateUs />
        </nav>
    )
}