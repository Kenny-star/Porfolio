import React from 'react';
import { motion } from 'framer-motion';

const BouncingBallHorizontal: React.FC = () => {
  return (
    <div className='w-[36px] h-[18px] rounded-3xl border-4 pb-2 bg-gray-400 border-gray-400 opacity-80'>
      <motion.div
        animate={{
          x: [0, 18, 0], // Move horizontally
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'loop',
        }}
        className='w-2.5 h-2.5 rounded-full bg-secondary bg-gray-100'
      />
    </div>
  );
};

export default BouncingBallHorizontal;
