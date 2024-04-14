/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { findIndexFromKey, getMapItem } from '@/lib/utils';
import { useMapPages } from '@/components/slider/hooks/use-pagination/use-map-pages';

export const useMinimizedPage = () => {
  /** ─────────────────────────────────────────────────────────────────
   *     From [4] tiles to [3] tiles per page
   * ──────────────────────────────────────────────────────────────────
   *
   *     page 0: [6, 7, 8, 9] => page 0: [5, 6, 7]
   *     page 1: [1, 2, 3, 4] => page 1: [8, 9, 1]
   *  -> PAGE 2: [5, 6, 7, 8] => page 2: [2, 3, 4]
   *     page 3: [9, 1, 2, 3] => PAGE 3: [5, 6, 7] <-
   *     page 4: [4, 5, 6, 7] => page 4: [8, 9, 1]
   *                          => page 5: [2, 3, 4]
   *
   *     continue minimizing...
   *
   *     page 0: [5, 6, 7] => page 0: [8, 9]
   *     page 1: [8, 9, 1] => page 1: [1, 2]
   *     page 2: [2, 3, 4] => page 2: [3, 4]
   *  -> PAGE 3: [5, 6, 7] => PAGE 3: [5, 6] <-
   *     page 4: [8, 9, 1] => page 4: [7, 8]
   *     page 5: [2, 3, 4] => page 5: [9, 1]
   *                       => page 6: [2, 3]
   *
   * ──────────────────────────────────────────────────────────────────
   *
   *     page 0: [3, 4, 5, 6] => page 0: [6, 7, 8]
   *     page 1: [7, 8, 9, 1] => page 1: [9, 1, 2]
   *     page 2: [2, 3, 4, 5] => page 2: [3, 4, 5]
   * ->  PAGE 3: [6, 7, 8, 9] => PAGE 3: [6, 7, 8] <-
   *     page 4: [1, 2, 3, 4] => page 4: [9, 1, 2]
   *                          => page 5: [3, 4, 5]
   *
   *     continue minimizing...
   *
   *     page 0: [6, 7, 8] => page 0: [7, 8]
   *     page 1: [9, 1, 2] => page 1: [9, 1]
   *     page 2: [3, 4, 5] => page 2: [2, 3]
   * ->  PAGE 3: [6, 7, 8] => page 3: [4, 5]
   *     page 4: [9, 1, 2] => PAGE 4: [6, 7] <-
   *     page 5: [3, 4, 5] => page 5: [8, 9]
   *                       => page 6: [1, 2]
   *
   * ────────────────────────────────────────────────────────────────── */

  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const { setMapPages } = useMapPages();

  const goToMinimizedPage = () => {
    usePaginationLogger.minimized();

    const firstTileCurrentPage = getMapItem({
      label: 'goToMinimizedPage(): firstTileCurrentPage',
      map: pages,
      key: currentPage,
    })[0];

    const firstTileCurrentPageIndex = findIndexFromKey({
      label: 'goToMinimizedPage(): firstTileCurrentPageIndex',
      array: TILES,
      key: 'id',
      value: firstTileCurrentPage.id,
    });

    setMapPages({
      firstTileCurrentPage,
      firstTileCurrentPageIndex,
    });
  };

  return { goToMinimizedPage };
};
