/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // neonGreen: 'rgb(57, 255, 20)',
        // electricBlue: 'rgb(44, 117, 255)',
        // brightRed: 'rgb(255, 0, 0)',
      },
      fontFamily: {
        custom: ['HeroGamingFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

