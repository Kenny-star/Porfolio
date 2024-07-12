import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Tech from "./sections/Tech"
import Details from "./sections/Details";
import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { skills, abilities } from './constants';
// import PieChart from './components/PieChart';

// rafce: es7+ react extension
import './App.css';
import './font.css';
import PentagonSkillChart from './components/PentagonSkillChart';

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  // const data = [
  //   { label: 'Section 1', value: 30 },
  //   { label: 'Section 2', value: 20 },
  //   { label: 'Section 3', value: 50 },
  // ];
  return (
    <div className={`h-screen w-full transition-colors duration-300 p-9 
                  ${theme === 'light' ? 'bg-white text-black' : 'bg-[#121212] text-white'}`}>
        <Nav/>
<div className="flex mt-32">
  <div className="w-full fixed h-screen overflow-hidden">
  <Hero/>
  </div>
  <div className="w-2/5 min-h-screen h-full"/>
  <div className="w-3/5 h-full overflow-y-auto px-14 z-20 ">
      <div className="h-screen pt-52 text-6xl font-custom text-center">
          <span className=" text-yellow-500">Lore</span>
            <Details/>
      </div>
        {/* <div className="bg-gray-900 h-full flex flex-col items-center justify-center p-8"> */}
        <div className="h-screen px-20 ">
          <div className="text-6xl font-custom text-center">
             <span className=" text-cyan-600">Abilities</span> 
             <span className="  text-blue-300">/</span>
            <span className=" text-sky-500">Stats</span> 
            </div>

        <div className="space-x-12 pt-10">
          <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center flex-col w-full">
            <div className="text-xl space-y-1 font-mono">
              <h3>XP: Less than 1 year</h3>
              <h3>MBTI: ISFJ</h3>
              <h3>Affinity: Python (Django), Java, React.js, MySQL</h3>
              <h3>Roles: Full-Stack Developer</h3>
              <h3>Hackathon Win(s): 1</h3>
            </div>
        </div>
            <PentagonSkillChart skills={skills} />
          </div>
          {/* <div className="h-screen flex items-center justify-center">
            <PieChart data={data} size={200} duration={3000} />
          </div> */}
        </div>
        <div className="h-0.5 w-full max-w-4xl bg-gradient-to-r from-transparent via-slate-100 to-transparent my-10"/>

            <div className="flex justify-center items-center gap-x-12">
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
<Tech />
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
