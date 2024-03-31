import { Fragment } from 'react';
import { useSliderStore } from '@/providers/slider-provider';

import { getMapItem } from '@/lib/utils';
import TileItem from '@/components/slider/tiles/tile/tile';

const NextPage = () => {
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);

  const nextPageTiles = getMapItem({
    label: 'nextPageTiles',
    map: pages,
    key: currentPage,
  });

  return nextPageTiles.map((card, i) => (
    <Fragment key={`NextPage-${card.id}`}>
      <TileItem
        card={card}
        displayNumber={i === 0 ? cardsPerPage + 1 : ''}
        isVisibleOnScreen={true}
      />
    </Fragment>
  ));
};

export default NextPage;
