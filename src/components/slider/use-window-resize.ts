import { useEffect, useRef } from 'react';
import { useSliderStore } from '@/providers/slider-provider';

import { getMapItem, getMaxPages, getTilesPerPage } from '@/lib/utils';
import { useResetToInitialPage } from '@/components/slider/use-reset-to-initial-page';

const useWindowResize = () => {
  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const tilesPerPage = useSliderStore(state => state.tilesPerPage);
  const prevTilesPerPage = useRef(tilesPerPage);

  const handleResetToInitialPage = useResetToInitialPage();

  useEffect(() => {
    const handleResize = () => {
      const newTilesPerPage = getTilesPerPage();
      const newMaxPages = getMaxPages(TILES);

      if (newTilesPerPage !== prevTilesPerPage.current) {
        prevTilesPerPage.current = newTilesPerPage;

        const previousTiles = getMapItem({
          label: 'currentTilesOfPreviousMediaQuery',
          map: pages,
          key: currentPage,
        });

        if (currentPage === 1) return handleResetToInitialPage();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage, pages]);

  //   const setPages = (previousTiles: Tile[]) => {
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

export default useWindowResize;
