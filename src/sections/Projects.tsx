import { projects } from '../constants/index';
import useLocalStorage from '../components/useLocalStorage';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import InteractiveSwipeDetector from "../components/InteractiveSwipeDetector";
import BouncingBallHorizontal from '../components/BouncingBallHorizontal';

const Projects = () => {
    const [counter, setCounter] = useLocalStorage('counter', 0);
    const [album_in_counter, setAlbumInCounter] = useLocalStorage('counterIn', 0);
    const [styles, api] = useSpring(() => ({ x: 0 }));
    const dragging = useRef(false);
    const [dragDisabled, setDragDisabled] = useState(false);
    const { theme } = useTheme();

    // Navigation handlers
    const nextPicture = () => {
        setAlbumInCounter((prev) => (prev + 1) % projects[counter].album.length);
    };

    const prevPicture = () => {
        setAlbumInCounter((prev) => (prev - 1 + projects[counter].album.length) % projects[counter].album.length);
    };

    const nextProject = () => {
        setCounter((prev) => (prev + 1) % projects.length);
        setAlbumInCounter(0);
    };

    const prevProject = () => {
        setCounter((prev) => (prev - 1 + projects.length) % projects.length);
        setAlbumInCounter(0);
    };

    // Create arrow component to reduce redundancy
    const Arrow = ({ 
        direction, 
        onClick, 
        disabled = false, 
        className 
    }: { 
        direction: 'left' | 'right'; 
        onClick?: () => void; 
        disabled?: boolean; 
        className: string; 
    }) => {
        const isRight = direction === 'right';
        const borderClass = isRight 
            ? `border-l-[12px] ${theme === 'light' ? 'border-l-white' : 'border-l-gray_blue'} ml-0.5`
            : `border-r-[12px] ${theme === 'light' ? 'border-r-white' : 'border-r-gray_blue'} mr-0.5`;
        
        return (
            <div 
                className={`${className} text-4xl hover:cursor-pointer rounded-2xl bg-slate-${disabled ? '600' : '400'} py-3 px-3.5`}
                onClick={disabled ? undefined : onClick}
            >
                <div className={`w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ${borderClass}`}/>
            </div>
        );
    };

    const bind = useDrag(({ active, movement: [mx], direction: [xDir], cancel }) => {
        if (dragDisabled) return;
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
            if ((event.key === 'ArrowRight' || event.key === "d") &&  album_in_counter < projects[counter].album.length - 1) {
                nextPicture();
            } else if ((event.key === 'ArrowLeft' || event.key === "a") && album_in_counter > 0) {
                prevPicture();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [album_in_counter, counter]);

    // Current state helpers
    const canGoNextImage = album_in_counter < projects[counter].album.length - 1;
    const canGoPrevImage = album_in_counter > 0;
    const canGoNextProject = counter < projects.length - 1;
    const canGoPrevProject = counter > 0;
    const currentProject = projects[counter];

    return (
        <div className="relative flex flex-row justify-center items-start h-screen w-full">
            <div className="relative flex flex-row max-lg:flex-col justify-center items-center h-screen w-2/3 max-md:w-11/12 max-md:h-4/6 max-lg:h-4/5 max-sm:h-2/3" id="projects">
                <div className="relative flex flex-row justify-center items-center w-full h-3/5 max-md:flex-col" id="projects">
                    <animated.div
                        {...bind()}
                        style={{ ...styles, touchAction: 'none' }}
                        className="relative flex justify-center items-center h-full w-full max-lg:flex-col"
                    >
                        <div className="flex flex-col items-center justify-center w-full h-full overflow-visible cursor-pointer select-none">
                            <div className="relative w-full h-full">
                                <InteractiveSwipeDetector 
                                    alt={currentProject.name} 
                                    image={currentProject.album[album_in_counter]} 
                                    dragging={dragging}
                                />
                                
                                {/* Image navigation arrows */}
                                {canGoNextImage && (
                                    <Arrow 
                                        direction="right"
                                        onClick={nextPicture}
                                        disabled={false}
                                        className="absolute top-1/2 right-[calc(10px+3%)] transform -translate-y-1/2 opacity-70 max-lg:hidden"
                                    />
                                )}
                                
                                {canGoPrevImage && (
                                    <Arrow 
                                        direction="left"
                                        onClick={prevPicture}
                                        disabled={false}
                                        className="absolute top-1/2 left-[calc(10px+3%)] transform -translate-y-1/2 opacity-70 max-lg:hidden"
                                    />
                                )}
                                
                                <div className="lg:hidden absolute bottom-0 inset-0 flex items-end justify-center pb-1">
                                    <BouncingBallHorizontal />
                                </div>
                            </div>

                            {/* Pagination dots */}
                            <div className="absolute bottom-0 flex flex-row space-x-1 z-20 p-2">
                                {currentProject.album.map((_, index) => (
                                    <div 
                                        key={index} 
                                        className={`size-3 rounded-full ${album_in_counter === index ? 'bg-blue-500' : 'bg-slate-400'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Text panel */}
                        <div 
                            className="flex justify-center p-6 w-1/3 bg-gray-200 h-full lg:rounded-r-lg cursor-default max-lg:h-1/3 max-lg:w-full max-lg:rounded-b-lg max-lg:p-3"
                            onMouseDown={() => setDragDisabled(true)}
                            onMouseUp={() => setDragDisabled(false)}
                        >
                            <div className="font-serif text-black text-base w-full lg:space-y-5">
                                <h1 className="text-3xl font-bold max-lg:hidden">{currentProject.name}</h1>
                                <h2 className="max-lg:hidden">Links</h2>
                                <div className="flex flex-col items-start text-left w-full break-words lg:space-y-5">
                                    <h3><strong>Difficulty</strong>: {'⭐️'.repeat(currentProject.difficulty)}</h3>
                                    <h3>
                                        <strong>Description</strong>: 
                                        <span className="italic text-center">
                                            &nbsp;{currentProject.description}.  &nbsp;
                                            <span className="text-cyan-500 font-semibold text-center mt-1 mb-3 w-full">
                                                {currentProject.hashtags.map((tag, idx) => (
                                                    <span key={idx}>{tag} &nbsp;</span>
                                                ))}
                                            </span>
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </animated.div>
                    
                    {/* Project navigation arrows */}
                    {canGoNextProject && (
                        <Arrow 
                            direction="right"
                            onClick={nextProject}
                            disabled={false}
                            className="absolute top-1/2 -right-[calc(10px+7%)] transform -translate-y-1/2 max-lg:hidden"
                        />
                    )}
                    
                    {canGoPrevProject && (
                        <Arrow 
                            direction="left"
                            onClick={prevProject}
                            disabled={false}
                            className="absolute top-1/2 -left-[calc(10px+7%)] transform -translate-y-1/2 max-lg:hidden"
                        />
                    )}
                </div>
                
                {/* Mobile project navigation */}
                <div className='pt-6 space-x-5 lg:hidden'>
                    <Arrow 
                        direction="left"
                        onClick={prevProject}
                        disabled={!canGoPrevProject}
                        className="inline-block transform -translate-y-1/2"
                    />
                    <Arrow 
                        direction="right"
                        onClick={nextProject}
                        disabled={!canGoNextProject}
                        className="inline-block transform -translate-y-1/2"
                    />
                </div>
            </div>
        </div>
    );
};

export default Projects;