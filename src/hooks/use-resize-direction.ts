import { useEffect, useRef, useState } from 'react';

import { ResizeDirection } from '@/lib/constants';

export const useResizeDirection = () => {
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection | null>(null);
  const prevWindowWidth = useRef(typeof window === 'undefined' ? 0 : window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      // prettier-ignore
      const direction: ResizeDirection =
        currentWidth > prevWindowWidth.current
          ? 'maximizing'
          : 'minimizing';
      setResizeDirection(direction);

      prevWindowWidth.current = currentWidth;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { resizeDirection };
};
