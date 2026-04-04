"use client"
import { BsTwitterX } from "react-icons/bs";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { useWebsiteData } from "@/context/WebsiteDataContext";

const Footer = () => {
    const { shopSettings, texts, initiatives, loading } = useWebsiteData();

    if (loading) return null;

    // Use dynamic initiatives for the footer if available, otherwise use a default set
    const footerInitiatives = initiatives && initiatives.length > 0 
        ? initiatives.slice(0, 4).map(ini => ({ text: ini.title, href: ini.ctaLink }))
        : [
            { text: "SwasthyaSync", href: "https://swasthyasync.vercel.app/" },
            { text: "Health Bootcamps", href: "https://wa.me/919812080390" },
            { text: "Affordable Medicines", href: "https://wa.me/919812080390" },
            { text: "Wholesale Medicine", href: "https://wa.me/919812080390" },
        ];

	return (
		<footer id="footer" className="relative bg-transparent overflow-hidden mt-20">
			<div className="">
				<div className="rounded-t-[3rem] sm:rounded-t-[4rem] overflow-hidden">
					<div className="bg-gradient-to-b from-white via-brand-soft to-brand-light px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20">
						<div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
							{/* Left - Brand and Social */}
							<div className="w-full lg:w-1/3">
								<h3 className="text-brand text-4xl sm:text-5xl lg:text-6xl font-black mb-8 leading-none tracking-tighter">
                                    {shopSettings.siteName || "Hope Medicos"}
                                </h3>

								<div className="flex items-center gap-6 mb-10 text-gray-800">
									{/* Dynamic Social icons */}
									{texts.twitterUrl && (
                                        <a href={texts.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
										    <BsTwitterX className="w-6 h-6" />
									    </a>
                                    )}
									{texts.instagramUrl && (
                                        <a href={texts.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
										    <FaInstagram className="w-7 h-7" />
									    </a>
                                    )}
									{texts.linkedinUrl && (
                                        <a href={texts.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
										    <AiOutlineLinkedin className="w-7 h-7" />
									    </a>
                                    )}
                                    {texts.facebookUrl && (
                                        <a href={texts.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
										    <FaFacebook className="w-7 h-7" />
									    </a>
                                    )}
								</div>

								<div className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
									<p className="mb-4 font-medium opacity-80">
                                        {texts.footerCopyright || `© ${new Date().getFullYear()} ${shopSettings.siteName || "Hope Medicos"}. All rights reserved.`}
                                    </p>
									<p className="italic">
										{texts.footerTagline || "Your health, our priority. Empowering communities with healthcare access and awareness."}
									</p>
								</div>
							</div>

							{/* Right - Links */}
							<div className="flex flex-wrap gap-x-12 gap-y-10 lg:gap-x-20 w-full lg:w-auto">
								{[
									{
										title: "Initiatives",
										links: footerInitiatives,
									},
									{
										title: "Company",
										links: [
											{ text: "About Us", href: "#hope" },
											{ text: "Latest Updates", href: "/updates" },
											{ text: "Our Work", href: "#initiatives" },
											{ text: "Careers", href: "https://wa.me/919812080390" },
										],
									},
									{
										title: "Contact",
										links: [
											{ text: "Call Us", href: `tel:${shopSettings.supportPhone || "+919812080390"}` },
											{ text: "Email Support", href: `mailto:${shopSettings.supportEmail || "admin@hopemedicos.org"}` },
                                            { text: "Visit Store", href: "https://maps.google.com/?q=Hope+Medicos+Hisar" },
										],
									},
								].map((col, i) => (
									<div key={i} className="min-w-[150px]">
										<h4 className="text-gray-900 text-xl sm:text-2xl font-bold mb-6">{col.title}</h4>
										<div className="space-y-3">
											{col.links.map((link, j) => (
												<a
													key={j}
													href={link.href || "#"}
													className="block text-gray-600 text-lg hover:text-brand transition-all hover:translate-x-1 duration-200"
												>
												{link.text}
												</a>
											))}
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="flex flex-col sm:flex-row justify-center lg:justify-end mt-16 pt-8 border-t border-brand/10 gap-6 sm:gap-8 opacity-60">
							<a href="/terms-and-conditions" className="text-gray-500 text-base hover:text-brand transition-colors">
								Terms & Conditions
							</a>
							<span className="hidden sm:block text-gray-300">•</span>
							<a href="/privacy-policy" className="text-gray-500 text-base hover:text-brand transition-colors">
								Privacy Policy
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;