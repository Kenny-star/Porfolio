import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import Covid_Tracker_1 from '/assets/projects/Covid_Tracker_1.png';
import Covid_Tracker_2 from '/assets/projects/Covid_Tracker_2.png';
import Covid_Tracker_3 from '/assets/projects/Covid_Tracker_3.png';
import Covid_Tracker_4 from '/assets/projects/Covid_Tracker_4.png';

const IMG_WIDTH = 700;
const IMG_HEIGHT = 400;

const SwipeGallery: React.FC = () => {
  const swiperRef = useRef<HTMLDivElement>(null);
  const movementRef = useRef<number>(0);
  const lastClientXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const transitionDurationRef = useRef<string>('0s');
  const currentIndexRef = useRef<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const imgs = [
    Covid_Tracker_1,
    Covid_Tracker_2,
    Covid_Tracker_3,
    Covid_Tracker_4
  ];

  const handleTouchStart = (e: TouchEvent) => {
    if (isTransitioning) return;
    lastClientXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDraggingRef.current || isTransitioning) return;
    const delta = lastClientXRef.current - e.touches[0].clientX;
    lastClientXRef.current = e.touches[0].clientX;
    handleMovement(delta);
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current || isTransitioning) return;
    handleMovementEnd();
    isDraggingRef.current = false;
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (isTransitioning) return;
    lastClientXRef.current = e.clientX;
    isDraggingRef.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || isTransitioning) return;
    const delta = lastClientXRef.current - e.clientX;
    lastClientXRef.current = e.clientX;
    handleMovement(delta);
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current || isTransitioning) return;
    handleMovementEnd();
    isDraggingRef.current = false;
  };

  const handleMovement = (delta: number) => {
    const maxLength = imgs.length - 1;
    let nextMovement = movementRef.current + delta;

    // Ensure movement is within bounds
    nextMovement = Math.max(0, Math.min(nextMovement, maxLength * IMG_WIDTH));

    // Update movement only if it's significant
    if (Math.abs(nextMovement - movementRef.current) > 1) {
      movementRef.current = nextMovement;
      transitionDurationRef.current = '0s';
      updateSwiperPosition();
    }
  };

  const handleMovementEnd = () => {
    if (isTransitioning) return; // Ensure we're not transitioning already
  
    const movement = movementRef.current;
    const endPosition = movement / IMG_WIDTH;
    const endPartial = endPosition % 1;
    const endingIndex = Math.round(endPosition);
  
    let nextIndex = endingIndex;
  
    // Adjust the index based on the swipe direction and threshold
    if (endPartial >= 0.5) {
      nextIndex = Math.min(endingIndex + 1, imgs.length - 1);
    } else if (endPartial <= -0.5) {
      nextIndex = Math.max(endingIndex - 1, 0);
    }
  
    // Transition to the new index
    transitionTo(nextIndex, 0.5);
  };
  

  const transitionTo = (index: number, duration: number) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    currentIndexRef.current = index;
    movementRef.current = index * IMG_WIDTH;
    transitionDurationRef.current = `${duration}s`;
    updateSwiperPosition();

    // Reset transitioning state after transition ends
    setTimeout(() => setIsTransitioning(false), duration * 1000);
  };

  const updateSwiperPosition = () => {
    if (swiperRef.current) {
      swiperRef.current.style.transform = `translateX(${movementRef.current * -1}px)`;
      swiperRef.current.style.transitionDuration = transitionDurationRef.current;
    }
  };

  useEffect(() => {
    const swiperElement = swiperRef.current;
    if (!swiperElement) return;

    swiperElement.addEventListener('touchstart', handleTouchStart);
    swiperElement.addEventListener('touchmove', handleTouchMove);
    swiperElement.addEventListener('touchend', handleTouchEnd);
    swiperElement.addEventListener('mousedown', handleMouseDown);
    swiperElement.addEventListener('mousemove', handleMouseMove);
    swiperElement.addEventListener('mouseup', handleMouseUp);

    return () => {
      swiperElement.removeEventListener('touchstart', handleTouchStart);
      swiperElement.removeEventListener('touchmove', handleTouchMove);
      swiperElement.removeEventListener('touchend', handleTouchEnd);
      swiperElement.removeEventListener('mousedown', handleMouseDown);
      swiperElement.removeEventListener('mousemove', handleMouseMove);
      swiperElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const maxLength = imgs.length - 1;

  return (
    <div className="App">
      <div
        className="main select-none"
        style={{ width: `${IMG_WIDTH}px`, height: `${IMG_HEIGHT}px` }}
      >
        <div
          className="swiper"
          ref={swiperRef}
          style={{
            display: 'flex',
            width: `${(imgs.length * IMG_WIDTH)}px`,
            transitionDuration: transitionDurationRef.current,
          }}
        >
          {imgs.map((src) => (
            <img key={src} src={src} width={`${IMG_WIDTH}px`} height={`${IMG_HEIGHT}px`} className="pointer-events-none" />
          ))}
        </div>
        {currentIndexRef.current > 0 && (
          <button
            className="back move"
            onClick={() => {
              if (!isTransitioning) transitionTo(currentIndexRef.current - 1, 0.5);
            }}
          >
            ←
          </button>
        )}
        {currentIndexRef.current < maxLength && (
          <button
            className="next move"
            onClick={() => {
              if (!isTransitioning) transitionTo(currentIndexRef.current + 1, 0.5);
            }}
          >
            →
          </button>
        )}
      </div>
    </div>
  );
};

export default SwipeGallery;
