import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "./Loader";

// Mobile detection function
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

interface BallProps {
  imgUrl: string;
  isMobileDevice?: boolean;
}

const Ball: React.FC<BallProps> = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  const isMobileDevice = props.isMobileDevice || false;

  // Optimize texture for mobile
  useEffect(() => {
    if (isMobileDevice && decal) {
      decal.minFilter = THREE.LinearFilter;
      decal.generateMipmaps = false;
      decal.needsUpdate = true;
    }
  }, [decal, isMobileDevice]);

  return (
    <Float 
      speed={isMobileDevice ? 1.25 : 1.75} 
      rotationIntensity={isMobileDevice ? 0.5 : 1} 
      floatIntensity={isMobileDevice ? 1 : 2}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh 
        castShadow={!isMobileDevice} 
        receiveShadow={!isMobileDevice} 
        scale={2.75}
      >
        <icosahedronGeometry args={[1, 1]} />
        {isMobileDevice ? (
          // Simpler material for mobile
          <meshBasicMaterial
            color="#b8b8b8"
            polygonOffset
            polygonOffsetFactor={-5}
          />
        ) : (
          // Original material for desktop
          <meshStandardMaterial
            color="#fff8eb"
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
        )}
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
  
  return (
    <Canvas 
      dpr={isMobileDevice ? 1 : [1, 2]} 
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: !isMobileDevice, // Disable antialiasing on mobile
        powerPreference: "high-performance"
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          enableRotate={!isMobileDevice} // Disable rotation on mobile
        />
        <Ball imgUrl={icon} isMobileDevice={isMobileDevice} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;