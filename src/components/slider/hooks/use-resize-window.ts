/* eslint no-restricted-imports: 0 */

import { useEffect, useRef } from 'react';
import chalk from 'chalk';

import { RESIZE_DIRECTION } from '@/lib/constants';
import { getMapItem, logger } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import { useResizeDirection } from '@/components/slider/hooks/use-resize-direction';

const log = (label: string) => logger(chalk.bgHex('#FC86F3').black(`${label}`));

export const useResizeWindow = () => {
  const {
    state: { TILES, currentPage, pages },
    actions: { goToFirstPage, goToLastPage, goToMinimizedPage, goToMaximizedPage },
  } = usePagination();
  const { getTilesPerPage, getMaxPages } = usePages();
  const { resizeDirection } = useResizeDirection();

  const prevTilesPerPage = useRef(getTilesPerPage());
  const prevWindowWidth = useRef(typeof window === 'undefined' ? 0 : window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const tilesPerPage = getTilesPerPage();

      if (tilesPerPage === prevTilesPerPage.current) return;
      prevTilesPerPage.current = tilesPerPage;

      log(' USE WINDOW RESIZE ');

      const prevPage = getMapItem({
        label: 'handleResize() - prevPage',
        map: pages,
        key: currentPage,
      });

      if (currentPage === 1) {
        goToFirstPage();
      } else {
        resizeDirection === RESIZE_DIRECTION.MINIMIZING
          ? goToMinimizedPage(prevPage)
          : goToMaximizedPage(prevPage);
      }

      prevWindowWidth.current = currentWidth;
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
    goToMinimizedPage,
  ]);
};
