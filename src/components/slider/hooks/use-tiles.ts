import { v4 as uuid } from 'uuid';

import { MINIMUM_TILE_COUNT } from '@/lib/constants';
import { getMapItem } from '@/lib/utils';
import { Movie } from '@/lib/zod-types.ts/modelSchema/MovieSchema';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useTiles = () => {
  const {
    state: { TILES, pages, currentPage },
  } = usePagination();
  const { isMounted, hasPaginated, getTileCountPerPage } = usePageUtils();

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages.size - 2;
  const tileCountPerPage = getTileCountPerPage();

  if (TILES.length <= MINIMUM_TILE_COUNT) return { tilesToRender: TILES };

  const getLeftTilePlaceholder = (): [Movie] | [] => {
    if (!isMounted || !hasPaginated) return [];
    if (isFirstPage) return [{ ...TILES[TILES.length - 1 - tileCountPerPage], uuid: uuid() }];
    const prevPageMOre = pages.get(currentPage - 2);
    if (!prevPageMOre) return [{ ...TILES[TILES.length - 1], uuid: uuid() }];
    return [prevPageMOre[tileCountPerPage - 1]];
  };

  const getPrevPageTiles = () => {
    if (!isMounted || !hasPaginated) return [];
    return getMapItem({
      label: 'LeftPlaceholder: prevPage',
      map: pages,
      key: currentPage - 1,
    });
  };

  const getCurrentPageTiles = () => {
    return getMapItem({
      label: 'CurrentPage: currentPageTiles',
      map: pages,
      key: currentPage,
    });
  };

  const getNextPageTiles = () => {
    if (!isMounted) return [];
    return getMapItem({
      label: 'NextPage: nextPageTiles',
      map: pages,
      key: currentPage + 1,
    });
  };

  const getRightTilePlaceholder = (): [Movie] | [] => {
    if (!isMounted) return [];
    if (isLastPage) return [{ ...TILES[tileCountPerPage], uuid: uuid() }];
    const nextPageMOre = pages.get(currentPage + 2);
    if (!nextPageMOre) return [{ ...TILES[0], uuid: uuid() }];
    return [nextPageMOre[0]];
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
