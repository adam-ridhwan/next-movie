/* eslint no-restricted-imports: 0 */

import { useEffect, useRef } from 'react';
import chalk from 'chalk';

import { usePages } from '@/components/slider/hooks/use-pages';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useWindowResize = () => {
  const {
    state: { TILES, currentPage, pages },
    actions: { goToFirstPage, goToLastPage },
  } = usePagination();
  const { getTilesPerPage, getMaxPages } = usePages();

  const prevTilesPerPage = useRef(getTilesPerPage());

  useEffect(() => {
    console.log('currentPage', currentPage);
    const handleResize = () => {
      const tilesPerPage = getTilesPerPage();
      const maxPages = getMaxPages();

      if (tilesPerPage === prevTilesPerPage.current) return;

      console.log(chalk.bgHex('#FC86F3').black(' USE WINDOW RESIZE '));

      // const previousTiles = getMapItem({
      //   label: 'currentTilesOfPreviousMediaQuery',
      //   map: pages,
      //   key: currentPage,
      // });

      /* ────────────────────────────────────────────────────────────────────
       * RESIZING FROM 4 TILES TO 3 TILES
       *
       * FIRST PAGE
       * if the new current page is 1
       * - go to the first page
       *
       * SECOND PAGE
       * - if the current page is > 1
       * - get the previous current tiles
       * - update the new current tiles with the previous current tiles
       * - example: [1,2,3,4], [5,6,7,8] => [2,3,4], [5,6,7]
       *
       * LAST PAGE
       * if the current page is the last page
       * - get the previous current tiles
       * - update the new current tiles with the previous current tiles
       * - example: [2,3,4,5], [6,7,8,9] => [3,4,5], [6,7,8]
       * ────────────────────────────────────────────────────────────────── */

      if (currentPage === 1) goToFirstPage();
      // if (currentPage === prevMaxPages.current - 2) goToLastPage();

      prevTilesPerPage.current = tilesPerPage;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [TILES, currentPage, pages, getMaxPages, getTilesPerPage, goToFirstPage, goToLastPage]);
};
