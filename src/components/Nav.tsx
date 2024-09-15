import { useState, useRef } from 'react';
import { navLinks } from '../constants/index';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeContext';
import { Fragment } from 'react/jsx-runtime';

const Nav = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const waveContainerRef = useRef<HTMLDivElement>(null);

  const handleHamburgerClick = (event: React.MouseEvent) => {
    setIsMenuOpen((prev) => !prev);

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
  };

  return (
    <header className="fixed top-0 left-0 w-full text-white z-50">
      <nav className="container mx-auto p-4">
        <ul className={`flex justify-between max-lg:justify-end items-center ${theme === 'light' ? 'text-ebony' : ' text-white'} py-4`}>
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
                  <a className="leading-normal text-lg cursor-pointer" href="/assets/resume/RESUME_EN_JAVA.pdf" target="_blank" rel="noopener noreferrer">
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

          {/* Hamburger Icon */}
          <div onClick={handleHamburgerClick} className="hamburger space-y-1 cursor-pointer z-50 hidden max-lg:block max-lg:ml-10 relative w-10 scale-90 " >
            <span className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}  style={{ width: "70%", backgroundColor: '#1d4ed8' }}></span>
            <span className={`transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{ width: "50%", backgroundColor: '#1d4ed8' }}></span>
            <span className={`transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ width: "40%", backgroundColor: '#1d4ed8' }}></span>
          </div>
        </ul>

        {/* Fullscreen nav menu (controlled by state) */}
        <div
          className={`fixed inset-0 bg-gray-900 text-white flex items-center justify-center transition-opacity duration-500 ease-in-out z-40 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <ul className="text-center space-y-8 text-3xl font-mono">
            <li><a onClick={() => handleLinkClick('whoami')} className="leading-normal cursor-pointer">About</a></li>
            <li><a onClick={() => handleLinkClick('skills')} className="leading-normal cursor-pointer">Skills</a></li>
            <li><a onClick={() => handleLinkClick('projects')} className="leading-normal  cursor-pointer">Projects</a></li>
          </ul>
        </div>

        {/* Wave Effect Container */}
        <div ref={waveContainerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-50"></div>
      </nav>
    </header>
  );
};

export default Nav;
