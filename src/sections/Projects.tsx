import { projects } from '../constants/index';
import useLocalStorage from '../components/useLocalStorage';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState, useRef, useEffect } from 'react';

const Projects = () => {
    const [counter, setCounter] = useLocalStorage('counter', 0);
    const [styles, api] = useSpring(() => ({ x: 0 }));
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const dragging = useRef(false);

    const nextProject = () => {
        setCounter((prevCounter) => (prevCounter + 1) % projects.length);
    };

    const prevProject = () => {
        setCounter((prevCounter) => (prevCounter - 1 + projects.length) % projects.length);
    };

    const bind = useDrag(({ active, movement: [mx], direction: [xDir], cancel }) => {
        dragging.current = active;
        if (active && Math.abs(mx) > window.innerWidth / 2.5) {
            cancel();
            if (xDir < 0 && counter < projects.length - 1) nextProject();
            else if (xDir >= 0 && counter > 0) prevProject();
        }
        api.start({ x: active ? mx : 0 });
    });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.key === 'ArrowRight' || event.key === "d") && counter < projects.length - 1) {
                nextProject();
            } else if ((event.key === 'ArrowLeft' || event.key === "a") && counter > 0) {
                prevProject();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [counter]);

    const getGridClasses = (type: number) => {
        switch (type) {
            case 1:
                return 'flex justify-center items-center scale-90 px-40 py-12';
            case 2:
                return 'grid grid-cols-2 gap-7 scale-95 py-36';
            case 3:
                return 'grid grid-cols-2 gap-7 scale-95 ';
            case 4:
                return 'grid grid-cols-2 gap-7';
            default:
                return 'grid grid-cols-2 gap-7';
        }
    };

    const openModal = (imgSrc: string) => {
        if (!dragging.current) {
            setSelectedImage(imgSrc);
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage('');
    };

    return (
        <div className="relative flex flex-col justify-center items-center h-screen -mt-16 ">
            <animated.div
                {...bind()}
                style={{ ...styles, touchAction: 'none' }}
                className="relative flex justify-center items-center h-2/3 w-4/5"
            >
                <div className="flex items-center justify-center bg-beige w-full h-full rounded-l-md overflow-visible cursor-pointer select-none">
                    <div className={`${getGridClasses(projects[counter].album.length)} w-full h-full p-10 `}>
                        {projects[counter].album.map((album, idx2) => (
                            <div key={idx2} className="relative w-full h-full">
                                <img
                                    alt={projects[counter].name}
                                    src={album}
                                    className="absolute inset-0 w-full h-full rounded-xl pointer-events-auto"
                                    onClick={() => openModal(album)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center p-10 w-1/5 bg-gray-200 h-full rounded-r-md cursor-default">
                    {/* <a href="https://google.ca"> yeey</a> */}
                </div>
            </animated.div>

            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white p-5 rounded-lg w-full md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-3/5"
                        // onClick={(e) => e.stopPropagation()}
                    >
                        <img src={selectedImage} alt="Selected" className="w-full h-auto rounded-lg" />
                    </div>
                </div>
            )}
            <div className="flex flex-row space-x-1 mt-6">
                {projects.map((_, index) => (
                    <div key={index} className={`size-3 rounded-full ${counter === index ? 'bg-blue-500' : 'bg-slate-400'}`}
/>
                ))}
            </div>
        </div>
    );
};

export default Projects;
