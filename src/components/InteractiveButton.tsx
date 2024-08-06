import React, { useState } from 'react';

const InteractiveButton: React.FC = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);

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
    const threshold = 500; // 500ms threshold for hold
    const moveThreshold = 10; // 10px movement threshold for swipe/scroll

    const deltaX = Math.abs((startX ?? touch.clientX) - touch.clientX);
    const deltaY = Math.abs((startY ?? touch.clientY) - touch.clientY);

    if (duration < threshold && deltaX < moveThreshold && deltaY < moveThreshold) {
      // It's a click
      console.log('Click');
    } else if (duration >= threshold) {
      // It's a hold
      console.log('Hold');
    } else {
      // It's a swipe/scroll
      console.log('Swipe/Scroll');
    }

    setStartTime(null);
    setStartX(null);
    setStartY(null);
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
