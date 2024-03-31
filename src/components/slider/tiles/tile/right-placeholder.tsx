import { useSliderStore } from '@/providers/slider-provider';

import { Card } from '@/lib/types';
import { findItemFromIndex, getMapItem } from '@/lib/utils';
import TileItem from '@/components/slider/tiles/tile/tile';

const RightPlaceHolderCard = () => {
  const CARDS = useSliderStore(state => state.CARDS);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);
  const isMounted = useSliderStore(state => state.isMounted);
  const lastIndex = cardsPerPage - 1;

  const getNextCard = (): Card => {
    if (!isMounted) return CARDS[0];

    const nextPage = getMapItem({ label: 'getNextCard()', map: pages, key: currentPage + 1 });

    const indexOfLastItem = findItemFromIndex({
      label: 'getPrevCard()',
      array: CARDS,
      key: 'id',
      value: nextPage[lastIndex].id,
    });

    const indexOfNextItem = indexOfLastItem === CARDS.length - 1 ? 0 : indexOfLastItem + 1;
    return CARDS[indexOfNextItem];
  };

  return <TileItem card={getNextCard()} displayNumber={''} isVisibleOnScreen={true} />;
};

export default RightPlaceHolderCard;
