import { useSliderStore } from '@/providers/slider-provider';

import { Tile } from '@/lib/types';
import { findIndexFromKey, getMapItem } from '@/lib/utils';
import TileItem from '@/components/slider/tiles/tile-item';

const RightPlaceHolder = () => {
  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const tilesPerPage = useSliderStore(state => state.tilesPerPage);
  const isMounted = useSliderStore(state => state.isMounted);
  const lastIndex = tilesPerPage - 1;

  const getNextTiles = (): Tile => {
    if (!isMounted) return TILES[0];

    const nextPage = getMapItem({ label: 'getNextTiles()', map: pages, key: currentPage + 1 });

    const indexOfLastItem = findIndexFromKey({
      label: 'getNextTiles()',
      array: TILES,
      key: 'id',
      value: nextPage[lastIndex].id,
    });

    const indexOfNextItem = indexOfLastItem === TILES.length - 1 ? 0 : indexOfLastItem + 1;
    return TILES[indexOfNextItem];
  };

  return <TileItem tile={getNextTiles()} displayNumber={''} isVisibleOnScreen={true} />;
};

export default RightPlaceHolder;
