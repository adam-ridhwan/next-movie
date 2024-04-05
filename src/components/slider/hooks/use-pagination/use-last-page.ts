/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { Pages, Tile } from '@/lib/types';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { useValidators } from '@/components/slider/hooks/use-validators';

export const useLastPage = () => {
  const TILES = useSliderStore(state => state.TILES);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);
  const setAllPages = useSliderStore(state => state.setAllPages);
  const { getTilesPerPage, getTotalTiles } = usePageUtils();
  const { validatePages } = useValidators();

  // TODO: Extract this to a reusable helper function
  const goToLastPage = () => {
    usePaginationLogger.last();

    if (!hasPaginated) markAsPaginated();

    const newPages: Pages = new Map<number, Tile[]>();
    const newTilesPerPage = getTilesPerPage();
    let newFirstPageLength = newTilesPerPage;

    const firstTileLastPageIndex = TILES.length - newTilesPerPage;
    const leftTilesTotal = getTotalTiles((TILES.length - newTilesPerPage) / newTilesPerPage);
    const rightTilesTotal = getTotalTiles(
      (TILES.length - firstTileLastPageIndex) / newTilesPerPage
    );
    const newTilesTotal = leftTilesTotal + rightTilesTotal;

    let startIndex = (firstTileLastPageIndex - leftTilesTotal + TILES.length) % TILES.length;
    let tempTiles: Tile[] = [];
    for (let i = 0; i < newTilesTotal; i++) {
      if (startIndex >= TILES.length) startIndex = 0;

      const pageNumber = Math.floor(i / newTilesPerPage);

      tempTiles.push(TILES[startIndex++]);
      if (tempTiles.length !== newTilesPerPage) continue;

      const firstTileIndex = tempTiles.findIndex(tile => tile.id === TILES.at(0)?.id);
      if (firstTileIndex > 0) {
        const tilesNeeded = tempTiles.slice(0, firstTileIndex).length;
        if (pageNumber === 1) newFirstPageLength = newTilesPerPage - tilesNeeded;
      }

      newPages.set(pageNumber, tempTiles);
      tempTiles = [];
    }

    const newMaxPages = newPages.size;

    validatePages({
      label: 'goToLastPage()',
      pages: newPages,
      expectedMaxPages: newMaxPages,
      expectedTilesPerPage: newTilesPerPage,
    });

    setAllPages({
      pages: newPages,
      currentPage: newMaxPages - 2,
      maxPages: newPages.size,
      tilesPerPage: newTilesPerPage,
      firstPageLength: newFirstPageLength,
      lastPageLength: newTilesPerPage,
    });
  };

  return { goToLastPage };
};
