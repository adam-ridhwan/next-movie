import chalk from 'chalk';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { DEVELOPMENT_MODE, DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { Pages, Tile } from '@/lib/types';
import {
  findIndexFromKey,
  getMapItem,
  getMaxPages,
  getTilesPerPage,
  validatePagesMap,
} from '@/lib/utils';

export const log = (string: string) =>
  // eslint-disable-next-line no-console
  DEVELOPMENT_MODE ? console.log(chalk.bgBlueBright.black(` ${string} `)) : null;

type SetPagesAfterResizeParams = {
  pages: Pages;
  tilesPerPage: number;
  maxPage: number;
  lastPageLength: number;
  isFirstPageVisited: boolean;
};

type State = {
  TILES: Tile[];
  pages: Pages;
  maxPage: number;
  currentPage: number;
  tilesPerPage: number;
  firstPageLength: number;
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
  setPagesAfterResize: ({
    pages,
    tilesPerPage,
    maxPage,
    lastPageLength,
    isFirstPageVisited,
  }: SetPagesAfterResizeParams) => void;
  resetPages: () => void;
  setTilesPerPage: (tilesPerPage: number) => void;
  setLastPageLength: (lastPageLength: number) => void;
  setTranslatePercentage: (translatePercentage: number) => void;
  markAsPaginated: () => void;
  setIsAnimating: (isAnimating: boolean) => void;
  enableAnimation: () => void;
  disableAnimation: () => void;
};

export type SliderStore = State & Actions;

export const createSliderStore = (TILES: Tile[]) =>
  create(
    devtools<SliderStore>((set, get) => ({
      TILES: TILES,
      pages: new Map<number, Tile[]>().set(1, TILES.slice(0, 7)),
      maxPage: getMaxPages(TILES),
      tilesPerPage: getTilesPerPage(),
      currentPage: 1,
      hasPaginated: false,
      isAnimating: false,
      isFirstPageVisited: false,
      isLastPageVisited: false,
      firstPageLength: 0,
      lastPageLength: 0,
      translatePercentage: 0,
      isMounted: false,

      setTilesPerPage: tilesPerPage => set(() => ({ tilesPerPage })),
      goToNextPage: () =>
        set(state => {
          log('GO TO NEXT PAGE');
          return state.hasPaginated
            ? { currentPage: state.currentPage + 1 }
            : { currentPage: state.currentPage + 1, hasPaginated: true };
        }),
      goToPrevPage: () =>
        set(state => {
          log('GO TO PREVIOUS PAGE');
          return { currentPage: state.currentPage - 1 };
        }),
      setPagesAfterResize: ({ pages, tilesPerPage, maxPage }) =>
        set(() => {
          return { pages, tilesPerPage, maxPage };
        }),
      resetPages: () => set(() => ({ pages: new Map() })),
      markAsPaginated: () => set(() => ({ hasPaginated: true })),
      setLastPageLength: lastPageLength => set(() => ({ lastPageLength })),
      setTranslatePercentage: translatePercentage => set(() => ({ translatePercentage })),
      setCurrentPage: currentPage => set(() => ({ currentPage })),
      setIsAnimating: (isAnimating: boolean) => set(() => ({ isAnimating })),
      setInitialPages: () =>
        set(state => {
          const initialPages: Pages = new Map<number, Tile[]>();

          // Left page placeholder
          initialPages.set(0, TILES.slice(-state.tilesPerPage));

          // Middle pages
          for (let pageIndex = 1; pageIndex < state.maxPage; pageIndex++) {
            const startIndex = (pageIndex - 1) * state.tilesPerPage;
            const endIndex = startIndex + state.tilesPerPage;
            initialPages.set(pageIndex, TILES.slice(startIndex, endIndex));
          }

          const lastPage = getMapItem({
            label: 'setInitialPages()',
            map: initialPages,
            key: state.maxPage - 2,
          });

          const tilesNeededForLastPage = state.tilesPerPage - lastPage.length;
          if (tilesNeededForLastPage) {
            initialPages.set(state.maxPage - 2, [
              ...lastPage,
              ...TILES.slice(0, tilesNeededForLastPage),
            ]);
          }

          // Right page placeholder
          initialPages.set(
            state.maxPage - 1,
            TILES.slice(tilesNeededForLastPage, state.tilesPerPage + tilesNeededForLastPage)
          );

          validatePagesMap({ label: 'setInitialPages()', tiles: TILES, pages: initialPages });

          return {
            pages: initialPages,
            lastPageLength: state.tilesPerPage - tilesNeededForLastPage,
            isFirstPageVisited: true,
            isMounted: true,
          };
        }),
      goToFirstPage: () =>
        set(state => {
          log('GO TO FIRST PAGE');

          state.setInitialPages();
          return { currentPage: 1 };
        }),
      goToLastPage: () =>
        set(state => {
          log('GO TO LAST PAGE');

          const newPages: Pages = new Map<number, Tile[]>();

          // Right page placeholder
          newPages.set(state.maxPage - 1, TILES.slice(0, state.tilesPerPage));

          // Middle pages
          let endIndex = TILES.length;
          let startIndex = TILES.length - state.tilesPerPage;
          const middlePagesLength = state.maxPage - 2;
          for (let i = middlePagesLength; i > 0; i--) {
            newPages.set(i, TILES.slice(Math.max(0, startIndex), endIndex));
            startIndex -= state.tilesPerPage;
            endIndex -= state.tilesPerPage;
          }

          const firstPage = getMapItem({
            label: 'goToLastPage()',
            map: newPages,
            key: 1,
          });

          const totalTilesNeededToComplete = state.tilesPerPage - firstPage.length;
          if (totalTilesNeededToComplete) {
            newPages.set(1, [...TILES.slice(-totalTilesNeededToComplete), ...firstPage]);
          }

          // Left page placeholder
          const firstItem = TILES.slice(-totalTilesNeededToComplete)[0];
          let firstItemIndex =
            findIndexFromKey({
              label: 'Left page placeholder goToLastPage()',
              array: TILES,
              key: 'id',
              value: firstItem.id,
            }) - 1;

          const leftArray = [];
          for (let i = 0; i < state.tilesPerPage; i++) {
            if (firstItemIndex < 0) firstItemIndex = TILES.length - 1;
            leftArray.unshift(TILES[firstItemIndex--]);
          }

          newPages.set(0, leftArray);

          validatePagesMap({ label: 'goToLastPage()', tiles: TILES, pages: newPages });

          return {
            pages: newPages,
            currentPage: state.maxPage - 2,
            isFirstPageVisited: false,
            isLastPageVisited: true,
            hasPaginated: true,
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
    }))
  );
