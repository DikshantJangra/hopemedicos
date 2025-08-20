import Image from "next/image";
// import LightRays from "../layout/LightRays/LightRays";
import { AiFillShop } from "react-icons/ai";
import { CgShoppingBag } from "react-icons/cg";

export default function ShopNow() {
	return(
		<section id="shopnow" className="min-h-screen relative bg-[linear-gradient(to_bottom,_#ffffff,_#BEE5DB)] px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center justify-center">
			<div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 w-full max-w-6xl flex items-center justify-between opacity-90 px-4">
				{Array.from({ length: 8 }).map((_, idx) => (
					<div key={idx} className="relative">
						{/* Light image */}
						<Image src="/light.svg" alt="light" width={70} height={70} className="select-none relative z-20 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28" />
					</div>
				))}
			</div>


			{/* Heading */}
			<h2 className="text-center text-[#1AAB86] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight relative z-10 px-4">
				Healthcare for Everyone, Everywhere
			</h2>

			{/* Subheading */}
			<p className="mt-3 sm:mt-4 max-w-7xl text-center text-black/70 text-lg sm:text-xl lg:text-2xl leading-7 sm:leading-8 relative z-10 px-4">
				Whether you&apos;re a customer seeking trusted over-the-counter medicines or a business in need of reliable wholesale supply, Hope Medicos is here to serve. Quality, affordability, and care — all under one roof.
			</p>

			{/* CTAs */}
			<div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative z-10 px-4">
				<a href="#footer" className="inline-flex items-center gap-1 bg-[#1AAB86] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-base sm:text-[18px] font-semibold shadow w-full sm:w-auto justify-center">
					<span className="text-white rounded-md p-1 sm:p-1.5">
						<AiFillShop className="text-lg sm:text-xl" />
					</span>
					Wholesale Enquiries
				</a>
				<div className="hidden sm:block h-10 w-px bg-[#1AAB86]/50"></div>
				<a href="#offers" className="inline-flex items-center gap-1 bg-[#1AAB86] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-base sm:text-[18px] font-semibold shadow w-full sm:w-auto justify-center">
					<span className="text-white rounded-md p-1 sm:p-1.5">
						<CgShoppingBag className="text-lg sm:text-xl" />
					</span>
					Shop OTC
				</a>
			</div>
		</section>
	)
}