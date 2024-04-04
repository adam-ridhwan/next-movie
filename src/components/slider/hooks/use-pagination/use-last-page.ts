/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { Pages, Tile } from '@/lib/types';
import { findIndexFromKey, getMapItem } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { useValidators } from '@/components/slider/hooks/use-validators';

export const useLastPage = () => {
  const TILES = useSliderStore(state => state.TILES);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);
  const setAllPages = useSliderStore(state => state.setAllPages);
  const { getTilesPerPage, getMaxPages } = usePages();
  const { validatePages } = useValidators();

  const goToLastPage = () => {
    usePaginationLogger.last();

    if (!hasPaginated) markAsPaginated();

    const newTilesPerPage = getTilesPerPage();
    const newMaxPages = getMaxPages();

    const newPages: Pages = new Map<number, Tile[]>();

    // Right page placeholder
    newPages.set(newMaxPages - 1, TILES.slice(0, newTilesPerPage));

    // Middle pages
    let endIndex = TILES.length;
    let startIndex = TILES.length - newTilesPerPage;
    const middlePagesLength = newMaxPages - 2;
    for (let i = middlePagesLength; i > 0; i--) {
      newPages.set(i, TILES.slice(Math.max(0, startIndex), endIndex));
      startIndex -= newTilesPerPage;
      endIndex -= newTilesPerPage;
    }

    const firstPage = getMapItem({
      label: 'goToLastPage()',
      map: newPages,
      key: 1,
    });

    const tilesNeeded = newTilesPerPage - firstPage.length;
    if (tilesNeeded) newPages.set(1, [...TILES.slice(-tilesNeeded), ...firstPage]);

    // Left page placeholder
    const firstItem = TILES.slice(-tilesNeeded)[0];
    let firstItemIndex =
      findIndexFromKey({
        label: 'Left page placeholder goToLastPage()',
        array: TILES,
        key: 'id',
        value: firstItem.id,
      }) - 1;

    const leftArray = [];
    for (let i = 0; i < newTilesPerPage; i++) {
      if (firstItemIndex < 0) firstItemIndex = TILES.length - 1;
      leftArray.unshift(TILES[firstItemIndex--]);
    }

    newPages.set(0, leftArray);

    validatePages({
      label: 'goToLastPage()',
      pages: newPages,
      expectedMaxPages: newMaxPages,
      expectedTilesPerPage: newTilesPerPage,
    });

    setAllPages({
      pages: newPages,
      tilesPerPage: newTilesPerPage,
      maxPages: newMaxPages,
      currentPage: newMaxPages - 2,
      firstPageLength: newTilesPerPage - tilesNeeded,
      lastPageLength: newTilesPerPage - tilesNeeded,
    });
  };

  return { goToLastPage };
};
