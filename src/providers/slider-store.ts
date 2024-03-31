import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { TileType } from '@/lib/types';
import { findIndexFromKey, getMapItem, getTilesPerPage } from '@/lib/utils';
import { GetTranslatePercentageParams } from '@/components/slider/use-translate-percentage';

export type PagesMap = Map<number, TileType[]>;

type State = {
  TILES: TileType[];
  pages: PagesMap;
  maxPage: number;
  currentPage: number;
  cache: PagesMap;
  tilesPerPage: number;
  lastPageLength: number;
  translatePercentage: number;
  isFirstPageVisited: boolean;
  isLastPageVisited: boolean;
  hasPaginated: boolean;
  isAnimating: boolean;
  isMounted: boolean;
};

type Actions = {
  setCurrentPage: (currentPage: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  setInitialPages: () => void;
  setPagesAfterResize: (previousTiles: TileType[]) => void;
  resetPages: () => void;
  setCache: (pages: PagesMap) => void;
  setTilesPerPage: (tilesPerPage: number) => void;
  setLastPageLength: (lastPageLength: number) => void;
  setTranslatePercentage: (translatePercentage: number) => void;
  markAsPaginated: () => void;
  setIsAnimating: (isAnimating: boolean) => void;
  enableAnimation: () => void;
  disableAnimation: () => void;
  handleRightScroll: (
    getTranslatePercentage: (params: GetTranslatePercentageParams) => number
  ) => void;
  handleLeftScroll: (
    getTranslatePercentage: (params: GetTranslatePercentageParams) => number
  ) => void;
};

export type SliderStore = State & Actions;

export const createSliderStore = (TILES: TileType[]) =>
  create(
    devtools<SliderStore>((set, get) => ({
      TILES: TILES,
      pages: new Map<number, TileType[]>().set(1, TILES.slice(0, 7)),
      maxPage: Math.ceil(TILES.length / getTilesPerPage()),
      cache: new Map(),
      tilesPerPage: getTilesPerPage(),
      currentPage: 1,
      hasPaginated: false,
      isAnimating: false,
      isFirstPageVisited: true,
      isLastPageVisited: false,
      lastPageLength: 0,
      translatePercentage: 0,
      isMounted: false,

      setTilesPerPage: tilesPerPage => set(() => ({ tilesPerPage })),
      goToNextPage: () =>
        set(state =>
          state.hasPaginated
            ? { currentPage: state.currentPage + 1 }
            : { currentPage: state.currentPage + 1, hasPaginated: true }
        ),
      goToPrevPage: () => set(state => ({ currentPage: state.currentPage - 1 })),
      resetPages: () => set(() => ({ pages: new Map() })),
      markAsPaginated: () => set(() => ({ hasPaginated: true })),
      setLastPageLength: lastPageLength => set(() => ({ lastPageLength })),
      setTranslatePercentage: translatePercentage => set(() => ({ translatePercentage })),
      setCurrentPage: currentPage => set(() => ({ currentPage })),
      setIsAnimating: (isAnimating: boolean) => set(() => ({ isAnimating })),
      setCache: pages => set(() => ({ cache: pages })),
      setInitialPages: () => {
        set(state => {
          const initialPages: PagesMap = new Map<number, TileType[]>();

          for (let pageIndex = 0; pageIndex < state.maxPage; pageIndex++) {
            const startIndex = pageIndex * state.tilesPerPage;
            const endIndex = startIndex + state.tilesPerPage;
            initialPages.set(pageIndex + 1, TILES.slice(startIndex, endIndex));
          }

          const lastPage = getMapItem({
            label: 'setInitialPages()',
            map: initialPages,
            key: state.maxPage,
          });

          if (lastPage.length < state.tilesPerPage && initialPages.size > 1) {
            const tilesNeeded = state.tilesPerPage - lastPage.length;
            initialPages.set(state.maxPage, [...lastPage, ...TILES.slice(0, tilesNeeded)]);
          }

          return {
            pages: initialPages,
            cache: initialPages,
            lastPageLength: lastPage.length,
            isMounted: true,
          };
        });
      },
      setPagesAfterResize: previousTilesCurrentPage => {
        set(state => {
          get().resetPages();

          /** ────────────────────────────────────────────────────────────────────────────────
           * FOUR tilesPerPage to THREE tilesPerPage - when resizing from 2nd page
           *  L        1           2           3        R
           * [9] - [1,2,3,4] - [5,6,7,8] - [9,1,2,3] - [4]
           * [1] -  [2,3,4]  -  [5,6,7]  -  [8,9,1]  - [2]
           *
           * left - 3 tiles
           * right - 6 tiles
           * ────────────────────────────────────────────────────────────────────────────── */

          /** ────────────────────────────────────────────────────────────────────────────────
           * FOUR tilesPerPage to THREE tilesPerPage - when resizing from 3rd page (last page)
           *  L        1           2           3        R
           * [7] - [7,8,9,1] - [2,3,4,5] - [6,7,8,9] - [1]
           * [8] -  [9,1,2]  -  [3,4,5]  -  [6,7,8]  - [9]
           *
           * todo:
           * ────────────────────────────────────────────────────────────────────────────── */

          const newTiles: TileType[] = [];

          const newTilesPerPage = getTilesPerPage();
          const newMaxPage = Math.ceil(TILES.length / newTilesPerPage);

          const totalTilesToTheLeft = newTilesPerPage * (state.currentPage - 1); // 1
          const totalTilesToTheRight = newTilesPerPage * (newMaxPage - state.currentPage + 1); // 2

          const indexOfFirstItemInCurrentPage = findIndexFromKey({
            label: 'setPagesAfterResize()',
            array: state.TILES,
            key: 'id',
            value: previousTilesCurrentPage[0].id,
          });

          let decrementingTilesIndex = indexOfFirstItemInCurrentPage - 1;
          for (let i = totalTilesToTheLeft; i > 0; i--) {
            newTiles.unshift(state.TILES[decrementingTilesIndex--]);
            if (decrementingTilesIndex === -1) {
              decrementingTilesIndex = state.TILES.length - 1;
            }
          }

          let incrementingTilesIndex = indexOfFirstItemInCurrentPage;
          let hasMissingTiles = false;
          let newLastPageLength = 0;
          for (let i = 0; i < totalTilesToTheRight; i++) {
            newTiles.push(state.TILES[incrementingTilesIndex++]);
            if (hasMissingTiles) {
              newLastPageLength++;
            }
            if (incrementingTilesIndex === state.TILES.length) {
              incrementingTilesIndex = 0;
              hasMissingTiles = true;
            }
          }

          console.log([totalTilesToTheLeft, totalTilesToTheRight]);
          console.log(
            'previousTilesCurrentPage',
            previousTilesCurrentPage.map(tile => tile.id)
          );
          console.log(
            'newTiles',
            newTiles.map(tile => tile.id)
          );
          console.log('newLastPageLength', newLastPageLength);

          const newPages: PagesMap = new Map<number, TileType[]>();
          for (let pageIndex = 0; pageIndex < newMaxPage; pageIndex++) {
            const startIndex = pageIndex * newTilesPerPage;
            const endIndex = startIndex + newTilesPerPage;
            const newTilesGroup = newTiles.slice(startIndex, endIndex);
            newPages.set(pageIndex + 1, newTilesGroup);
          }

          console.log('newPages', newPages);

          const initialPages: PagesMap = new Map<number, TileType[]>();

          for (let pageIndex = 0; pageIndex < newMaxPage; pageIndex++) {
            const startIndex = pageIndex * newTilesPerPage;
            const endIndex = startIndex + newTilesPerPage;
            initialPages.set(pageIndex + 1, TILES.slice(startIndex, endIndex));
          }

          const lastPage = getMapItem({
            label: 'setInitialPages()',
            map: initialPages,
            key: newMaxPage,
          });

          if (lastPage.length < newTilesPerPage && initialPages.size > 1) {
            const tilesNeeded = newTilesPerPage - lastPage.length;
            initialPages.set(newMaxPage, [...lastPage, ...TILES.slice(0, tilesNeeded)]);
          }

          return {
            pages: newPages,
            cache: initialPages,
            tilesPerPage: newTilesPerPage,
            maxPage: newMaxPage,
            lastPageLength: newLastPageLength,
          };
        });
      },
      goToFirstPage: () =>
        set(state => {
          console.log('goToFirstPage()');
          const tilesBeforeFirstIndex = state.TILES.slice(-state.tilesPerPage);
          const newPages = state.cache.set(0, tilesBeforeFirstIndex);

          return {
            pages: newPages,
            currentPage: 1,
            isFirstPageVisited: true,
            isLastPageVisited: false,
          };
        }),
      goToLastPage: () =>
        set(state => {
          const newTiles: TileType[] = [];
          const totalTiles = state.maxPage * state.tilesPerPage;

          let decrementingTilesIndex = state.TILES.length - 1;
          for (let i = totalTiles; i > 0; i--) {
            newTiles.unshift(state.TILES[decrementingTilesIndex--]);
            if (decrementingTilesIndex === -1) {
              decrementingTilesIndex = state.TILES.length - 1;
            }
          }

          // Add the first few tiles to the end to align properly
          newTiles.push(...state.TILES.slice(0, state.tilesPerPage));

          const newPages: PagesMap = new Map<number, TileType[]>();
          for (let pageIndex = 0; pageIndex < state.maxPage + 1; pageIndex++) {
            const startIndex = pageIndex * state.tilesPerPage;
            const endIndex = startIndex + state.tilesPerPage;
            const newTilesGroup = newTiles.slice(startIndex, endIndex);
            newPages.set(pageIndex + 1, newTilesGroup);
          }

          return {
            pages: newPages,
            currentPage: state.maxPage,
            isFirstPageVisited: false,
            isLastPageVisited: true,
          };
        }),
      enableAnimation: () => {
        set(() => {
          document.body.style.pointerEvents = 'none';
          return { isAnimating: true };
        });
      },
      disableAnimation: () => {
        set(() => {
          document.body.style.pointerEvents = '';
          return { isAnimating: false };
        });
      },
      handleRightScroll: getTranslatePercentage => {
        get().enableAnimation();
        const newCurrentPage = get().currentPage + 1;
        const isLastPage = newCurrentPage === get().maxPage;

        const newTranslatePercentage = getTranslatePercentage({
          direction: DIRECTION.RIGHT,
          lastPageLength: get().lastPageLength,
          isLastPage: isLastPage && get().isFirstPageVisited,
        });

        get().setTranslatePercentage(newTranslatePercentage);

        setTimeout(() => {
          get().disableAnimation();
          get().setTranslatePercentage(0);
          const canGoToNextPage = newCurrentPage <= get().maxPage;
          canGoToNextPage ? get().goToNextPage() : get().goToFirstPage();
          if (isLastPage) get().goToLastPage();
        }, TIMEOUT_DURATION);

        return;
      },
      handleLeftScroll: getTranslatePercentage => {
        get().enableAnimation();
        const newCurrentPage = get().currentPage - 1;

        const isFirstPage = newCurrentPage === 1;
        const isGoingLeftAfterFirstPage = newCurrentPage < 1;

        const newTranslatePercentage = getTranslatePercentage({
          direction: DIRECTION.LEFT,
          lastPageLength: get().lastPageLength,
          isFirstPage: isFirstPage && get().isLastPageVisited,
        });

        get().setTranslatePercentage(newTranslatePercentage);

        setTimeout(() => {
          get().disableAnimation();
          get().setTranslatePercentage(0);
          const canGoToPrevPage = newCurrentPage > 1;
          canGoToPrevPage ? get().goToPrevPage() : get().goToFirstPage();
          if (isGoingLeftAfterFirstPage) get().goToLastPage();
        }, TIMEOUT_DURATION);

        return;
      },
    }))
  );
