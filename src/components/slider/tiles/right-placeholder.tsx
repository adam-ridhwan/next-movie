import { useSliderStore } from '@/providers/slider-provider';

import { Tile } from '@/lib/types';
import { findIndexFromKey, getMapItem, getTilesPerPage } from '@/lib/utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import TileItem from '@/components/slider/tiles/tile-item';

const RightPlaceholder = () => {
  const isMounted = useSliderStore(state => state.isMounted);

  const [{ TILES, currentPage, pages }] = usePagination();

  const lastIndex = getTilesPerPage() - 1;

  const getNextTiles = (): Tile => {
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

  return <TileItem tile={getNextTiles()} displayNumber={''} isVisibleOnScreen={true} />;
};

export default RightPlaceholder;
