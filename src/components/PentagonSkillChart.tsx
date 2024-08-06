import React from 'react';
import '../App.css';

interface Skill {
    name: string;
    level: number; // should be between 0 and 1
  }
  
  interface PentagonSkillChartProps {
    skills: Skill[];
  }
  
  const PentagonSkillChart: React.FC<PentagonSkillChartProps> = ({ skills }) => {
    const numSides = skills.length;
    const angle = (2 * Math.PI) / numSides;
  
    return (
      <div className="flex justify-center items-center h-full w-full">
        <div className="relative chart-wrapper font-mono">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full border border-gray-300"
              style={{
                clipPath: `polygon(${Array.from({ length: numSides })
                  .map(
                    (_, j) =>
                      `${50 + 50 * Math.cos(angle * j - Math.PI / 2)}% ${50 + 50 * Math.sin(angle * j - Math.PI / 2)}%`
                  )
                  .join(',')})`,
                transform: `scale(${(i + 1) / 5})`,
              }}
            />
          ))}
          <div
            className="absolute w-full h-full bg-green-400 opacity-60 z-10"
            style={{
              clipPath: `polygon(${skills
                .map(
                  (skill, i) =>
                    `${50 + 50 * Math.cos(angle * i - Math.PI / 2) * skill.level}% ${50 + 50 * Math.sin(angle * i - Math.PI / 2) * skill.level}%`
                )
                .join(',')})`,
            }}
          />

{/* <div
          className="absolute w-full h-full bg-slate-200"
          style={{
            clipPath: `polygon(${[
              { level: 1 },
              { level: 1 },
              { level: 1 },
              { level: 1 },
              { level: 1 },
            ]
              .map(
                (skill, i) =>
                  `${50 + 50 * Math.cos(angle * i - Math.PI / 2) * skill.level}% ${50 +
                    50 * Math.sin(angle * i - Math.PI / 2) * skill.level}%`
              )
              .join(',')})`,

          }}
        /> */}

<div
          className="absolute w-full h-full bg-slate-300 "
          style={{
            clipPath: `polygon(${[
              { level: 0.9 },
              { level: 0.9 },
              { level: 0.9 },
              { level: 0.9 },
              { level: 0.9 },
            ]
              .map(
                (skill, i) =>
                  `${50 + 50 * Math.cos(angle * i - Math.PI / 2) * skill.level}% ${50 +
                    50 * Math.sin(angle * i - Math.PI / 2) * skill.level}%`
              )
              .join(',')})`,
          }}
        />
          <div
            className="absolute w-full h-full bg-slate-200"
            style={{
              clipPath: `polygon(${[
                {level: 0.7 },
                {level: 0.7 },
                {level: 0.7 },
                {level: 0.7 },
                {level: 0.7 },
              ]
                .map(
                  (skill, i) =>
                    `${50 + 50 * Math.cos(angle * i - Math.PI / 2) * skill.level}% ${50 + 50 * Math.sin(angle * i - Math.PI / 2) * skill.level}%`
                )
                .join(',')})`,
            }}
          />
        <div
            className="absolute w-full h-full bg-slate-300"
            style={{
              clipPath: `polygon(${[
                {level: 0.5 },
                {level: 0.5 },
                {level: 0.5 },
                {level: 0.5 },
                {level: 0.5 },
              ]
                .map(
                  (skill, i) =>
                    `${50 + 50 * Math.cos(angle * i - Math.PI / 2) * skill.level}% ${50 + 50 * Math.sin(angle * i - Math.PI / 2) * skill.level}%`
                )
                .join(',')})`,
            }}
          />
          <div
            className="absolute w-full h-full bg-slate-200"
            style={{
              clipPath: `polygon(${[
                {level: 0.3 },
                {level: 0.3 },
                {level: 0.3 },
                {level: 0.3 },
                {level: 0.3 },
              ]
                .map(
                  (skill, i) =>
                    `${50 + 50 * Math.cos(angle * i - Math.PI / 2) * skill.level}% ${50 + 50 * Math.sin(angle * i - Math.PI / 2) * skill.level}%`
                )
                .join(',')})`,
            }}
          />
          {/* <div
            className="absolute w-full h-full bg-slate-300"
            style={{
              clipPath: `polygon(${[
                {level: 0.1 },
                {level: 0.1 },
                {level: 0.1 },
                {level: 0.1 },
                {level: 0.1 },
              ]
                .map(
                  (skill, i) =>
                    `${50 + 50 * Math.cos(angle * i - Math.PI / 2) * skill.level}% ${50 + 50 * Math.sin(angle * i - Math.PI / 2) * skill.level}%`
                )
                .join(',')})`,
            }}
          /> */}
          {skills.map((skill, i) => (
            <React.Fragment key={i}>
              <div
                className="absolute"
                style={{
                  left: `${50 + 50 * Math.cos(angle * i - Math.PI / 2)}%`,
                  top: `${50 + 50 * Math.sin(angle * i - Math.PI / 2)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span className="text-black0">{skill.name}</span>
              </div>
              <div
                className="absolute w-full h-full"
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(angle * i - Math.PI / 2)}% ${50 + 50 * Math.sin(angle * i - Math.PI / 2)}%, 50% 50%)`,
                  borderRight: '1px solid gray',
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  
  export default PentagonSkillChart;