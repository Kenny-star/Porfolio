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
        <div className="relative flex flex-row max-lg:flex-col justify-center items-center h-screen w-5/6 -mt-24 max-md:w-full max-md:h-11/12" id="projects">
        
        {/* <div className="relative flex flex-row justify-center items-center w-4/5 h-2/3 bg-gradient-to-l from-gray_blue via-slate-900 to-transparent " id="projects"> */}
        <div className="relative flex flex-row justify-center items-center w-full h-2/3 max-md:flex-col" id="projects">

            <animated.div
                {...bind()}
                style={{ ...styles, touchAction: 'none' }}
                className="relative flex justify-center items-center h-full w-full"
            >
                <div className="flex flex-col items-center justify-center w-full h-full rounded-l-md overflow-visible cursor-pointer select-none">
                
                    {/* <div className={`${getGridClasses(projects[counter].album.length)} w-full h-full p-10 `}> */}
                    <div className="relative w-full h-full ">

                                <InteractiveSwipeDetector alt={projects[counter].name} image={projects[counter].album[album_in_counter]} dragging={dragging}/>
                        {/* <InstagramSwipeGallery images={projects} ctn={counter} in_ctn={album_in_counter} setAlbumInCounter={setAlbumInCounter}
                        /> */}
                        {album_in_counter < projects[counter].album.length - 1 && (
                                <div className="absolute top-1/2 right-[calc(10px+3%)] transform -translate-y-1/2 text-4xl hover:cursor-pointer rounded-2xl bg-slate-400 opacity-70 py-3 px-3.5" onClick={nextPicture}>
                                    <div className={`w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] ${theme === 'light' ? 'border-l-white' : 'border-l-gray_blue'} ml-0.5`}/>
                                </div>
                            )}
                            {album_in_counter > 0 &&(
                                <div className="absolute top-1/2 left-[calc(10px+3%)] transform -translate-y-1/2 text-4xl hover:cursor-pointer rounded-2xl bg-slate-400 opacity-70 py-3 px-3.5" onClick={prevPicture}>
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
                

                

                <div className="flex justify-center p-10 w-1/3 bg-gray-200 h-full rounded-r-md cursor-default z-20 max-lg:hidden">
                    {/* <a href="https://google.ca"> yeey</a> */}
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
