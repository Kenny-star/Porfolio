import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>('light');
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const getInitialTheme = (): Theme => {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? (savedTheme as Theme) : 'light';
    };
  
    const [theme, setTheme] = useState<Theme>(getInitialTheme);
  
    useEffect(() => {
      localStorage.setItem('theme', theme);
    }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
