/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { Movie, Pages } from '@/lib/types';
import { useMapPages } from '@/components/slider/hooks/use-map-pages';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';

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

export const usePagination = (): UsePaginationReturn => {
  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const setCurrentPage = useSliderStore(state => state.setCurrentPage);
  const tileCountPerPage = useSliderStore(state => state.tileCountPerPage);
  const lastPageLength = useSliderStore(state => state.lastPageLength);
  const maxPages = useSliderStore(state => state.maxPages);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);

  const { setMapPages } = useMapPages();
  const {
    actions: { getTileCountPerPage, findIndexByKey, getMapValue },
  } = usePageUtils();

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

  // Visuals: https://www.notion.so/useMinimizedPage-bb19b5abfc4a4c6585f397d5c26b627d?pvs=4
  const goToMinimizedPage = () => {
    usePaginationLogger.minimized();

    const [firstTileCurrentPage] = getMapValue({
      label: 'goToMinimizedPage(): firstTileCurrentPage',
      map: pages,
      key: currentPage,
    });

    const firstTileCurrentPageIndex = findIndexByKey({
      label: 'goToMinimizedPage(): firstTileCurrentPageIndex',
      array: TILES,
      key: 'id',
      value: firstTileCurrentPage.id,
    });

    setMapPages({ firstTileCurrentPageIndex });
  };

  // Visuals: https://www.notion.so/useMaximizedPage-2b1d82d0e1df40bdaa22d5b49b65e4a5?pvs=4
  const goToMaximizedPage = () => {
    usePaginationLogger.maximized();

    const [firstTileCurrentPage] = getMapValue({
      label: 'goToMaximizedPage(): firstTileCurrentPage',
      map: pages,
      key: currentPage,
    });

    const firstTileCurrentPageIndex = findIndexByKey({
      label: 'goToMaximizedPage(): firstTileCurrentPageIndex',
      array: TILES,
      key: 'id',
      value: firstTileCurrentPage.id,
    });

    const tilesToDecrement = getTileCountPerPage() - tileCountPerPage;
    const isLastPage = currentPage === maxPages - 2;
    const isSecondToLastPage = currentPage === maxPages - 3;

    if (isLastPage) {
      const indexForLastPage = firstTileCurrentPageIndex - tilesToDecrement;
      return setMapPages({ firstTileCurrentPageIndex: indexForLastPage });
    }

    if (isSecondToLastPage) {
      const indexForSecondToLastPage =
        lastPageLength >= tilesToDecrement
          ? firstTileCurrentPageIndex
          : firstTileCurrentPageIndex - tilesToDecrement + lastPageLength;
      return setMapPages({ firstTileCurrentPageIndex: indexForSecondToLastPage });
    }

    setMapPages({ firstTileCurrentPageIndex });
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
