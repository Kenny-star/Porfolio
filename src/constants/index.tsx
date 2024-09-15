// import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
// import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, shoe4, shoe5, shoe6, shoe7, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3 } from "../assets/images";
import photography from "/assets/photography.svg";
import programming from "/assets/programming.svg";
import cooking from "/assets/cooking.svg";
import lifting from "/assets/lifting.svg";

import javascript from "/assets/tech/javascript.png"
import typescript from "/assets/tech/typescript.png";
import html from '/assets/tech/html.png';
import css from '/assets/tech/css.png';
import reactjs from '/assets/tech/reactjs.png';
import redux from '/assets/tech/redux.png';
import tailwind from '/assets/tech/tailwind.png';
import nodejs from '/assets/tech/nodejs.png';
import mongodb from '/assets/tech/mongodb.png';
import git from '/assets/tech/git.png';
import figma from '/assets/tech/figma.png';
import docker from '/assets/tech/docker.png';
import threejs from '/assets/tech/threejs.svg';

import Covid_Tracker_1 from '/assets/projects/Covid_Tracker_1.png';
import Covid_Tracker_2 from '/assets/projects/Covid_Tracker_2.png';
import Covid_Tracker_3 from '/assets/projects/Covid_Tracker_3.png';
import Covid_Tracker_4 from '/assets/projects/Covid_Tracker_4.png';

export const navLinks = [
    { href: "whoami", label: "Whoami" },
    { href: "skills", label: "Skills" },
    { href: "projects", label: "Projects" },
    { href: "../resume/RESUME_EN_JAVA.pdf", label: "Resume" },
];

export const projects = [
  { 
  album: [
    Covid_Tracker_1, Covid_Tracker_2, Covid_Tracker_3, Covid_Tracker_4
  ],
  name: "Covid Tracking App",
  difficulty: 2,
  githubLink: "",
  deployedLink: "",
  description: 'A web app tracking system for Covid-19 with comprehensive entity relations and email alert system',
  hashtags: ["#SMTP", "#Django", "#React.js", "#MySQL", "#Databases", "#WebDevelopement"]
  },
  { 
  album: [
    Covid_Tracker_1
  ],
  name: "Covid Tracking App",
  difficulty: 2,
  githubLink: "",
  deployedLink: "",
  description: 'A web app tracking system for Covid-19 with comprehensive entity relations and email alert system',
  hashtags: ["#SMTP", "#Django", "#React.js", "#MySQL", "#Databases", "#WebDevelopement"]
  },
  { 
  album: [
    Covid_Tracker_2, Covid_Tracker_1
  ],
  name: "Covid Tracking App",
  difficulty: 2,
  githubLink: "",
  deployedLink: "",
  description: 'A web app tracking system for Covid-19 with comprehensive entity relations and email alert system',
  hashtags: ["#SMTP", "#Django", "#React.js", "#MySQL", "#Databases", "#WebDevelopement"]
  },
  { 
  album: [
    Covid_Tracker_1, Covid_Tracker_2, Covid_Tracker_4
  ],
  name: "Covid Tracking App",
  difficulty: 2,
  githubLink: "",
  deployedLink: "",
  description: 'A web app tracking system for Covid-19 with comprehensive entity relations and email alert system',
  hashtags: ["#SMTP", "#Django", "#React.js", "#MySQL", "#Databases", "#WebDevelopement"]
  },

];

export const abilities = [
    { name: 'Picture Perfect!', src: photography, cooldown: 8, description: "Capturing the beautiful landscape and nature", action: "Photography"},
    { name: 'Locked In!', src: programming, cooldown: 5, description: "Learning a new skill everyday", action: "Coding"},
    { name: 'Let Him Cook!', src: cooking, cooldown: 5, description: "Learning a new creative and artistic process", action: "Walk"},
    { name: 'We Got Motion!', src: lifting, cooldown: 6, description: "Working to exhaustion is a proof of mental fortitude", action: "Gym"},
  ];

export const skills = [
    { name: 'Leadership', value: 70 },
    { name: 'Team Work', value: 80 },
    { name: 'Adaptability', value: 75 },
    { name: 'Problem Solving', value: 80 },
    { name: 'Communication', value: 70 },
    
  ];

export const getSkillsName = () => {
  return skills.map((sk) => sk.name);
}
export const getSkillsValue = () => {
  return skills.map((sk) => sk.value);
}

  export const userDetails = [
    { name: "Intern XP", value: "7 months" },
    { name: "Status", value: "Studying"},
    // { name: "Country", value: "Canada " },
    { name: "Affinity", value: ".py .java .jsx .tsx .sql" },
    { name: "Role(s)", value: "Full-Stack Developer" },
    { name: "Hackathon Win(s)", value: "1" },
    { name: "Hobbies", value: "Hiking & Coding" }
];

export const skillBarChart = [
    { label: 'A', value: 80 },
    { label: 'B', value: 60 },
    { label: 'C', value: 40 },
    { label: 'D', value: 20 },
    { label: 'E', value: 10 },
];
export const titles = [
    { label: "the fullstack enthusiast" },
];


export const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
