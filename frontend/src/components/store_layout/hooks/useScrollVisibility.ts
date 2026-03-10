import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that returns visibility state for hiding elements on scroll down
 * and showing them on scroll up (similar to mobile navigation bars)
 * 
 * @param threshold - The scroll position threshold before hiding (default: 50)
 * @returns isHidden - Whether the element should be hidden
 */
export const useScrollVisibility = (threshold: number = 50) => {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > threshold) {
        // Scrolling down and past threshold
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isHidden;
};

export default useScrollVisibility;
