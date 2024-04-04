/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';
import chalk from 'chalk';

import { Pages, Tile } from '@/lib/types';
import { useFirstPage } from '@/components/slider/hooks/use-pagination/use-first-page';
import { useLastPage } from '@/components/slider/hooks/use-pagination/use-last-page';
import { useMaximizedPage } from '@/components/slider/hooks/use-pagination/use-maximized-page';
import { useMinimizedPage } from '@/components/slider/hooks/use-pagination/use-minimized-page';
import { useNextPage } from '@/components/slider/hooks/use-pagination/use-next-page';
import { usePrevPage } from '@/components/slider/hooks/use-pagination/use-prev-page';

const bold = (text: string) => chalk.underline.bold(text);
const GO_TO = ' GO TO';
const PAGE = 'PAGE ';
const VIEW = ' VIEW';

export const usePaginationLogger = {
  first: () => console.log(chalk.bgGreenBright.black(GO_TO, bold('FIRST'), PAGE)),
  last: () => console.log(chalk.bgBlueBright.black(GO_TO, bold('LAST'), PAGE)),
  next: () => console.log(chalk.bgYellowBright.black(GO_TO, bold('NEXT'), PAGE)),
  prev: () => console.log(chalk.bgMagentaBright.black(GO_TO, bold('PREV'), PAGE)),
  maximized: () => console.log(chalk.bgCyanBright.black(VIEW, bold('MAXIMIZED'), '')),
  minimized: () => console.log(chalk.bgRedBright.black(VIEW, bold('MINIMIZED'), '')),
};

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
    goToMaximizedPage: (prevTiles: Tile[]) => void;
    goToMinimizedPage: (prevTiles: Tile[]) => void;
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

  const { goToFirstPage } = useFirstPage();
  const { goToLastPage } = useLastPage();
  const { goToNextPage } = useNextPage();
  const { goToPrevPage } = usePrevPage();
  const { goToMaximizedPage } = useMaximizedPage();
  const { goToMinimizedPage } = useMinimizedPage();

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
      goToMaximizedPage,
      goToMinimizedPage,
    },
  };
};
