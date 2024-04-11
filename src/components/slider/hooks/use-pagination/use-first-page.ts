/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { useMapPages } from '@/components/slider/hooks/use-pagination/use-map-pages';

export const useFirstPage = () => {
  const TILES = useSliderStore(state => state.TILES);
  const { setMapTiles } = useMapPages();

  const goToFirstPage = () => {
    usePaginationLogger.first();

    const firstTileCurrentPage = TILES.at(0);
    if (!firstTileCurrentPage) {
      throw new Error('goToFirstPage(): firstTileCurrentPage is undefined');
    }

    const firstTileCurrentPageIndex = 0;

    setMapTiles({ firstTileCurrentPage, firstTileCurrentPageIndex, isFirstPage: true });
  };

  return { goToFirstPage };
};
