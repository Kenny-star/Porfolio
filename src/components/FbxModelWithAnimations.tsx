import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, useFBX } from "@react-three/drei";
import { AnimationMixer, LoopRepeat } from "three";

interface ModelProps {
  animationIndex: number;
}

const Model: React.FC<ModelProps> = ({ animationIndex }) => {
  const model = useMemo(() => useFBX("/assets/portfolio1/portfolio1.fbx"), []);  // Memoize the model loading
  const mixer = useRef<AnimationMixer | null>(null);

  useEffect(() => {
    if (model.animations.length > 0) {
      mixer.current = new AnimationMixer(model);
      const action = mixer.current.clipAction(model.animations[animationIndex]);
      action.setLoop(LoopRepeat, Infinity);  // Repeat animation for testing
      action.play();
    } else {
      console.error("No animations found in the FBX model.");
    }

    // Cleanup function to stop all actions
    return () => {
      mixer.current?.stopAllAction();
      mixer.current = null;
    };
  }, [animationIndex, model]);

  return <primitive object={model} scale={0.1} />;
};

const FbxModelWithAnimations: React.FC = () => {
  const [animationIndex, setAnimationIndex] = useState<number>(0);

  const handleAnimationChange = (index: number) => {
    setAnimationIndex(index);
  };

  return (
    <div className="relative h-full w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} />

        <Model animationIndex={animationIndex} />
      </Canvas>

      {/* Buttons to switch between animations */}
      <div className="absolute top-5 left-5 space-y-2">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
          onClick={() => handleAnimationChange(0)}
        >
          Animation 1
        </button>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
          onClick={() => handleAnimationChange(1)}
        >
          Animation 2
        </button>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
          onClick={() => handleAnimationChange(2)}
        >
          Animation 3
        </button>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
          onClick={() => handleAnimationChange(3)}
        >
          Animation 4
        </button>
      </div>
    </div>
  );
};

export default FbxModelWithAnimations;
