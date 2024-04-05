/* eslint no-restricted-imports: 0 */

import { usePaginationLogger } from '@/lib/logger';

export const useMaximizedPage = () => {
  /** ─────────────────────────────────────────────────────────────────
   *     From [3] tiles to [4] tiles per page
   * ──────────────────────────────────────────────────────────────────
   *
   *     page 0: [7, 8, 9] => page 0: [5, 6, 7, 8]
   *     page 1: [1, 2, 3] => page 1: [9, 1, 2, 3]
   *  -> PAGE 2: [4, 5, 6] => PAGE 2: [4, 5, 6, 7] <-
   *     page 3: [7, 8, 9] => page 3: [8, 9, 1, 2]
   *     page 4: [1, 2, 3] => page 4: [3, 4, 5, 6]
   *
   *     continue maximizing...
   *
   *     page 0: [5, 6, 7, 8] => page 0: [3, 4, 5, 6, 7]
   *     page 1: [9, 1, 2, 3] => page 1: [8, 9, 1, 2, 3]
   *  -> PAGE 2: [4, 5, 6, 7] => PAGE 2: [4, 5, 6, 7, 8] <-
   *     page 3: [8, 9, 1, 2] => page 3: [9, 1, 2, 3, 4]
   *     page 4: [3, 4, 5, 6] => page 4: [5, 6, 7, 8, 9]
   *
   *     continue maximizing...
   *
   *     page 0: [3, 4, 5, 6, 7] => page 0: [1, 2, 3, 4, 5, 6]
   *     page 1: [8, 9, 1, 2, 3] => page 1: [7, 8, 9, 1, 2, 3]
   *  -> PAGE 2: [4, 5, 6, 7, 8] => PAGE 2: [4, 5, 6, 7, 8, 9] <-
   *     page 3: [9, 1, 2, 3, 4] => page 3: [1, 2, 3, 4, 5, 6]
   *     page 4: [5, 6, 7, 8, 9]
   *
   * ──────────────────────────────────────────────────────────────────
   *
   *     page 0: [7, 8, 9] => page 0: [3, 4, 5, 6]
   *     page 1: [1, 2, 3] => page 1: [7, 8, 9, 1]
   *     page 2: [4, 5, 6] => page 2: [2, 3, 4, 5]
   *  -> PAGE 3: [7, 8, 9] => PAGE 3: [6, 7, 8, 9] <-
   *     page 4: [1, 2, 3] => page 4: [1, 2, 3, 4]
   *
   *     continue maximizing...
   *
   *     page 0: [3, 4, 5, 6] => page 0: [8, 9, 1, 2, 3]
   *     page 1: [7, 8, 9, 1] => page 1: [4, 5, 6, 7, 8]
   *     page 2: [2, 3, 4, 5] => page 2: [9, 1, 2, 3, 4]
   *  -> PAGE 3: [6, 7, 8, 9] => PAGE 3: [5, 6, 7, 8, 9] <-
   *     page 4: [1, 2, 3, 4] => page 4: [1, 2, 3, 4, 5]
   *
   * ────────────────────────────────────────────────────────────────── */

  const goToMaximizedPage = () => {
    usePaginationLogger.maximized();
  };
  return { goToMaximizedPage };
};
