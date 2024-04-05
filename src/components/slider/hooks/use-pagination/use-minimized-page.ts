/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { Pages, Tile } from '@/lib/types';
import { findIndexFromKey, getMapItem } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { useValidators } from '@/components/slider/hooks/use-validators';

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
  const setAllPages = useSliderStore(state => state.setAllPages);
  const currentPage = useSliderStore(state => state.currentPage);
  const { validatePages } = useValidators();
  const { getTilesPerPage, getTotalTiles } = usePages();

  // TODO: Extract this to a reusable helper function
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

    const newPages: Pages = new Map<number, Tile[]>();
    const newTilesPerPage = getTilesPerPage();
    let newFirstPageLength = newTilesPerPage;
    let newLastPageLength = newTilesPerPage;

    const leftTilesTotal = getTotalTiles(firstTileCurrentPageIndex / newTilesPerPage);
    const rightTilesTotal = getTotalTiles(
      (TILES.length - firstTileCurrentPageIndex) / newTilesPerPage
    );

    const newTilesTotal = leftTilesTotal + rightTilesTotal;
    const newMaxPages = newTilesTotal / newTilesPerPage;
    let newCurrentPage = -1;

    let startIndex = (firstTileCurrentPageIndex - leftTilesTotal + TILES.length) % TILES.length;
    let tempTiles: Tile[] = [];
    for (let i = 0; i < newTilesTotal; i++) {
      if (startIndex >= TILES.length) startIndex = 0;

      const pageNumber = Math.floor(i / newTilesPerPage);
      const idMatches = tempTiles.some(tile => tile.id === TILES[firstTileCurrentPageIndex].id);
      if (idMatches && pageNumber > 1 && newCurrentPage === -1) newCurrentPage = pageNumber;

      tempTiles.push(TILES[startIndex++]);
      if (tempTiles.length !== newTilesPerPage) continue;

      const firstTileIndex2 = tempTiles.findIndex(tile => tile.id === TILES.at(0)?.id);
      if (firstTileIndex2 > 0) {
        const tilesNeeded = tempTiles.slice(0, firstTileIndex2).length;
        if (pageNumber === 1) newFirstPageLength = newTilesPerPage - tilesNeeded;
        if (pageNumber === newMaxPages - 2) newLastPageLength = tilesNeeded;
      }

      newPages.set(pageNumber, tempTiles);
      tempTiles = [];
    }

    validatePages({
      label: 'useMinimizedPage()',
      pages: newPages,
      expectedMaxPages: newMaxPages,
      expectedTilesPerPage: newTilesPerPage,
    });

    setAllPages({
      pages: newPages,
      currentPage: newCurrentPage,
      maxPages: newMaxPages,
      tilesPerPage: newTilesPerPage,
      firstPageLength: newFirstPageLength,
      lastPageLength: newLastPageLength,
    });
  };

  return { goToMinimizedPage };
};
