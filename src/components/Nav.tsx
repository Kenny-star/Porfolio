import { navLinks } from '../constants/index';
import hamburger from '../assets/burger-menu.svg';
import contrastHamburger from '../assets/contrast-burger-menu.png';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeContext';
const Nav: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <header className="z-10">
        <nav>
          <ul className="flex justify-between max-lg:justify-end items-center mx-auto ">
            {
              navLinks.map((item, idx) => (
              <>
              {idx === navLinks.length - 1 ? <><div className="max-lg:hidden flex-grow"></div><ThemeToggle/></> : ""}
              <li key={item.label} className={`${idx === navLinks.length - 1 ? "ml-8" : "mr-24"} max-lg:hidden`}>                {/* Apply mr-auto (margin-right: auto) to the second-to-last item */}
                <a href={item.label} className="leading-normal text-lg">
                  {item.label}
                </a>
              </li>
              
              </>
              ))

            } 
             
          <div className="hidden max-lg:block max-lg:ml-10">
            <img
              src={`${theme == "light" ? hamburger : contrastHamburger}`}
              alt="Hamburger"
              width={30}
              height={30}
              className="rounded-3xl"/>
          </div>
          </ul>
          
        </nav>
     </header>
  )
}

export default Nav