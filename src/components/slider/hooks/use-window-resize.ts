import { useEffect, useRef } from 'react';
import chalk from 'chalk';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { getMapItem, log } from '@/lib/utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';

export const logWindowResize = (string: string) =>
  // eslint-disable-next-line no-console
  DEVELOPMENT_MODE ? console.log(chalk.bgYellow.black(` ${string} `)) : null;

export const useWindowResize = () => {
  const [
    { TILES, currentPage, pages },
    { getTilesPerPage, getMaxPages },
    { goToFirstPage, goToLastPage },
  ] = usePagination();

  // const prevCurrentPage = useRef(currentPage);
  const prevTilesPerPage = useRef(getTilesPerPage());
  // const prevMaxPages = useRef(getMaxPages());

  useEffect(() => {
    const handleResize = () => {
      const tilesPerPage = getTilesPerPage();
      const maxPages = getMaxPages();

      if (tilesPerPage === prevTilesPerPage.current) return;
      log('RESIZE');

      const previousTiles = getMapItem({
        label: 'currentTilesOfPreviousMediaQuery',
        map: pages,
        key: currentPage,
      });

      console.log('currentPage:', currentPage, 'maxPages', maxPages, 'tilesPerPage', tilesPerPage);

      if (currentPage === 1) goToFirstPage();
      if (currentPage === maxPages - 2) goToLastPage();

      logWindowResize('NOT FIRST/LAST PAGE');
      prevTilesPerPage.current = tilesPerPage;
      console.log('previousTiles:', previousTiles);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [TILES, currentPage, getMaxPages, getTilesPerPage, goToFirstPage, goToLastPage, pages]);
};
