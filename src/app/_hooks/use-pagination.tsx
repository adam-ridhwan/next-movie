import { useCallback, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type UsePaginationActions = {
  goToNextPage: () => void;
  goToPrevPage: () => void;
  resetToFirstPage: () => void;
  canGoToNextPage: boolean;
  canGoToPrevPage: boolean;
  setPage: Dispatch<SetStateAction<number>>;
};

type SetPageCallbackType = (page: number | ((page: number) => number)) => void;

export function usePagination(maxPage: number): [number, UsePaginationActions] {
  const [currentPage, setCurrentPage] = useState(1);

  const canGoToNextPage = currentPage + 1 <= maxPage;
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
    [maxPage, currentPage]
  );

  const goToNextPage = useCallback(() => {
    if (canGoToNextPage) {
      setCurrentPage(page => page + 1);
    }
  }, [canGoToNextPage]);

  const goToPrevPage = useCallback(() => {
    if (canGoToPrevPage) {
      setCurrentPage(page => page - 1);
    }
  }, [canGoToPrevPage]);

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

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
