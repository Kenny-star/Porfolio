import React, { useState } from 'react';

interface InteractiveSwipeDetectorProps {
  image: string;
  alt: string;
  dragging: React.RefObject<boolean>;
}

const InteractiveSwipeDetector: React.FC<InteractiveSwipeDetectorProps> = ({ alt, image, dragging }) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [pointerEvents, setPointerEvents] = useState<'auto' | 'none'>('auto');

  // const timeThreshold = 500; // 500ms for hold detection
  const swipeThreshold = 30; // Minimum movement to qualify as a swipe

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const touch = 'touches' in e ? e.touches[0] : e;
    setStartX(touch.clientX);
    setStartY(touch.clientY);
    setPointerEvents('none'); // Prevent accidental clicks during swipe
  };

  const handleMouseUp = (e: React.MouseEvent | React.TouchEvent) => {
    const touch = 'changedTouches' in e ? e.changedTouches[0] : e;
    // const endTime = Date.now();
    // const duration = endTime - (startTime ?? endTime);

    const deltaX = (touch.clientX - (startX ?? touch.clientX));
    const deltaY = (touch.clientY - (startY ?? touch.clientY));

    // Reset states
    setStartX(null);
    setStartY(null);
    setPointerEvents('auto'); // Re-enable pointer events

    // if (duration < timeThreshold && Math.abs(deltaX) < swipeThreshold && Math.abs(deltaY) < swipeThreshold) {
    if (Math.abs(deltaX) < swipeThreshold && Math.abs(deltaY) < swipeThreshold) {
      openModal(image);
    } else if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > swipeThreshold) {
        console.log('Swipe Right');
      } else if (deltaX < -swipeThreshold) {
        console.log('Swipe Left');
      }
    } else {
      if (deltaY > swipeThreshold) {
        console.log('Swipe Down');
      } else if (deltaY < -swipeThreshold) {
        console.log('Swipe Up');
      }
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
    <>
      <img
        alt={alt}
        src={image}
        style={{ pointerEvents: pointerEvents }}
        className="absolute inset-0 w-full h-full lg:rounded-l-lg max-lg:rounded-tl-lg max-lg:rounded-tr-lg object-fill"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      />

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div className="relative bg-white p-5 rounded-lg w-full md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-3/5">
            <img src={selectedImage} alt="Selected" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveSwipeDetector;


