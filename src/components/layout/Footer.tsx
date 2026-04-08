"use client"
import { BsTwitterX } from "react-icons/bs";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import LocateUs from "../ui/LocateUs";
import { useWebsiteData } from "@/context/WebsiteDataContext";

const Footer = () => {
    const { shopSettings = {}, texts = {}, initiatives = [], loading } = useWebsiteData();

    const footerInitiatives = initiatives && initiatives.length > 0
        ? initiatives.slice(0, 4).map(ini => ({ text: ini.title, href: ini.ctaLink }))
        : [
            { text: "Health Camps", href: "#initiatives" },
            { text: "Medicine Donation", href: "#initiatives" },
            { text: "Awareness Programs", href: "#initiatives" },
        ];

    return (
        <footer id="footer" className="bg-white border-t border-black/5 px-6 py-16">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Column 1: Brand */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                            <Image 
                                src="/hope_logo_cropped.png" 
                                alt="Hope Medicos" 
                                width={44} 
                                height={32} 
                                className="h-8 w-auto object-contain"
                            />
                            <span className="text-lg font-medium tracking-tight text-black">
                                Hope Medicos
                            </span>
                        </Link>
                        <div className="space-y-2">
                            <Link href="/about" className="block text-sm text-black/60 hover:text-black transition-colors">
                                About
                            </Link>
                            <a href="/updates" className="block text-sm text-black/60 hover:text-black transition-colors">
                                Updates
                            </a>
                            <a href="#initiatives" className="block text-sm text-black/60 hover:text-black transition-colors">
                                Initiatives
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Initiatives */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.15em] text-black font-medium mb-4">
                            Initiatives
                        </h4>
                        <div className="space-y-2">
                            {footerInitiatives.map((link, j) => (
                                <a
                                    key={j}
                                    href={link.href || "#"}
                                    className="block text-sm text-black/60 hover:text-black transition-colors"
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.15em] text-black font-medium mb-4">
                            Contact
                        </h4>
                        <div className="space-y-2">
                            <a
                                href={`tel:${shopSettings.supportPhone || "+919812080390"}`}
                                className="block text-sm text-black/60 hover:text-[#f58518] transition-colors"
                            >
                                Call Us
                            </a>
                            <a
                                href={`mailto:${shopSettings.supportEmail || "admin@hopemedicos.org"}`}
                                className="block text-sm text-black/60 hover:text-[#f58518] transition-colors"
                            >
                                Email
                            </a>
                            <a
                                href="https://www.google.com/maps/dir//Hope+Medicos+(A+Unit+of+GlobalHope+Biotech+OPC+Private+Limited),+near+Sarvodya+Hospital,+opp.+Red+Cross+Delhi+Road,+Bank+Colony,+Urban+Estate+II,+Hisar,+Haryana+125001/@29.1409169,75.5271844,61152m/data=!3m1!1e3!4m16!1m7!3m6!1s0x3912333e978e712d:0x40b39f644e6f74c9!2sHope+Medicos+(A+Unit+of+GlobalHope+Biotech+OPC+Private+Limited)!8m2!3d29.1409796!4d75.733467!16s%2Fg%2F11f_0vryzn!4m7!1m0!1m5!1m1!1s0x3912333e978e712d:0x40b39f644e6f74c9!2m2!1d75.733467!2d29.1409796?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm text-black/60 hover:text-[#f58518] transition-colors"
                                title="Your Location is auto set!"
                            >
                                Visit Store
                            </a>
                        </div>
                    </div>

                    {/* Column 4: Legal */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.15em] text-black font-medium mb-4">
                            Legal
                        </h4>
                        <div className="space-y-2">
                            <a href="/privacy-policy" className="block text-sm text-black/60 hover:text-black transition-colors">
                                Privacy Policy
                            </a>
                            <a href="/terms-and-conditions" className="block text-sm text-black/60 hover:text-black transition-colors">
                                Terms and Conditions
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-black/40">
                        {texts.footerCopyright || `© ${new Date().getFullYear()} ${shopSettings.siteName || "Hope Medicos"}. All rights reserved.`}
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        <a 
                            href="https://www.facebook.com/thehopemedicos?ref=1" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-black/40 hover:text-[#f58518] transition-colors"
                        >
                            <FaFacebook className="w-4 h-4" />
                        </a>
                        <a 
                            href="https://www.instagram.com/thehopemedicos/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-black/40 hover:text-[#f58518] transition-colors"
                        >
                            <FaInstagram className="w-4 h-4" />
                        </a>
                        <a 
                            href="https://www.youtube.com/@HopeMedicoshisar" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-black/40 hover:text-[#f58518] transition-colors"
                        >
                            <FaYoutube className="w-5 h-5" />
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/krishan-kumar-jangra-609ab615?originalSubdomain=in" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-black/40 hover:text-[#f58518] transition-colors"
                        >
                            <AiOutlineLinkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
