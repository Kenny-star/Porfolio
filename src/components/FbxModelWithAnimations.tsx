import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  actionName: string;
  rotation: { x: number; y: number; z: number }; // Add rotation prop

}

interface characterActionProps {
  actionName: string;
}
const Model = ({ actionName, rotation  }: ModelProps) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('assets/final_model.glb'); // Online GLB model
  const { actions, names } = useAnimations(animations, group);

  // Log available animation names to ensure they match the buttons
  useEffect(() => {
    console.log('Available animations:', names);
  }, [names]);

  // Adjust position and scale when actionName is 'Coding'
  useEffect(() => {
    if (group.current) {
      if (actionName === 'Coding') {
        group.current.position.set(0, 0.73, 0); // Raise the model on Y-axis
        group.current.scale.set(1.55, 1.45, 1.55); // Scale up the model
      } else {
        group.current.position.set(0, 0.05, 0); // Default position for other animations
        group.current.scale.set(0.9, 0.9, 0.9); // Default scale for other animations
      }
      console.log('Model position:', group.current.position);
      console.log('Model scale:', group.current.scale);
      group.current.rotation.set(rotation.x, rotation.y, rotation.z);

    }


  }, [actionName, rotation]);

  // Play animation when actionName changes
  useEffect(() => {
    if (actions && actionName && actions[actionName]) {
      actions[actionName]?.reset().fadeIn(0.5).play();
      console.log(`Playing animation: ${actionName}`);
    } else {
      console.log(`Animation "${actionName}" not found.`);
    }
  }, [actionName, actions]);

  return <primitive ref={group} object={scene} dispose={null} />;
};

const ThreeJSScene: React.FC<characterActionProps> = ({actionName}) => {
  // const [actionName, setActionName] = useState<string>('idle'); // Default to 'Coding' animation
  const orbitRef = useRef<any>(null);
  const azimuthal = -Math.PI / 3;
  const polar = Math.PI / 4;
  const [azimuthalAngle, setAzimuthalAngle] = useState<number>(-Math.PI / 3);
  const [polarAngle, setPolarAngle] = useState<number>(Math.PI / 2.8);
  const modelRotation = { x: -Math.PI / 15, y: -Math.PI / 5, z: -Math.PI / 15};

  
  // Conditional settings for the Canvas and Camera
  const canvasHeight = '100vh';
  const cameraPosition = actionName === 'Coding' ? new THREE.Vector3(0, 0.2, 2.5) : new THREE.Vector3(0, 0.25, 1.7);
  const cameraFov = actionName === 'Coding' ? 55 : 50; // Wider FOV for zoomed effect

  useEffect(() => {
    const retryOrbitControls = () => {
      if (orbitRef.current) {
        // Set the initial azimuthal and polar angles manually
        orbitRef.current.setAzimuthalAngle(azimuthalAngle); // Horizontal rotation
        orbitRef.current.setPolarAngle(polarAngle); // Vertical rotation
        orbitRef.current.update(); // Required to apply the changes
      } else {
        // Retry after a short delay
        setTimeout(retryOrbitControls, 100); // Retry after 100ms
      }
    };

    retryOrbitControls(); // Start the retry process

  }, []);

  // useEffect(() => {
  //   console.log("yur")
  //   const retryOrbitControls = () => {
      
  //     if (orbitRef.current) {
  //       // Set the initial azimuthal and polar angles manually
  //       orbitRef.current.setAzimuthalAngle(-Math.PI / 3 ); // Horizontal rotation
  //       orbitRef.current.setPolarAngle(Math.PI / 4); // Vertical rotation
  //       orbitRef.current.update(); // Required to apply the changes
  //     } else {
  //       // Retry after a short delay
  //       setTimeout(retryOrbitControls, 1000); // Retry after 100ms
  //     }
  //   };

  //   retryOrbitControls(); // Start the retry process

  // }, [orbitRef.current]);

  return (
    <>
      <Canvas style={{ height: canvasHeight }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        {/* Camera */}
        {actionName === 'Coding' ? <PerspectiveCamera 
          makeDefault 
          position={cameraPosition} 
          fov={cameraFov} 
          near={0.01} // Adjust the near clipping plane to allow zoom without clipping
          far={1000}/> :
          <PerspectiveCamera makeDefault position={cameraPosition} fov={cameraFov} /> 
        
  }
        <OrbitControls 
          ref={orbitRef}
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 3} 
          enableZoom={false} 
          enablePan={false} 
          target={[0, 0, 0]} // Where the camera will be looking at
        />
        {/* 3D Model */}
        <Model actionName={"Photography"} rotation={modelRotation}  />

        { actionName === 'Coding' ? <mesh position={[0, -1.2, 0]}>
          <boxGeometry args={[0.55, 2.5, 0.55]} />
          <meshStandardMaterial color={'#5A9BD8'} />
        </mesh> : <mesh position={[0, -0.468, 0]}>
          <boxGeometry args={[1/3, 1, 1/3]} />
          <meshStandardMaterial color={'#5A9BD8'} />
        </mesh>}
      </Canvas>

      {/* Buttons to trigger different animations */}
      {/* <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <button onClick={() => setActionName('idle')}>Idle</button>
        <button onClick={() => setActionName('Animation1')}>Animation 1</button>
        <button onClick={() => setActionName('Animation2')}>Animation 2</button>
        <button onClick={() => setActionName('Animation3')}>Animation 3</button>
        <button onClick={() => setActionName('Animation4')}>Animation 4</button>
        <button onClick={() => setActionName('Coding')}>Coding</button>
      </div> */}

    </>
  );
};

export default ThreeJSScene;
