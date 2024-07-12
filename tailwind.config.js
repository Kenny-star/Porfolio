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

