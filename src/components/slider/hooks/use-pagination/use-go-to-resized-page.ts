/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { Pages, Tile } from '@/lib/types';
import { findIndexFromKey } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { log } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useGoToResizedPage = () => {
  const TILES = useSliderStore(state => state.TILES);
  const setAllPages = useSliderStore(state => state.setAllPages);
  const currentPage = useSliderStore(state => state.currentPage);

  const { getTilesPerPage, getMaxPages } = usePages();

  /** ────────────────────────────────────────────────────────────────────
   * From 4 tiles to 3 tiles per page (minimizing)
   *
   * 2nd page: -
   *     page 0: [6, 7, 8, 9] => page 0: [5, 6, 7]
   *     page 1: [1, 2, 3, 4] => page 1: [8, 9, 1]
   *  -> PAGE 2: [5, 6, 7, 8] => page 2: [2, 3, 4]
   *     page 3: [9, 1, 2, 3] => PAGE 3: [5, 6, 7] <-
   *     page 4: [4, 5, 6, 7] => page 4: [8, 9, 1]
   *                          => page 5: [2, 3, 4]
   *
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
   *
   * ──────────────────────────────────────────────────────────────────
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
   *
   * ────────────────────────────────────────────────────────────────── */

  const goToResizedPage = (prevPage: Tile[]) => {
    log('RESIZED');

    const firstItemPrevPage = prevPage.at(0)?.id;
    const firstItemPrevPageIndex = findIndexFromKey({
      label: 'goToResizedPage()',
      array: TILES,
      key: 'id',
      value: firstItemPrevPage,
    });

    const tilesPerPage = getTilesPerPage();
    const maxPages = getMaxPages();

    const newPages: Pages = new Map<number, Tile[]>();

    /**
     * 2nd page: -
     *     page 0: [6, 7, 8, 9] => page 0: [5, 6, 7]
     *     page 1: [1, 2, 3, 4] => page 1: [8, 9, 1]
     *  -> PAGE 2: [5, 6, 7, 8] => page 2: [2, 3, 4]
     *     page 3: [9, 1, 2, 3] => PAGE 3: [5, 6, 7] <-
     *     page 4: [4, 5, 6, 7] => page 4: [8, 9, 1]
     *                          => page 5: [2, 3, 4]
     * */

    let temporaryArrayHolder = [];

    const leftPageTotal = maxPages - 2;
    let leftIndex = firstItemPrevPageIndex - 1;
    for (let i = leftPageTotal * tilesPerPage; i > 0; i--) {
      if (leftIndex < 0) leftIndex = TILES.length - 1;
      temporaryArrayHolder.unshift(TILES[leftIndex--]);
      if (temporaryArrayHolder.length !== tilesPerPage) continue;
      const pageIndex = Math.floor(i / tilesPerPage);
      newPages.set(pageIndex, temporaryArrayHolder);
      temporaryArrayHolder = [];
    }

    const rightPageTotal = maxPages - leftPageTotal + 1;
    let rightIndex = firstItemPrevPageIndex;
    for (let i = 0; i < rightPageTotal * tilesPerPage; i++) {
      if (rightIndex > TILES.length - 1) rightIndex = 0;
      temporaryArrayHolder.push(TILES[rightIndex++]);
      if (temporaryArrayHolder.length !== tilesPerPage) continue;
      const pageIndex = Math.floor(i / tilesPerPage);
      newPages.set(rightPageTotal + pageIndex, temporaryArrayHolder);
      temporaryArrayHolder = [];
    }

    console.table({
      prevPage: prevPage
        .map(({ id }) => id)
        .toString()
        .replace(/,/g, ', '),
      firstItemPrevPageIndex: firstItemPrevPageIndex,
      tilesPerPage: tilesPerPage.toString(),
      maxPages: maxPages.toString(),
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
      currentPage: currentPage + 1,
      maxPages: maxPages,
      tilesPerPage: tilesPerPage,
      // lastPageLength: tilesPerPage - tilesNeeded,
      // isFirstPageVisited: true,
      // isLastPageVisited: false,
      // isMounted: true,
    });
  };

  return { goToResizedPage };
};
