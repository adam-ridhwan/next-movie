import { useEffect, useRef } from 'react';
import { useSliderStore } from '@/providers/slider-provider';

import { getMapItem, log } from '@/lib/utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';

const useWindowResize = () => {
  const pages = useSliderStore(state => state.pages);

  const [currentPage, { getTilesPerPage }, { goToFirstPage }] = usePagination();

  const prevTilesPerPage = useRef(getTilesPerPage());
  useEffect(() => {
    const handleResize = () => {
      const tilesPerPage = getTilesPerPage();

      if (tilesPerPage !== prevTilesPerPage.current) {
        prevTilesPerPage.current = tilesPerPage;

        const previousTiles = getMapItem({
          label: 'currentTilesOfPreviousMediaQuery',
          map: pages,
          key: currentPage,
        });

        if (currentPage === 1) return goToFirstPage();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage, pages]);

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

export default useWindowResize;
