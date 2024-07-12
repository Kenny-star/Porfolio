import React, { ComponentType } from "react";
import { motion } from "framer-motion";

import { staggerContainer } from "../utils/motion";

const staggerConfig = {
  staggerChildren: 0.1,
  delayChildren: 0.1,
};

const StarWrapper = <P extends object>(Component: ComponentType<P>, idName: string) => {
  const HOC: React.FC<P> = (props) => {
    return (
      <motion.section
        variants={staggerContainer(staggerConfig.staggerChildren, staggerConfig.delayChildren)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        <Component {...props} />
      </motion.section>
    );
  };

  return HOC;
};

export default StarWrapper;
