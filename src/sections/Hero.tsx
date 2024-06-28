// import "./css/Hero.css"
import { titles } from "../constants/index";
import { useEffect, useState } from "react";
const Hero = () => {
    
    useEffect(() => {

        const handleScroll = () => {
            const heroSection = document.getElementById("heroSection");
            if (heroSection) {
                const scrollPosition = window.scrollY;
                const fadeStart = 0; // Start fading at 200px scroll position
                const fadeEnd = 100; // Fully faded at 250px scroll position
            
                if (scrollPosition <= fadeStart) {
                  heroSection.style.opacity = '1';

                } else if (scrollPosition >= fadeEnd) {
                  heroSection.style.opacity = '0';

                } else {
                  const opacityValue = 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
                  heroSection.style.opacity = opacityValue.toString();
                }
              }
            };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
  return (
    <section
        id="heroSection"
        // className="w-1/2 h-screen flex flex-col 
        // justify-start min-h-screen
        // gap-10 max-container "
        >
        <div className="h-1/2 bg-slate-500">
            3d model
        </div>
        <div className="font-custom h-1/2 ml-3 mt-15 flex flex-col space-y-2">
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