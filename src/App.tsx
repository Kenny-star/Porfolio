import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Tech from "./sections/Tech"
import Details from "./sections/Details";
import Projects from "./sections/Projects";
import React, { useState, useRef } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { getSkillsValue, getSkillsName,  abilities, userDetails } from './constants';
import { motion } from "framer-motion";
import { fadeIn } from "./utils/motion";
// rafce: es7+ react extension
import './App.css';
import './font.css';
import RadarChart from './components/RadarChart';

const AppContent: React.FC = () => {

    const maxValue = 100;

  const { theme } = useTheme();
  const fadeInDivRef = useRef<HTMLDivElement | null>(null);
  const fadeoutDivRef = useRef<HTMLDivElement | null>(null);
  const [action, setAction] = useState<string>("idle"); // Use state instead of ref

 

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

  return (
    <div className={`h-full w-full transition-colors duration-300  pt-32 scroll-smooth
                  ${theme === 'light' ? 'bg-white text-ebony' : 'bg-ebony text-white'}`}>
        <Nav scrollToSection={scrollToSection} />
<div className="flex w-full">
  <div className="fixed w-2/5 overflow-hidden max-md:w-full flex justify-center items-center h-full">
      <Hero fadeInDivRef={fadeInDivRef} fadeOutDivRef={fadeoutDivRef} characterAction={action}/>
  </div>
  <div className="w-2/5 min-h-screen h-full max-md:hidden "></div>
  <div className="w-3/5 h-full overflow-y-auto max-sm:px-6 px-8 z-20 max-md:w-full">
  <motion.section
          variants={fadeIn("down", "spring", 1.25, 2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className={`sm:px-4 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0`}
          >
      <div className="h-screen  text-6xl font-custom text-center flex justify-center max-lg:h-full max-lg:w-full">
        <div className="flex flex-col max-w-6xl w-full ">
          <span className=" text-yellow-500">Lore 📔</span>
            <Details/>
            </div>
      </div>
      </motion.section>
        {/* <div className="bg-gray-900 h-full flex flex-col items-center justify-center p-8"> */}
        <div className="h-screen max-lg:h-full">
        <motion.section
          variants={fadeIn("right", "spring", 0.5, 2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className={` px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0`}
          >
      <div className="text-6xl w-full font-custom text-center mb-2 inline-block" >
             <span className=" text-cyan-600">Stats 📊</span> 
             {/* <span className="  text-purple-500  text-7xl"> X </span> */}
             {/* <br className="md:hidden"/>
            <span className=" text-sky-500">Abilities <span className="text-slate-300 text-7xl">⚔</span></span>  */}
          </div>
        <div className={`p-2 mt-8 ${theme === 'light' ? 'bg-white text-ebony' : 'bg-gray_blue text-white'} rounded-3xl shadow-xl`}>
          
            
        <div className="py-2 mt-5">
          <div className="flex items-center justify-between w-full max-lg:flex-col ">
            <div className="flex items-start justify-center flex-col ml-8 w-7/12 max-lg:w-full">
              <div className="2xl:text-lg text-base space-y-1.5 font-mono text-wrap">
              {userDetails.map((userDetail, index) => (
                  <h3 key={index}>{userDetail.name}: <strong className="text-cyan-200 italic">{userDetail.value}</strong></h3>
              ))}
              </div>
          </div>
  
         
          
            <div className="scale-125 lg:p-6 w-5/12 lg:-my-10 max-lg:my-10 max-lg:w-full max-lg:h-full">
            <RadarChart data={getSkillsValue()} labels= {getSkillsName()} maxValue={maxValue} />
          </div>
          {/* <div className="py-6 max-lg:max-w-xs w-2/3 max-w-sm bg-cyan-500 rounded-3xl border-r-8 ">
            <PentagonSkillChart skills={skills} />
          </div> */}
        </div>
        {/* <div className="flex justify-between items-center flex-row">
          <div className="flex justify-center items-center flex-col">
         <img alt="isfp" src={isfp} className="rounded-2xl xl:max-h-48 xl:max-w-48 lg:max-h-24 lg:max-w-24 max-md:max-w-28 max-md:max-h-28 max-lg:max-w-24 max-lg:max-h-24"/>
            <span className="text-lg font-mono  text-cyan-200 italic ">isfp</span>
            </div>
        </div> */}
        
      </div>
      
    </div>

      </motion.section>
      </div> 
      
        <div className="h-screen max-lg:h-full mb-32">
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
          <div className="text-6xl w-full font-custom text-center mb-8 inline-block " >
            <span className=" text-sky-500">Abilities <span className="text-slate-300 text-7xl">⚔</span></span>  
          </div>
          <div className="grid grid-cols-2 justify-start mx-auto">
              {abilities.map((ability, index) => (
                <div className="flex flex-row items-start bg-gray_blue p-6 pb-4 rounded-3xl scale-90 shadow-xl transform 
                                transition-transform duration-500 hover:scale-95 cursor-pointer max-lg:flex-col max-lg:items-center max-lg:max-w-72" 
                      onClick={() => handleCharacterMovement(ability.action)}>
                  <div key={index} className="flex justify-center items-center flex-col text-center scale-105">
                    <img alt={ability.name} src={ability.src} className="rounded-2xl xl:max-h-32 xl:max-w-32 lg:max-h-24 lg:max-w-24 max-md:max-w-28 max-md:max-h-28 max-lg:max-w-24 max-lg:max-h-24"/>
                    <span className="font-serif ">{ability.name}</span>              
                </div>
            <div className="2xl:mt-3 2xl:ml-6 lg:ml-4 2xl:text-xl text-lg italic flex flex-col scale-90 max-lg:text-center">
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
          {/* <div className="flex flex-col items-center">
      <div className="h-0.5 w-full max-w-4xl bg-gradient-to-r from-transparent via-slate-100 to-transparent my-6" />
    <div className="inline-flex w-full justify-center items-start gap-x-12 max-sm:gap-y-4 max-sm:gap-x-3 max-sm:-ml-16 max-md:scale-90 max-md:gap-x-5 md:gap-x-2 lg:gap-x-6 " >
      {abilities.map((ability, index) => (
        <div key={index} className="flex justify-center items-center flex-col text-center transform transition-transform duration-300 hover:scale-105 cursor-pointer">
          <img alt={ability.name} src={ability.src} className="rounded-2xl xl:max-h-32 xl:max-w-32 lg:max-h-24 lg:max-w-24 max-md:max-w-28 max-md:max-h-28 max-lg:max-w-24 max-lg:max-h-24"/>
          <span className="font-serif">{ability.name}</span>              
        </div>
      ))}
      </div>
      </div> */}
      
    </div>
      </motion.section>
       
    </div>
    

  </div>
  
</div>

{/* <div className="w-full bg-cyan-500"> */}
  <div className="text-6xl font-custom text-center text-slate-500 mb-40 pt-20 w-full bg-sky-800 " id="skills" >
    <span>Inventory 💼</span>
    <Tech />
  </div>
{/* </div> */}
<div className=" text-6xl font-custom text-green-600 text-center ">
  <span>Saved Campaigns ⛺</span>

  <Projects />
  {/* <div className="w-full h-screen">
      <SwipeGallery />
    </div> */}


</div>

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
