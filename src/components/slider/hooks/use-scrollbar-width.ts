import { useEffect, useState } from 'react';

export const useScrollbarWidth = (): number => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';

    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.parentNode?.removeChild(outer);

    setScrollbarWidth(scrollbarWidth);
  }, []);

  return scrollbarWidth;
};
