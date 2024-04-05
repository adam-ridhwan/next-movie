/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { Pages, Tile } from '@/lib/types';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { useValidators } from '@/components/slider/hooks/use-validators';

export const useFirstPage = () => {
  const TILES = useSliderStore(state => state.TILES);
  const setAllPages = useSliderStore(state => state.setAllPages);
  const { getTilesPerPage, getTotalTiles } = usePageUtils();
  const { validatePages } = useValidators();

  // TODO: Extract this to a reusable helper function
  const goToFirstPage = () => {
    usePaginationLogger.first();

    const newPages: Pages = new Map<number, Tile[]>();
    const newTilesPerPage = getTilesPerPage();
    let newLastPageLength = newTilesPerPage;

    const leftTilesTotal = getTotalTiles(0 / newTilesPerPage);
    const rightTilesTotal = getTotalTiles(TILES.length / newTilesPerPage);
    const newTilesTotal = leftTilesTotal + rightTilesTotal;
    const newMaxPages = newTilesTotal / newTilesPerPage;

    let startIndex = (0 - leftTilesTotal + TILES.length) % TILES.length;
    let tempTiles: Tile[] = [];
    for (let i = 0; i < newTilesTotal; i++) {
      if (startIndex >= TILES.length) startIndex = 0;

      const pageNumber = Math.floor(i / newTilesPerPage);

      tempTiles.push(TILES[startIndex++]);
      if (tempTiles.length !== newTilesPerPage) continue;

      const firstTileIndex = tempTiles.findIndex(tile => tile.id === TILES.at(0)?.id);
      if (firstTileIndex > 0) {
        const tilesNeeded = tempTiles.slice(0, firstTileIndex).length;
        if (pageNumber === newMaxPages - 2) newLastPageLength = tilesNeeded;
      }

      newPages.set(pageNumber, tempTiles);
      tempTiles = [];
    }

    validatePages({
      label: 'goToFirstPage()',
      pages: newPages,
      expectedMaxPages: newMaxPages,
      expectedTilesPerPage: newTilesPerPage,
    });

    setAllPages({
      pages: newPages,
      currentPage: 1,
      maxPages: newMaxPages,
      tilesPerPage: newTilesPerPage,
      firstPageLength: 0,
      lastPageLength: newLastPageLength,
      isMounted: true,
    });
  };

  return { goToFirstPage };
};
