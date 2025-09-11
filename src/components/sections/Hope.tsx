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
        <section id="hope" className="min-h-screen w-full bg-[linear-gradient(to_bottom,_#94E7D5_-20%,_#ffffff_80%)] grid grid-cols-1 lg:grid-cols-[60%_40%] pl-4 sm:pl-6 pt-6 sm:pt-8 lg:pt-4">
            {/* <div className="absolute inset-0 -z-10 bg-[length:200%_200%] animate-gradient bg-[linear-gradient(to_bottom,_#94E7D5_0%,_#94E7D5_30%,_#ffffff_80%)]"></div> Use this by removing section gradient to get hue effect */}
            <div className="relative z-10 flex flex-col pt-20 sm:pt-28 lg:pt-40 w-full">
                <div className="flex gap-2 items-center text-black/80 py-1 px-2 bg-[#BEE5DB] rounded-lg w-fit text-sm sm:text-base">
                    <AiOutlineShop />
                    <p>Hope Medicos</p>
                </div>
                <p className="pt-3 text-[#1AAB86] font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight">Search for your prescribed medicine right away -</p>

                <SearchBar />
            </div>
            <div className="relative z-0 flex flex-col justify-end items-center lg:items-end mt-10 sm:mt-12 lg:mt-15">
                {/* Radiating green circle | bg-[#0C101D]/90 */}
                <div className="bg-white/40 px-4 sm:px-6 py-2 rounded-xl flex items-center space-x-3 relative pointer-events-auto lg:mr-50 mt-2 sm:mt-4 mr-18">
                    <div className="ripple-container mr-3 sm:mr-5">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="ripple-circle" />
                    ))}
                        <div
                        className="w-3 h-3 rounded-full bg-[#12d878]"
                        style={{ boxShadow: "0 0 12px rgba(34, 255, 0, 0.5)" }}
                        ></div>
                    </div>
                    <p className="text-black text-sm sm:text-base">Open Right Now</p>
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
                    <Image 
                        src={'/hopemedicosshopgraphic.svg'} 
                        alt="Hope Medicos" 
                        height={500} 
                        width={500} 
                        priority
                        className="w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg 2xl:max-w-lg" 
                    />
                {/* </video> */}

            </div>
        </section>
    )
}