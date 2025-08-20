import Image from "next/image";
// import LightRays from "../layout/LightRays/LightRays";
import { AiFillShop } from "react-icons/ai";
import { CgShoppingBag } from "react-icons/cg";

export default function ShopNow() {
	return(
		<section id="shopnow" className="min-h-screen relative bg-[linear-gradient(to_bottom,_#ffffff,_#BEE5DB)] px-6 py-16 flex flex-col items-center justify-center">
			<div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-6xl flex items-center justify-between opacity-90">
				{Array.from({ length: 8 }).map((_, idx) => (
					<div key={idx} className="relative">
						{/* Light image */}
						<Image src="/light.svg" alt="light" width={70} height={70} className="select-none relative z-20" />
					</div>
				))}
			</div>


			{/* Heading */}
			<h2 className="text-center text-[#1AAB86] text-7xl font-extrabold leading-tight relative z-10">
				Healthcare for Everyone, Everywhere
			</h2>

			{/* Subheading */}
			<p className="mt-3 max-w-7xl text-center text-black/70 text-2xl leading-8 relative z-10">
				Whether you're a customer seeking trusted over-the-counter medicines or a business in need of reliable wholesale supply, Hope Medicos is here to serve. Quality, affordability, and care — all under one roof.
			</p>

			{/* CTAs */}
			<div className="mt-10 flex items-center gap-6 relative z-10">
				<a href="#footer" className="inline-flex items-center gap-1 bg-[#1AAB86] text-white px-6 py-3 rounded-xl text-[18px] font-semibold shadow">
					<span className="text-white rounded-md p-1.5">
						<AiFillShop className="text-xl" />
					</span>
					Wholesale Enquiries
				</a>
				<div className="hidden sm:block h-10 w-px bg-[#1AAB86]/50"></div>
				<a href="#offers" className="inline-flex items-center gap-1 bg-[#1AAB86] text-white px-6 py-3 rounded-xl text-[18px] font-semibold shadow">
					<span className="text-white rounded-md p-1.5">
						<CgShoppingBag className="text-xl" />
					</span>
					Shop OTC
				</a>
			</div>
		</section>
	)
}