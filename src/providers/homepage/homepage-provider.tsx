'use client';

import { createContext, ReactNode, useContext } from 'react';

import { TODO } from '@/types/global-types';

type HomepageContextProps = {
  homepageContent: TODO;
  epicStageContent: TODO;
} | null;

type NavigationProviderProps = {
  children: ReactNode;
  homepageContent: TODO;
  epicStageContent: TODO;
};

const HomepageContext = createContext<HomepageContextProps>(null);

export const HomepageProvider = ({
  children,
  homepageContent,
  epicStageContent,
}: NavigationProviderProps) => (
  <HomepageContext.Provider value={{ homepageContent, epicStageContent }}>
    {children}
  </HomepageContext.Provider>
);

export const useHomepageStore = () => {
  const context = useContext(HomepageContext);
  if (!context) throw new Error('useHomepageStore must be used within a HomepageProvider');
  return context;
};
