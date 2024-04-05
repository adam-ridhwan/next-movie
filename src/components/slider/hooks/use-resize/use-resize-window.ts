/* eslint no-restricted-imports: 0 */

import { useEffect, useRef } from 'react';
import chalk from 'chalk';

import { RESIZE_DIRECTION } from '@/lib/constants';
import { logger } from '@/lib/logger';
import { getMapItem } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import { useResizeDirection } from '@/components/slider/hooks/use-resize/use-resize-direction';

const log = (label: string) => logger(chalk.bgHex('#FC86F3').black(`${label}`));

export const useResizeWindow = () => {
  const {
    state: { TILES, currentPage, pages },
    actions: { goToFirstPage, goToLastPage, goToMinimizedPage, goToMaximizedPage },
  } = usePagination();
  const { getTilesPerPage } = usePages();
  const { resizeDirection } = useResizeDirection();

  const prevTilesPerPage = useRef(getTilesPerPage());
  const prevWindowWidth = useRef(typeof window === 'undefined' ? 0 : window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      /*
       * TODO: When using shortcut to adjust the window size, it breaks the slider.
       *  The component getting the error is the right placeholder component.
       *  1) To replicate: Minimize the browser until there is only 2 tiles per page.
       *  2) Then, use keyboard shortcut to adjust the browser, there should be 4 tiles per page.
       *  3) The right placeholder component will break.
       */
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
    resizeDirection,

    getTilesPerPage,
    goToFirstPage,
    goToLastPage,
    goToMinimizedPage,
    goToMaximizedPage,
  ]);
};
