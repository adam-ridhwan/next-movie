'use client';

import React, { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

export const RefContext = createContext<RefContextType>(null);

type RefContextType = {
  sliderRef: RefObject<HTMLDivElement>;
  sliderItemRef: RefObject<HTMLDivElement>;
} | null;

export const RefContextProvider = ({ children }: { children: ReactNode }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderItemRef = useRef<HTMLDivElement>(null);

  return <RefContext.Provider value={{ sliderRef, sliderItemRef }}>{children}</RefContext.Provider>;
};

export const useRefContext = () => {
  const context = useContext(RefContext);
  if (!context) throw new Error('useRefContext must be used within a RefContextProvider');
  return context;
};
