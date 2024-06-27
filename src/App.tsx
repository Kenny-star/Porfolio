import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import { ThemeProvider, useTheme } from './components/ThemeContext';

// rafce: es7+ react extension
import './App.css';
import './font.css';
const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`h-screen w-full transition-colors duration-300 p-9 
                  ${theme === 'light' ? 'bg-white text-black' : 'bg-[#121212] text-white'}`}>
        <Nav/>
        <Hero/>

    </div>
  );
};

const App: React.FC = () => {

  return (
    <>
    <ThemeProvider>
      <AppContent/>
    </ThemeProvider>
    </>
  )
}

export default App
