'use client';

import { createContext, ReactNode, useContext, useRef } from 'react';
import { createSliderStore, SliderStore } from '@/providers/slider-store';
import { StoreApi, useStore } from 'zustand';

import { MediaType, Section, SliderContent } from '@/lib/types';

export type SliderProviderProps = {
  children: ReactNode;
  content: SliderContent[];
  mediaType: MediaType;
  section: Section;
};

const SliderStoreContext = createContext<StoreApi<SliderStore> | null>(null);

export const SliderProvider = ({ children, content, mediaType, section }: SliderProviderProps) => {
  const storeRef = useRef<StoreApi<SliderStore>>();
  if (!storeRef.current) storeRef.current = createSliderStore(content, mediaType, section);
  return <SliderStoreContext.Provider value={storeRef.current}>{children}</SliderStoreContext.Provider>;
};

export const useSliderStore = <T,>(selector: (store: SliderStore) => T): T => {
  const store = useContext(SliderStoreContext);
  if (!store) throw new Error(`useSliderStore must be use within SliderStoreProvider`);
  return useStore(store, selector);
};
