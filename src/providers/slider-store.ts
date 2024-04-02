import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Pages, Tile } from '@/lib/types';

type SetPagesParams = {
  pages: Pages;
  maxPages: number;
  currentPage: number;
  tilesPerPage: number;
  lastPageLength?: number;
  isFirstPageVisited?: boolean;
  isLastPageVisited?: boolean;
  isMounted?: boolean;
};

type State = {
  TILES: Tile[];
  pages: Pages;
  maxPage: number;
  currentPage: number;
  tilesPerPage: number;
  firstPageLength: number;
  lastPageLength: number;
  slideAmount: number;
  isFirstPageVisited: boolean;
  isLastPageVisited: boolean;
  hasPaginated: boolean;
  isAnimating: boolean;
  isMounted: boolean;
};

type Actions = {
  setCurrentPage: (currentPage: number) => void;
  setAllPages: (params: SetPagesParams) => void;
  resetPages: () => void;
  setTilesPerPage: (tilesPerPage: number) => void;
  setLastPageLength: (lastPageLength: number) => void;
  setSlideAmount: (slideAmount: number) => void;
  markAsPaginated: () => void;
  setIsAnimating: (isAnimating: boolean) => void;
};

export type SliderStore = State & Actions;

export const createSliderStore = (TILES: Tile[]) =>
  create(
    devtools<SliderStore>(set => ({
      TILES: TILES,
      pages: new Map<number, Tile[]>().set(1, TILES.slice(0, 7)),
      maxPage: 0,
      tilesPerPage: 0,
      currentPage: 1,
      hasPaginated: false,
      isAnimating: false,
      isFirstPageVisited: false,
      isLastPageVisited: false,
      firstPageLength: 0,
      lastPageLength: 0,
      slideAmount: 0,
      isMounted: false,

      setAllPages: (params: SetPagesParams) => set(() => params),
      setTilesPerPage: tilesPerPage => set(() => ({ tilesPerPage })),
      resetPages: () => set(() => ({ pages: new Map() })),
      markAsPaginated: () => set(() => ({ hasPaginated: true })),
      setLastPageLength: lastPageLength => set(() => ({ lastPageLength })),
      setSlideAmount: slideAmount => set(() => ({ slideAmount })),
      setCurrentPage: currentPage => set(() => ({ currentPage })),
      setIsAnimating: (isAnimating: boolean) => set(() => ({ isAnimating })),
    }))
  );
