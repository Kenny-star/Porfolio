import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Tech from "./sections/Tech"
import Details from "./sections/Details";
import Projects from "./sections/Projects";
import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { skills, abilities } from './constants';
// import PieChart from './components/PieChart';

import { motion } from "framer-motion";
import { fadeIn, slideIn } from "./utils/motion";
// rafce: es7+ react extension
import './App.css';
import './font.css';
import PentagonSkillChart from './components/PentagonSkillChart';
import InteractiveButton from "./components/InteractiveButton";

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const fadeInDivRef = useRef<HTMLDivElement | null>(null);
  const fadeoutDivRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  };

  return (
    <div className={`h-full w-full transition-colors duration-300  pt-32 scroll-smooth
                  ${theme === 'light' ? 'bg-white text-ebony' : 'bg-ebony text-white'}`}>
        <Nav scrollToSection={scrollToSection} />
<div className="flex w-full">
  <div className="fixed w-2/5 overflow-hidden max-md:w-full pl-16">
      <Hero fadeInDivRef={fadeInDivRef} fadeOutDivRef={fadeoutDivRef}/>
  </div>
  <div className="w-2/5 min-h-screen h-full max-md:hidden "></div>
  <div className="w-3/5 h-full overflow-y-auto px-14 z-20 max-md:w-full">
  <motion.section
          variants={fadeIn("down", "spring", 0.5, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className={`sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0`}
          >
      <div className="h-screen pt-36 text-6xl font-custom text-center flex justify-center max-lg:h-full max-lg:w-full">
        <div className="flex flex-col max-w-6xl w-full ">
          <span className=" text-yellow-500">Lore 📔</span>
            <Details/>
            </div>
      </div>
      </motion.section>
        {/* <div className="bg-gray-900 h-full flex flex-col items-center justify-center p-8"> */}
        <div className="h-screen max-lg:h-full" ref={fadeInDivRef}>
        <motion.section
          variants={fadeIn("left", "spring", 0.5, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className={`sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0`}
          >
     
        <div className={`p-2 pt-10 ${theme === 'light' ? 'bg-white text-ebony' : 'bg-blue-950 text-white'} rounded-3xl`}>
          <div className="text-6xl w-full font-custom text-center mb-2 items-center justify-center inline-block" >
             <span className=" text-cyan-600">Stats 📊</span> 
             {/* <span className="  text-purple-500  text-7xl"> X </span> */}
             {/* <br className="md:hidden"/>
            <span className=" text-sky-500">Abilities <span className="text-slate-300 text-7xl">⚔</span></span>  */}
          </div>
            
        <div className="space-x-12 p-2 mt-5">
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center flex-col w-full">
              <div className="text-lg space-y-1.5 font-mono w-11/12 text-wrap">
                <h3>XP: <strong>7 months</strong></h3>
                <h3>MBTI: <strong>ISFJ</strong></h3>
                <h3>Affinity: <strong>.py .java .jsx .tsx .sql</strong></h3>
                <h3>Roles: <strong>Full-Stack Developer</strong></h3>
                <h3>Hackathon Win(s): <strong>1</strong></h3>
                <h3>Hobbies: <strong>Hiking & Coding</strong></h3>
              </div>
          </div>
          <div className="p-6 w-2/3 bg-cyan-500 rounded-3xl border-r-8 ">
            <PentagonSkillChart skills={skills} />
          </div>
        </div>
      </div>
    </div>
  <div className="h-0.5 w-full max-w-4xl bg-gradient-to-r from-transparent via-slate-100 to-transparent my-10" />
    <div className="inline-flex w-full justify-center items-start gap-x-12 max-sm:gap-y-4 max-sm:gap-x-3 max-sm:-ml-16 max-md:scale-90 max-md:gap-x-5 md:gap-x-2 lg:gap-x-6 " >
      {abilities.map((ability, index) => (
        <div key={index} className="flex justify-center items-center flex-col text-center transform transition-transform duration-300 hover:scale-105">
          <img alt={ability.name} src={ability.src} className="rounded-2xl xl:max-h-32 xl:max-w-32 lg:max-h-24 lg:max-w-24 max-md:max-w-28 max-md:max-h-28 max-lg:max-w-24 max-lg:max-h-24"/>
          <span className="font-serif">{ability.name}</span>              
        </div>
      ))}
      
      </div>
      </motion.section>
      <div ref={fadeoutDivRef}/> 
    </div>
         
  </div>
  
</div>

{/* <div className="w-full bg-cyan-500"> */}
  <div className="text-6xl font-custom text-center text-slate-500 mb-40 pt-20 w-full bg-sky-800 " id="skills" >
    <span>Inventory 💼</span>
    <Tech />
  </div>
{/* </div> */}
<div className="text-center h-screen max-md:h-full">
  <span className="text-6xl font-custom text-amber-400">Favorite Campaigns ⛺</span>
  <Projects />
</div>

<InteractiveButton/>
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
