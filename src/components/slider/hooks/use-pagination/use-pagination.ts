/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { Pages } from '@/lib/types';
import { Movie } from '@/lib/zod-types.ts/modelSchema/MovieSchema';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { useMapPages } from '@/components/slider/hooks/use-pagination/use-map-pages';
import { useMaximizedPage } from '@/components/slider/hooks/use-pagination/use-maximized-page';
import { useMinimizedPage } from '@/components/slider/hooks/use-pagination/use-minimized-page';

type UsePaginationReturn = {
  state: {
    TILES: Movie[];
    pages: Pages;
    currentPage: number;
    maxPages: number;
  };
  status: {
    isFirstPage: boolean;
    isSecondPage: boolean;
    isLastPage: boolean;
    isSecondToLastPage: boolean;
  };
  actions: {
    goToFirstPage: () => void;
    goToLastPage: () => void;
    goToPrevPage: () => void;
    goToNextPage: () => void;
    goToMaximizedPage: () => void;
    goToMinimizedPage: () => void;
  };
};

// IMPORTANT: Only import from UI components. Do not import from other hooks.
export const usePagination = (): UsePaginationReturn => {
  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const setCurrentPage = useSliderStore(state => state.setCurrentPage);
  const maxPages = useSliderStore(state => state.maxPages);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);

  const { setMapPages } = useMapPages();
  const { getTileCountPerPage } = usePageUtils();

  const { goToMaximizedPage } = useMaximizedPage();
  const { goToMinimizedPage } = useMinimizedPage();

  const isFirstPage = currentPage === 1;
  const isSecondPage = currentPage === 2;
  const isLastPage = currentPage === maxPages - 2;
  const isSecondToLastPage = currentPage === maxPages - 3;

  const goToFirstPage = () => {
    usePaginationLogger.first();
    setMapPages({
      firstTileCurrentPageIndex: 0,
      isFirstPage: true,
    });
  };

  const goToLastPage = () => {
    usePaginationLogger.last();
    setMapPages({
      firstTileCurrentPageIndex: TILES.length - getTileCountPerPage(),
      isLastPage: true,
    });
  };

  const goToNextPage = () => {
    usePaginationLogger.next();
    if (!hasPaginated) markAsPaginated();
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    usePaginationLogger.prev();
    setCurrentPage(currentPage - 1);
  };

  return {
    state: {
      TILES,
      currentPage,
      pages,
      maxPages,
    },
    status: {
      isFirstPage,
      isSecondPage,
      isLastPage,
      isSecondToLastPage,
    },
    actions: {
      goToFirstPage,
      goToLastPage,
      goToPrevPage,
      goToNextPage,
      goToMaximizedPage,
      goToMinimizedPage,
    },
  };
};
