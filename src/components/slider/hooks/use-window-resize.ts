import { useEffect, useRef } from 'react';

import { getMapItem, getMaxPages, getTilesPerPage } from '@/lib/utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';

export const useWindowResize = () => {
  const [{ TILES, currentPage, pages }, _, { goToFirstPage, goToLastPage }] = usePagination();

  const prevTilesPerPage = useRef(getTilesPerPage());
  const prevMaxPages = useRef(getMaxPages(TILES));

  useEffect(() => {
    const handleResize = () => {
      const tilesPerPage = getTilesPerPage();
      const maxPages = getMaxPages(TILES);

      if (tilesPerPage === prevTilesPerPage.current) return;

      const previousTiles = getMapItem({
        label: 'currentTilesOfPreviousMediaQuery',
        map: pages,
        key: currentPage,
      });

      if (currentPage === 1) goToFirstPage();
      if (currentPage === prevMaxPages.current - 2) goToLastPage();

      prevTilesPerPage.current = tilesPerPage;
      prevMaxPages.current = maxPages;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [TILES, currentPage, goToFirstPage, goToLastPage, pages]);

  //   const setAllPages = (previousTiles: Tile[]) => {
  //     log('SET PAGES AFTER RESIZE');
  //     /** ────────────────────────────────────────────────────────────────────────────────
  //      * FOUR tilesPerPage to THREE tilesPerPage - when resizing from 2nd page
  //      *  L        1           2           3        R
  //      * [9] - [1,2,3,4] - [5,6,7,8] - [9,1,2,3] - [4]
  //      * [7] -  [8,9,1]  -  [2,3,4]  -  [5,6,7]  -  [8,9,1]  - [2]
  //      *
  //      * left - 3 tiles
  //      * right - 6 tiles
  //      * ────────────────────────────────────────────────────────────────────────────── */
  //
  //     /** ────────────────────────────────────────────────────────────────────────────────
  //      * FOUR tilesPerPage to THREE tilesPerPage - when resizing from 3rd page (last page)
  //      *  L        1           2           3        R
  //      * [7] - [7,8,9,1] - [2,3,4,5] - [6,7,8,9] - [1]
  //      * [8] -  [9,1,2]  -  [3,4,5]  -  [6,7,8]  - [9]
  //      *
  //      * TODO:
  //      * ────────────────────────────────────────────────────────────────────────────── */
  //
  //     if (currentPage === 1) return handleResetToInitialPage();
  //   };
};
