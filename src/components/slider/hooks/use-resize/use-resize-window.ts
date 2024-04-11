/* eslint no-restricted-imports: 0 */

import { useCallback, useEffect, useRef } from 'react';
import chalk from 'chalk';

import { RESIZE_DIRECTION } from '@/lib/constants';
import { logger } from '@/lib/logger';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import { useResizeDirection } from '@/components/slider/hooks/use-resize/use-resize-direction';

const log = (label: string) => logger(chalk.bgHex('#FC86F3').black(`${label}`));

export const useResizeWindow = () => {
  const {
    state: { currentPage },
    actions: { goToFirstPage, goToMinimizedPage, goToMaximizedPage },
  } = usePagination();
  const { getTilesPerPage } = usePageUtils();
  const { resizeDirection } = useResizeDirection();

  const prevTilesPerPage = useRef(getTilesPerPage());
  const prevWindowWidth = useRef(typeof window === 'undefined' ? 0 : window.innerWidth);

  const handleResize = useCallback(() => {
    const currentWidth = window.innerWidth;
    const newTilesPerPage = getTilesPerPage();

    if (newTilesPerPage === prevTilesPerPage.current) return;
    log(' USE WINDOW RESIZE ');
    prevTilesPerPage.current = newTilesPerPage;
    prevWindowWidth.current = currentWidth;

    if (currentPage === 1) return goToFirstPage();
    return resizeDirection === RESIZE_DIRECTION.MINIMIZING ? goToMinimizedPage() : goToMaximizedPage();
  }, [currentPage, resizeDirection, getTilesPerPage, goToFirstPage, goToMaximizedPage, goToMinimizedPage]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  }, [handleResize]);
};
