/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { findIndexFromKey, getMapItem } from '@/lib/utils';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { useMapPages } from '@/components/slider/hooks/use-pagination/use-map-pages';

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
   *     continue maximizing...
   *
   *     page 0: [8, 9, 1, 2, 3] => page 0: [4, 5, 6, 7, 8, 9]
   *     page 1: [4, 5, 6, 7, 8] => page 1: [1, 2, 3, 4, 5, 6]
   *     page 2: [9, 1, 2, 3, 4] => page 2: [7, 8, 9, 1, 2, 3]
   *  -> PAGE 3: [5, 6, 7, 8, 9] => PAGE 3: [4, 5, 6, 7, 8, 9] <-
   *     page 4: [1, 2, 3, 4, 5]
   *
   * ────────────────────────────────────────────────────────────────── */

  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const maxPages = useSliderStore(state => state.maxPages);
  const currentPage = useSliderStore(state => state.currentPage);
  const currentTilesPerPage = useSliderStore(state => state.tilesPerPage);
  const { setMapTiles } = useMapPages();
  const { getTilesPerPage } = usePageUtils();

  const goToMaximizedPage = () => {
    usePaginationLogger.maximized();

    const firstTileCurrentPage = getMapItem({
      label: 'goToMaximizedPage(): firstTileCurrentPage',
      map: pages,
      key: currentPage,
    })[0];

    const firstTileCurrentPageIndex = findIndexFromKey({
      label: 'goToMaximizedPage(): firstTileCurrentPageIndex',
      array: TILES,
      key: 'id',
      value: firstTileCurrentPage.id,
    });

    const tilesToDecrement = getTilesPerPage() - currentTilesPerPage;

    const index =
      currentPage === maxPages - 2
        ? firstTileCurrentPageIndex - tilesToDecrement
        : firstTileCurrentPageIndex;

    setMapTiles({ firstTileCurrentPage, firstTileCurrentPageIndex: index });
  };
  return { goToMaximizedPage };
};
