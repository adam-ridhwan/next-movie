import { Fragment } from 'react';
import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';

import { getMapItem } from '@/lib/utils';
import TileItem from '@/components/slider/tiles/tile-item';

const CurrentPage = () => {
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const { tileRef } = useDomContext();

  const currentPageTiles = getMapItem({
    label: 'CurrentPage: currentPageTiles',
    map: pages,
    key: currentPage,
  });

  return currentPageTiles.map((tile, i) => (
    <Fragment key={`CurrentPage-${tile.id}`}>
      <TileItem
        ref={i === 0 ? tileRef : undefined}
        tile={tile}
        displayNumber={i + 1}
        isVisibleOnScreen={true}
      />
    </Fragment>
  ));
};

export default CurrentPage;
