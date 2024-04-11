import { Tile } from '@/lib/types';
import { findIndexFromKey, getMapItem } from '@/lib/utils';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import TileItem from '@/components/slider/tiles/tile-item';

const RightPlaceholder = () => {
  const {
    state: { TILES, currentPage, pages },
  } = usePagination();
  const { getTilesPerPage, isMounted } = usePageUtils();

  const lastIndex = getTilesPerPage() - 1;

  const getNextTile = (): Tile | void => {
    if (!isMounted) return;

    const nextPage = getMapItem({
      label: 'RightPlaceholder: nextPage',
      map: pages,
      key: currentPage + 1,
    });

    if (nextPage.length !== getTilesPerPage()) return;

    const indexOfLastItem = findIndexFromKey({
      label: 'RightPlaceholder: indexOfLastItem',
      array: TILES,
      key: 'id',
      value: nextPage[lastIndex]?.id,
    });

    const indexOfNextItem = indexOfLastItem === TILES.length - 1 ? 0 : indexOfLastItem + 1;
    return TILES[indexOfNextItem];
  };

  return <TileItem tile={getNextTile()} />;
};

export default RightPlaceholder;
