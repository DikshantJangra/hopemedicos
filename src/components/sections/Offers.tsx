import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import { TbLocation } from "react-icons/tb";
import LocateUs from "../ui/LocateUs";
import { BsTwitterX } from "react-icons/bs";
import { AiOutlineInstagram, AiOutlineLink, AiOutlineLinkedin, AiOutlineWhatsApp } from "react-icons/ai";

export default function Offers() {
    const handleLocateClick = () => {
        // Build the Google Maps navigation URL
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=Hope+Medicos,+opp.+Red+Cross+Delhi+Road,+Bank+Colony,+Urban+Estate+II,+Hisar,+Haryana`;
        // Open it in a new tab (or app on mobile)
        window.open(mapsUrl, "_blank");
      };
    return(
        <section id="offers" className="min-h-screen bg-white relative pt-5">
            <div className="absolute flex gap-2 items-center text-black/80 py-1 px-2 bg-[#E7E7E7] rounded-lg w-fit z-20 top-10 left-15">
                    <MdOutlineDiscount />
                    <p>Offers</p>
            </div>
            <Image src={"offerBoard.svg"} alt="" height={200} width={200} className="absolute z-[1] top-0" />

            <div className="flex items-center justify-center bg-[#BEE5DB] w-fit mx-auto px-5 py-4 rounded-tl-4xl rounded-br-4xl border-[#1AAB86] border-2 shadow-2xl">
                <div className="px-6 py-2 rounded-xl flex items-center space-x-3 relative pointer-events-auto">
                    <div className="ripple-container mr-5">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="ripple-circle" />
                        ))}
                        <div
                        className="w-3 h-3 rounded-full bg-[#1AAB86]"
                        style={{ boxShadow: "0 0 12px rgba(34, 255, 0, 0.5)" }}
                        ></div>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-[#1AAB86] tracking-tight bg-clip-text [text-shadow:_0_3px_4px_rgba(0,0,0,0.9)]">18% Off</p>
                    <p className="text-xl text-black/70 -mt-1">on all medicines</p>
                </div>
            </div>


            <div className="relative mx-auto mt-12 w-[92%] max-w-6xl rounded-2xl border border-[#1AAB86] bg-white shadow-2xl overflow-auto">
                <div className="flex items-center justify-center gap-3 shadow-2xl w-40 pr-1 py-4 rounded-b-2xl mx-auto">
                    <div className="ripple-container mr-5">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="red-ripple-circle" />
                        ))}
                        <div className="w-3 h-3 rounded-full bg-[#ff0000]" style={{ boxShadow: "0 0 12px rgba(34, 255, 0, 0.5)" }}></div>
                    </div>
                    <p className="font-semibold">Live now</p>
                </div>

                {/* Title */}
                <div className="pt-5 pb-6">
                    <h2 className="text-center text-3xl sm:text-5xl text-[#1AAB86] font-extrabold tracking-wide">THIS WEEK'S EXCLUSIVE OFFER!</h2>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 sm:px-10 pb-10 items-start">
                    {/* Product visual */}
                    <div className="flex justify-center">
                        <div className="relative w-[260px] sm:w-[320px] md:w-[360px]">
                            {/* Using a regular img so we don't need remote domain config */}
                            <img
                                src="/egoffer.svg"
                                alt="Beetroot face wash"
                                className="w-full h-auto object-contain select-none"
                            />
                        </div>
                    </div>

                    {/* Product details */}
                    <div className="flex flex-col gap-1">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-black">Aved Sundari Beetroot Face Wash</h3>
                        <p className="text-black/70">Enriched with Beetroot & Vitamin C</p>
                        <div className="flex items-center gap-1 pt-2">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="text-[#F5B301]" />
                            ))}
                        </div>
                        <div className="flex items-end gap-4 pt-1">
                            <span className="text-black/40 line-through text-xl">₹1499</span>
                            <span className="text-[#1AAB86] font-extrabold text-2xl">₹399</span>
                        </div>
                        <div className="pt-4">
                            <LocateUs />
                        </div>
                    </div>
                </div>

                {/* Share icons */}
                <div className="flex items-center gap-6 justify-end px-6 sm:px-10 pb-6 text-black/80">
                    <BsTwitterX className="cursor-pointer text-2xl" />
                    <AiOutlineInstagram className="cursor-pointer text-3xl" />
                    <AiOutlineLinkedin className="cursor-pointer text-3xl" />
                    <AiOutlineWhatsApp className="cursor-pointer text-3xl" />
                    <AiOutlineLink className="cursor-pointer text-3xl" />
                </div>
            </div>
            
        </section>
    )
}