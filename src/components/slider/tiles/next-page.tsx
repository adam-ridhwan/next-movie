import { Fragment } from 'react';
import { useSliderStore } from '@/providers/slider-provider';

import { getMapItem } from '@/lib/utils';
import Tile from '@/components/slider/tiles/tile';

const NextPage = () => {
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const tilesPerPage = useSliderStore(state => state.tilesPerPage);
  const isMounted = useSliderStore(state => state.isMounted);

  if (!isMounted) return null;

  const nextPageTiles = getMapItem({
    label: 'nextPageTiles',
    map: pages,
    key: currentPage + 1,
  });

  return nextPageTiles.map((card, i) => (
    <Fragment key={`NextPage-${card.id}`}>
      <Tile card={card} displayNumber={i === 0 ? tilesPerPage + 1 : ''} isVisibleOnScreen={true} />
    </Fragment>
  ));
};

export default NextPage;
