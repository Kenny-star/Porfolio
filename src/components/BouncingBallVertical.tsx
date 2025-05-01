import React from 'react';
import { motion } from 'framer-motion';

const BouncingBallVertical: React.FC = () => {
  return (
    <div className='w-[18px] h-[36px] rounded-3xl border-4 pb-2 bg-gray-400 border-gray-400 opacity-80'>
      <motion.div
        animate={{
          y: [0, 18, 0], // Move vertically
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

export default BouncingBallVertical;