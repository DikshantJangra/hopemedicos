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
          ctaLink: 'https://wa.me/919812080390?text=Hello%20Hope%20Medicos%20team%2C%0A%0AI%E2%80%99d%20like%20to%20confirm%20the%20details%20about%20your%20upcoming%20Health%20Bootcamp.%20Could%20you%20please%20share%20the%20date%2C%20location%2C%20and%20how%20I%20can%20participate%20or%20register%3F%0A%0AThank%20you!'
        },
        {
          id: 'affordable-meds',
          iconName: <GiMedicines />,
          title: 'Affordable Meds',
          tagline: 'Affordable Medicine for Every Family',
          initiativeType: 'An access initiative -',
          description: 'Affordable Medicine Program by Hope Medicos. Genuine medicines at fair prices, with generics and discounts—so no one compromises on care.',
          ctaText: 'Start Saving on Health',
          ctaLink: 'https://wa.me/919812080390?text=Hello%20Hope%20Medicos%20team%2C%0A%0AI%20wanted%20to%20ask%20if%20there%20are%20any%20current%20discounts%20or%20affordable%20options%20available%20on%20medicines.%20It%20would%20be%20really%20helpful%20if%20you%20could%20guide%20me%20with%20the%20best%20prices%20or%20ongoing%20offers.%0A%0AThank%20you'
        }
      ];
    return(
        <section id="initiatives" className="min-h-screen bg-white px-4 sm:px-6 pt-4">
            <div className="flex gap-2 items-center text-black/80 py-1 px-2 bg-[#E7E7E7] rounded-lg w-fit text-sm sm:text-base">
                    <AiTwotoneBulb />
                    <p>Initiatives</p>
            </div>
            {/* Cards container */}
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start h-full gap-8 lg:gap-4 pt-10 md:pt-12 lg:pt-8">
                {
                    hopeMedicosInitiatives.map((initiative,idx)=>(
                        <SpotlightCard key={idx} spotlightColor = "rgba(27, 171, 133, 0.75)" className="bg-white w-full max-w-sm lg:w-80 xl:w-110 h-[30rem]">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex flex-col sm:flex-row lg:flex-col justify-center items-center gap-3 sm:gap-5 pb-2">
                                        {typeof initiative.iconName == 'string'? (
                                            <Image src={initiative.iconName} width={50} height={50} alt={initiative.title} />
                                        ):(
                                            <span className="text-4xl sm:text-5xl lg:text-6xl text-[#1AAB86]">{initiative.iconName}</span>
                                        )}
                                        <p className="text-2xl sm:text-3xl text-[#1AAB86] font-bold text-center sm:text-left lg:text-center">{initiative.title}</p>
                                    </div>
                                    <p className="text-lg sm:text-xl text-center text-black/70 font-bold leading-6 border-b-1 pb-2 border-[#1BAB85]">{initiative.tagline}</p>

                                    <p className="text-center text-base sm:text-lg">
                                        <span className="text-[#1AAB86] font-bold">{initiative.initiativeType}</span> <br />
                                        <span>{initiative.description}</span>
                                    </p>
                                </div>
                                <Link href={initiative.ctaLink} className="text-center block w-full bg-[#1AAB86] text-white py-2 mt-2 cursor-pointer rounded-sm text-sm sm:text-base">{initiative.ctaText}</Link>
                            </div>
                        </SpotlightCard>
                    ))
                }
            </div>
            {/* Bottom tagline */}
            <p className="text-center text-gray-600 mt-15 px-4 max-w-5xl mx-auto">We go beyond the counter — building awareness, supporting wellness, and making healthcare more accessible to all.</p>
        </section>
    )
}