import { Fragment } from 'react';
import { useDomContext } from '@/providers/dom-provider';

import { getMapItem } from '@/lib/utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import TileItem from '@/components/slider/tiles/tile-item';

const CurrentPage = () => {
  const [{ currentPage, pages }] = usePagination();
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
