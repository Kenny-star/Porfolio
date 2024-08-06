/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress)' },
        },
      },
      animation: {
        progress: 'progress 2s ease-out forwards',
      },
      colors: {
        // neonGreen: 'rgb(57, 255, 20)',
        // electricBlue: 'rgb(44, 117, 255)',
        // brightRed: 'rgb(255, 0, 0)',
        'beige': '#E4D2B2',
        ebony: '#0e1624',
        navy: '#143870',
        'royal-blue': '#4169e1',
        'electric-violet': '#8a2be2',
      },
      width: {
        'custom-half-minus': 'calc(50% - 2.25rem)', // Define a custom width
      },
      fontFamily: {
        custom: ['HeroGamingFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

