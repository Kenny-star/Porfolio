import { useState, useRef, useEffect } from 'react';
import { navLinks } from '../constants/index';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeContext';
import { Fragment } from 'react/jsx-runtime';

const Nav = ({ scrollToSection, onMenuToggle }: { 
  scrollToSection: (id: string) => void,
  onMenuToggle?: (isOpen: boolean) => void // Add this prop
}) => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showName, setShowName] = useState(true);
  const waveContainerRef = useRef<HTMLDivElement>(null);
  
  // Add scroll event listener to hide name on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Hide name when scrolled down more than 100px
      if (window.scrollY > 100) {
        setShowName(false);
      } else {
        setShowName(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleHamburgerClick = (event: React.MouseEvent) => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    // Call the onMenuToggle callback if provided
    if (onMenuToggle) {
      onMenuToggle(newMenuState);
    }

    // Create wave effect
    const x = event.clientX;
    const y = event.clientY;
    const wave = document.createElement('div');
    wave.classList.add('wave');
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    const waveContainer = waveContainerRef.current;
    if (waveContainer) {
      waveContainer.appendChild(wave);

      // Remove wave after animation ends
      setTimeout(() => {
        wave.remove();
      }, 1500);
    }
  };

  const handleLinkClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false); // Close the menu
    
    // Notify the parent that the menu is closed
    if (onMenuToggle) {
      onMenuToggle(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full text-white z-50">
      <nav className="container mx-auto p-4">
        <ul className={`flex justify-between max-lg:justify-end items-center ${theme === 'light' ? 'text-ebony' : ' text-white'} -mr-3`}>
          {navLinks.map((item, idx) => (
            <Fragment key={item.label}>
              {idx === navLinks.length - 1 && (
                <>
                  <div className="max-lg:hidden flex-grow"></div>
                  <ThemeToggle />
                </>
              )}
              <li className={`${idx === navLinks.length - 1 ? 'ml-8' : 'mr-24'} max-lg:hidden`}>
                {idx === navLinks.length - 1 ? (
                  <a className="leading-normal text-lg cursor-pointer" href="/assets/resume/RESUME.pdf" target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                ) : (
                  <button onClick={() => scrollToSection(`${item.href}`)} className="leading-normal text-lg cursor-pointer">
                    {item.label}
                  </button>
                )}
              </li>
            </Fragment>
          ))}

          {/* Small screen container with name and hamburger */}
          <div className='flex flex-row items-center justify-between w-full lg:hidden'>
            {/* Name that disappears on scroll */}
            <div className={`text-xl font-mono font-semibold transition-opacity duration-300 ${showName ? 'opacity-100' : 'opacity-0'}`}>
              Kenny Luo-Li
            </div>
            
            <div onClick={handleHamburgerClick} className="hamburger space-y-1 cursor-pointer z-50 hidden max-lg:block relative w-10 scale-90">
              <span className={`block h-0.5 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ width: "70%", backgroundColor: 'teal' }}></span>
              <span className={`block h-0.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{ width: "50%", backgroundColor: 'teal' }}></span>
              <span className={`block h-0.5 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ width: "40%", backgroundColor: 'teal' }}></span>
            </div>
          </div>
        </ul>

        {/* Fullscreen nav menu (controlled by state) */}
        <div
          className={`fixed inset-0 bg-gray-900 text-white flex items-center justify-center transition-opacity duration-500 ease-in-out z-40 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <ul className="text-center space-y-8 text-3xl font-mono">
            {
              navLinks.map((link, idx) => (
                idx < navLinks.length - 1 ? (
                <li><a onClick={() => handleLinkClick(link.href)} className="leading-normal cursor-pointer">{link.label}</a></li>
                ) : <></>
              ))}
              <li><a href={`${navLinks[navLinks.length - 1].href}`} target="_blank" rel="noopener noreferrer" className="leading-normal cursor-pointer">{navLinks[navLinks.length - 1].label}</a></li>
            
            
          </ul>
        </div>

        {/* Wave Effect Container */}
        <div ref={waveContainerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-50"></div>
      </nav>
    </header>
  );
};

export default Nav;