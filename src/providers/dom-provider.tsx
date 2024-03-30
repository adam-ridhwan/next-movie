'use client';

import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

type DomContextType = {
  sliderRef: RefObject<HTMLDivElement>;
  sliderItemRef: RefObject<HTMLDivElement>;
} | null;

export const DomContext = createContext<DomContextType>(null);

export const DomContextProvider = ({ children }: { children: ReactNode }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderItemRef = useRef<HTMLDivElement>(null);

  return <DomContext.Provider value={{ sliderRef, sliderItemRef }}>{children}</DomContext.Provider>;
};

export const useDomProvider = () => {
  const context = useContext(DomContext);
  if (!context) throw new Error('useDomProvider must be used within a RefContextProvider');
  return context;
};
