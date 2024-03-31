import { Fragment } from 'react';
import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';

import { Card } from '@/lib/types';
import TileItem from '@/components/slider/tile-item';

const TileList = () => (
  <>
    <LeftPlaceHolderCard />
    <PrevPage />
    <CurrentPage />
    <NextPage />
    <RightPlaceHolderCard />
  </>
);

export default TileList;

const LeftPlaceHolderCard = () => {
  const CARDS = useSliderStore(state => state.CARDS);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  const getPrevCard = () => {
    const prevPage = pages.get(currentPage - 1);
    if (!prevPage) throw new Error('Previous not found');
    const indexOfFirstItem = CARDS.findIndex(({ id }) => id === prevPage[0].id);
    if (indexOfFirstItem === -1) throw new Error('Index of first item not found');
    const indexOfPreviousItem = indexOfFirstItem ? indexOfFirstItem - 1 : CARDS.length - 1;
    return CARDS[indexOfPreviousItem];
  };

  return (
    hasPaginated && <TileItem card={getPrevCard()} displayNumber={''} isVisibleOnScreen={true} />
  );
};

const PrevPage = () => {
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);

  return pages?.get(currentPage - 1)?.map((card, i) => (
    <Fragment key={`currentPage-${card.id}`}>
      <TileItem
        card={card}
        displayNumber={i === cardsPerPage - 1 ? 0 : ''}
        isVisibleOnScreen={true}
      />
    </Fragment>
  ));
};

const CurrentPage = () => {
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const { sliderItemRef } = useDomContext();

  return pages?.get(currentPage)?.map((card, i) => (
    <Fragment key={`currentPage-${card.id}`}>
      <TileItem
        ref={i === 0 ? sliderItemRef : undefined}
        card={card}
        displayNumber={i + 1}
        isVisibleOnScreen={true}
      />
    </Fragment>
  ));
};

const NextPage = () => {
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);

  return pages?.get(currentPage + 1)?.map((card, i) => (
    <Fragment key={`currentPage-${card.id}`}>
      <TileItem
        card={card}
        displayNumber={i === 0 ? cardsPerPage + 1 : ''}
        isVisibleOnScreen={true}
      />
    </Fragment>
  ));
};

const RightPlaceHolderCard = () => {
  const CARDS = useSliderStore(state => state.CARDS);
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);
  const lastIndex = cardsPerPage - 1;

  const getNextCard = (): Card => {
    const nextPage = pages.get(currentPage + 1);
    if (!nextPage) return CARDS[0];

    const indexOfLastItem = CARDS.findIndex(({ id }) => id === nextPage[lastIndex]?.id);
    // console.log('indexOfLastItem', indexOfLastItem);
    if (indexOfLastItem === -1) throw new Error('Index of last item not found');
    const indexOfNextItem = indexOfLastItem === CARDS.length - 1 ? 0 : indexOfLastItem + 1;
    return CARDS[indexOfNextItem];
  };

  return <TileItem card={getNextCard()} displayNumber={''} isVisibleOnScreen={true} />;
};
