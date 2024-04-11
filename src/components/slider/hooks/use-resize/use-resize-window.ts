/* eslint no-restricted-imports: 0 */

import { useCallback, useEffect, useRef } from 'react';
import chalk from 'chalk';

import { RESIZE_DIRECTION } from '@/lib/constants';
import { logger } from '@/lib/logger';
import { getMapItem } from '@/lib/utils';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import { useResizeDirection } from '@/components/slider/hooks/use-resize/use-resize-direction';

const log = (label: string) => logger(chalk.bgHex('#FC86F3').black(`${label}`));

export const useResizeWindow = () => {
  const {
    state: { currentPage, pages },
    actions: { goToFirstPage, goToMinimizedPage, goToMaximizedPage },
  } = usePagination();
  const { getTilesPerPage } = usePageUtils();
  const { resizeDirection } = useResizeDirection();

  const prevTilesPerPage = useRef(getTilesPerPage());
  const prevWindowWidth = useRef(typeof window === 'undefined' ? 0 : window.innerWidth);

  const handleResize = useCallback(() => {
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
  }, [
    pages,
    currentPage,
    resizeDirection,
    getTilesPerPage,
    goToFirstPage,
    goToMaximizedPage,
    goToMinimizedPage,
  ]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  }, [handleResize]);
};
