import { useSliderStore } from '@/providers/slider-provider';

import { Pages, Tile } from '@/lib/types';
import { getMapItem } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { logToConsoleUsePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import { useValidators } from '@/components/slider/hooks/use-validators';

export const useGoToFirstPage = () => {
  const TILES = useSliderStore(state => state.TILES);
  const setAllPages = useSliderStore(state => state.setAllPages);
  const { getTilesPerPage, getMaxPages } = usePages();
  const { validatePages } = useValidators();

  const goToFirstPage = () => {
    logToConsoleUsePagination('FIRST');

    const tilesPerPage = getTilesPerPage();
    const maxPages = getMaxPages();

    const initialPages: Pages = new Map<number, Tile[]>();

    // Left page placeholder
    initialPages.set(0, TILES.slice(-tilesPerPage));

    // Middle pages
    for (let pageIndex = 1; pageIndex < maxPages; pageIndex++) {
      const startIndex = (pageIndex - 1) * tilesPerPage;
      const endIndex = startIndex + tilesPerPage;
      initialPages.set(pageIndex, TILES.slice(startIndex, endIndex));
    }

    const lastPage = getMapItem({
      label: 'goToFirstPage()',
      map: initialPages,
      key: maxPages - 2,
    });

    const tilesNeeded = tilesPerPage - lastPage.length;
    if (tilesNeeded) initialPages.set(maxPages - 2, [...lastPage, ...TILES.slice(0, tilesNeeded)]);

    // Right page placeholder
    initialPages.set(maxPages - 1, TILES.slice(tilesNeeded, tilesPerPage + tilesNeeded));

    validatePages({
      label: 'goToFirstPage()',
      pages: initialPages,
      expectedMaxPages: maxPages,
      expectedTilesPerPage: tilesPerPage,
    });

    setAllPages({
      pages: initialPages,
      currentPage: 1,
      maxPages: maxPages,
      tilesPerPage: tilesPerPage,
      lastPageLength: tilesPerPage - tilesNeeded,
      isFirstPageVisited: true,
      isLastPageVisited: false,
      isMounted: true,
    });
  };

  return { goToFirstPage };
};
