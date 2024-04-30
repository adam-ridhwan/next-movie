'use client';

import { createContext, ReactNode, useContext, useRef } from 'react';
import { SliderRefProvider } from '@/providers/slider/slider-ref-provider';
import { createSliderStore, SliderStore } from '@/providers/slider/slider-store';
import { StoreApi, useStore } from 'zustand';

import { MediaType, Section, TODO } from '@/lib/types';

export type SliderProviderProps = {
  children: ReactNode;
  content: TODO[];
  mediaType: MediaType;
  section: Section;
};

const Context = createContext<StoreApi<SliderStore> | null>(null);

export const SliderProvider = ({ children, content, mediaType, section }: SliderProviderProps) => {
  const storeRef = useRef<StoreApi<SliderStore>>();
  if (!storeRef.current) storeRef.current = createSliderStore(content, mediaType, section);
  return (
    <SliderRefProvider>
      <Context.Provider value={storeRef.current}>
        <section>{children}</section>
      </Context.Provider>
    </SliderRefProvider>
  );
};

export const useSliderStore = <T,>(selector: (store: SliderStore) => T): T => {
  const store = useContext(Context);
  if (!store) throw new Error(`useSliderStore must be use within SliderStoreProvider`);
  return useStore(store, selector);
};
