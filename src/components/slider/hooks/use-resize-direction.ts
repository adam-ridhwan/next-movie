import { useEffect, useRef, useState } from 'react';

import { RESIZE_DIRECTION, ResizeDirection } from '@/components/slider/slider-constants';

export const useResizeDirection = () => {
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection | null>(null);
  const prevWindowWidth = useRef(typeof window === 'undefined' ? 0 : window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      // prettier-ignore
      const direction =
        currentWidth > prevWindowWidth.current
          ? RESIZE_DIRECTION.MAXIMIZING
          : RESIZE_DIRECTION.MINIMIZING;
      setResizeDirection(direction);

      prevWindowWidth.current = currentWidth;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { resizeDirection };
};
