import { Fragment } from 'react';
import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';

import { getMapItem } from '@/lib/utils';
import Tile from '@/components/slider/tiles/tile';

const CurrentPage = () => {
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const { sliderItemRef } = useDomContext();

  const currentPageTiles = getMapItem({
    label: 'currentPageTiles',
    map: pages,
    key: currentPage,
  });

  return currentPageTiles.map((card, i) => (
    <Fragment key={`CurrentPage-${card.id}`}>
      <Tile
        ref={i === 0 ? sliderItemRef : undefined}
        card={card}
        displayNumber={i + 1}
        isVisibleOnScreen={true}
      />
    </Fragment>
  ));
};

export default CurrentPage;
