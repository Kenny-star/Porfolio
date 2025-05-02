import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Tech from "./sections/Tech"
import Details from "./sections/Details";
// import Projects from "./sections/Projects";
import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { getSkillsValue, getSkillsName,  abilities, userDetails } from './constants';
import { motion } from "framer-motion";
import { fadeIn } from "./utils/motion";
// rafce: es7+ react extension
import './App.css';
import './font.css';
import RadarChart from './components/RadarChart';
import BouncingBallVertical from "./components/BouncingBallVertical";


const AppContent: React.FC = () => {
    const maxValue = 100;

    const { theme } = useTheme();
    const fadeInDivRef = useRef<HTMLDivElement | null>(null);
    const fadeoutDivRef = useRef<HTMLDivElement | null>(null);
    const [action, setAction] = useState<string>("idle"); // Use state instead of ref
    
    // Add state for checking if screen is smaller than lg
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    
    // Add state to track if the menu is open
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Add effect to check screen size
    useEffect(() => {
      const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 1024); // lg breakpoint is typically 1024px
      };
      
      // Check on initial render
      checkScreenSize();
      
      // Add event listener for window resize
      window.addEventListener('resize', checkScreenSize);
      
      // Clean up event listener
      return () => {
        window.removeEventListener('resize', checkScreenSize);
      };
    }, []);

    const colorClasses = {
      orange: 'border-t-orange-400',
      teal: 'border-t-teal-400',
      yellow: 'border-t-yellow-400'
      // Add all your possible colors
    };

    const scrollToSection = (id: string) => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    };

    const handleCharacterMovement = (actionName: string) => {
      setAction(actionName); // Update the state variable
      console.log(actionName); // This will log the new action immediately
    };
    
    // Handler for menu toggle
    const handleMenuToggle = (isOpen: boolean) => {
      setIsMenuOpen(isOpen);
    };

    return (
      <div className={`h-full w-full transition-colors duration-300  pt-16 scroll-smooth
                    ${theme === 'light' ? 'bg-white text-ebony' : 'bg-ebony text-white'}`}>
        {/* Pass the handler to Nav component */}
        <Nav scrollToSection={scrollToSection} onMenuToggle={handleMenuToggle} />
        
        {/* Add the bouncing ball for small screens, hide when menu is open */}
        {isSmallScreen && !isMenuOpen && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
            <BouncingBallVertical />
            <p className="text-xs text-center mt-1 opacity-70">Scroll</p>
          </div>
        )}
        
        <div className="flex w-full">
          <div className="fixed w-2/5 max-sm:hidden overflow-hidden max-md:w-full flex justify-center items-center h-full">
            <Hero fadeInDivRef={fadeInDivRef} fadeOutDivRef={fadeoutDivRef} characterAction={action}/>
          </div>
          <div className="w-5/12 min-h-screen h-full max-md:hidden "></div>
          <div className="w-7/12 h-full overflow-y-auto z-20 max-md:w-full">
            <motion.section
              variants={fadeIn("down", "spring", 1.25, 2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className={`h-screen sm:py-16 max-w-7xl mx-auto relative z-0`}
            >
              <div className="h-screen  text-6xl font-custom text-center flex justify-center max-lg:h-full max-lg:w-full">
                <div className="flex flex-col max-w-6xl w-full">
                  <Details/>
                </div>
              </div>
              
              {/* Add the bouncing ball at bottom of first section for large screens, hide when menu is open */}
              
            </motion.section>
            
            {/* Rest of your existing code */}
            <div className="h-screen max-lg:h-full">
              <motion.section
                variants={fadeIn("right", "spring", 0.5, 2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className={` px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0 mb-16`}
              >
                <div className="text-5xl md:text-6xl w-full font-custom text-start mb-2 inline-block max-lg:scale-90" >
                  <span className=" text-cyan-600" >Stats 📊</span> 
                </div>
                <div className={`lg:p-2 lg:mt-2 `}>
                  <div className="py-2 mt-5">
                    <div className="flex items-center justify-between w-full max-lg:flex-col ">
                      <div className="flex items-start justify-center flex-col ml-8 w-7/12 max-lg:w-full ">
                        <div className="2xl:text-lg text-base space-y-1.5 font-mono text-wrap">
                          {userDetails.map((userDetail, index) => (
                            <h3 key={index}>{userDetail.name}: <strong className="text-cyan-200 italic">{userDetail.value}</strong></h3>
                          ))}
                        </div>
                        <div id="stats"></div>
                      </div>
                      <div className="scale-125 lg:mr-12 w-5/12 lg:-my-10 max-lg:my-10 max-lg:h-full max-lg:-mx-10 lg:flex lg:flex-row }"  >
                        <RadarChart data={getSkillsValue()} labels= {getSkillsName()} maxValue={maxValue} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>
            
            {/* Rest of the code remains the same... */}
            <div className="h-screen max-lg:h-full mb-16" >
              <div ref={fadeInDivRef} className="-z-50 "/>
              <div ref={fadeoutDivRef}  className="-z-50"/>
              <motion.section
                variants={fadeIn("right", "spring", 0.5, 2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className={`sm:px-4 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0`}
              >
                <div className={`p-2 py-8 ${theme === 'light' ? 'bg-white text-ebony' : ' text-white'} rounded-3xl`}>
                  <div className="text-5xl md:text-6xl  w-full font-custom text-start  inline-block max-lg:scale-90" >
                    <span className=" text-sky-500">Skills <span className="text-slate-300 text-7xl">⚔</span></span>  
                  </div>
                  <div className="flex flex-col items-center max-lg:-space-y-6 lg:grid lg:grid-cols-2 justify-start lg:mt-10 lg:gap-y-4 -mx-6 mt-4 ">
                    {abilities.map((ability, index) => (
                      <div className={`flex flex-row w-full max-w-md bg-gray_blue p-6 pb-4 rounded-3xl shadow-xl max-lg:scale-75 max-lg:hover:scale-[0.8] transform max-lg:space-x-3 max-lg:max-h-40 lg:scale-90 lg:min-h-full
                                    transition-transform duration-500 lg:hover:scale-95 cursor-pointer  max-lg:items-center border-t-4 ${
                                      (ability.color in colorClasses) 
                                        ? colorClasses[ability.color as keyof typeof colorClasses] 
                                        : 'border-t-gray-400'
                                    }`}
                              onClick={() => handleCharacterMovement(ability.action)}>
                        <div key={index} className="flex justify-center items-center flex-col text-center">
                          <img alt={ability.name} src={ability.src} className="rounded-2xl xl:max-h-32 xl:max-w-32 lg:max-h-24 lg:max-w-24 max-md:max-w-28 max-md:max-h-28 max-lg:max-w-24 max-lg:max-h-24"/>
                          <span className="font-serif ">{ability.name}</span>
                        </div>
                        <div className="2xl:mt-3 2xl:ml-6 lg:ml-4 2xl:text-xl text-lg italic flex flex-col max-lg:text-center">
                          <span className="font-mono text-slate-400 ">
                            Cooldown: {ability.cooldown}s
                          </span>
                          <span>
                          &nbsp;"{ability.description}"
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </div>

        <div className="w-full bg-sky-800" id="skills">
          <div className="text-5xl md:text-6xl font-custom text-center text-slate-500 mb-20 pt-20 " >
            <span >Inventory 💼</span>
            <Tech />
          </div>
        </div>
        <div className="relative mt-10">
        </div>
        <footer className="w-full pt-12 pb-6 mt-16">
          <div className={`max-w-4xl mx-auto ${theme === 'light' ? 'bg-slate-100' : 'bg-[#1d2d4d]'} 
                          rounded-xl px-6 py-5 shadow-lg
                          border-t-2 border-sky-500`}>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center mb-3">
                <div className="w-8 h-1 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full"></div>
                <span className="mx-2 text-lg font-custom text-sky-500">CHECKPOINT</span>
                <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full"></div>
              </div>
              
              <p className={`font-mono ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} text-center mb-2`}>
                © {new Date().getFullYear()} All rights reserved to Kenny Luo-Li
              </p>
              
              <div className="flex items-center mt-1 space-x-1">
                <span className="inline-block w-2 h-2 bg-sky-400 rounded-full animate-pulse"></span>
                <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></span>
                <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-200"></span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
};

const App: React.FC = () => {
  return (
    <>
    <ThemeProvider>
      <AppContent/>
    </ThemeProvider>
    </>
  )
}

export default App