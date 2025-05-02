import { Html, useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";

const TechCanvasLoader = (): JSX.Element => {
  const { progress } = useProgress();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [glitchText, setGlitchText] = useState<string>("INITIALIZING");
  
  // Create a blinking cursor and changing text effect
  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 500);
    
    // Changing text effect - cycle through tech-related words
    const textOptions = [
      "INITIALIZING",
      "COMPILING",
      "RENDERING",
      "LOADING ASSETS",
      "OPTIMIZING",
      "BUFFERING"
    ];
    
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % textOptions.length;
      setGlitchText(textOptions[textIndex]);
    }, 2000);
    
    return () => {
      clearInterval(cursorInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <Html
      as='div'
      center
      className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-lg border-2 border-cyan-500 bg-[#0F172A]/90 shadow-lg shadow-cyan-500/30 w-64 sm:w-80"
    >
      {/* Tech-themed header */}
      <div className="w-full text-center mb-2 sm:mb-4">
        <h2 className="text-cyan-400 font-mono font-bold text-lg sm:text-xl uppercase tracking-wider">
          {glitchText}
          <span className={`ml-1 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>_</span>
        </h2>
      </div>

      {/* Digital circuit animation */}
      <div className="w-full h-16 mb-4 relative overflow-hidden rounded-md bg-[#111827]">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-[2px]">
          {[...Array(72)].map((_, i) => (
            <div 
              key={i}
              className="bg-cyan-900/30"
              style={{
                opacity: Math.random() > 0.7 ? 0.8 : 0.2,
                animation: `pulse-node ${Math.random() * 3 + 2}s infinite`
              }}
            />
          ))}
          
          {/* Animated "data" lines */}
          {[...Array(6)].map((_, i) => (
            <div 
              key={`line-${i}`}
              className="absolute h-[2px] bg-cyan-400"
              style={{
                top: `${(i * 16) + 8}%`,
                left: 0,
                width: `${progress}%`,
                animation: `glow-line 1.5s infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Tech-style progress bar */}
      <div className="w-full mb-3">
        <div className="relative w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-cyan-400 font-mono uppercase">
              Progress
            </div>
            <div className="text-xs text-cyan-400 font-mono">
              {progress.toFixed(0)}%
            </div>
          </div>
          <div className="overflow-hidden h-3 text-xs flex rounded bg-[#1E293B] border border-cyan-900">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-300 ease-in-out relative overflow-hidden"
            >
              {/* Progress bar scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent animate-scan"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Binary code effect at bottom */}
      <div className="text-cyan-500/70 text-xs font-mono mt-1 tracking-tight overflow-hidden whitespace-nowrap w-full">
        <div 
          className="animate-type"
          style={{
            animationDuration: '10s',
            animationIterationCount: 'infinite'
          }}
        >
          10101101 01001011 00110101 11001010 01111000 00101010
        </div>
      </div>

      {/* Custom animation styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse-node {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
          }
          
          @keyframes glow-line {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          
          @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .animate-scan {
            animation: scan 2s linear infinite;
          }
          
          @keyframes type {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          
          .animate-type {
            display: inline-block;
            white-space: nowrap;
            animation: type 10s linear infinite;
            /* Double the content for seamless loop */
            content: "10101101 01001011 00110101 11001010 01111000 00101010 10101101 01001011 00110101 11001010 01111000 00101010";
          }
          
          /* Mobile optimizations */
          @media (max-width: 640px) {
            .animate-scan {
              animation-duration: 3s;
            }
          }
        `
      }} />
    </Html>
  );
};

export default TechCanvasLoader;