import Image from "next/image"
import { AiOutlineShop } from "react-icons/ai"  
import SearchBar from "../ui/SearchBar"

export default function Hope() {
    // const [imgSrc, setImgSrc] = useState("/initial.webp");

    // useEffect(() => {
    //     // Change image after 5 seconds
    //     const timer = setTimeout(() => {
    //     setImgSrc("/final.jpg");
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, []);

    return(
        <section id="hope" className="min-h-screen w-full bg-[linear-gradient(to_bottom,_#94E7D5_-20%,_#ffffff_80%)] grid grid-cols-[60%_40%] pl-6 pt-4">
            {/* <div className="absolute inset-0 -z-10 bg-[length:200%_200%] animate-gradient bg-[linear-gradient(to_bottom,_#94E7D5_0%,_#94E7D5_30%,_#ffffff_80%)]"></div> Use this by removing section gradient to get hue effect */}
            <div className="flex flex-col pt-40 w-full">
                <div className="flex gap-2 items-center text-black/80 py-1 px-2 bg-[#BEE5DB] rounded-lg w-fit">
                    <AiOutlineShop />
                    <p>Hope Medicos</p>
                </div>
                <p className="pt-3 text-[#1AAB86] font-black text-6xl">Search for your prescribed medicine right away -</p>

                <SearchBar />
            </div>
            <div className="flex flex-col justify-end items-end">
                {/* Radiating green circle | bg-[#0C101D]/90 */}
                <div className="bg-white/40 px-6 py-2 rounded-xl flex items-center mr-50 space-x-3 relative pointer-events-auto">
                    <div className="ripple-container mr-5">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="ripple-circle" />
                    ))}
                        <div
                        className="w-3 h-3 rounded-full bg-[#12d878]"
                        style={{ boxShadow: "0 0 12px rgba(34, 255, 0, 0.5)" }}
                        ></div>
                    </div>
                    <p className="text-black text-base">Open Right Now</p>
                </div>
                {/* <video
                    src="/hopemedicos.mp4"
                    poster="/hopemedicosshopgraphic.svg"
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-auto rounded-lg"
                    > */}
                    {/* True fallback for very old browsers */}            
                    <Image src={'/hopemedicosshopgraphic.svg'} alt="Hope Medicos" height={500} width={500} priority={true} />
                {/* </video> */}

            </div>
        </section>
    )
}