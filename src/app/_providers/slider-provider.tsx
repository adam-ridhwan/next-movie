'use client';

import React, { createContext, ReactNode, useContext, useRef } from 'react';
import { StoreApi, useStore } from 'zustand';

import { createSliderStore, SliderStore } from '@/app/_providers/slider-store';
import { Card } from '@/app/(library)/page';

export type SliderStoreProviderProps = {
  children: ReactNode;
  cards: Card[];
};

const SliderStoreContext = createContext<StoreApi<SliderStore> | null>(null);

export const SliderProvider = ({ children, cards }: SliderStoreProviderProps) => {
  const storeRef = useRef<StoreApi<SliderStore>>();
  if (!storeRef.current) storeRef.current = createSliderStore(cards);

  return (
    <SliderStoreContext.Provider value={storeRef.current}>{children}</SliderStoreContext.Provider>
  );
};

export const useSliderStore = <T,>(selector: (store: SliderStore) => T): T => {
  const store = useContext(SliderStoreContext);
  if (!store) throw new Error(`useSliderStore must be use within SliderStoreProvider`);
  return useStore(store, selector);
};
