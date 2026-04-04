"use client"
import { TbLocation } from "react-icons/tb";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function LocateUs(){
    const { shopSettings } = useWebsiteData();

    const handleLocateClick = () => {
        // Use the dynamic address from settings or fallback to the hardcoded one
        const destination = encodeURIComponent(shopSettings.siteName + " " + (shopSettings.tagline || "Hisar Haryana"));
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        window.open(mapsUrl, "_blank");
      };

    return(
    <button 
        onClick={handleLocateClick} 
        className="bg-[#838383]/8 px-3 py-2 rounded-lg cursor-pointer hover:scale-105 hover:text-brand hover:border-brand border-[#838383]/10 hover:bg-white/0 hover:font-bold border transition-all duration-400 text-sm sm:text-base whitespace-nowrap"
    >
        Locate Us <TbLocation className="inline text-lg ml-1" />
    </button>
    )
}