import React, { useState } from 'react';

const InteractiveButton: React.FC = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);

  // Thresholds
  const timeThreshold = 500; // 500ms for hold detection
  const swipeThreshold = 30; // Minimum movement to qualify as a swipe

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const touch = 'touches' in e ? e.touches[0] : e;
    setStartTime(Date.now());
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const handleMouseUp = (e: React.MouseEvent | React.TouchEvent) => {
    const touch = 'changedTouches' in e ? e.changedTouches[0] : e;
    const endTime = Date.now();
    const duration = endTime - (startTime ?? endTime);

    const deltaX = (touch.clientX - (startX ?? touch.clientX));
    const deltaY = (touch.clientY - (startY ?? touch.clientY));

    // Reset states
    setStartTime(null);
    setStartX(null);
    setStartY(null);

    // Conditions
    if (duration < timeThreshold && Math.abs(deltaX) < swipeThreshold && Math.abs(deltaY) < swipeThreshold) {
      console.log('Click');
    } else if (duration >= timeThreshold) {
      console.log('Hold');
    } else {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
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
    }
  };

  return (
    <button
      className="p-4 bg-blue-500 text-white rounded-lg"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      Interactive Button
    </button>
  );
};

export default InteractiveButton;
