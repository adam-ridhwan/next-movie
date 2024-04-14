import { v4 as uuid } from 'uuid';

import { Movie } from '@/lib/zod-types.ts/modelSchema/MovieSchema';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { MINIMUM_TILE_COUNT } from '@/components/slider/slider-constants';

export const useTiles = () => {
  const {
    state: { TILES, pages, currentPage },
  } = usePagination();
  const {
    state: { isMounted, hasPaginated },
    actions: { getTileCountPerPage, getMapValue },
  } = usePageUtils();

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages.size - 2;
  const tileCountPerPage = getTileCountPerPage();

  if (TILES.length <= MINIMUM_TILE_COUNT) return { tilesToRender: TILES };

  const getLeftTilePlaceholder = (): [Movie] | [] => {
    if (!isMounted || !hasPaginated) return [];
    if (isFirstPage) return [{ ...TILES[TILES.length - 1 - tileCountPerPage], uuid: uuid() }];
    const pageTwoStepsBack = pages.get(currentPage - 2);
    if (!pageTwoStepsBack) return [{ ...TILES[TILES.length - 1], uuid: uuid() }];
    return [pageTwoStepsBack[tileCountPerPage - 1]];
  };

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

  const getRightTilePlaceholder = (): [Movie] | [] => {
    if (!isMounted) return [];
    if (isLastPage) return [{ ...TILES[tileCountPerPage], uuid: uuid() }];
    const pageTwoStepsForward = pages.get(currentPage + 2);
    if (!pageTwoStepsForward) return [{ ...TILES[0], uuid: uuid() }];
    return [pageTwoStepsForward[0]];
  };

  const tilesToRender: Movie[] = [
    ...getLeftTilePlaceholder(),
    ...getPrevPageTiles(),
    ...getCurrentPageTiles(),
    ...getNextPageTiles(),
    ...getRightTilePlaceholder(),
  ];

  return { tilesToRender };
};
