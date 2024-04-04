/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { Pages, Tile } from '@/lib/types';
import { getMapItem } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { useValidators } from '@/components/slider/hooks/use-validators';

export const useFirstPage = () => {
  const TILES = useSliderStore(state => state.TILES);
  const setAllPages = useSliderStore(state => state.setAllPages);
  const { getTilesPerPage, getMaxPages } = usePages();
  const { validatePages } = useValidators();

  const goToFirstPage = () => {
    usePaginationLogger.first();

    const newTilesPerPage = getTilesPerPage();
    const newMaxPages = getMaxPages();

    const initialPages: Pages = new Map<number, Tile[]>();

    // Left page placeholder
    initialPages.set(0, TILES.slice(-newTilesPerPage));

    // Middle pages
    for (let pageIndex = 1; pageIndex < newMaxPages; pageIndex++) {
      const startIndex = (pageIndex - 1) * newTilesPerPage;
      const endIndex = startIndex + newTilesPerPage;
      initialPages.set(pageIndex, TILES.slice(startIndex, endIndex));
    }

    const lastPage = getMapItem({
      label: 'goToFirstPage() ',
      map: initialPages,
      key: newMaxPages - 2,
    });

    const tilesNeeded = newTilesPerPage - lastPage.length;
    if (tilesNeeded)
      initialPages.set(newMaxPages - 2, [...lastPage, ...TILES.slice(0, tilesNeeded)]);

    // Right page placeholder
    initialPages.set(newMaxPages - 1, TILES.slice(tilesNeeded, newTilesPerPage + tilesNeeded));

    validatePages({
      label: 'goToFirstPage()',
      pages: initialPages,
      expectedMaxPages: newMaxPages,
      expectedTilesPerPage: newTilesPerPage,
    });

    setAllPages({
      pages: initialPages,
      currentPage: 1,
      maxPages: newMaxPages,
      tilesPerPage: newTilesPerPage,
      firstPageLength: newTilesPerPage - tilesNeeded,
      lastPageLength: newTilesPerPage - tilesNeeded,
      isMounted: true,
    });
  };

  return { goToFirstPage };
};
