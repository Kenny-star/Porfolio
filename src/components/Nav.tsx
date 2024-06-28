import { navLinks } from '../constants/index';
import hamburger from '../assets/burger-menu.svg';
import contrastHamburger from '../assets/contrast-burger-menu.png';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeContext';
import { Fragment } from 'react/jsx-runtime';

const Nav: React.FC = () => {
  const { theme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-500 text-white shadow-lg z-50">
      <nav className="container mx-auto p-4">
        <ul className="flex justify-between max-lg:justify-end items-center">
          {navLinks.map((item, idx) => (
            <Fragment key={item.label}>
              {idx === navLinks.length - 1 && (
                <>
                  <div className="max-lg:hidden flex-grow"></div>
                  <ThemeToggle />
                </>
              )}
              <li className={`${idx === navLinks.length - 1 ? 'ml-8' : 'mr-24'} max-lg:hidden`}>
                <a href={item.label} className="leading-normal text-lg">
                  {item.label}
                </a>
              </li>
            </Fragment>
          ))}

          <div className="hidden max-lg:block max-lg:ml-10">
            <img
              src={theme === 'light' ? hamburger : contrastHamburger}
              alt="Hamburger"
              width={30}
              height={30}
              className="rounded-3xl"
            />
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
