// import "./css/Hero.css"
import { titles } from "../constants/index";
const Hero = () => {
    
  return (
    <section
        id="home"
        className="w-full flex flex-col
            justify-start min-h-screen
            gap-10 max-container "
            >
            {/* <div className="relative flex rounded-lg
                flex-col justify-center items-start
                w-full px-2 py-14 bg-slate-700 mt-28">
                    <span className="font-mono text-3xl px-12 text-slate-300">Hi, I'm Kenny!</span>
                </div> */}
                    <div className="font-custom w-full ml-9 mt-20 flex flex-col space-y-4">
                        <span className="text-8xl text-red-500">K3NnY,</span>
                        <div className="ml-10">

                        {titles.map((label, idx) => (
                            <span key={idx} className="text-3xl text-orange-500">{label.label}</span>

                        ))}
                    </div>
                    </div>
            </section>
  )
}

export default Hero