import React, { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from 'react-dom';
import BallCanvas from "../components/Ball";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn } from "../utils/motion";
import TechCanvasLoader from "../components/TechCanvasLoader";

interface Technology {
  name: string;
  icon: string;
  description: string;
}

function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const Tech: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  
  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Check if we're on a mobile device
  const isMobile = windowWidth < 768;

  const handleTechClick = (tech: Technology) => {
    setSelectedTech(tech);
    // Prevent scrolling when tech is selected
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setSelectedTech(null);
    // Restore scrolling when closed
    document.body.style.overflow = 'unset';
  };
  
  // Better touch handling for mobile
  const handleTouchStart = (tech: Technology, e: React.TouchEvent) => {
    e.preventDefault(); // Prevent default behavior
    setHoveredTech(tech.name);
  };
  
  const handleTouchEnd = (tech: Technology) => {
    // On touch end, trigger the click handler after a brief delay
    // This allows the user to see the hover effect before the modal opens
    setTimeout(() => {
      handleTechClick(tech);
      setHoveredTech(null);
    }, 150);
  };

  const TechModal = () => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
          modalRef.current && 
          !modalRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      // Add event listeners for both mouse and touch
      document.addEventListener('mousedown', handleClickOutside as any);
      document.addEventListener('touchstart', handleClickOutside as any);
      
      // Cleanup
      return () => {
        document.removeEventListener('mousedown', handleClickOutside as any);
        document.removeEventListener('touchstart', handleClickOutside as any);
      };
    }, []);

    if (!selectedTech) return null;

    return createPortal(
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div 
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ 
              scale: 0.9, 
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            className="
              w-full max-w-4xl 
              max-h-[90vh] 
              bg-[#1E2A38] 
              rounded-2xl 
              overflow-hidden 
              shadow-2xl 
              flex 
              relative
              flex-col 
              sm:flex-row
            "
          >
            {/* Close Button - Larger for mobile */}
            <button 
              onClick={handleClose}
              className="
                absolute top-4 right-4 
                w-12 h-12 
                bg-red-500/70 
                hover:bg-red-500
                rounded-xl 
                flex items-center justify-center 
                transition-colors 
                group
                z-10
                touch-manipulation
              "
              style={{ touchAction: 'manipulation' }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7 text-white opacity-70 group-hover:opacity-100 transition-opacity" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>

            {/* Tech Ball Container */}
            <div className="
              w-full sm:w-1/3 
              flex items-center 
              justify-center 
              p-6 sm:p-8
              relative 
              bg-[#2C3E50]
              min-h-[200px] sm:min-h-[300px]
            ">
              <Suspense fallback={<TechCanvasLoader />}>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-[200px] sm:max-w-[300px] aspect-square relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BallCanvas icon={selectedTech.icon} />
                  </div>
                </motion.div>
              </Suspense>
            </div>

            {/* Tech Description */}
            <div className="
              w-full sm:w-2/3 
              p-5 sm:p-10 
              flex 
              flex-col 
              justify-center 
              bg-[#162128]
              overflow-y-auto
              max-h-[60vh] sm:max-h-[80vh]
            ">
              <h2 className="
                text-xl sm:text-4xl 
                font-bold 
                text-cyan-300 
                mb-3 sm:mb-6 
                uppercase 
                tracking-wider
              ">
                {selectedTech.name}
              </h2>
              <p className="
                text-gray-300 
                text-sm sm:text-xl 
                leading-relaxed 
                mb-4 sm:mb-8 
                font-mono 
                font-semibold
              ">
                {selectedTech.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <div className="relative min-h-[500px]">
      {/* Technologies Grid - Optimized for mobile */}
      <div 
        className={`
          relative flex flex-row flex-wrap justify-center 
          gap-6 sm:gap-10 
          px-2 sm:px-0
          max-sm:scale-80 mb-20 -mt-6 sm:-mt-12
          ${selectedTech ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          transition-all duration-500 ease-in-out
        `}
      >
        {technologies.map((technology: Technology) => (
          <div 
            key={technology.name} 
            className="relative group cursor-pointer touch-manipulation"
            onClick={() => handleTechClick(technology)}
            onMouseEnter={() => !isMobile && setHoveredTech(technology.name)}
            onMouseLeave={() => !isMobile && setHoveredTech(null)}
            onTouchStart={(e) => handleTouchStart(technology, e)}
            onTouchEnd={() => handleTouchEnd(technology)}
            style={{ touchAction: 'manipulation' }}
          >
            <motion.section
              variants={fadeIn("up", "spring", 0.5, getRandomInRange(1, isMobile ? 2 : 4))}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className={`${isMobile ? 'w-20 h-20' : 'w-28 h-28'} relative z-10`}
            >
              <Suspense fallback={
                <div className="flex items-center justify-center h-full w-full">
                  <div className="w-8 h-8 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <BallCanvas icon={technology.icon} />
              </Suspense>
            </motion.section>
            
            {/* Hover/touch name tag - Improved for mobile */}
            <div 
              className={`
                absolute top-full left-1/2 transform -translate-x-1/2 mt-1 sm:mt-2 
                transition-all duration-300 ease-in-out
                ${hoveredTech === technology.name 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-[-5px] scale-95'}
                bg-cyan-600/90 text-white 
                px-2 sm:px-3 py-0.5 sm:py-1 rounded-full 
                text-xs sm:text-sm font-bold 
                shadow-lg 
                pointer-events-none
                whitespace-nowrap
                z-20
              `}
            >
              {technology.name}
            </div>
            
            {/* Gamified hover effect - Optimized for mobile */}
            <div 
              className={`
                absolute inset-0 
                border-2 sm:border-4 border-transparent 
                group-hover:border-cyan-500 
                rounded-full 
                transition-all duration-300 ease-in-out
                ${hoveredTech === technology.name 
                  ? 'animate-pulse-border' 
                  : ''}
              `}
            />
          </div>
        ))}
        
        {/* Custom styles with mobile optimization */}
        <style>{`
          @keyframes pulse-border {
            0% {
              box-shadow: 0 0 0 0 rgba(51, 204, 204, 0.4);
            }
            70% {
              box-shadow: 0 0 0 15px rgba(51, 204, 204, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(51, 204, 204, 0);
            }
          }
          
          .animate-pulse-border {
            animation: pulse-border 2s infinite;
          }
          
          @media (max-width: 768px) {
            .animate-pulse-border {
              animation: pulse-border-mobile 1.5s infinite;
            }
            
            @keyframes pulse-border-mobile {
              0% {
                box-shadow: 0 0 0 0 rgba(51, 204, 204, 0.3);
              }
              70% {
                box-shadow: 0 0 0 8px rgba(51, 204, 204, 0);
              }
              100% {
                box-shadow: 0 0 0 0 rgba(51, 204, 204, 0);
              }
            }
          }
          
          /* Touch optimizations */
          .touch-manipulation {
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Scale class for mobile */
          .scale-80 {
            --tw-scale-x: 0.8;
            --tw-scale-y: 0.8;
            transform: translate(var(--tw-translate-x), var(--tw-translate-y)) 
                       rotate(var(--tw-rotate)) 
                       skewX(var(--tw-skew-x)) 
                       skewY(var(--tw-skew-y)) 
                       scaleX(var(--tw-scale-x)) 
                       scaleY(var(--tw-scale-y));
          }
        `}</style>
      </div>

      {/* Detailed Tech View */}
      {selectedTech && <TechModal />}
    </div>
  );
};

export default SectionWrapper(Tech, "");