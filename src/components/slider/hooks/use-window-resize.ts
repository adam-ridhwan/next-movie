/* eslint no-restricted-imports: 0 */

import { useEffect, useRef } from 'react';

import { usePages } from '@/components/slider/hooks/use-pages';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useWindowResize = () => {
  const {
    state: { TILES, currentPage, pages },
    actions: { goToFirstPage, goToLastPage },
  } = usePagination();
  const { getTilesPerPage, getMaxPages } = usePages();

  const prevTilesPerPage = useRef(getTilesPerPage());
  const prevMaxPages = useRef(getMaxPages());

  useEffect(() => {
    const handleResize = () => {
      const tilesPerPage = getTilesPerPage();
      const maxPages = getMaxPages();

      if (tilesPerPage === prevTilesPerPage.current) return;

      // const previousTiles = getMapItem({
      //   label: 'currentTilesOfPreviousMediaQuery',
      //   map: pages,
      //   key: currentPage,
      // });

      if (currentPage === 1) goToFirstPage();
      if (currentPage === prevMaxPages.current - 2) goToLastPage();

      prevTilesPerPage.current = tilesPerPage;
      prevMaxPages.current = maxPages;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [TILES, currentPage, getMaxPages, getTilesPerPage, goToFirstPage, goToLastPage, pages]);
};
