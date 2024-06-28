import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Details from "./sections/Details"
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
        {/* <div className="flex items-center justify-center mt-20">
              <Hero/>
            <Details/>
        </div> */}
<div className="flex mt-32">
  <div className="w-custom-half-minus fixed h-screen overflow-hidden bg-gray-400">
  <Hero/>
  </div>
  <div className="w-1/2 h-screen"></div>

  <div className="w-1/2 h-screen overflow-y-auto">
    <div className="h-full bg-gray-300">
      <div className="h-screen flex items-center justify-center overflow-y-auto">
        <Details/>
      </div>
    </div>
  </div>
  
</div>

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
