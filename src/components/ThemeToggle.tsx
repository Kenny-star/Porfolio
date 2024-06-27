import React from 'react';
import { useTheme } from './ThemeContext';
import dark from '../assets/colored-dark-mode.svg'
import light from '../assets/colored-light-mode.svg'

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-xl px-3 focus:outline-none"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <img src={dark} className='w-6'/> : <img src={light} className='w-6'/>}
    </button>
  );
};

export default ThemeToggle;
