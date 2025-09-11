// production error tahts why commented!
// import Image from "next/image";
import { AiOutlineShop, AiOutlineMedicineBox, AiOutlineTeam, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineLocalPharmacy, MdOutlineHealthAndSafety } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

export default function WhatWeDo() {
    const services = [
        {
            icon: <MdOutlineLocalPharmacy className="text-4xl sm:text-5xl lg:text-6xl text-[#1AAB86]" />,
            title: "Retail Pharmacy",
            description: "Full-service pharmacy providing prescription medications, over-the-counter drugs, and health products with professional consultation."
        },
        {
            icon: <AiOutlineMedicineBox className="text-4xl sm:text-5xl lg:text-6xl text-[#1AAB86]" />,
            title: "Wholesale Supply",
            description: "Reliable wholesale medicine distribution to healthcare providers, clinics, and other pharmacies across the region."
        },
        {
            icon: <AiOutlineTeam className="text-4xl sm:text-5xl lg:text-6xl text-[#1AAB86]" />,
            title: "Health Consultations",
            description: "Professional health advice and medication counseling from qualified pharmacists and healthcare experts."
        },
        {
            icon: <MdOutlineHealthAndSafety className="text-4xl sm:text-5xl lg:text-6xl text-[#1AAB86]" />,
            title: "Health Camps",
            description: "Community health initiatives including free check-ups, awareness sessions, and preventive healthcare programs."
        },
        {
            icon: <BiSupport className="text-4xl sm:text-5xl lg:text-6xl text-[#1AAB86]" />,
            title: "24/7 Support",
            description: "Round-the-clock customer support for emergency medicine needs and healthcare assistance."
        },
        {
            icon: <AiOutlineHeart className="text-4xl sm:text-5xl lg:text-6xl text-[#1AAB86]" />,
            title: "Patient Care",
            description: "Personalized care plans, medication management, and ongoing support for chronic health conditions."
        }
    ];

    return (
        <section id="whatwedo" className="min-h-screen bg-white relative pt-32">

            {/* Hero Section */}
            <div className="relative mx-auto mt-16 sm:mt-20 w-[95%] sm:w-[92%] max-w-6xl">
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#1AAB86] font-extrabold leading-tight mb-4 sm:mb-6">
                        Hope Medicos
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-black/70 max-w-4xl mx-auto leading-relaxed">
                        Your Trusted Healthcare Partner in Hisar, dedicated to providing quality healthcare solutions, 
                        affordable medicines, and comprehensive health services to our community.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white rounded-2xl border border-[#1AAB86]/20 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="text-center mb-4 sm:mb-6">
                                {service.icon}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-black text-center mb-3 sm:mb-4">
                                {service.title}
                            </h3>
                            <p className="text-black/70 text-sm sm:text-base text-center leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center bg-gradient-to-r from-[#BEE5DB] to-[#EAF7F3] rounded-2xl p-8 sm:p-12 border border-[#1AAB86]/20">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#1AAB86] font-bold mb-4 sm:mb-6">
                        Ready to Experience Better Healthcare?
                    </h2>
                    <p className="text-lg sm:text-xl text-black/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
                        Visit our store in Hisar or contact us for personalized healthcare solutions and expert advice.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                        <a 
                            href="#footer" 
                            className="inline-flex items-center gap-2 bg-[#1AAB86] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <AiOutlineShop className="text-lg sm:text-xl" />
                            Visit Our Store
                        </a>
                        <a 
                            href="#initiatives" 
                            className="inline-flex items-center gap-2 bg-white text-[#1AAB86] border-2 border-[#1AAB86] px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#1AAB86] hover:text-white"
                        >
                            <AiOutlineHeart className="text-lg sm:text-xl" />
                            Our Initiatives
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
