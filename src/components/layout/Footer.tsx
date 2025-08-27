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
											{ text: "Health Bootcamps", href: "https://wa.me/919812080390?text=Hello%20Hope%20Medicos%20team%2C%0A%0AI%E2%80%99d%20like%20to%20confirm%20the%20details%20about%20your%20upcoming%20Health%20Bootcamp.%20Could%20you%20please%20share%20the%20date%2C%20location%2C%20and%20how%20I%20can%20participate%20or%20register%3F%0A%0AThank%20you!" },
											{ text: "Affordable Medicines", href: "https://wa.me/919812080390?text=Hello%20Hope%20Medicos%20team%2C%0A%0AI%20wanted%20to%20ask%20if%20there%20are%20any%20current%20discounts%20or%20affordable%20options%20available%20on%20medicines.%20It%20would%20be%20really%20helpful%20if%20you%20could%20guide%20me%20with%20the%20best%20prices%20or%20ongoing%20offers.%0A%0AThank%20you" },
											{ text: "Wholesale Medicine", href: "https://wa.me/919812080390?text=Hello%20Hope%20Medicos%20team%2C%0A%0AI%E2%80%99m%20interested%20in%20purchasing%20medicines%20in%20wholesale.%20Could%20you%20please%20share%20the%20available%20products%2C%20pricing%2C%20and%20the%20process%20for%20placing%20a%20bulk%20order%3F%0A%0ALooking%20forward%20to%20your%20response.%20Thank%20you!" },
										],
									},
									{
										title: "Company",
										links: [
											{ text: "What We Do", href: "#hope", facebookHref: "https://www.facebook.com/profile.php?id=61556652516460" },
											{ text: "Case Studies", href: "#initiatives", facebookHref: "https://www.facebook.com/profile.php?id=61556652516460" },
											{ text: "Our Work", href: "#shopnow", facebookHref: "https://www.facebook.com/profile.php?id=61556652516460" },
											{ text: "Career", href: "https://wa.me/919812080390?text=Hello%20Hope%20Medicos%20team%2C%0A%0AI%E2%80%99m%20interested%20in%20working%20with%20your%20pharmacy.%20Please%20let%20me%20know%20if%20there%20are%20any%20job%20openings%20or%20opportunities%20available.%20I%E2%80%99d%20be%20happy%20to%20share%20my%20details%20and%20resume.%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0AThank%20you!" },
										],
									},
									{
										title: "Contact",
										links: [
											{ text: "Book a Call", href: "tel:+919812080390" },
											{ text: "Contact Support", href: "https://wa.me/919812080390?text=Hi%2C%20I%20need%20some%20help%20regarding%20your%20service.%20Could%20you%20please%20assist%20me%3F%20Thanks!" },
										],
									},
								].map((col, i) => (
									<div key={i} className="min-w-[120px] sm:min-w-[140px]">
										<h4 className="text-black text-xl sm:text-2xl font-extrabold mb-3 sm:mb-5">{col.title}</h4>
										<div className="space-y-1 sm:space-y-2">
											{col.links.map((link, j) => (
												<a
													key={j}
													href={link.href || "#"}
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
														if (link.facebookHref) {
															window.open(link.facebookHref, "_blank", "noopener,noreferrer");
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