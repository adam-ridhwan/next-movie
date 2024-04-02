import { useSliderStore } from '@/providers/slider-provider';

import { getMapItem } from '@/lib/utils';
import TileItem from '@/components/slider/tiles/tile-item';

const PrevPage = () => {
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const tilesPerPage = useSliderStore(state => state.tilesPerPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  if (!hasPaginated) return null;

  const prevPageTiles = getMapItem({
    label: 'PrevPage: prevPageTiles',
    map: pages,
    key: currentPage - 1,
  });

  return prevPageTiles.map((tile, i) => (
    <TileItem
      key={`PrevPage-${tile.id}`}
      tile={tile}
      displayNumber={i === tilesPerPage - 1 ? 0 : ''}
      isVisibleOnScreen={true}
    />
  ));
};

export default PrevPage;
