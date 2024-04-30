'use client';

import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

type SliderRefContextProps = {
  tileContainerRef: RefObject<HTMLDivElement>;
  tileItemRef: RefObject<HTMLDivElement>;
} | null;

const SliderRefContext = createContext<SliderRefContextProps>(null);

export const SliderRefProvider = ({ children }: { children: ReactNode }) => {
  const tileContainerRef = useRef<HTMLDivElement>(null);
  const tileItemRef = useRef<HTMLDivElement>(null);
  return (
    <SliderRefContext.Provider
      value={{
        tileContainerRef,
        tileItemRef,
      }}
    >
      {children}
    </SliderRefContext.Provider>
  );
};

export const useSliderRefContext = () => {
  const context = useContext(SliderRefContext);
  if (!context) throw new Error('useSliderRefContext must be used within a SliderRefProvider');
  return context;
};
