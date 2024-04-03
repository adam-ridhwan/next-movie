/* eslint no-restricted-imports: 0 */

import { Pages, Tile } from '@/lib/types';
import { usePages } from '@/components/slider/hooks/use-pages';
import { log } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useGoToResizedPage = () => {
  const { getTilesPerPage, getMaxPages } = usePages();

  /** ────────────────────────────────────────────────────────────────────
   * From 4 tiles to 3 tiles per page (minimizing)
   *
   *
   * 2nd page: -
   * page 0: [6, 7, 8, 9] => page 0: [8, 9, 1]
   * page 1: [1, 2, 3, 4] => page 1: [2, 3, 4]
   * page 2: [5, 6, 7, 8] => page 2: [5, 6, 7] <- currentPage
   * page 3: [9, 1, 2, 3] => page 3: [8, 9, 1]
   * page 4: [4, 5, 6, 7] => page 4: [2, 3, 4]
   *
   *
   * last page: -
   * page 0: [3, 4, 5, 6] => page 0: [6, 7, 8]
   * page 1: [7, 8, 9, 1] => page 1: [9, 1, 2]
   * page 2: [2, 3, 4, 5] => page 2: [3, 4, 5]
   * page 3: [6, 7, 8, 9] => page 3: [6, 7, 8] <- currentPage
   * page 4: [1, 2, 3, 4] => page 4: [9, 1, 2]
   *
   *
   * [1, 2, 3, 4, 5, 6, 7, 8, 9]
   *
   * ──────────────────────────────────────────────────────────────────
   * From 3 tiles to 4 tiles per page (maximizing)
   *
   * 2nd page: -
   * page 0: [7, 8, 9] => page 0: [5, 6, 7, 8]
   * page 1: [1, 2, 3] => page 1: [9, 1, 2, 3]
   * PAGE 2: [4, 5, 6] => PAGE 2: [4, 5, 6, 7] <- currentPage
   * page 3: [7, 8, 9] => page 3: [8, 9, 1, 2]
   * page 4: [1, 2, 3] => page 4: [3, 4, 5, 6]
   *
   * last page: -
   * page 0: [7, 8, 9] => page 0: [4, 5, 6, 7]
   * page 1: [1, 2, 3] => page 1: [8, 9, 1, 2]
   * page 2: [4, 5, 6] => page 2: [3, 4, 5, 6]
   * PAGE 3: [7, 8, 9] => PAGE 3: [7, 8, 9, 1] <- currentPage
   * page 4: [1, 2, 3] => page 4: [2, 3, 4, 5]
   *
   * continue maximizing...
   *
   * From 4 tiles to 5 tiles per page (maximizing)
   * page 0: [4, 5, 6, 7] => page 0: [1, 2, 3, 4, 5]
   * page 1: [8, 9, 1, 2] => page 1: [6, 7, 8, 9, 1]
   * page 2: [3, 4, 5, 6] => page 2: [2, 3, 4, 5, 6]
   * PAGE 3: [7, 8, 9, 1] => PAGE 3: [7, 8, 9, 1, 2]
   * page 4: [2, 3, 4, 5] => page 4: [3, 4, 5, 6, 7]
   *
   *
   *
   * [1, 2, 3, 4, 5, 6, 7, 8, 9]
   * ────────────────────────────────────────────────────────────────── */

  const goToResizedPage = (prevPage: Tile[]) => {
    log('RESIZED');

    const firstItemOfPreviousPage = prevPage.at(0)?.id;

    console.group('goToResizedPage');
    console.log(
      'prevPage:',
      prevPage.map(tile => tile.id)
    );
    console.log('firstItemOfPreviousPage:', firstItemOfPreviousPage);

    const tilesPerPage = getTilesPerPage();
    const maxPages = getMaxPages();

    const newPages: Pages = new Map<number, Tile[]>();
  };

  return { goToResizedPage };
};
