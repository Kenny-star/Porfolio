import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "./Loader";

// Mobile detection function
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

interface BallProps {
  imgUrl: string;
}

const Ball: React.FC<BallProps> = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

// Static circle with icon for mobile devices
const StaticBall: React.FC<{icon: string}> = ({ icon }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div 
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#b8b8b8" }} // As requested
      >
        <img 
          src={icon} 
          alt="Technology icon" 
          className="w-10 h-10 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    </div>
  );
};

interface BallCanvasProps {
  icon: string;
}

const BallCanvas: React.FC<BallCanvasProps> = ({ icon }) => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  // Check if on mobile when component mounts
  useEffect(() => {
    setIsMobileDevice(isMobile());
    
    // Update on window resize
    const handleResize = () => {
      setIsMobileDevice(isMobile());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Render static circles on mobile
  if (isMobileDevice) {
    return <StaticBall icon={icon} />;
  }
  
  // Regular 3D balls for desktop
  return (
    <Canvas dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;