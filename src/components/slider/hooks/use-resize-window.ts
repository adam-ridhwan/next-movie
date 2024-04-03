/* eslint no-restricted-imports: 0 */

import { useEffect, useRef } from 'react';
import chalk from 'chalk';

import { getMapItem, logger } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import { useResizeDirection } from '@/components/slider/hooks/use-resize-direction';

const log = (label: string) => logger(chalk.bgHex('#FC86F3').black(`${label}`));

export const useResizeWindow = () => {
  const {
    state: { TILES, currentPage, pages },
    actions: { goToFirstPage, goToLastPage, goToResizedPage },
  } = usePagination();
  const { getTilesPerPage, getMaxPages } = usePages();
  const { resizeDirection } = useResizeDirection();

  const prevTilesPerPage = useRef(getTilesPerPage());
  const prevWindowWidth = useRef(typeof window === 'undefined' ? 0 : window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const tilesPerPage = getTilesPerPage();
      console.log('resizeDirection:', resizeDirection);

      if (tilesPerPage === prevTilesPerPage.current) return;
      prevTilesPerPage.current = tilesPerPage;

      log(' USE WINDOW RESIZE ');

      const prevPage = getMapItem({
        label: 'handleResize() - prevPage',
        map: pages,
        key: currentPage,
      });

      currentPage === 1 ? goToFirstPage() : goToResizedPage(prevPage);
      prevWindowWidth.current = currentWidth;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [
    TILES,
    resizeDirection,
    currentPage,
    pages,
    getMaxPages,
    getTilesPerPage,
    goToFirstPage,
    goToLastPage,
    goToResizedPage,
  ]);
};
