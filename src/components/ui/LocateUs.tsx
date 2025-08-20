"use client"
import { TbLocation } from "react-icons/tb";
export default function LocateUs(){
    const handleLocateClick = () => {
        // Build the Google Maps navigation URL
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=Hope+Medicos,+opp.+Red+Cross+Delhi+Road,+Bank+Colony,+Urban+Estate+II,+Hisar,+Haryana`;
        // Open it in a new tab (or app on mobile)
        window.open(mapsUrl, "_blank");
      };
    return(
    <button onClick={handleLocateClick} className="bg-[#838383]/8 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg cursor-pointer hover:scale-105 hover:text-[#1DAA85] hover:border-[#1DAA85] border-[#838383]/10 hover:bg-white/0 hover:font-medium border transition-all duration-400 text-sm sm:text-base">Locate Us  <TbLocation className="inline text-base sm:text-lg" /></button>
    )
}