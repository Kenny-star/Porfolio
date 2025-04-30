import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from './Loader';

interface ModelProps {
  actionName: string;
  rotation: { x: number; y: number; z: number };
}

interface CharacterActionProps {
  actionName: string;
}

// Camera component that actually changes between modes
const DynamicCamera = ({ actionName }: { actionName: string }) => {
  // Use proper type for camera ref
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const isCoding = actionName === 'Coding';
  
  // Update camera when mode changes
  useEffect(() => {
    if (cameraRef.current) {
      // Set position based on current mode
      const position = isCoding 
        ? new THREE.Vector3(0, 0.1, 3.5) // Lower Y position (0.1 instead of 0.4) for coding mode
        : new THREE.Vector3(0, 0.25, 1.7); // Original position for non-coding
        
      // Set FOV based on current mode
      const fov = isCoding ? 40 : 50;
      
      // Apply settings to camera
      cameraRef.current.position.copy(position);
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [actionName, isCoding]); // Dependency on actionName to update when it changes
  
  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={isCoding ? [0, 0.1, 3.5] : [0, 0.25, 1.7]} // Initial position with lower Y value
      fov={isCoding ? 40 : 50} // Initial FOV
      near={0.01}
      far={1000}
    />
  );
};

const Model = ({ actionName, rotation }: ModelProps) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('assets/final_model.glb');
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    console.log('Available animations:', names);
  }, [names]);

  useEffect(() => {
    if (group.current) {
      const isCoding = actionName === 'Coding';
      group.current.position.set(0, isCoding ? 0.73 : 0.05, 0);
      group.current.scale.set(isCoding ? 1.55 : 0.9, isCoding ? 1.45 : 0.9, isCoding ? 1.55 : 0.9);
      group.current.rotation.set(rotation.x, rotation.y, rotation.z);
    }
  }, [actionName, rotation]);

  useEffect(() => {
    Object.values(actions).forEach(action => action?.stop());
    if (actions[actionName]) {
      actions[actionName]?.reset().fadeIn(0.5).play();
      console.log(`Playing animation: ${actionName}`);
    } else {
      console.log(`Animation "${actionName}" not found.`);
    }
  }, [actionName, actions]);

  return <primitive ref={group} object={scene} dispose={null} />;
};

// Dynamic orbit controls that update when mode changes
const DynamicOrbitControls = ({ actionName }: { actionName: string }) => {
  // Fix: Use the correct type for OrbitControls ref
  // The error was: 'OrbitControls' refers to a value, but is being used as a type here
  const orbitRef = useRef<any>(null);
  const isCoding = actionName === 'Coding';
  
  // Update orbit controls when mode changes
  useEffect(() => {
    if (orbitRef.current) {
      // Calculate angles based on current mode
      const azimuthalAngle = -Math.PI / 3;
      const polarAngle = Math.PI / 2.8;
      
      // Smoothly animate to new angles
      let currentAzimuthal = orbitRef.current.getAzimuthalAngle();
      let currentPolar = orbitRef.current.getPolarAngle();
      const steps = 30;
      let step = 0;
      
      const animate = () => {
        if (step < steps) {
          // Interpolate between current and target angles
          const azimuthalStep = currentAzimuthal + (azimuthalAngle - currentAzimuthal) * (step / steps);
          const polarStep = currentPolar + (polarAngle - currentPolar) * (step / steps);
          
          orbitRef.current?.setAzimuthalAngle(azimuthalStep);
          orbitRef.current?.setPolarAngle(polarStep);
          orbitRef.current?.update();
          
          step++;
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [actionName, isCoding]);
  
  // Prevent orbit controls from resetting during window resize
  useEffect(() => {
    // Store original resize handler
    const originalResize = window.onresize;
    
    // Fix: The error with 'this' context by using a proper function assignment
    // The error was about 'this' context not being assignable
    const handleResize = (event: UIEvent) => {
      // Call original handler if it exists
      if (originalResize) {
        // Bind 'this' correctly to window
        originalResize.call(window, event);
      }
      
      // Ensure orbit controls maintain their angles after resize
      if (orbitRef.current) {
        // Get current angles
        const azimuthalAngle = orbitRef.current.getAzimuthalAngle();
        const polarAngle = orbitRef.current.getPolarAngle();
        
        // Apply them after a short delay (after Three.js has updated)
        setTimeout(() => {
          if (orbitRef.current) {
            orbitRef.current.setAzimuthalAngle(azimuthalAngle);
            orbitRef.current.setPolarAngle(polarAngle);
            orbitRef.current.update();
          }
        }, 100);
      }
    };
    
    // Assign our handler to window.onresize
    window.onresize = handleResize;
    
    return () => {
      // Restore original handler on cleanup
      window.onresize = originalResize;
    };
  }, []);

  return (
    <OrbitControls
      ref={orbitRef}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 6}
      enableZoom={false}
      enablePan={false}
      target={[0, 0, 0]}
      dampingFactor={0.15}
    />
  );
};

const ThreeJSScene: React.FC<CharacterActionProps> = ({ actionName }) => {
  const isCoding = actionName === 'Coding';
  
 // Box dimensions and responsive calculations
const [boxHeight, setBoxHeight] = useState(1/10);
const [boxYPosition, setBoxYPosition] = useState(-0.03);

// Responsive calculations
useEffect(() => {
  const updateResponsiveValues = () => {
    const scaleFactor = window.innerHeight / 800;
    
    // Box height is the same for both modes, no need for conditional
    setBoxHeight((1/10) * scaleFactor);
    
    // Modified to make the box appear lower when in coding mode
    if (isCoding) {
      setBoxYPosition(-0.054 * scaleFactor); // Much lower position for coding mode
    } else {
      setBoxYPosition(-0.03 * scaleFactor); // Original position for non-coding
    }
  };

  updateResponsiveValues();
  window.addEventListener('resize', updateResponsiveValues);
  return () => window.removeEventListener('resize', updateResponsiveValues);
}, [isCoding]);

return (
  <Canvas style={{ height: '100vh' }}>
    <Suspense fallback={<CanvasLoader />}>
    {/* Lighting */}
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 10, 5]} intensity={1} />

    {/* Dynamic camera that changes with mode */}
    <DynamicCamera actionName={actionName} />

    {/* Dynamic orbit controls */}
    <DynamicOrbitControls actionName={actionName} />

    {/* 3D Model */}
    <Model actionName={actionName} rotation={{ x: -Math.PI / 15, y: -Math.PI / 5, z: -Math.PI / 15 }} />

    {/* Additional Mesh */}
    <mesh position={[0, boxYPosition, 0]}>
      <boxGeometry args={isCoding ? [0.53, boxHeight * 1.61, 0.53] : [1 / 3, boxHeight, 1 / 3]} />
      <meshStandardMaterial color={'#5A9BD8'} />
    </mesh>
    </Suspense>
  </Canvas>
);
};

export default ThreeJSScene;