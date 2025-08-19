import { AiTwotoneBulb } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";
import SpotlightCard from "../layout/SpotlightCard/SpotlightCard";
import Image from "next/image";
import Link from "next/link";

export default function Initiatives() {
    const hopeMedicosInitiatives = [
        {
          id: 'swasthya-sync',
          iconName: '/swasthyasync.svg',
          title: 'Swasthya Sync',
          tagline: 'Because health begins with awareness.',
          initiativeType: 'A health initiative -',
          description: 'Launching an intelligence platform SwasthyaSync - an initiative by Hope Medicos. To track, sync and optimise your health!',
          ctaText: 'Access Now',
          ctaLink: 'https://swasthyasync.vercel.app/'
        },
        {
          id: 'health-camps',
          iconName: <MdHealthAndSafety />,
          title: 'Health Camps',
          tagline: 'Community Health Camps that reaches you',
          initiativeType: 'A care initiative -',
          description: 'Health Camps by Hope Medicos. Free check-ups, doctor consultations, and awareness sessions—taking healthcare to underserved communities.',
          ctaText: 'Support Our Camps',
          ctaLink: '/initiatives/health-camps'
        },
        {
          id: 'affordable-meds',
          iconName: <GiMedicines />,
          title: 'Affordable Meds',
          tagline: 'Affordable Medicine for Every Family',
          initiativeType: 'An access initiative -',
          description: 'Affordable Medicine Program by Hope Medicos. Genuine medicines at fair prices, with generics and discounts—so no one compromises on care.',
          ctaText: 'Start Saving on Health',
          ctaLink: '/offers/affordable-medicines'
        }
      ];
    return(
        <section id="initiatives" className="h-screen bg-white px-6 pt-4">
            <div className="flex gap-2 items-center text-black/80 py-1 px-2 bg-[#E7E7E7] rounded-lg w-fit">
                    <AiTwotoneBulb />
                    <p>Initiatives</p>
            </div>
            <div className="flex justify-between items-center h-full">
                {
                    hopeMedicosInitiatives.map((initiative,idx)=>(
                        <SpotlightCard key={idx} spotlightColor = "rgba(27, 171, 133, 0.75)" className="bg-white w-110">
                            <div className="flex justify-center items-center gap-5 pb-2">
                                {typeof initiative.iconName == 'string'? (
                                    <Image src={initiative.iconName} width={50} height={50} alt={initiative.title} />
                                ):(
                                    <span className="text-6xl text-[#1AAB86]">{initiative.iconName}</span>
                                )}
                                <p className="text-3xl text-[#1AAB86] font-bold">{initiative.title}</p>
                            </div>
                            <p className="text-xl text-center text-black/70 font-bold leading-6 border-b-1 pb-2 border-[#1BAB85]">{initiative.tagline}</p>

                            <p className="text-center text-lg">
                                <span className="text-[#1AAB86] font-bold">{initiative.initiativeType}</span> <br />
                                <span>{initiative.description}</span>
                            </p>
                            <Link href={initiative.ctaLink} className="text-center block w-full bg-[#1AAB86] text-white py-2 mt-5 cursor-pointer rounded-sm">{initiative.ctaText}</Link>
                        </SpotlightCard>
                    ))
                }
            </div>
        </section>
    )
}