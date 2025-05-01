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
import threejs from '/assets/tech/threejs.png';

import Covid_Tracker_1 from '/assets/projects/Covid_Tracker_1.png';
import Covid_Tracker_2 from '/assets/projects/Covid_Tracker_2.png';
import Covid_Tracker_3 from '/assets/projects/Covid_Tracker_3.png';
import threedmodel from '/assets/projects/3dmodel_designing.png';
export const navLinks = [
    { href: "whoami", label: "About" },
    { href: "skills", label: "Skills" },
    { href: "projects", label: "Projects" },
    { href: "/assets/resume/RESUME.pdf", label: "Resume" },
];

export const projects = [
  { 
  album: [
    Covid_Tracker_1, Covid_Tracker_2, Covid_Tracker_3
  ],
  name: "Medis",
  difficulty: 1,
  githubLink: "",
  deployedLink: "",
  description: 'A web app tracking system for Covid-19 with comprehensive entity relations and email alert system',
  hashtags: ["#SMTP", "#Django", "#React.js", "#MySQL", "#Databases", "#WebDevelopement"]
  },
  { 
    album: [
      threedmodel
    ],
    name: "Kenny's Portfolio",
    difficulty: 2,
    githubLink: "",
    deployedLink: "",
    description: 'My personal website',
    hashtags: ["#react-three-fiber", "#ThreeJS", "#TypeScript", "#TailwindCSS", "#Blender", "#3dModelling"]
    },
];

export const abilities = [
    { name: 'Picture Perfect!', src: photography, cooldown: 8, description: "Capturing the beautiful landscape and nature", action: "Photography", color: "yellow"},
    { name: 'Locked In!', src: programming, cooldown: 5, description: "Learning a new skill everyday", action: "Coding", color: "teal"},
    { name: 'Let Him Cook!', src: cooking, cooldown: 5, description: "Learning a new creative and artistic process", action: "Walk", color: "orange"},
    { name: 'We Got Motion!', src: lifting, cooldown: 6, description: "Working to exhaustion is a proof of mental fortitude", action: "Gym", color: "teal"},
  ];

export const skills = [
    { name: 'Communication', value: 70 },
    { name: 'Team Work', value: 80 },
    { name: 'Adaptability', value: 85 },
    { name: 'Problem Solving', value: 90 },
    { name: 'Leadership', value: 70 },
    
  ];

export const getSkillsName = () => {
  return skills.map((sk) => sk.name);
}
export const getSkillsValue = () => {
  return skills.map((sk) => sk.value);
}

  export const userDetails = [
    { name: "Intern XP", value: "7 months" },
    { name: "Status", value: "Interning"},
    // { name: "Country", value: "Canada " },
    { name: "Affinities", value: ".py .java .jsx .tsx" },
    { name: "Role(s)", value: "Software Developer" },
    { name: "Hackathon Win(s)", value: "1" },
    { name: "Hobbies", value: "Climbing & Coding" }
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
    description: "The latest version of Hypertext Markup Language, providing enhanced support for multimedia and web application features with semantic elements and improved structure."
  },
  {
    name: "CSS 3",
    icon: css,
    description: "Cascading Style Sheets Level 3, enabling advanced styling techniques like animations, flexbox, grid layouts, and responsive design for modern web interfaces."
  },
  {
    name: "JavaScript",
    icon: javascript,
    description: "A versatile programming language that enables interactive and dynamic web content, allowing for complex client-side functionality and asynchronous programming."
  },
  {
    name: "TypeScript",
    icon: typescript,
    description: "A strongly typed programming language that builds on JavaScript, adding optional static typing, interfaces, and advanced type inference for more robust code."
  },
  {
    name: "React JS",
    icon: reactjs,
    description: "A popular JavaScript library for building user interfaces, utilizing a component-based architecture and virtual DOM for efficient and declarative rendering."
  },
  {
    name: "Redux Toolkit",
    icon: redux,
    description: "The official, opinionated, batteries-included toolset for efficient Redux development, simplifying state management in complex JavaScript applications."
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
    description: "A utility-first CSS framework that allows rapid UI development by providing low-level utility classes to build custom designs without leaving your HTML."
  },
  {
    name: "Node JS",
    icon: nodejs,
    description: "A powerful JavaScript runtime built on Chrome's V8 engine, enabling server-side JavaScript execution and creating scalable network applications."
  },
  {
    name: "MongoDB",
    icon: mongodb,
    description: "A flexible, scalable NoSQL database that stores data in JSON-like documents, providing high performance, high availability, and easy scalability."
  },
  {
    name: "Three JS",
    icon: threejs,
    description: "A cross-browser JavaScript library and API used to create and display animated 3D computer graphics in a web browser using WebGL."
  },
  {
    name: "Git",
    icon: git,
    description: "A distributed version control system that tracks changes in source code during software development, enabling collaboration and code management."
  },
  // {
  //   name: "Figma",
  //   icon: figma,
  //   description: "A collaborative web-based design tool for creating user interfaces, prototypes, and graphics with real-time collaboration features."
  // },
  {
    name: "Docker",
    icon: docker,
    description: "A platform for developing, shipping, and running applications in containers, ensuring consistency across different development and deployment environments."
  }
];
