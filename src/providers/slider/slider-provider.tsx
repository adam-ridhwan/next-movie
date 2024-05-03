'use client';

import { createContext, ReactNode, useContext, useRef } from 'react';
import { createSliderStore, SliderStore } from '@/providers/slider/create-slider-store';
import { RefProvider } from '@/providers/slider/ref-provider';
import { StoreApi, useStore } from 'zustand';

import { MediaType, Section, TODO } from '@/types/global-types';

type SliderContextProps = StoreApi<SliderStore> | null;

type SliderProviderProps = {
  children: ReactNode;
  content: TODO[];
  mediaType?: MediaType;
  section: Section;
};

const SliderContext = createContext<SliderContextProps>(null);

export const SliderProvider = ({ children, content, mediaType, section }: SliderProviderProps) => {
  const storeRef = useRef<StoreApi<SliderStore>>();
  if (!storeRef.current) storeRef.current = createSliderStore(content, mediaType, section);
  return (
    <RefProvider>
      <SliderContext.Provider value={storeRef.current}>
        <section>{children}</section>
      </SliderContext.Provider>
    </RefProvider>
  );
};

export const useSliderStore = <T,>(selector: (store: SliderStore) => T): T => {
  const store = useContext(SliderContext);
  if (!store) throw new Error(`useSliderStore must be use within SliderProvider`);
  return useStore(store, selector);
};
