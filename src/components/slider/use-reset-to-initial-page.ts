import { useSliderStore } from '@/providers/slider-provider';

import { Pages, Tile } from '@/lib/types';
import { getMapItem, getMaxPages, getTilesPerPage, validatePagesMap } from '@/lib/utils';

export const useResetToInitialPage = () => {
  const resetPages = useSliderStore(state => state.resetPages);
  const setPagesAfterResize = useSliderStore(state => state.setPagesAfterResize);
  const TILES = useSliderStore(state => state.TILES);

  return () => {
    resetPages();

    const initialPages: Pages = new Map<number, Tile[]>();
    const newTilesPerPage = getTilesPerPage();
    const newMaxPages = getMaxPages(TILES);

    // Left page placeholder
    initialPages.set(0, TILES.slice(-newTilesPerPage));

    // Middle pages
    for (let pageIndex = 1; pageIndex < newMaxPages - 1; pageIndex++) {
      const startIndex = (pageIndex - 1) * newTilesPerPage;
      const endIndex = startIndex + newTilesPerPage;
      initialPages.set(pageIndex, TILES.slice(startIndex, endIndex));
    }

    const lastPage = getMapItem({
      label: 'useResetToInitialPage(): lastPage',
      map: initialPages,
      key: newMaxPages - 2,
    });

    const tilesNeededForLastPage = newTilesPerPage - lastPage.length;
    if (tilesNeededForLastPage) {
      initialPages.set(newMaxPages - 2, [...lastPage, ...TILES.slice(0, tilesNeededForLastPage)]);
    }

    // Right page placeholder
    initialPages.set(
      newMaxPages - 1,
      TILES.slice(tilesNeededForLastPage, tilesNeededForLastPage + newTilesPerPage)
    );

    validatePagesMap({ label: 'useResetToInitialPage()', tiles: TILES, pages: initialPages });

    setPagesAfterResize({
      pages: initialPages,
      tilesPerPage: newTilesPerPage,
      maxPage: newMaxPages,
      lastPageLength: newTilesPerPage - tilesNeededForLastPage,
      isFirstPageVisited: true,
    });
  };
};
