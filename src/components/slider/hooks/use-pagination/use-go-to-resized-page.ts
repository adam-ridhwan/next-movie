/* eslint no-restricted-imports: 0 */

import { Tile } from '@/lib/types';
import { log } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useGoToResizedPage = () => {
  /* ────────────────────────────────────────────────────────────────────
   * RESIZING FROM 4 TILES TO 3 TILES
   *
   * ────── FIRST PAGE ──────
   * if the new current page is 1 => { goToFirstPage() }
   *
   *
   * ────── SECOND PAGE ──────
   * if the current page is > 1 => { goToResizedPage(previousTiles) }
   *
   * 1) get the previous current tiles
   * 2) update the new current tiles with the previous current tiles
   *
   *     PAGE 0: [6, 7, 8, 9] => PAGE 0: [8, 9, 1]
   *     PAGE 1: [1, 2, 3, 4] => PAGE 1: [2, 3, 4]
   *  -> PAGE 2: [5, 6, 7, 8] => PAGE 2: [5, 6, 7] <-
   *     PAGE 3: [9, 1, 2, 3] => PAGE 3: [8, 9, 1]
   *     PAGE 4: [4, 5, 6, 7] => PAGE 4: [2, 3, 4]
   *
   *
   * ────── LAST PAGE ──────
   * if the current page is the last page => { goToResizedPage(previousTiles) }
   *
   * 1) Get the previous current tiles
   * 2) Update the new current tiles with the previous current tiles
   *
   *     PAGE 0: [7, 8, 9, 1] => PAGE 0: [9, 1, 2]
   *     PAGE 1: [2, 3, 4, 5] => PAGE 1: [3, 4, 5]
   *  -> PAGE 2: [6, 7, 8, 9] => PAGE 2: [6, 7, 8] <-
   *     PAGE 3: [9, 1, 2, 3] => PAGE 3: [9, 1, 2]
   *     PAGE 4: [4, 5, 6, 7] => PAGE 4: [3, 4, 5]
   * ────────────────────────────────────────────────────────────────── */

  const goToResizedPage = (previousTiles: Tile[]) => {
    log('RESIZED');

    console.log(
      'previousTiles',
      previousTiles.map(tile => tile.id)
    );
  };

  return { goToResizedPage };
};
