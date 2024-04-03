/* eslint no-restricted-imports: 0 */

import { useEffect, useRef } from 'react';
import chalk from 'chalk';

import { getMapItem, log } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';

const logToConsole = (label: string) => log(chalk.bgHex('#FC86F3').black(`${label}`));

export const useWindowResize = () => {
  const {
    state: { TILES, currentPage, pages },
    actions: { goToFirstPage, goToLastPage, goToResizedPage },
  } = usePagination();
  const { getTilesPerPage, getMaxPages } = usePages();

  const prevTilesPerPage = useRef(getTilesPerPage());

  useEffect(() => {
    const handleResize = () => {
      const tilesPerPage = getTilesPerPage();

      if (tilesPerPage === prevTilesPerPage.current) return;
      logToConsole(' USE WINDOW RESIZE ');

      const previousTiles = getMapItem({
        label: 'handleResize() - previousTiles',
        map: pages,
        key: currentPage,
      });

      /* ────────────────────────────────────────────────────────────────────
       * RESIZING FROM 4 TILES TO 3 TILES
       *
       * ────── FIRST PAGE ──────
       * if the new current page is 1 => { goToFirstPage() }
       *
       *
       * ────── SECOND PAGE ──────
       * if the current page is > 1 => { goToResizedPage(previousTiles) }
       *
       * 1) get the previous current tiles
       * 2) update the new current tiles with the previous current tiles
       *
       *     PAGE 0: [6, 7, 8, 9] => PAGE 0: [8, 9, 1]
       *     PAGE 1: [1, 2, 3, 4] => PAGE 1: [2, 3, 4]
       *  -> PAGE 2: [5, 6, 7, 8] => PAGE 2: [5, 6, 7] <-
       *     PAGE 3: [9, 1, 2, 3] => PAGE 3: [8, 9, 1]
       *     PAGE 4: [4, 5, 6, 7] => PAGE 4: [2, 3, 4]
       *
       *
       * ────── LAST PAGE ──────
       * if the current page is the last page => { goToResizedPage(previousTiles) }
       *
       * 1) Get the previous current tiles
       * 2) Update the new current tiles with the previous current tiles
       *
       *     PAGE 0: [7, 8, 9, 1] => PAGE 0: [9, 1, 2]
       *     PAGE 1: [2, 3, 4, 5] => PAGE 1: [3, 4, 5]
       *  -> PAGE 2: [6, 7, 8, 9] => PAGE 2: [6, 7, 8] <-
       *     PAGE 3: [9, 1, 2, 3] => PAGE 3: [9, 1, 2]
       *     PAGE 4: [4, 5, 6, 7] => PAGE 4: [3, 4, 5]
       * ────────────────────────────────────────────────────────────────── */

      currentPage === 1 ? goToFirstPage() : goToResizedPage(previousTiles);
      prevTilesPerPage.current = tilesPerPage;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [
    TILES,
    currentPage,
    pages,
    getMaxPages,
    getTilesPerPage,
    goToFirstPage,
    goToLastPage,
    goToResizedPage,
  ]);
};

// const maxPages = getMaxPages();

// if (currentPage === prevMaxPages.current - 2) goToLastPage();
