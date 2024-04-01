import { useSliderStore } from '@/providers/slider-provider';

import { findIndexFromKey, getMapItem } from '@/lib/utils';
import TileItem from '@/components/slider/tiles/tile-item';

const LeftPlaceHolder = () => {
  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  const getPrevTiles = () => {
    const prevPage = getMapItem({
      label: 'LeftPlaceHolder - getPrevPage',
      map: pages,
      key: currentPage - 1,
    });

    const indexOfFirstItem = findIndexFromKey({
      label: 'LeftPlaceHolder - getIndexOfFirstItem',
      array: TILES,
      key: 'id',
      value: prevPage[0].id,
    });

    const indexOfPreviousItem = indexOfFirstItem ? indexOfFirstItem - 1 : TILES.length - 1;
    return TILES[indexOfPreviousItem];
  };

  return (
    hasPaginated && <TileItem tile={getPrevTiles()} displayNumber={''} isVisibleOnScreen={true} />
  );
};

export default LeftPlaceHolder;
