import { titles } from "../constants/index";
import { useEffect, RefObject } from "react";

interface HeroProps {
  fadeInDivRef: RefObject<HTMLDivElement | null>;
  fadeOutDivRef: RefObject<HTMLDivElement | null>;
}
const Hero: React.FC<HeroProps> = ({ fadeInDivRef, fadeOutDivRef}) => {
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("heroSection");
      if (heroSection && fadeInDivRef.current && fadeOutDivRef.current) {
        const scrollPosition = window.scrollY;
        const fadeStart = fadeInDivRef.current.offsetTop ; // Start fading at 1500px scroll position
        const fadeEnd = fadeOutDivRef.current.offsetTop ; // Fully faded at 1800px scroll position

        if (scrollPosition <= fadeStart) {
          heroSection.style.opacity = "1";
          heroSection.classList.remove("hidden");
        } else if (scrollPosition >= fadeEnd) {
          heroSection.style.opacity = "0";
          heroSection.classList.add("hidden");
          heroSection.style.position = "absolute";
          heroSection.style.zIndex = "-1";
        } else {
          const opacityValue = 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
          heroSection.style.opacity = opacityValue.toString();
          heroSection.classList.remove("hidden");
          heroSection.style.position = "relative";
          heroSection.style.zIndex = "0";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fadeInDivRef, fadeOutDivRef]);

  return (
    <section id="heroSection" className="relative z-0">
      <div className="h-96 bg-slate-500 text-center w-full">
        <div>3d model</div>
      </div>
      <div className="font-custom ml-3 mt-14 flex flex-col space-y-2">
        <span className="text-8xl text-red-500">K3NnY,</span>
        <div className="ml-10">
          {titles.map((label, idx) => (
            <span key={idx} className="text-3xl text-orange-500">{label.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
