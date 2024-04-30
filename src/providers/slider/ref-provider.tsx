'use client';

import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

type RefContextProps = {
  tileContainerRef: RefObject<HTMLDivElement>;
  tileItemRef: RefObject<HTMLDivElement>;
} | null;

type RefProviderProps = {
  children: ReactNode;
};

const RefContext = createContext<RefContextProps>(null);

export const RefProvider = ({ children }: RefProviderProps) => {
  const tileContainerRef = useRef<HTMLDivElement>(null);
  const tileItemRef = useRef<HTMLDivElement>(null);
  return (
    <RefContext.Provider
      value={{
        tileContainerRef,
        tileItemRef,
      }}
    >
      {children}
    </RefContext.Provider>
  );
};

export const useRefContext = () => {
  const context = useContext(RefContext);
  if (!context) throw new Error('useRefContext must be used within a RefProvider');
  return context;
};
