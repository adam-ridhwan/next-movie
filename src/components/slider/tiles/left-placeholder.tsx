import { useSliderStore } from '@/providers/slider-provider';

import { findItemFromIndex, getMapItem } from '@/lib/utils';
import Tile from '@/components/slider/tiles/tile';

const LeftPlaceHolder = () => {
  const CARDS = useSliderStore(state => state.CARDS);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  const getPrevCard = () => {
    const prevPage = getMapItem({
      label: 'getPrevCard()',
      map: pages,
      key: currentPage - 1,
    });

    const indexOfFirstItem = findItemFromIndex({
      label: 'getPrevCard()',
      array: CARDS,
      key: 'id',
      value: prevPage[0].id,
    });

    const indexOfPreviousItem = indexOfFirstItem ? indexOfFirstItem - 1 : CARDS.length - 1;
    return CARDS[indexOfPreviousItem];
  };

  return hasPaginated && <Tile card={getPrevCard()} displayNumber={''} isVisibleOnScreen={true} />;
};

export default LeftPlaceHolder;
