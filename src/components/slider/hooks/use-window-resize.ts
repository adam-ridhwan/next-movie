/* eslint no-restricted-imports: 0 */

import { useEffect, useRef } from 'react';
import chalk from 'chalk';

import { getMapItem, logger } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';

const log = (label: string) => logger(chalk.bgHex('#FC86F3').black(`${label}`));

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
      log(' USE WINDOW RESIZE ');

      const prevPage = getMapItem({
        label: 'handleResize() - prevPage',
        map: pages,
        key: currentPage,
      });

      currentPage === 1 ? goToFirstPage() : goToResizedPage(prevPage);
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
