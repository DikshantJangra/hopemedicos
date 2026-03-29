'use client';

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import LocateUs from "../ui/LocateUs";
import { BsTwitterX } from "react-icons/bs";
import { AiOutlineInstagram, AiOutlineLink, AiOutlineLinkedin, AiOutlineWhatsApp } from "react-icons/ai";
// import html2canvas from 'html2canvas';
import { useRef, useCallback, useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';

interface Offer {
    id: string;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    price?: number;
    discounted_price?: number;
}

export default function Offers() {
    const offerContentRef = useRef(null);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOffers = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const offersRef = collection(db, 'offers');
                const offersQuery = query(
                    offersRef,
                    orderBy('created_at', 'desc'),
                    limit(1)
                );
                
                const querySnapshot = await getDocs(offersQuery);
                const data: Offer[] = querySnapshot.docs.map(doc => {
                    const docData = doc.data() as Record<string, any>;
                    return {
                        id: doc.id,
                        title: docData.title || '',
                        description: docData.description || '',
                        image_url: docData.image_url || '',
                        created_at: docData.created_at || '',
                        price: docData.price,
                        discounted_price: docData.discounted_price,
                    };
                });
                
                setOffers(data);
            } catch (error: any) {
                console.error("Error fetching offers:", error);
                setError(error.message || "Failed to fetch offers");
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const handleShare = useCallback(async (platform: string) => {
        if (!offerContentRef.current) {
            console.error("Offer content ref is null.");
            return;
        }

        try {
            // production error tahts why commented!
            // const canvas = await html2canvas(offerContentRef.current);
            const offerText = "Check out this exclusive offer from Hopemedicos!"; // Customize this text

            switch (platform) {
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(offerText)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
                    break;
                case 'instagram':
                    alert("For Instagram, please save the image and upload it manually.");
                    break;
                case 'linkedin':
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
                    break;
                case 'whatsapp':
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(offerText + " " + window.location.href)}`, '_blank');
                    break;
                case 'copy_link':
                    await navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                    break;
                default:
                    console.warn("Unknown platform:", platform);
            }
        } catch (error) {
            console.error("Error sharing offer:", error);
            alert("Failed to share the offer. Please try again.");
        }
    }, []);

    const latestOffer = offers[0]; // Get the latest offer

    return(
        <section id="offers" className="min-h-screen bg-white relative pt-5">
            <div className="absolute flex gap-2 items-center text-black/80 py-1 px-2 bg-[#E7E7E7] rounded-lg w-fit z-20 top-6 sm:top-10 left-4 sm:left-15 text-sm sm:text-base">
                    <MdOutlineDiscount />
                    <p>Offers</p>
            </div>
            <Image 
                src={"offerBoard.svg"} 
                alt="Special offers and discounts banner" 
                height={200} 
                width={200} 
                priority
                className="absolute z-[1] top-0 w-32 sm:w-40 md:w-48 lg:w-52" 
            />

            {loading && <p className="text-center mt-20">Loading latest offer...</p>}
            {error && <p className="text-center mt-20 text-red-500">Error: {error}</p>}
            {!loading && !latestOffer && <p className="text-center mt-20">No offers found.</p>}

            {latestOffer && (
                <>
                    <div className="flex items-center justify-center bg-[#BEE5DB] w-fit mx-auto px-3 sm:px-5 py-3 sm:py-4 rounded-tl-4xl rounded-br-4xl border-[#1AAB86] border-2 shadow-2xl mt-16 sm:mt-20">
                        <div className="px-4 sm:px-6 py-2 rounded-xl flex items-center space-x-3 relative pointer-events-auto">
                            <div className="ripple-container mr-3 sm:mr-5">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="ripple-circle" />
                                ))}
                                <div
                                className="w-3 h-3 rounded-full bg-[#1AAB86]"
                                ></div>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl sm:text-3xl font-bold text-[#1AAB86] tracking-tight bg-clip-text [text-shadow:_0_3px_4px_rgba(0,0,0,0.9)]">18% Off</p>
                            <p className="text-lg sm:text-xl text-black/70 -mt-1">on all medicine!</p>
                        </div>
                    </div>


                    <div id="offer-content" ref={offerContentRef} className="relative mx-auto mt-8 sm:mt-12 w-[95%] sm:w-[92%] max-w-6xl rounded-2xl border border-[#1AAB86] bg-white shadow-2xl overflow-auto">
                        <div className="flex items-center justify-center gap-3 shadow-2xl w-32 sm:w-40 pr-1 py-3 sm:py-4 rounded-b-2xl mx-auto">
                            <div className="ripple-container mr-3 sm:mr-5">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="red-ripple-circle" />
                                ))}
                                <div className="w-3 h-3 rounded-full bg-[#ff0000]"></div>
                            </div>
                            <p className="font-semibold text-sm sm:text-base">Live now</p>
                        </div>

                        {/* Title */}
                        <div className="pt-4 sm:pt-5 pb-4 sm:pb-6 px-4 sm:px-0">
                            <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#1AAB86] font-extrabold tracking-wide px-4">THIS WEEK&apos;S EXCLUSIVE OFFER!</h2>
                        </div>

                        {/* Content grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-10 pb-8 sm:pb-10 items-start">
                            {/* Product visual */}
                            <div className="flex justify-center">
                                <div className="relative w-full max-w-[260px] sm:w-[260px] md:w-[320px] lg:w-[360px]">
                                    {latestOffer.image_url && (
                                        <Image
                                            src={latestOffer.image_url}
                                            alt={latestOffer.title}
                                            width={360}
                                            height={360}
                                            loading="lazy"
                                            className="w-full h-auto object-contain select-none"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Product details */}
                            <div className="flex flex-col gap-1 text-center md:text-left">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-black">{latestOffer.title}</h3>
                                <p className="text-black/70 text-sm sm:text-base">{latestOffer.description}</p>
                                <div className="flex items-center justify-center md:justify-start gap-1 pt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-[#F5B301] text-sm sm:text-base" />
                                    ))}
                                </div>
                                <div className="flex items-end justify-center md:justify-start gap-4 pt-1">
                                    {latestOffer.price && <span className="text-black/40 line-through text-lg sm:text-xl">₹{latestOffer.price}</span>}
                                    {latestOffer.discounted_price && <span className="text-[#1AAB86] font-extrabold text-xl sm:text-2xl">₹{latestOffer.discounted_price}</span>}
                                </div>
                                <div className="pt-4 flex justify-center md:justify-start">
                                    <LocateUs />
                                </div>
                            </div>
                        </div>

                        {/* Share icons */}
                        <div className="flex items-center gap-4 sm:gap-6 justify-center sm:justify-end px-4 sm:px-6 lg:px-10 pb-4 sm:pb-6 text-black/80">
                            <BsTwitterX className="cursor-pointer text-xl sm:text-2xl" onClick={() => handleShare('twitter')} />
                            <AiOutlineInstagram className="cursor-pointer text-2xl sm:text-3xl" onClick={() => handleShare('instagram')} />
                            <AiOutlineLinkedin className="cursor-pointer text-2xl sm:text-3xl" onClick={() => handleShare('linkedin')} />
                            <AiOutlineWhatsApp className="cursor-pointer text-2xl sm:text-3xl" onClick={() => handleShare('whatsapp')} />
                            <AiOutlineLink className="cursor-pointer text-2xl sm:text-3xl" onClick={() => handleShare('copy_link')} />
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}