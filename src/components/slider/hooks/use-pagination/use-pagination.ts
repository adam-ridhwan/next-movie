/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';
import chalk from 'chalk';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { Pages, Tile } from '@/lib/types';
import { useGoToFirstPage } from '@/components/slider/hooks/use-pagination/use-go-to-first-page';
import { useGoToLastPage } from '@/components/slider/hooks/use-pagination/use-go-to-last-page';
import { useGoToNextPage } from '@/components/slider/hooks/use-pagination/use-go-to-next-page';
import { useGoToPrevPage } from '@/components/slider/hooks/use-pagination/use-go-to-prev-page';

export const logToConsoleUsePagination = (string: string) =>
  DEVELOPMENT_MODE
    ? console.log(chalk.bgGreenBright.black(' GO TO', chalk.underline.bold(`${string}`), 'PAGE '))
    : null;

type UsePaginationReturn = {
  state: {
    TILES: Tile[];
    pages: Pages;
    currentPage: number;
  };
  status: {
    isFirstPageVisited: boolean;
    isLastPageVisited: boolean;
    hasPaginated: boolean;
    isMounted: boolean;
  };
  actions: {
    goToNextPage: () => void;
    goToPrevPage: () => void;
    goToFirstPage: () => void;
    goToLastPage: () => void;
  };
};

export const usePagination = (): UsePaginationReturn => {
  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);

  const isFirstPageVisited = useSliderStore(state => state.isFirstPageVisited);
  const isLastPageVisited = useSliderStore(state => state.isLastPageVisited);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const isMounted = useSliderStore(state => state.isMounted);

  const { goToFirstPage } = useGoToFirstPage();
  const { goToLastPage } = useGoToLastPage();
  const { goToNextPage } = useGoToNextPage();
  const { goToPrevPage } = useGoToPrevPage();

  return {
    state: {
      TILES,
      currentPage,
      pages,
    },
    status: {
      isFirstPageVisited,
      isLastPageVisited,
      hasPaginated,
      isMounted,
    },
    actions: {
      goToFirstPage,
      goToLastPage,
      goToPrevPage,
      goToNextPage,
    },
  };
};
