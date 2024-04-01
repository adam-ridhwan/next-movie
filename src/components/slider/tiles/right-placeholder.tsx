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

    // TODO: TypeError: Cannot read properties of undefined (reading 'id')
    // How to replicate: Set browser to large width and quickly resize to small width
    // I think it has something to do with how this components is being rendered
    // using stale state or the wrong stage of the component lifecycle

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
