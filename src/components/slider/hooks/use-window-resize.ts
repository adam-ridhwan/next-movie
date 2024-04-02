/* eslint no-restricted-imports: 0 */

import { useEffect, useRef } from 'react';

import { usePagination } from '@/components/slider/hooks/use-pagination';

export const useWindowResize = () => {
  const [
    { TILES, currentPage, pages },
    { getTilesPerPage, getMaxPages },
    { goToFirstPage, goToLastPage },
  ] = usePagination();

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
