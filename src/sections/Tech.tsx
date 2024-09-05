import React from "react";

import  BallCanvas from "../components/Ball";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";

interface Technology {
  name: string;
  icon: string;
}

function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const Tech: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10 max-sm:scale-95 mb-28 -mt-12">
      {technologies.map((technology: Technology) => (
        <motion.section
          variants={fadeIn("up", "spring", 0.5, getRandomInRange(1, 3))}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="w-28 h-28" key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </motion.section>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
