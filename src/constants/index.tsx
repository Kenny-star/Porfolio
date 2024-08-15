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
  name: "Covid Tracking App"
  },
  { 
  album: [
    Covid_Tracker_1
  ],
  name: "Covid Tracking App"
  },
  { 
  album: [
    Covid_Tracker_2, Covid_Tracker_1
  ],
  name: "Covid Tracking App"
  },
  { 
  album: [
    Covid_Tracker_1, Covid_Tracker_2, Covid_Tracker_4
  ],
  name: "Covid Tracking App"
  },

];

export const abilities = [
    { name: 'Picture Perfect!', src: photography, cooldown: 8, description: "Capturing the beautiful landscape and nature"},
    { name: 'Locked In!', src: programming, cooldown: 5, description: "Learning a new skill everyday"},
    { name: 'Let Him Cook!', src: cooking, cooldown: 5, description: "Learning a new creative and artistic process"},
    { name: 'We Got Motion!', src: lifting, cooldown: 6, description: "Working to exhaustion is a proof of mental fortitude"},
  ];

export const skills = [
    { name: 'Leadership', level: 0.7 },
    { name: 'Team Work', level: 0.8 },
    { name: 'Adaptability', level: 0.75 },
    { name: 'Problem Solving', level: 0.8 },
    { name: 'Communication', level: 0.7 },
    
  ];

  export const userDetails = [
    { name: "XP", value: "7 months" },
    { name: "MBTI", value: "ISFJ" },
    { name: "Affinity", value: ".py .java .jsx .tsx .sql" },
    { name: "Roles", value: "Full-Stack Developer" },
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
export const statistics = [
    { value: '1k+', label: 'Brands' },
    { value: '500+', label: 'Shops' },
    { value: '250k+', label: 'Customers' },
];

// export const products = [
//     {
//         imgURL: shoe4,
//         name: "Nike Air Jordan-01",
//         price: "$200.20",
//     },
//     {
//         imgURL: shoe5,
//         name: "Nike Air Jordan-10",
//         price: "$210.20",
//     },
//     {
//         imgURL: shoe6,
//         name: "Nike Air Jordan-100",
//         price: "$220.20",
//     },
//     {
//         imgURL: shoe7,
//         name: "Nike Air Jordan-001",
//         price: "$230.20",
//     },
// ];

// export const services = [
//     {
//         imgURL: truckFast,
//         label: "Free shipping",
//         subtext: "Enjoy seamless shopping with our complimentary shipping service."
//     },
//     {
//         imgURL: shieldTick,
//         label: "Secure Payment",
//         subtext: "Experience worry-free transactions with our secure payment options."
//     },
//     {
//         imgURL: support,
//         label: "Love to help you",
//         subtext: "Our dedicated team is here to assist you every step of the way."
//     },
// ];

// export const reviews = [
//     {
//         imgURL: customer1,
//         customerName: 'Morich Brown',
//         rating: 4.5,
//         feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
//     },
//     {
//         imgURL: customer2,
//         customerName: 'Lota Mongeskar',
//         rating: 4.5,
//         feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
//     }
// ];


// export const footerLinks = [
//     {
//         title: "Products",
//         links: [
//             { name: "Air Force 1", link: "/" },
//             { name: "Air Max 1", link: "/" },
//             { name: "Air Jordan 1", link: "/" },
//             { name: "Air Force 2", link: "/" },
//             { name: "Nike Waffle Racer", link: "/" },
//             { name: "Nike Cortez", link: "/" },
//         ],
//     },
//     {
//         title: "Help",
//         links: [
//             { name: "About us", link: "/" },
//             { name: "FAQs", link: "/" },
//             { name: "How it works", link: "/" },
//             { name: "Privacy policy", link: "/" },
//             { name: "Payment policy", link: "/" },
//         ],
//     },
//     {
//         title: "Get in touch",
//         links: [
//             { name: "customer@nike.com", link: "mailto:customer@nike.com" },
//             { name: "+92554862354", link: "tel:+92554862354" },
//         ],
//     },
// ];

// export const socialMedia = [
//     { src: facebook, alt: "facebook logo" },
//     { src: twitter, alt: "twitter logo" },
//     { src: instagram, alt: "instagram logo" },
// ];