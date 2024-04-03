import { Tile } from '@/lib/types';
import { findIndexFromKey, getMapItem } from '@/lib/utils';
import { usePages } from '@/components/slider/hooks/use-pages';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import TileItem from '@/components/slider/tiles/tile-item';

const RightPlaceholder = () => {
  const {
    state: { TILES, currentPage, pages },
    status: { isMounted },
  } = usePagination();
  const { getTilesPerPage } = usePages();

  const lastIndex = getTilesPerPage() - 1;

  const getNextTile = (): Tile => {
    if (!isMounted) return TILES[0];

    const nextPage = getMapItem({
      label: 'RightPlaceholder: nextPage',
      map: pages,
      key: currentPage + 1,
    });

    const indexOfLastItem = findIndexFromKey({
      label: 'RightPlaceholder: indexOfLastItem',
      array: TILES,
      key: 'id',
      value: nextPage[lastIndex].id,
    });

    const indexOfNextItem = indexOfLastItem === TILES.length - 1 ? 0 : indexOfLastItem + 1;
    return TILES[indexOfNextItem];
  };

  return <TileItem tile={getNextTile()} displayNumber={''} isVisibleOnScreen={true} />;
};

export default RightPlaceholder;
