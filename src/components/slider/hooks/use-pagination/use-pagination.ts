/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { Pages, Tile } from '@/lib/types';
import { useFirstPage } from '@/components/slider/hooks/use-pagination/use-first-page';
import { useLastPage } from '@/components/slider/hooks/use-pagination/use-last-page';
import { useMaximizedPage } from '@/components/slider/hooks/use-pagination/use-maximized-page';
import { useMinimizedPage } from '@/components/slider/hooks/use-pagination/use-minimized-page';
import { useNextPage } from '@/components/slider/hooks/use-pagination/use-next-page';
import { usePrevPage } from '@/components/slider/hooks/use-pagination/use-prev-page';

type UsePaginationReturn = {
  state: {
    TILES: Tile[];
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
    goToNextPage: () => void;
    goToPrevPage: () => void;
    goToFirstPage: () => void;
    goToLastPage: () => void;
    goToMaximizedPage: () => void;
    goToMinimizedPage: () => void;
  };
};

// IMPORTANT: Only import from UI components. Do not import from other hooks.

export const usePagination = (): UsePaginationReturn => {
  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const maxPages = useSliderStore(state => state.maxPages);

  const { goToFirstPage } = useFirstPage();
  const { goToLastPage } = useLastPage();
  const { goToNextPage } = useNextPage();
  const { goToPrevPage } = usePrevPage();
  const { goToMaximizedPage } = useMaximizedPage();
  const { goToMinimizedPage } = useMinimizedPage();

  const isFirstPage = currentPage === 1;
  const isSecondPage = currentPage === 2;
  const isLastPage = currentPage === maxPages - 2;
  const isSecondToLastPage = currentPage === maxPages - 3;

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
