import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Tech from "./sections/Tech"
import Details from "./sections/Details";
import Projects from "./sections/Projects";
import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { skills, abilities } from './constants';
// import PieChart from './components/PieChart';

// rafce: es7+ react extension
import './App.css';
import './font.css';
import PentagonSkillChart from './components/PentagonSkillChart';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const fadeInDivRef = useRef<HTMLDivElement | null>(null);
  const fadeoutDivRef = useRef<HTMLDivElement | null>(null);


  return (
    <div className={`h-full w-full transition-colors duration-300 p-9 
                  ${theme === 'light' ? 'bg-white text-black' : 'bg-[#121212] text-white'}`}>
        <Nav/>
<div className="flex mt-32">
  <div className="fixed w-2/5 overflow-hidden ">
      <Hero fadeInDivRef={fadeInDivRef} fadeOutDivRef={fadeoutDivRef}/>
  </div>
  <div className="w-2/5 min-h-screen h-full"></div>
  <div className="w-3/5 h-full overflow-y-auto px-14 z-20 ">
      <div className="h-screen pt-36 text-6xl font-custom text-center flex justify-center">
        <div className="flex flex-col max-w-6xl w-full">
          <span className=" text-yellow-500">Lore 📔</span>
            <Details/>
            </div>
      </div>
        {/* <div className="bg-gray-900 h-full flex flex-col items-center justify-center p-8"> */}
        <div className="h-screen px-20">
          <div className="text-6xl font-custom text-center mb-10" ref={fadeInDivRef}>
             <span className=" text-cyan-600">Stats 📊</span> 
             <span className="  text-blue-300">/</span>
            <span className=" text-sky-500">Abilities <span className="text-slate-300 text-7xl">⚔</span></span> 
            </div>

        <div className="space-x-12 pt-10">
          <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center flex-col w-full">
            <div className="text-xl space-y-1 font-mono" ref={fadeoutDivRef}>
              <h3>XP: 7 months</h3>
              <h3>MBTI: ISFJ</h3>
              <h3>Affinity: Python (Django), Java, React.js, MySQL</h3>
              <h3>Roles: Full-Stack Developer</h3>
              <h3>Hackathon Win(s): 1</h3>
            </div>
        </div>
            <PentagonSkillChart skills={skills} />
          </div>
        </div>
        <div className="h-0.5 w-full max-w-4xl bg-gradient-to-r from-transparent via-slate-100 to-transparent my-10" />

            <div className="flex justify-center items-center gap-x-12" >
            {abilities.map((ability, index) => (
              <div key={index} className="text-center transform transition-transform duration-300 hover:scale-105">
                <img alt={ability.name} src={ability.src} className="rounded-2xl max-h-32 max-w-32 "/>
                <span className="font-serif">{ability.name}</span>
                </div>
            ))}
            </div>
          </div>
  </div>
  
</div>
<div className="text-6xl font-custom text-center text-slate-500 pt-40">
  <span>Inventory 💼</span>
  <Tech />
</div>
<div className="text-center h-screen">
  <span className="text-6xl font-custom text-amber-400">Favorite Campaigns ⛺</span>
  <Projects />
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
