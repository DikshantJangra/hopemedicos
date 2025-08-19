import Image from "next/image";
import { MdOutlineDiscount } from "react-icons/md";

export default function Offers() {
    return(
        <section id="offers" className="h-screen bg-white relative">
            <div className="absolute flex gap-2 items-center text-black/80 py-1 px-2 bg-[#E7E7E7] rounded-lg w-fit z-20 top-10 left-15">
                    <MdOutlineDiscount />
                    <p>Offers</p>
            </div>
            <Image src={"offerBoard.svg"} alt="" height={200} width={200} className="absolute z-[1] top-0" />

            
        </section>
    )
}