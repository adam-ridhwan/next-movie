import { Fragment } from 'react';
import { useSliderStore } from '@/providers/slider-provider';

import { getMapItem } from '@/lib/utils';
import TileItem from '@/components/slider/tiles/tile-item';

const NextPage = () => {
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const tilesPerPage = useSliderStore(state => state.tilesPerPage);
  const isMounted = useSliderStore(state => state.isMounted);

  if (!isMounted) return null;

  const nextPageTiles = getMapItem({
    label: 'NextPage: nextPageTiles',
    map: pages,
    key: currentPage + 1,
  });

  return nextPageTiles.map((tile, i) => (
    <Fragment key={`NextPage-${tile.id}`}>
      <TileItem
        tile={tile}
        displayNumber={i === 0 ? tilesPerPage + 1 : ''}
        isVisibleOnScreen={true}
      />
    </Fragment>
  ));
};

export default NextPage;
