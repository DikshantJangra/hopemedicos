'use client';

import Link from "next/link";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function Initiatives() {
    const { loading } = useWebsiteData();

    const initiatives = [
        {
            id: '1',
            category: 'Community',
            title: 'Health camps',
            description: 'Free checkups and consultations for underserved communities, every month.',
            link: '#initiatives',
            cta: 'Learn more'
        },
        {
            id: '2',
            category: 'Social welfare',
            title: 'Medicine donation',
            description: "Essential medicines for patients who can't afford standard care.",
            link: '#initiatives',
            cta: 'Contribute'
        },
        {
            id: '3',
            category: 'Education',
            title: 'Awareness programs',
            description: 'Preventive healthcare sessions on disease management and lifestyle.',
            link: '#initiatives',
            cta: 'Join us'
        }
    ];


    return (
        <section id="mission" className="bg-[#faf9f7] px-6 py-20">
            <div className="max-w-6xl mx-auto">
                {/* Editorial heading with italic */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-normal tracking-[-0.02em] text-black mb-3">
                        Initiatives <span className="font-serif italic font-light">by us</span>
                    </h2>
                    <p className="text-sm text-black/60">
                        Building health equity, one community at a time.
                    </p>
                </div>

                {/* Three borderless cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {initiatives.map((initiative) => (
                        <div key={initiative.id} className="group">
                            {/* Tiny uppercase category label with dot */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-1 rounded-full bg-black" />
                                <span className="text-[10px] uppercase tracking-[0.15em] text-black/40">
                                    {initiative.category}
                                </span>
                            </div>

                            {/* Title in 13px medium */}
                            <h3 className="text-lg font-medium text-black mb-3">
                                {initiative.title}
                            </h3>

                            {/* Description in 11px muted */}
                            <p className="text-[11px] text-black/60 leading-relaxed mb-6">
                                {initiative.description}
                            </p>

                            {/* Underline text link only */}
                            <Link
                                href={initiative.link}
                                className="text-xs text-[#f58518] underline hover:no-underline transition-all font-medium"
                            >
                                {initiative.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
