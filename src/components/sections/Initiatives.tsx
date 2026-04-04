'use client';

import { AiTwotoneBulb } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { MdHealthAndSafety, MdCelebration, MdCampaign, MdGroups } from "react-icons/md";
import SpotlightCard from "../layout/SpotlightCard/SpotlightCard";
import Image from "next/image";
import Link from "next/link";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function Initiatives() {
    const { texts, loading } = useWebsiteData();

    // Mapping string icon names to React components
    const getIconComponent = (iconName: string) => {
        switch(iconName) {
            case 'MdHealthAndSafety': return <MdHealthAndSafety />;
            case 'GiMedicines': return <GiMedicines />;
            case 'MdCelebration': return <MdCelebration />;
            case 'MdCampaign': return <MdCampaign />;
            case 'MdGroups': return <MdGroups />;
            default: return <AiTwotoneBulb />;
        }
    };

    if (loading) return null;

    // Default hardcoded initiatives
    const defaultInitiatives = [
        {
            id: '1',
            title: 'Health Camps',
            tagline: 'Free health checkups for all',
            initiativeType: 'Community Service',
            description: 'Regular health camps providing free checkups, consultations, and basic medicines to underserved communities.',
            ctaText: 'Learn More',
            ctaLink: '#initiatives',
            iconType: 'icon',
            iconValue: 'MdHealthAndSafety'
        },
        {
            id: '2',
            title: 'Medicine Donation',
            tagline: 'Supporting those in need',
            initiativeType: 'Social Welfare',
            description: 'Providing essential medicines to economically disadvantaged patients and supporting healthcare accessibility.',
            ctaText: 'Contribute',
            ctaLink: '#initiatives',
            iconType: 'icon',
            iconValue: 'GiMedicines'
        },
        {
            id: '3',
            title: 'Awareness Programs',
            tagline: 'Educating for better health',
            initiativeType: 'Health Education',
            description: 'Conducting awareness sessions on preventive healthcare, disease management, and healthy lifestyle practices.',
            ctaText: 'Join Us',
            ctaLink: '#initiatives',
            iconType: 'icon',
            iconValue: 'MdCampaign'
        }
    ];

    return(
        <section id="initiatives" className="min-h-screen bg-white px-4 sm:px-6 pt-4">
            <div className="flex gap-2 items-center text-black/80 py-1 px-2 backdrop-blur-md rounded-lg w-fit text-sm sm:text-base bg-white/60 border border-white/40 shadow-sm">
                    <AiTwotoneBulb />
                    <p>{texts.initiativesTitle || "Initiatives"}</p>
            </div>
            {/* Cards container */}
            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start h-full gap-8 lg:gap-4 pt-10 md:pt-12 lg:pt-8">
                {
                    defaultInitiatives.map((initiative, idx)=>(
                        <SpotlightCard key={idx} spotlightColor = "rgba(245, 133, 24, 0.75)" className="bg-white w-full max-w-sm lg:w-80 xl:w-110 h-[32rem]">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex flex-col justify-center items-center gap-3 sm:gap-5 pb-2 min-h-[140px]">
                                        {initiative.iconType === 'url' ? (
                                            <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]">
                                                <Image 
                                                    src={initiative.iconValue} 
                                                    fill 
                                                    alt={initiative.title} 
                                                    className="object-contain"
                                                />
                                            </div>
                                        ):(
                                            <span className="text-4xl sm:text-5xl lg:text-6xl text-brand">
                                                {getIconComponent(initiative.iconValue)}
                                            </span>
                                        )}
                                        <p className="text-2xl sm:text-3xl text-brand font-bold text-center">{initiative.title}</p>
                                    </div>
                                    <p className="text-lg sm:text-xl text-center text-black/70 font-bold leading-6 border-b-1 pb-2 border-brand">
                                        {initiative.tagline}
                                    </p>

                                    <div className="text-center text-base sm:text-lg mt-4">
                                        <p className="text-brand font-bold mb-1">{initiative.initiativeType}</p>
                                        <p className="text-gray-600 line-clamp-4">{initiative.description}</p>
                                    </div>
                                </div>
                                <Link 
                                    href={initiative.ctaLink || "#"} 
                                    className="text-center block w-full bg-brand text-white py-3 mt-4 font-bold cursor-pointer rounded-xl text-sm sm:text-base hover:bg-brand-dark transition-colors shadow-lg"
                                >
                                    {initiative.ctaText}
                                </Link>
                            </div>
                        </SpotlightCard>
                    ))
                }
            </div>
            
            {/* Bottom tagline */}
            <p className="text-center text-gray-600 mt-15 px-4 max-w-5xl mx-auto">
                We go beyond the counter — building awareness, supporting wellness, and making healthcare more accessible to all.
            </p>
        </section>
    )
}