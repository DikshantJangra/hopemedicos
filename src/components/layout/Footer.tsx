"use client"
import { BsTwitterX } from "react-icons/bs";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
	return (
		<footer id="footer" className="relative bg-transparent overflow-hidden">
			<div className="">
				<div className="rounded-t-4xl overflow-hidden">
					<div className="bg-gradient-to-b from-white via-[#EAF7F3] to-[#BEE5DB] px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
						<div className="flex flex-col lg:flex-row justify-between items-start gap-8 sm:gap-12">
							{/* Left - Brand and Social */}
							<div className="w-full lg:w-auto">
								<h3 className="text-[#1AAB86] text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 lg:mb-10 leading-none">Hope Medicos</h3>

								<div className="flex items-center gap-6 sm:gap-8 mb-6 sm:mb-8 text-black">
									{/* Social icons */}
									<a href="https://x.com/HopeMedicos" target="_blank" rel="noopener noreferrer">
										<BsTwitterX className="w-5 h-5 sm:w-6 sm:h-6" />
									</a>
									<a href="https://www.instagram.com/hope.medicos/" target="_blank" rel="noopener noreferrer">
										<FaInstagram className="w-6 h-6 sm:w-8 sm:h-8" />
									</a>
									<a href="https://www.linkedin.com/in/krishan-kumar-jangra-609ab615/" target="_blank" rel="noopener noreferrer">
										<AiOutlineLinkedin className="w-6 h-6 sm:w-8 sm:h-8" />
									</a>
								</div>

								<div className="text-black/80 text-sm sm:text-[15px] max-w-xl leading-relaxed">
									<p className="mb-3">© 2025 hope medicos. All rights reserved.</p>
									<p>
										All content and materials on this site are protected by copyright and trademark laws and are the
										property of hope medicos. Unauthorized use is prohibited.
									</p>
								</div>
							</div>

							{/* Right - Links */}
							<div className="flex flex-wrap gap-8 sm:gap-12 lg:gap-18 pt-4 sm:pt-6 w-full lg:w-auto">
								{[
									{
										title: "Initiatives",
										links: [
											{ text: "SwasthyaSync", href: "https://swasthyasync.vercel.app/" },
											{ text: "Health Bootcamps", href: "#initiatives" },
											{ text: "Affordable Medicines", href: "#offers" },
											{ text: "Wholesale Medicine", href: "#initiatives" },
										],
									},
									{
										title: "Company",
										links: [
											{ text: "What We Do", href: "#hope" },
											{ text: "Case Studies", href: "#initiatives" },
											{ text: "Our Work", href: "#shopnow" },
											{ text: "Career", href: "#footer" },
										],
									},
									{
										title: "Contact",
										links: [
											{ text: "Book a Call", href: "#footer" },
											{ text: "Contact Support", href: "#footer" },
										],
									},
								].map((col, i) => (
									<div key={i} className="min-w-[120px] sm:min-w-[140px]">
										<h4 className="text-black text-xl sm:text-2xl font-extrabold mb-3 sm:mb-5">{col.title}</h4>
										<div className="space-y-1 sm:space-y-2">
											{col.links.map((link, j) => (
												<a
													key={j}
													onClick={(e) => {
														e.preventDefault();
														if (link.href?.startsWith("#")) {
															const target = document.querySelector(link.href);
															if (target) {
																target.scrollIntoView({ behavior: "smooth" });
															}
														} else if (link.href) {
															window.open(link.href, "_blank", "noopener,noreferrer");
														}
													}}
													className="block text-black/70 text-base sm:text-[18px] hover:text-[#1AAB86] transition-colors cursor-pointer"
												>
												{link.text}
												</a>
											))}
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="flex justify-center lg:justify-end mt-8 sm:mt-12">
							<a href="#footer" className="text-black/40 text-lg sm:text-[22px]">
								Privacy
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;