import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Pages } from '@/lib/types';
import { Movie } from '@/lib/zod-types.ts/modelSchema/MovieSchema';

type SetPagesParams = {
  pages: Pages;
  maxPages: number;
  currentPage: number;
  tileCountPerPage: number;
  firstPageLength: number;
  lastPageLength: number;
  isMounted?: boolean;
};

type SliderState = {
  TILES: Movie[];
  pages: Pages;
  maxPages: number;
  currentPage: number;
  tileCountPerPage: number;
  firstPageLength: number;
  lastPageLength: number;
  slideAmount: number;
  hasPaginated: boolean;
  isAnimating: boolean;
  isMounted: boolean;
};

type SliderActions = {
  setCurrentPage: (currentPage: number) => void;
  setPages: (params: SetPagesParams) => void;
  setSlideAmount: (slideAmount: number) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  markAsPaginated: () => void;
};

export type SliderStore = SliderState & SliderActions;

export const createSliderStore = (TILES: Movie[]) =>
  create(
    devtools<SliderStore>(set => ({
      TILES: TILES,
      pages: new Map<number, Movie[]>().set(1, TILES.slice(0, 7)),
      maxPages: 0,
      currentPage: 1,
      tileCountPerPage: 0,
      firstPageLength: 0,
      lastPageLength: 0,
      slideAmount: 0,
      hasPaginated: false,
      isAnimating: false,
      isMounted: false,

      setPages: (params: SetPagesParams) => set(() => params),
      setCurrentPage: currentPage => set(() => ({ currentPage })),
      setSlideAmount: slideAmount => set(() => ({ slideAmount })),
      setIsAnimating: (isAnimating: boolean) => set(() => ({ isAnimating })),
      markAsPaginated: () => set(() => ({ hasPaginated: true })),
    }))
  );
