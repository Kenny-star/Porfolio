import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from 'react-dom';
import BallCanvas from "../components/Ball";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn } from "../utils/motion";

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

  const TechModal = () => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          modalRef.current && 
          !modalRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      // Add click event listener to the document
      document.addEventListener('mousedown', handleClickOutside);
      
      // Cleanup the event listener
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
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
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="
                absolute top-4 right-4 
                w-10 h-10 
                bg-red-500/70 
                hover:bg-red-500
                rounded-xl 
                flex items-center justify-center 
                transition-colors 
                group
                z-10
              "
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white opacity-70 group-hover:opacity-100 transition-opacity" 
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
              p-8 
              relative 
              bg-[#2C3E50]
            ">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[300px] aspect-square relative"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <BallCanvas icon={selectedTech.icon} />
                </div>
              </motion.div>
            </div>

            {/* Tech Description */}
            <div className="
              w-full sm:w-2/3 
              p-6 sm:p-10 
              flex 
              flex-col 
              justify-center 
              bg-[#162128]
              overflow-y-auto
            ">
              <h2 className="
                text-2xl sm:text-4xl 
                font-bold 
                text-cyan-300 
                mb-4 sm:mb-6 
                uppercase 
                tracking-wider
              ">
                {selectedTech.name}
              </h2>
              <p className="
                text-gray-300 
                text-base sm:text-xl 
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
      {/* Technologies Grid */}
      <div 
        className={`
          relative flex flex-row flex-wrap justify-center gap-10 
          max-sm:scale-95 mb-28 -mt-12
          ${selectedTech ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          transition-all duration-500 ease-in-out
        `}
      >
        {technologies.map((technology: Technology) => (
          <div 
            key={technology.name} 
            className="relative group cursor-pointer"
            onClick={() => handleTechClick(technology)}
            onMouseEnter={() => setHoveredTech(technology.name)}
            onMouseLeave={() => setHoveredTech(null)}
          >
            <motion.section
              variants={fadeIn("up", "spring", 0.5, getRandomInRange(1, 4))}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="w-28 h-28 relative z-10"
            >
              <BallCanvas icon={technology.icon} />
            </motion.section>
            
            {/* Hover name tag */}
            <div 
              className={`
                absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                transition-all duration-300 ease-in-out
                ${hoveredTech === technology.name 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-[-10px] scale-95'}
                bg-cyan-600/90 text-white 
                px-3 py-1 rounded-full 
                text-sm font-bold 
                shadow-lg 
                pointer-events-none
                whitespace-nowrap
                z-20
              `}
            >
              {technology.name}
            </div>
            
            {/* Gamified hover effect */}
            <div 
              className={`
                absolute inset-0 
                border-4 border-transparent 
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
        
        {/* Custom styles for pulse border animation */}
        <style>{`
          @keyframes pulse-border {
            0% {
              box-shadow: 0 0 0 0 rgba(51, 204, 204, 0.4);
            }
            70% {
              box-shadow: 0 0 0 20px rgba(51, 204, 204, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(51, 204, 204, 0);
            }
          }
          
          .animate-pulse-border {
            animation: pulse-border 2s infinite;
          }
        `}</style>
      </div>

      {/* Detailed Tech View */}
      {selectedTech && <TechModal />}
    </div>
  );
};

export default SectionWrapper(Tech, "");