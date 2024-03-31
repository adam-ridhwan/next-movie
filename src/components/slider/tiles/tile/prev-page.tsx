import { Fragment } from 'react';
import { useSliderStore } from '@/providers/slider-provider';

import { getMapItem } from '@/lib/utils';
import TileItem from '@/components/slider/tiles/tile/tile';

const PrevPage = () => {
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  if (!hasPaginated) return null;

  const prevPageTiles = getMapItem({
    label: 'prevPageTiles',
    map: pages,
    key: currentPage - 1,
  });

  return prevPageTiles.map((card, i) => (
    <Fragment key={`PrevPage-${card.id}`}>
      <TileItem
        card={card}
        displayNumber={i === cardsPerPage - 1 ? 0 : ''}
        isVisibleOnScreen={true}
      />
    </Fragment>
  ));
};

export default PrevPage;
