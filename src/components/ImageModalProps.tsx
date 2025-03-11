import React, { useState, useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  image,
  alt
}) => {
  const [scale, setScale] = useState(1);
  const [animationState, setAnimationState] = useState<'idle' | 'entering' | 'exiting'>('idle');

  // Handle zoom in/out
  const handleZoom = (zoomIn: boolean) => {
    setScale(prevScale => {
      const newScale = zoomIn ? prevScale + 0.1 : prevScale - 0.1;
      // Limit scale between 0.5 and 3
      return Math.min(Math.max(newScale, 0.5), 3);
    });
  };

  // Animation effects
  useEffect(() => {
    if (isOpen) {
      setScale(0.8);
      setAnimationState('entering');
      const timer = setTimeout(() => {
        setScale(1);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setAnimationState('idle');
    }
  }, [isOpen]);

  // Handle close with animation
  const handleClose = () => {
    setAnimationState('exiting');
    setTimeout(() => {
      onClose();
      setAnimationState('idle');
    }, 300);
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300"
      style={{
        opacity: animationState === 'entering' ? 1 : animationState === 'exiting' ? 0 : 1
      }}
      onClick={handleClose}
    >
      <div 
        className="relative bg-gray-900 p-4 rounded-xl w-full max-w-4xl mx-4 shadow-2xl border border-gray-700"
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top toolbar */}
        <div className="flex justify-end mb-3 text-white">
          <div className="flex items-center space-x-4">
            <button 
              className="bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors"
              onClick={() => handleZoom(false)}
              aria-label="Zoom out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button 
              className="bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors"
              onClick={() => handleZoom(true)}
              aria-label="Zoom in"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button 
              className="bg-red-500 hover:bg-red-600 rounded-full p-2 transition-colors"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Image container */}
        <div className="overflow-hidden rounded-lg bg-black flex items-center justify-center">
          <img 
            src={image} 
            alt={alt} 
            className="max-w-full max-h-[70vh] object-contain"
            style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease-out' }}
          />
        </div>
        
        {/* Bottom caption */}
        <div className="mt-3 text-white text-center">
          <p className="text-sm opacity-80">
            Tap image to close • Use +/- buttons to zoom
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;