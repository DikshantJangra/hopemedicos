"use client"
import { TbLocation } from "react-icons/tb";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function LocateUs(){
    const { shopSettings } = useWebsiteData();

    const handleLocateClick = () => {
        window.open(`https://www.google.com/maps/dir//Hope+Medicos+(A+Unit+of+GlobalHope+Biotech+OPC+Private+Limited),+near+Sarvodya+Hospital,+opp.+Red+Cross+Delhi+Road,+Bank+Colony,+Urban+Estate+II,+Hisar,+Haryana+125001/@29.1409169,75.5271844,61152m/data=!3m1!1e3!4m16!1m7!3m6!1s0x3912333e978e712d:0x40b39f644e6f74c9!2sHope+Medicos+(A+Unit+of+GlobalHope+Biotech+OPC+Private+Limited)!8m2!3d29.1409796!4d75.733467!16s%2Fg%2F11f_0vryzn!4m7!1m0!1m5!1m1!1s0x3912333e978e712d:0x40b39f644e6f74c9!2m2!1d75.733467!2d29.1409796?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D`, "_blank");
      };

    return(
    <button 
        onClick={handleLocateClick} 
        className="relative overflow-hidden group cursor-pointer"
        title="Your Location is auto set!"
    >
        {/* Animated border light */}
        <div className="absolute inset-0 rounded-full p-[2px] animate-border-light">
            <div className="w-full h-full bg-white rounded-full" />
        </div>
        
        {/* Button content */}
        <div className="relative px-4 py-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] font-normal text-black group-hover:text-white transition-colors duration-200 whitespace-nowrap">
            <span className="relative z-10">Locate us</span>
            <TbLocation className="text-sm relative z-10" />
        </div>
        
        {/* Hover fill */}
        <div className="absolute inset-[2px] bg-[#f58518] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </button>
    )
}
