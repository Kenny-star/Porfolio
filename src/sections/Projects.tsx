import { projects } from '../constants/index';
import useLocalStorage from '../components/useLocalStorage';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import  InteractiveSwipeDetector  from "../components/InteractiveSwipeDetector";
import InstagramSwipeGallery from '../components/InstagramSwipeGallery';


const Projects = () => {
    const [counter, setCounter] = useLocalStorage('counter', 0);
    const [album_in_counter, setAlbumInCounter] = useLocalStorage('counterIn', 0);
    const [styles, api] = useSpring(() => ({ x: 0 }));
    const dragging = useRef(false);
    const [dragDisabled, setDragDisabled] = useState(false);


    const { theme } = useTheme();
    // TO CHANGE
    const nextPicture = () => {
        setAlbumInCounter((prevCounter) => (prevCounter + 1) % projects[counter].album.length);
    };

    const prevPicture = () => {
        setAlbumInCounter((prevCounter) => (prevCounter - 1 + projects[counter].album.length) % projects[counter].album.length);
    };

    const nextProject = () => {
        setCounter((prevCounter) => (prevCounter + 1) % projects.length);
        setAlbumInCounter(0);
    };

    const prevProject = () => {
        setCounter((prevCounter) => (prevCounter - 1 + projects.length) % projects.length);
        setAlbumInCounter(0);
    };

    const bind = useDrag(({ active, movement: [mx], direction: [xDir], cancel }) => {
        if (dragDisabled) return;  // Add this line to prevent dragging when disabled
        dragging.current = active;
        if (active && Math.abs(mx) > window.innerWidth / 30) {
            cancel();
            if (xDir < 0 && album_in_counter < projects[counter].album.length - 1) nextPicture();
            else if (xDir >= 0 && album_in_counter > 0) prevPicture();
        }
        api.start({ x: active ? mx : 0 });
    });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.key === 'ArrowRight' || event.key === "d") &&  album_in_counter < projects[counter].album.length - 1 )  {
                nextPicture();
            } else if ((event.key === 'ArrowLeft' || event.key === "a") && album_in_counter > 0) {
                prevPicture();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [album_in_counter, counter]);

    // const getGridClasses = (type: number) => {
    //     switch (type) {
    //         case 1:
    //             return 'flex justify-center items-center scale-90 px-40 py-12';
    //         case 2:
    //             return 'grid grid-cols-2 gap-7 scale-95 py-36';
    //         case 3:
    //             return 'grid grid-cols-2 gap-7 scale-95 ';
    //         case 4:
    //             return 'grid grid-cols-2 gap-7';
    //         default:
    //             return 'grid grid-cols-2 gap-7';
    //     }
    // };


    return (
        <div className="relative flex flex-row justify-center items-center h-screen w-full">
        <div className="relative flex flex-row max-lg:flex-col justify-center items-center h-screen w-5/6 -mt-24 max-md:w-11/12 max-md:h-4/6 max-lg:h-4/5 max-sm:h-2/3" id="projects">
        
        {/* <div className="relative flex flex-row justify-center items-center w-4/5 h-2/3 bg-gradient-to-l from-gray_blue via-slate-900 to-transparent " id="projects"> */}
        <div className="relative flex flex-row justify-center items-center w-full h-2/3 max-md:flex-col" id="projects">

        <animated.div
    {...bind()}
    style={{ ...styles, touchAction: 'none' }}
    className="relative flex justify-center items-center h-full w-full max-lg:flex-col"
>
    <div className="flex flex-col items-center justify-center w-full h-full overflow-visible cursor-pointer select-none">
        <div className="relative w-full h-full ">
            <InteractiveSwipeDetector alt={projects[counter].name} image={projects[counter].album[album_in_counter]} dragging={dragging}/>
            
            {album_in_counter < projects[counter].album.length - 1 && (
                <div className="absolute top-1/2 right-[calc(10px+3%)] transform -translate-y-1/2 text-4xl hover:cursor-pointer rounded-2xl bg-slate-400 opacity-70 py-3 px-3.5 max-lg:hidden" onClick={nextPicture}>
                    <div className={`w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] ${theme === 'light' ? 'border-l-white' : 'border-l-gray_blue'} ml-0.5`}/>
                </div>
            )}
            {album_in_counter > 0 &&(
                <div className="absolute top-1/2 left-[calc(10px+3%)] transform -translate-y-1/2 text-4xl hover:cursor-pointer rounded-2xl bg-slate-400 opacity-70 py-3 px-3.5 max-lg:hidden" onClick={prevPicture}>
                    <div className={`w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px]  ${theme === 'light' ? 'border-r-white' : 'border-r-gray_blue'}  mr-0.5`}/>
                </div>
            )}
        </div>

        <div className="absolute bottom-0 flex flex-row space-x-1 z-20 p-2 ">
            {projects[counter].album.map((_, index) => (
                <div key={index} className={`size-3 rounded-full ${album_in_counter === index ? 'bg-blue-500' : 'bg-slate-400'}`}/>
            ))}
        </div>
    </div>

    {/* Text panel */}
    <div className="flex justify-center p-6 w-1/3 bg-gray-200 h-full lg:rounded-r-lg cursor-default max-lg:w-full max-lg:rounded-b-lg max-lg:h-1/3 max-lg:p-3"
        onMouseDown={() => setDragDisabled(true)}
        onMouseUp={() => setDragDisabled(false)}
    >
        <div className="font-serif text-black text-base w-full lg:space-y-5">
            <h1 className="text-3xl font-bold max-lg:hidden">{projects[counter].name}</h1>
            <h2 className="max-lg:hidden">Links</h2>
            <div className="flex flex-col items-start text-left w-full break-words lg:space-y-5">
                <h3><strong>Difficulty</strong>: {'⭐️'.repeat(projects[counter].difficulty)}</h3>
                <h3><strong>Description</strong>: <span className="italic">{projects[counter].description}</span></h3>
                <p className="text-cyan-500 font-semibold text-center">
                    {projects[counter].hashtags.map((tag, idx) => (
                        <span key={idx}>{tag} &nbsp;</span>
                            ))
                            
                            }</p>
                        </div>
                    </div>
                </div>
            </animated.div>
            {counter < projects.length - 1 && (
                <div className="absolute top-1/2 -right-[calc(10px+7%)] transform -translate-y-1/2 text-4xl hover:cursor-pointer rounded-2xl bg-slate-400 py-3 px-3.5 max-lg:hidden" onClick={nextProject}>
                    <div className={`w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] ${theme === 'light' ? 'border-l-white' : 'border-l-gray_blue'} ml-0.5`}/>
                </div>
            )}
            {counter > 0 && (
                // <div className="absolute top-1/2 left-[calc(10px+3%)] transform -translate-y-1/2 text-4xl hover:cursor-pointer" onClick={prevProject}>
                //     ◀
                // </div>

                <div className="absolute top-1/2 -left-[calc(10px+7%)] transform -translate-y-1/2 text-4xl hover:cursor-pointer rounded-2xl bg-slate-400 py-3 px-3.5 max-lg:hidden" onClick={prevProject}>
                    <div className={`w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px]  ${theme === 'light' ? 'border-r-white' : 'border-r-gray_blue'}  mr-0.5`}/>
                </div>
            )}
            
            
            </div>
            <div className='pt-6 space-x-5 lg:hidden'>
                {counter > 0 ?(
                    // <div className="absolute top-1/2 left-[calc(10px+3%)] transform -translate-y-1/2 text-4xl hover:cursor-pointer" onClick={prevProject}>
                    //     ◀
                    // </div>

                    <div className="inline-block transform -translate-y-1/2 text-4xl hover:cursor-pointer rounded-2xl bg-slate-400 py-3 px-3.5 " onClick={prevProject}>
                        <div className={`w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px]  ${theme === 'light' ? 'border-r-white' : 'border-r-gray_blue'}  mr-0.5`}/>
                    </div>
                ):<div className="inline-block transform -translate-y-1/2 text-4xl hover:cursor-pointer rounded-2xl bg-slate-600 py-3 px-3.5 ">
                <div className={`w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px]  ${theme === 'light' ? 'border-r-white' : 'border-r-gray_blue'}  mr-0.5`}/>
            </div>}
                {counter < projects.length - 1 ?(
                    <div className="inline-block transform -translate-y-1/2 text-4xl hover:cursor-pointer rounded-2xl bg-slate-400 py-3 px-3.5 " onClick={nextProject}>
                        <div className={`w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] ${theme === 'light' ? 'border-l-white' : 'border-l-gray_blue'} ml-0.5`}/>
                    </div>
                ):<div className="inline-block transform -translate-y-1/2 text-4xl hover:cursor-pointer rounded-2xl bg-slate-600 py-3 px-3.5 " >
                <div className={`w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] ${theme === 'light' ? 'border-l-white' : 'border-l-gray_blue'} ml-0.5`}/>
            </div>}
            </div>
            </div>
                
            
        </div>
    );
};

export default Projects;
