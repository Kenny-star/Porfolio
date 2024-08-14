import React from "react";

import  BallCanvas from "../components/Ball";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

interface Technology {
  name: string;
  icon: string;
}

const Tech: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10 max-sm:scale-95 mb-28 -mt-12">
      {technologies.map((technology: Technology) => (
        <div className="w-28 h-28" key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
