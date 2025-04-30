import { useEffect, RefObject } from "react";
import  FbxModelWithAnimations  from "../components/FbxModelWithAnimations";
interface HeroProps {
  fadeInDivRef: RefObject<HTMLDivElement | null>;
  fadeOutDivRef: RefObject<HTMLDivElement | null>;
  characterAction: string;
}
const Hero: React.FC<HeroProps> = ({ fadeInDivRef, fadeOutDivRef, characterAction}) => {
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("heroSection");
      if (heroSection && fadeInDivRef.current && fadeOutDivRef.current) {
        const scrollPosition = window.scrollY;
        const fadeStart = fadeInDivRef.current.offsetTop + 80; // Start fading at 1500px scroll position
        const fadeEnd = fadeStart + 200; // Fully faded at 1800px scroll position

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
    <section id="heroSection" className="relative h-full w-full ">
      <div className="h-96 w-full lg:scale-105 xl:scale-125 lg:w-4/5 -mt-40">
      <div className="w-full">
        <FbxModelWithAnimations actionName={characterAction}/>
        </div>
      </div>
    </section>
  );
};

export default Hero;
