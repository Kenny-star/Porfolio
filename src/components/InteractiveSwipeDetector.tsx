import React, { useState } from 'react';
import ImageModal from './ImageModalProps';

interface InteractiveSwipeDetectorProps {
  image: string;
  alt: string;
  dragging: React.RefObject<boolean>;
}

const InteractiveSwipeDetector: React.FC<InteractiveSwipeDetectorProps> = ({ alt, image, dragging }) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pointerEvents, setPointerEvents] = useState<'auto' | 'none'>('auto');

  const swipeThreshold = 30; // Minimum movement to qualify as a swipe

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const touch = 'touches' in e ? e.touches[0] : e;
    setStartX(touch.clientX);
    setStartY(touch.clientY);
    setPointerEvents('none'); // Prevent accidental clicks during swipe
  };

  const handleMouseUp = (e: React.MouseEvent | React.TouchEvent) => {
    const touch = 'changedTouches' in e ? e.changedTouches[0] : e;

    const deltaX = (touch.clientX - (startX ?? touch.clientX));
    const deltaY = (touch.clientY - (startY ?? touch.clientY));

    // Reset states
    setStartX(null);
    setStartY(null);
    setPointerEvents('auto'); // Re-enable pointer events

    if (Math.abs(deltaX) < swipeThreshold && Math.abs(deltaY) < swipeThreshold) {
      openModal();
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

  const openModal = () => {
    if (!dragging.current) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <img
        alt={alt}
        src={image}
        style={{ 
          pointerEvents: pointerEvents,
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "fill"
        }}
        className="absolute inset-0 w-full h-full lg:rounded-l-lg max-lg:rounded-tl-lg max-lg:rounded-tr-lg"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      />

      <ImageModal 
        isOpen={modalOpen}
        onClose={closeModal}
        image={image}
        alt={alt}
      />
    </>
  );
};

export default InteractiveSwipeDetector;