/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { Pages, Tile } from '@/lib/types';
import { findIndexFromKey } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';

export const useMinimizedPage = () => {
  const TILES = useSliderStore(state => state.TILES);
  const setAllPages = useSliderStore(state => state.setAllPages);
  const currentPage = useSliderStore(state => state.currentPage);
  const { getTilesPerPage } = usePages();

  /** ────────────────────────────────────────────────────────────────────
   * From 4 tiles to 3 tiles per page (minimizing) ✅
   *
   * 2nd page: -
   *     page 0: [6, 7, 8, 9] => page 0: [5, 6, 7]
   *     page 1: [1, 2, 3, 4] => page 1: [8, 9, 1]
   *  -> PAGE 2: [5, 6, 7, 8] => page 2: [2, 3, 4]
   *     page 3: [9, 1, 2, 3] => PAGE 3: [5, 6, 7] <-
   *     page 4: [4, 5, 6, 7] => page 4: [8, 9, 1]
   *                          => page 5: [2, 3, 4]
   *
   * 2nd page: -
   *     page 0: [5, 6, 7] => page 0: [8, 9]
   *     page 1: [8, 9, 1] => page 1: [1, 2]
   *     page 2: [2, 3, 4] => page 2: [3, 4]
   *  -> PAGE 3: [5, 6, 7] => page 3: [5, 6] <-
   *     page 4: [8, 9, 1] => PAGE 4: [7, 8]
   *     page 5: [2, 3, 4] => page 5: [9, 1]
   *                       => page 6: [2, 3]

   * 3rd page: -
   *     page 0: [3, 4, 5, 6] => page 0: [6, 7, 8]
   *     page 1: [7, 8, 9, 1] => page 1: [9, 1, 2]
   *     page 2: [2, 3, 4, 5] => page 2: [3, 4, 5]
   * ->  PAGE 3: [6, 7, 8, 9] => PAGE 3: [6, 7, 8] <-
   *     page 4: [1, 2, 3, 4] => page 4: [9, 1, 2]
   *                          => page 5: [3, 4, 5]
   *
   * continue minimizing...
   * From 3 tiles to 2 tiles per page (minimizing)
   *
   * 3rd page: -
   *     page 0: [6, 7, 8] => page 0: [7, 8]
   *     page 1: [9, 1, 2] => page 1: [9, 1]
   *     page 2: [3, 4, 5] => page 2: [2, 3]
   * ->  PAGE 3: [6, 7, 8] => page 3: [4, 5]
   *     page 4: [9, 1, 2] => PAGE 4: [6, 7] <-
   *     page 5: [3, 4, 5] => page 5: [8, 9]
   *                       => page 6: [1, 2]
   * ────────────────────────────────────────────────────────────────── */

  const goToMinimizedPage = (prevTiles: Tile[]) => {
    usePaginationLogger.minimized();

    const firstItem = prevTiles.at(0);
    if (!firstItem) throw new Error('First item of the previous page is missing');
    const index = findIndexFromKey({
      label: 'goToResizedPage()',
      array: TILES,
      key: 'id',
      value: firstItem?.id,
    });
    const newPages: Pages = new Map<number, Tile[]>();
    const tilesPerPage = getTilesPerPage();
    const total = TILES.length;

    // plus 1 because we need to include the left and right page placeholders
    const calc = (num: number) => (Math.ceil(num) + 1) * tilesPerPage;
    const leftTilesTotal = calc(index / tilesPerPage);
    const rightTilesTotal = calc((total - index) / tilesPerPage);

    const tilesTotal = leftTilesTotal + rightTilesTotal;
    const newMaxPages = tilesTotal / tilesPerPage;

    let startIndex = (index - leftTilesTotal + total) % total;

    let newCurrentPage = currentPage;
    let temp: Tile[] = [];
    for (let i = 0; i < tilesTotal; i++) {
      if (startIndex >= total) startIndex = 0;
      temp.push(TILES[startIndex++]);
      if (temp.length !== tilesPerPage) continue;
      const page = Math.floor(i / tilesPerPage);
      const idMatches = temp.some(tile => tile.id === firstItem.id);
      if (idMatches && page > 0) newCurrentPage = page;
      newPages.set(page, temp);
      temp = [];
    }

    console.table({
      prevTiles: prevTiles
        .map(({ id }) => id)
        .toString()
        .replace(/,/g, ', '),
      index: index,
      startIndex: startIndex,
      newCurrentPage: newCurrentPage,
      leftTilesTotal: leftTilesTotal,
      rightTilesTotal: rightTilesTotal,
      totalTiles: leftTilesTotal + rightTilesTotal,
      newMaxPages: newMaxPages,
    });

    [...newPages.entries()]
      .sort((a, b) => a[0] - b[0])
      .forEach(([pageIndex, tiles]) => {
        console.log(
          `Page ${pageIndex}:`,
          tiles.map(card => (card ? card.id : undefined))
        );
      });

    setAllPages({
      pages: newPages,
      currentPage: newCurrentPage,
      maxPages: tilesTotal / tilesPerPage,
      tilesPerPage: tilesPerPage,
      // lastPageLength: tilesPerPage - tilesNeeded,
      // isFirstPageVisited: true,
      // isLastPageVisited: false,
    });
  };

  return { goToMinimizedPage };
};
