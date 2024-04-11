import { Tile } from '@/lib/types';
import { findIndexFromKey, getMapItem } from '@/lib/utils';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useTiles = () => {
  const {
    state: { TILES, pages, currentPage },
  } = usePagination();
  const { hasPaginated, getTilesPerPage } = usePageUtils();
  const { isMounted } = usePageUtils();

  // ──────────────────────────────────────────────────────────────
  const getPrevTile = (): [Tile] | [] => {
    if (!isMounted || !hasPaginated) return [];

    const prevPage = getMapItem({
      label: 'LeftPlaceholder: prevPage',
      map: pages,
      key: currentPage - 1,
    });

    const indexOfFirstItem = findIndexFromKey({
      label: 'LeftPlaceholder: indexOfFirstItem',
      array: TILES,
      key: 'id',
      value: prevPage[0].id,
    });

    const indexOfPreviousItem = indexOfFirstItem ? indexOfFirstItem - 1 : TILES.length - 1;
    return [TILES[indexOfPreviousItem]];
  };

  // ──────────────────────────────────────────────────────────────
  const prevPageTiles =
    !isMounted || !hasPaginated
      ? []
      : getMapItem({
          label: 'LeftPlaceholder: prevPage',
          map: pages,
          key: currentPage - 1,
        });

  // ──────────────────────────────────────────────────────────────
  const currentPageTiles = getMapItem({
    label: 'CurrentPage: currentPageTiles',
    map: pages,
    key: currentPage,
  });

  // ──────────────────────────────────────────────────────────────
  const nextPageTiles = !isMounted
    ? []
    : getMapItem({
        label: 'NextPage: nextPageTiles',
        map: pages,
        key: currentPage + 1,
      });

  // ──────────────────────────────────────────────────────────────
  const getNextTile = (): [Tile] | [] => {
    if (!isMounted) return [];

    const lastIndex = getTilesPerPage() - 1;

    const nextPage = getMapItem({
      label: 'RightPlaceholder: nextPage',
      map: pages,
      key: currentPage + 1,
    });

    if (nextPage.length !== getTilesPerPage()) return [];

    const indexOfLastItem = findIndexFromKey({
      label: 'RightPlaceholder: indexOfLastItem',
      array: TILES,
      key: 'id',
      value: nextPage[lastIndex]?.id,
    });

    const indexOfNextItem = indexOfLastItem === TILES.length - 1 ? 0 : indexOfLastItem + 1;
    return [TILES[indexOfNextItem]];
  };

  const tilesToRender: Tile[] = [
    ...getPrevTile(),
    ...prevPageTiles,
    ...currentPageTiles,
    ...nextPageTiles,
    ...getNextTile(),
  ];

  return { tilesToRender };
};