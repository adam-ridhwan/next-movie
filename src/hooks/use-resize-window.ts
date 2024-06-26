/* eslint no-restricted-imports: 0 */

import { useCallback, useEffect, useRef } from 'react';
import chalk from 'chalk';

import { logger } from '@/lib/logger';
import { usePageUtils } from '@/hooks/use-page-utils';
import { usePagination } from '@/hooks/use-pagination';
import { useResizeDirection } from '@/hooks/use-resize-direction';

const log = (label: string) => logger(chalk.bgHex('#FC86F3').black(`${label}`));

export const useResizeWindow = () => {
  const {
    state: { currentPage },
    actions: { goToFirstPage, goToMinimizedPage, goToMaximizedPage },
  } = usePagination();
  const {
    actions: { getTileCountPerPage },
  } = usePageUtils();
  const { resizeDirection } = useResizeDirection();

  const prevTilesPerPage = useRef(getTileCountPerPage());
  const prevWindowWidth = useRef(typeof window === 'undefined' ? 0 : window.innerWidth);

  const handleResize = useCallback(() => {
    const currentWidth = window.innerWidth;
    const newTileCountPerPage = getTileCountPerPage();

    if (newTileCountPerPage === prevTilesPerPage.current) return;
    log(' USE WINDOW RESIZE ');
    prevTilesPerPage.current = newTileCountPerPage;
    prevWindowWidth.current = currentWidth;

    if (currentPage === 1) return goToFirstPage();
    return resizeDirection === 'minimizing' ? goToMinimizedPage() : goToMaximizedPage();
  }, [
    currentPage,
    resizeDirection,
    getTileCountPerPage,
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
