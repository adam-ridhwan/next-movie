'use client';

import { createContext, ReactNode, RefObject, useContext, useRef } from 'react';

type DomContextType = {
  tileListRef: RefObject<HTMLDivElement>;
  tileItemRef: RefObject<HTMLDivElement>;
  paginationButtonRef: RefObject<HTMLButtonElement>;
} | null;

export const DomContext = createContext<DomContextType>(null);

export const DomContextProvider = ({ children }: { children: ReactNode }) => {
  const tileListRef = useRef<HTMLDivElement>(null);
  const tileItemRef = useRef<HTMLDivElement>(null);
  const paginationButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <DomContext.Provider
      value={{
        tileListRef,
        tileItemRef,
        paginationButtonRef,
      }}
    >
      {children}
    </DomContext.Provider>
  );
};

export const useDomContext = () => {
  const context = useContext(DomContext);
  if (!context) throw new Error('useDomContext must be used within a RefContextProvider');
  return context;
};
