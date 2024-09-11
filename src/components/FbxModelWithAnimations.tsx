import React, { useRef, useEffect, ForwardRefRenderFunction } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  actionName: string;
  rotation: { x: number; y: number; z: number };
}

interface CharacterActionProps {
  actionName: string;
}

// Define OrbitControlsComponent with correct types
const OrbitControlsComponent: ForwardRefRenderFunction<any, any> = (props, ref) => {
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const retryOrbitControls = () => {
      if (controlsRef.current) {
        // Set the initial azimuthal and polar angles manually
        
        controlsRef.current.setAzimuthalAngle(-Math.PI / 3);
        controlsRef.current.setPolarAngle(Math.PI / 2.8);
        controlsRef.current.update(); // Required to apply the changes
        
      } 
      setTimeout(retryOrbitControls, 100); // Retry after 100ms

    };
    
    retryOrbitControls(); // Start the retry process
  },[]);
  console.log(controlsRef.current.getAzimuthalAngle(),controlsRef.current.getPolarAngle() )

  return (
    <OrbitControls
      ref={(el) => {
        controlsRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as React.MutableRefObject<any>).current = el;
      }}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 3}
      enableZoom={false}
      enablePan={false}
      target={[0, 0, 0]}
      {...props}
    />
  );
};

const ForwardedOrbitControls = React.forwardRef(OrbitControlsComponent);

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

const ThreeJSScene: React.FC<CharacterActionProps> = ({ actionName }) => {
  const isCoding = actionName === 'Coding';

  return (
    <Canvas style={{ height: '100vh' }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={isCoding ? new THREE.Vector3(0, 0.2, 2.5) : new THREE.Vector3(0, 0.25, 1.7)}
        fov={isCoding ? 55 : 50}
        near={0.01}
        far={1000}
      />

      {/* OrbitControls */}
      <ForwardedOrbitControls />

      {/* 3D Model */}
      <Model actionName={actionName} rotation={{ x: -Math.PI / 15, y: -Math.PI / 5, z: -Math.PI / 15 }} />

      {/* Additional Mesh */}
      <mesh position={isCoding ? [0, -1.2, 0] : [0, -0.468, 0]}>
        <boxGeometry args={isCoding ? [0.55, 2.5, 0.55] : [1 / 3, 1, 1 / 3]} />
        <meshStandardMaterial color={'#5A9BD8'} />
      </mesh>
    </Canvas>
  );
};

export default ThreeJSScene;
