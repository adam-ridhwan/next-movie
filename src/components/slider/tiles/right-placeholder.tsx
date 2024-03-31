import { useSliderStore } from '@/providers/slider-provider';

import { Card } from '@/lib/types';
import { findIndexFromKey, getMapItem } from '@/lib/utils';
import Tile from '@/components/slider/tiles/tile';

const RightPlaceHolder = () => {
  const CARDS = useSliderStore(state => state.CARDS);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const tilesPerPage = useSliderStore(state => state.tilesPerPage);
  const isMounted = useSliderStore(state => state.isMounted);
  const lastIndex = tilesPerPage - 1;

  const getNextCard = (): Card => {
    if (!isMounted) return CARDS[0];

    const nextPage = getMapItem({ label: 'getNextCard()', map: pages, key: currentPage + 1 });

    const indexOfLastItem = findIndexFromKey({
      label: 'getPrevCard()',
      array: CARDS,
      key: 'id',
      value: nextPage[lastIndex].id,
    });

    const indexOfNextItem = indexOfLastItem === CARDS.length - 1 ? 0 : indexOfLastItem + 1;
    return CARDS[indexOfNextItem];
  };

  return <Tile card={getNextCard()} displayNumber={''} isVisibleOnScreen={true} />;
};

export default RightPlaceHolder;
