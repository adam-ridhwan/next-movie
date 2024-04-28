import { MINIMUM_TILE_COUNT } from '@/lib/constants';
import { usePageUtils } from '@/lib/hooks/use-page-utils';
import { usePagination } from '@/lib/hooks/use-pagination';
import { TODO } from '@/lib/types';
import { getMapValue } from '@/lib/utils';

export const useTiles = () => {
  const {
    state: { CONTENT, pages, currentPage },
  } = usePagination();
  const { state: { isMounted, hasPaginated } } = usePageUtils(); // prettier-ignore

  if (CONTENT.length <= MINIMUM_TILE_COUNT) return { tilesToRender: CONTENT };

  const getPrevPageTiles = () => {
    if (!isMounted || !hasPaginated) return [];
    return getMapValue({
      label: 'useTiles: getMapValue',
      map: pages,
      key: currentPage - 1,
    });
  };

  const getCurrentPageTiles = () => {
    return getMapValue({
      label: 'useTiles: getCurrentPageTiles',
      map: pages,
      key: currentPage,
    });
  };

  const getNextPageTiles = () => {
    if (!isMounted) return [];
    return getMapValue({
      label: 'useTiles: getNextPageTiles',
      map: pages,
      key: currentPage + 1,
    });
  };

  const tilesToRender: TODO[] = [
    ...getPrevPageTiles(),
    ...getCurrentPageTiles(),
    ...getNextPageTiles()
  ]; // prettier-ignore

  return { tilesToRender };
};
