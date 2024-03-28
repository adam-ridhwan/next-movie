import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { useAtom } from 'jotai/index';

import { currentPageAtom, pagesAtom, useAtoms } from '@/app/_components/app-slider/slider-store';

type UsePaginationActions = {
  goToNextPage: () => void;
  goToPrevPage: () => void;
  resetToFirstPage: () => void;
  canGoToNextPage: boolean;
  canGoToPrevPage: boolean;
  setPage: Dispatch<SetStateAction<number>>;
};

type SetPageCallbackType = (page: number | ((page: number) => number)) => void;

export function usePagination(): [number, UsePaginationActions] {
  const { CARDS, visibleCardsTotal } = useAtoms();
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [pages] = useAtom(pagesAtom);
  const maxPage = pages.size;

  const canGoToNextPage = currentPage + 1 <= Math.ceil(CARDS.length / visibleCardsTotal);
  const canGoToPrevPage = currentPage - 1 > 0;

  const setPage = useCallback<SetPageCallbackType>(
    page => {
      // Allow value to be a function, so we have the same API as useState
      const newPage = page instanceof Function ? page(currentPage) : page;

      if (newPage >= 1 && newPage <= maxPage) {
        setCurrentPage(newPage);
        return;
      }

      throw new Error('Step not valid');
    },
    [currentPage, maxPage, setCurrentPage]
  );

  const goToNextPage = useCallback(() => {
    if (canGoToNextPage) {
      setCurrentPage(page => page + 1);
    }
  }, [canGoToNextPage, setCurrentPage]);

  const goToPrevPage = useCallback(() => {
    if (canGoToPrevPage) {
      setCurrentPage(page => page - 1);
    }
  }, [canGoToPrevPage, setCurrentPage]);

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  return [
    currentPage,
    {
      goToNextPage,
      goToPrevPage,
      canGoToNextPage,
      canGoToPrevPage,
      setPage,
      resetToFirstPage,
    },
  ];
}
