import { useState } from "react";
import SectionHeader from "../components/SectionHeader"
import { AiOutlineShop } from "react-icons/ai";
import { BsFacebook, BsInstagram, BsMailbox2, BsTwitterX } from "react-icons/bs";
import { supabase } from "../lib/supabaseClient";
import Toast, { type ToastType } from "../components/Toast";

const LaunchingSoon = () => {
  const [email, setEmail] = useState('')
  // const [status, setStatus] = useState<'loading' | 'success' | 'error' |  null>(null)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  

  const handleSubmit = async (e: any)=>{
    e.preventDefault()
    // setStatus("loading")

    // pre checking errors (no api call costs)
    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      return
    }

    if(!email.includes('@')){
      showToast('Invalid mail!!', 'error');
      return
    }
    const { error } = await supabase.from('earlyNotification').insert({email})

    if(error){
      console.log(`Supabase error: ${error.message}`)
      showToast('Something went wrong. Try again later.', 'error');
    }else{
      showToast("You're subscribed!", 'success');
      setEmail('')
    }

  }
  return (
    <>
    <style>
      {`
        @keyframes fowSpin{
          from{
            transform: rotate(0deg)
          }
          to{
            transform: rotate(360deg)
          }
        }
        @keyframes backSpin{
          from{
            transform: rotate(0deg)
          }
          to{
            transform: rotate(-360deg)
          }
        }
        .fowRoll{
          animation: fowSpin 9s cubic-bezier(0.39,0.92,1.00,-0.97) infinite
        }
        .backRoll{
        animation: backSpin 5s cubic-bezier(0.39,0.92,1.00,-0.97) infinite
        }
      `}
    </style>
        <div className="px-5 py-5 max-h-screen max-w-full">
            <h1 className="text-center font-bold text-5xl pb-5">Hope Medicos</h1>
            <SectionHeader icon={<AiOutlineShop />} preHeading="Coming live online soon" />

            <div className="flex justify-center items-center flex-col text-center">
              <div>
                <p className="text-2xl md:text-5xl font-semibold pt-20 md:pt-30">Something Good is Coming<br />Stay Tuned for Hope Medicos</p>
                <p className="text-base md:text-2xl py-1">Your Health Journey Begins Soon with Hope Medicos!</p>
              </div>

              <div className="pt-35 flex justify-center items-center flex-col">
                <p className="text-base">Be the first to get notified!</p>

                <form onSubmit={handleSubmit}>
                  <div className="w-70 h-10 bg-black/10 rounded-sm flex justify-between items-center px-2">
                    <input 
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
                      className="w-full h-full focus:outline-none focus:ring-0 focus:border-none py-2 pl-2 pr-15"
                      placeholder="Email address"
                      type="email" />
                      <button type="submit" className="text-black/80 text-2xl cursor-pointer transition-all duration-300 hover:text-black hover:text-[1.7vmax]">
                        <BsMailbox2 />
                      </button>
                  </div>
                </form>
              </div>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center justify-center gap-4 text-2xl">
                  <a target="_blank" href="https://www.facebook.com/profile.php?id=61556652516460" className="transform hover:translate-y-[-12px] hover:cursor-pointer transition-all duration-500"><BsFacebook /></a>
                  <a target="_blank" href="https://x.com/HopeMedicos" className="transform hover:translate-y-[-12px] hover:cursor-pointer transition-all duration-500"><BsTwitterX /></a>
                  <a target="_blank" href="https://www.instagram.com/hope.medicos/" className="transform hover:translate-y-[-12px] hover:cursor-pointer transition-all duration-500"><BsInstagram /></a>
                </div>
              <p className="py-3">admin@hopemedicos.org</p>
              </div>
            </div>
        </div>
        <img className="hidden sm:block absolute top-45 left-25 fowRoll" src="/medicine.svg" alt="medicine graphics [Image loading error,report owner]" />
        <img className="absolute bottom-45 right-25 backRoll" src="/medicine.svg" alt="medicine graphics [Image loading error,report owner]" />
        {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}

export default LaunchingSoon