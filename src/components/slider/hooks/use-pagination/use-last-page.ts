/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/lib/logger';
import { getMapItem } from '@/lib/utils';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { useMapPages } from '@/components/slider/hooks/use-pagination/use-map-pages';

export const useLastPage = () => {
  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const { getTilesPerPage } = usePageUtils();
  const { setMapTiles } = useMapPages();

  const goToLastPage = () => {
    usePaginationLogger.last();

    const firstTileCurrentPage = getMapItem({
      label: 'goToLastPage(): firstTileCurrentPage',
      map: pages,
      key: currentPage,
    })[0];

    const newTilesPerPage = getTilesPerPage();
    const firstTileCurrentPageIndex = TILES.length - newTilesPerPage;

    setMapTiles({
      firstTileCurrentPage,
      firstTileCurrentPageIndex,
      isLastPage: true,
    });
  };

  return { goToLastPage };
};
