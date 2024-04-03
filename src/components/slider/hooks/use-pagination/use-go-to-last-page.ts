/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { Pages, Tile } from '@/lib/types';
import { findIndexFromKey, getMapItem } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { log } from '@/components/slider/hooks/use-pagination/use-pagination';
import { useValidators } from '@/components/slider/hooks/use-validators';

export const useGoToLastPage = () => {
  const TILES = useSliderStore(state => state.TILES);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);
  const setAllPages = useSliderStore(state => state.setAllPages);
  const { getTilesPerPage, getMaxPages } = usePages();
  const { validatePages } = useValidators();

  const goToLastPage = () => {
    log('LAST');

    if (!hasPaginated) markAsPaginated();

    const tilesPerPage = getTilesPerPage();
    const maxPages = getMaxPages();

    const newPages: Pages = new Map<number, Tile[]>();

    // Right page placeholder
    newPages.set(maxPages - 1, TILES.slice(0, tilesPerPage));

    // Middle pages
    let endIndex = TILES.length;
    let startIndex = TILES.length - tilesPerPage;
    const middlePagesLength = maxPages - 2;
    for (let i = middlePagesLength; i > 0; i--) {
      newPages.set(i, TILES.slice(Math.max(0, startIndex), endIndex));
      startIndex -= tilesPerPage;
      endIndex -= tilesPerPage;
    }

    const firstPage = getMapItem({
      label: 'goToLastPage()',
      map: newPages,
      key: 1,
    });

    const tilesNeeded = tilesPerPage - firstPage.length;
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
    for (let i = 0; i < tilesPerPage; i++) {
      if (firstItemIndex < 0) firstItemIndex = TILES.length - 1;
      leftArray.unshift(TILES[firstItemIndex--]);
    }

    newPages.set(0, leftArray);

    validatePages({
      label: 'goToLastPage()',
      pages: newPages,
      expectedMaxPages: maxPages,
      expectedTilesPerPage: tilesPerPage,
    });

    setAllPages({
      pages: newPages,
      tilesPerPage: tilesPerPage,
      maxPages: maxPages,
      currentPage: maxPages - 2,
      lastPageLength: tilesPerPage - tilesNeeded,
      isFirstPageVisited: false,
      isLastPageVisited: true,
    });
  };

  return { goToLastPage };
};
