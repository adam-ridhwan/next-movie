import { usePaginationLogger } from '@/lib/logger';

export const useMaximizedPage = () => {
  /** ────────────────────────────────────────────────────────────────────
   * From 3 tiles to 4 tiles per page (maximizing)
   *
   * 2nd page: -
   *     page 0: [7, 8, 9] => page 0: [5, 6, 7, 8]
   *     page 1: [1, 2, 3] => page 1: [9, 1, 2, 3]
   *  -> PAGE 2: [4, 5, 6] => PAGE 2: [4, 5, 6, 7] <- currentPage
   *     page 3: [7, 8, 9] => page 3: [8, 9, 1, 2]
   *     page 4: [1, 2, 3] => page 4: [3, 4, 5, 6]
   *
   * 3rd page: -
   *     page 0: [7, 8, 9] => page 0: [4, 5, 6, 7]
   *     page 1: [1, 2, 3] => page 1: [8, 9, 1, 2]
   *     page 2: [4, 5, 6] => page 2: [3, 4, 5, 6]
   *  -> PAGE 3: [7, 8, 9] => PAGE 3: [7, 8, 9, _] <- currentPage
   *     page 4: [1, 2, 3] => page 4: [1, 2, 3, 4]
   *
   * continue maximizing...
   * From 4 tiles to 5 tiles per page (maximizing)
   *
   * 3rd page:-
   *     page 0: [4, 5, 6, 7] => page 0: [1, 2, 3, 4, 5]
   *     page 1: [8, 9, 1, 2] => page 1: [6, 7, 8, 9, 1]
   *     page 2: [3, 4, 5, 6] => page 2: [2, 3, 4, 5, 6]
   *     PAGE 3: [7, 8, 9, 1] => PAGE 3: [7, 8, 9, _, _]
   *     page 4: [2, 3, 4, 5] => page 4: [1, 2, 3, 4, 5]
   * ────────────────────────────────────────────────────────────────── */

  const goToMaximizedPage = () => {
    usePaginationLogger.maximized();
  };
  return { goToMaximizedPage };
};
