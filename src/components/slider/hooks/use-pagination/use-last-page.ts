/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { useMapPages } from '@/components/slider/hooks/use-pagination/use-map-pages';

export const useLastPage = () => {
  const TILES = useSliderStore(state => state.TILES);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);
  const { getTilesPerPage } = usePageUtils();

  const { setMapTiles } = useMapPages();

  const goToLastPage = () => {
    usePaginationLogger.last();

    if (!hasPaginated) markAsPaginated();

    const firstTileCurrentPage = TILES.at(0);
    if (!firstTileCurrentPage) {
      throw new Error('goToLastPage(): firstTileCurrentPage is undefined');
    }

    const newTilesPerPage = getTilesPerPage();
    const firstTileCurrentPageIndex = TILES.length - newTilesPerPage;

    setMapTiles({ firstTileCurrentPage, firstTileCurrentPageIndex, isLastPage: true });
  };

  return { goToLastPage };
};
