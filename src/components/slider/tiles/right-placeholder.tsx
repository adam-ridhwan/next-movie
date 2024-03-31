import { useSliderStore } from '@/providers/slider-provider';

import { TileType } from '@/lib/types';
import { findIndexFromKey, getMapItem } from '@/lib/utils';
import Tile from '@/components/slider/tiles/tile';

const RightPlaceHolder = () => {
  const TILES = useSliderStore(state => state.TILES);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const tilesPerPage = useSliderStore(state => state.tilesPerPage);
  const isMounted = useSliderStore(state => state.isMounted);
  const lastIndex = tilesPerPage - 1;

  const getNextTiles = (): TileType => {
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

  return <Tile tile={getNextTiles()} displayNumber={''} isVisibleOnScreen={true} />;
};

export default RightPlaceHolder;
