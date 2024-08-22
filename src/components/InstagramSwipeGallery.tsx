// import React, { useRef, useState, useEffect } from 'react';

// interface InstagramSwipeGalleryProps {
//   images: { album: string[]; name: string }[];
//   ctn: number;
//   in_ctn: number;
//   setAlbumInCounter: React.Dispatch<React.SetStateAction<number>>;
// }

// // Device detection function
// const isMobileDevice = () => {
//   return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
// };

// const InstagramSwipeGallery: React.FC<InstagramSwipeGalleryProps> = ({ images, ctn, in_ctn, setAlbumInCounter }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isMobile, setIsMobile] = useState(isMobileDevice());

//   useEffect(() => {
//     // Update device type on resize
//     const handleResize = () => {
//       setIsMobile(isMobileDevice());
//     };

//     const container = containerRef.current;

//     const handleScroll = () => {
//       // Optional: smooth scrolling effects can be handled here if needed
//     };

//     const handleMouseUp = () => {
//       if (container) {
//         // Calculate the new index based on scroll position
//         const newIndex = Math.round(container.scrollLeft / container.clientWidth);
//         if (newIndex !== in_ctn) {
//           setAlbumInCounter(newIndex);
//         }
//       }
//       setIsDragging(false);
//     };

//     const handleMouseDown = () => {
//       setIsDragging(true);
//     };

//     const handleTouchEnd = () => {
//       handleMouseUp(); // Use the same handler for touch end
//     };

//     if (container) {
//       container.addEventListener('scroll', handleScroll);
//       container.addEventListener('mouseup', handleMouseUp);
//       container.addEventListener('mousedown', handleMouseDown);
//       container.addEventListener('touchend', handleTouchEnd); // For touch devices
//     }

//     window.addEventListener('resize', handleResize);

//     // Cleanup event listeners on unmount
//     return () => {
//       if (container) {
//         container.removeEventListener('scroll', handleScroll);
//         container.removeEventListener('mouseup', handleMouseUp);
//         container.removeEventListener('mousedown', handleMouseDown);
//         container.removeEventListener('touchend', handleTouchEnd);
//       }
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [in_ctn, setAlbumInCounter]);

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full h-full flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide"
//     >
//       {images[ctn].album.map((image, index) => (
//         <div key={index} className="relative min-w-full snap-center">
//           <img
//             src={isMobile ? image : images[ctn].album[in_ctn]}
//             alt={`Image ${ctn}_${index + 1}`}
//             className="object-cover w-full h-full"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default InstagramSwipeGallery;




 import React, { useRef } from 'react';
interface InstagramSwipeGalleryProps {
    images: { album: string[]; name: string; }[];
    ctn: number;
    in_ctn: number;
}
const InstagramSwipeGallery: React.FC<InstagramSwipeGalleryProps> = ({images, ctn, in_ctn}) => {

  return (
    <div className="relative w-full h-full flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide">
      {images[ctn].album.map((image, index) => (
        <div key={index} className="relative min-w-full snap-center ">
          <img
            src={images[ctn].album[in_ctn]}
            alt={`Image ${ctn + '_' + in_ctn + 1}`}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

export default InstagramSwipeGallery;

 