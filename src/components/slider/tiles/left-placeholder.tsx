import { findIndexFromKey, getMapItem } from '@/lib/utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import TileItem from '@/components/slider/tiles/tile-item';

const LeftPlaceholder = () => {
  const {
    state: { TILES, currentPage, pages },
    status: { hasPaginated },
  } = usePagination();

  const getPrevTile = () => {
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
    return TILES[indexOfPreviousItem];
  };

  return (
    hasPaginated && <TileItem tile={getPrevTile()} displayNumber={''} isVisibleOnScreen={true} />
  );
};

export default LeftPlaceholder;
