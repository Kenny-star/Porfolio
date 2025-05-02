import { Html, useProgress } from "@react-three/drei";
// import { useState, useEffect } from "react";

const CanvasLoader = (): JSX.Element => {
  const { progress } = useProgress();

  return (
    <Html
      as='div'
      center
      className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-teal-400 bg-black/90 shadow-lg shadow-green-500/30 w-72 "
    >
      {/* Game-like header */}
      <div className="w-full text-center mb-4">
        <h2 className="text-teal-400 font-bold text-xl uppercase tracking-wider">
          LOADING PLAYER
        </h2>
      </div>

      {/* Pixelated character animation */}
      <div className="relative h-16 w-16 mb-4">
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          {/* Simplified pixel art character */}
          <div className="w-8 h-8 bg-sky-400 rounded-md relative animate-pulse">
            {/* Character eyes */}
            <div className="absolute top-2 left-1 w-1 h-1 bg-black rounded-full"></div>
            <div className="absolute top-2 right-1 w-1 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Gaming-style progress bar */}
      <div className="w-full mt-2 mb-4">
        <div className="relative pt-1 w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-teal-400 font-semibold inline-block uppercase">
              Loading Assets
            </div>
            <div className="text-xs text-teal-400 inline-block">
              {progress.toFixed(0)}%
            </div>
          </div>
          <div className="overflow-hidden h-4 mb-2 text-xs flex rounded-lg bg-gray-800 border border-gray-700">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-teal-400 transition-all duration-300 ease-in-out"
            ></div>
          </div>
        </div>
      </div>

      {/* Pixelated loading blocks */}
      <div className="flex mt-4 space-x-1">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-sky-400 opacity-0 animate-pulse rounded-sm"
            style={{
              animationDelay: `${i * 0.5}s`,
              animationDuration: "1s",
            }}
          ></div>
        ))}
      </div>
    </Html>
  );
};

export default CanvasLoader;