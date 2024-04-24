import { Movie } from '@/lib/types';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { MINIMUM_TILE_COUNT } from '@/components/slider/slider-constants';

export const useTiles = () => {
  const {
    state: { MEDIA, pages, currentPage },
  } = usePagination();
  const {
    state: { isMounted, hasPaginated },
    actions: { getMapValue },
  } = usePageUtils();

  if (MEDIA.length <= MINIMUM_TILE_COUNT) return { tilesToRender: MEDIA };

  const getPrevPageTiles = () => {
    if (!isMounted || !hasPaginated) return [];
    return getMapValue({
      label: 'LeftPlaceholder: prevPage',
      map: pages,
      key: currentPage - 1,
    });
  };

  const getCurrentPageTiles = () => {
    return getMapValue({
      label: 'CurrentPage: currentPageTiles',
      map: pages,
      key: currentPage,
    });
  };

  const getNextPageTiles = () => {
    if (!isMounted) return [];
    return getMapValue({
      label: 'NextPage: nextPageTiles',
      map: pages,
      key: currentPage + 1,
    });
  };

  const tilesToRender: Movie[] = [...getPrevPageTiles(), ...getCurrentPageTiles(), ...getNextPageTiles()];

  return { tilesToRender };
};
