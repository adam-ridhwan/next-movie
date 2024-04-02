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
import currentPage from '@/components/slider/tiles/current-page';
import { GetTranslatePercentageParams } from '@/components/slider/use-translate-percentage';

const log = (string: string) =>
  // eslint-disable-next-line no-console
  DEVELOPMENT_MODE ? console.log(chalk.bgBlueBright.black(` ${string} `)) : null;

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
  setPagesAfterResize: (previousTilesTile: Tile[]) => void;
  resetPages: () => void;
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
      resetPages: () => set(() => ({ pages: new Map() })),
      markAsPaginated: () => set(() => ({ hasPaginated: true })),
      setLastPageLength: lastPageLength => set(() => ({ lastPageLength })),
      setTranslatePercentage: translatePercentage => set(() => ({ translatePercentage })),
      setCurrentPage: currentPage => set(() => ({ currentPage })),
      setIsAnimating: (isAnimating: boolean) => set(() => ({ isAnimating })),
      setInitialPages: () => {
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
        });
      },
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
      setPagesAfterResize: previousTiles => {
        set(state => {
          log('SET PAGES AFTER RESIZE');
          /** ────────────────────────────────────────────────────────────────────────────────
           * FOUR tilesPerPage to THREE tilesPerPage - when resizing from 2nd page
           *  L        1           2           3        R
           * [9] - [1,2,3,4] - [5,6,7,8] - [9,1,2,3] - [4]
           * [7] -  [8,9,1]  -  [2,3,4]  -  [5,6,7]  -  [8,9,1]  - [2]
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
           * TODO:
           * ────────────────────────────────────────────────────────────────────────────── */

          get().resetPages();
          const newMaxPages = getMaxPages(TILES);
          const newTilesPerPage = getTilesPerPage();

          const initialPages: Pages = new Map<number, Tile[]>();

          if (state.currentPage === 1) {
            // Left page placeholder
            initialPages.set(0, TILES.slice(-newTilesPerPage));

            // Middle pages
            for (let pageIndex = 1; pageIndex < newMaxPages - 1; pageIndex++) {
              const startIndex = (pageIndex - 1) * newTilesPerPage;
              const endIndex = startIndex + newTilesPerPage;
              initialPages.set(pageIndex, TILES.slice(startIndex, endIndex));
            }

            const lastPage = getMapItem({
              label: 'setInitialPages()',
              map: initialPages,
              key: newMaxPages - 2,
            });

            const tilesNeededForLastPage = newTilesPerPage - lastPage.length;
            if (tilesNeededForLastPage) {
              initialPages.set(newMaxPages - 2, [
                ...lastPage,
                ...TILES.slice(0, tilesNeededForLastPage),
              ]);
            }

            // Right page placeholder
            initialPages.set(
              newMaxPages - 1,
              TILES.slice(tilesNeededForLastPage, tilesNeededForLastPage + newTilesPerPage)
            );

            validatePagesMap({ label: 'setInitialPages()', tiles: TILES, pages: initialPages });

            return {
              pages: initialPages,
              lastPageLength: newTilesPerPage - tilesNeededForLastPage,
              maxPage: newMaxPages,
              tilesPerPage: newTilesPerPage,
              isFirstPageVisited: true,
              isMounted: true,
            };
          }

          return {};
        });
      },
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
        log('HANDLE RIGHT SCROLL');
        const state = get();
        state.enableAnimation();

        const newTranslatePercentage = getTranslatePercentage({
          direction: DIRECTION.RIGHT,
          lastPageLength: state.lastPageLength,
          isLastPage: state.currentPage + 1 === state.maxPage - 2 && state.isFirstPageVisited,
        });

        state.setTranslatePercentage(newTranslatePercentage);

        setTimeout(() => {
          state.disableAnimation();
          state.setTranslatePercentage(0);

          if (state.currentPage === state.maxPage - 3) return state.goToLastPage();
          if (state.currentPage === state.maxPage - 2) return state.goToFirstPage();
          state.goToNextPage();
        }, TIMEOUT_DURATION);

        return;
      },
      handleLeftScroll: getTranslatePercentage => {
        log('HANDLE LEFT SCROLL');

        const state = get();

        state.enableAnimation();
        const newTranslatePercentage = getTranslatePercentage({
          direction: DIRECTION.LEFT,
          lastPageLength: state.lastPageLength,
          isFirstPage: state.currentPage - 1 === 1 && state.isLastPageVisited,
        });

        state.setTranslatePercentage(newTranslatePercentage);

        setTimeout(() => {
          state.disableAnimation();
          state.setTranslatePercentage(0);

          if (state.currentPage === 2) return state.goToFirstPage();
          if (state.currentPage === 1) return state.goToLastPage();
          state.goToPrevPage();
        }, TIMEOUT_DURATION);

        return;
      },
    }))
  );
