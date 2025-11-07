import React, { useEffect, useState } from 'react';
import { getPositionStyle } from '../../../../utils/helperFunctions';
import type { Poster } from '../BasicStorePost';


interface StorePosterSlideshowProps {
  poster: Poster;
}


const StorePosterSlideshow: React.FC<StorePosterSlideshowProps> = ({ poster }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % poster.images.length);
        setFade(true);
      }, 200); // quick fade out before switching
    }, 1000); // change every second

    return () => clearInterval(interval);
  }, [poster.images.length]);

  return (
    <div className="relative flex items-center justify-center p-[.4vh] h-fit overflow-hidden">
      <img
        src={poster.images[currentImageIndex]}
        alt={`post-image-${currentImageIndex}`}
        className={`w-full object-cover transition-opacity duration-500 
          
        }`}
      />

      {poster.button?.show && (
        <button
          style={{
            position: 'absolute',
            ...getPositionStyle(poster.button.position),
            borderWidth: '2px',
            borderColor: poster.button?.style?.background?.border?.color,
            color: poster.button.style.text.color,
            fontSize: poster.button.style.text.size,
            fontWeight: poster.button.style.text.bold ? 'bold' : 'normal',
            fontStyle: poster.button.style.text.italic ? 'italic' : 'normal',
            textDecoration: poster.button.style.text.underline ? 'underline' : 'none',
            backgroundColor: poster.button.style.background.color,
            padding: `${poster.button.style.background.padding.y} ${poster.button.style.background.padding.x}`,
          }}
          onClick={() => window.open(poster.url, '_blank')}
          className="absolute border"
        >
          {poster.button.style.text.input}
        </button>
      )}
    </div>
  );
};

export default StorePosterSlideshow;
