import React, { Fragment } from 'react';

import { useDomProvider } from '@/app/_providers/dom-provider';
import { useSliderStore } from '@/app/_providers/slider-provider';
import Tile from '@/app/(library)/_components/app-slider/tile-item';
import { Card } from '@/app/(library)/page';

const TileList = () => {
  const CARDS = useSliderStore(state => state.CARDS);
  const pages = useSliderStore(state => state.pages);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);
  const currentPage = useSliderStore(state => state.currentPage);
  const { sliderItemRef } = useDomProvider();

  return (
    <>
      {[-1, 0, 1].map(offset => {
        // Determine the actual page number based on offset
        // -1 = previous page
        //  0 = current page
        //  1 = next page
        const page = currentPage + offset;
        return pages?.get(page)?.map((card: Card, index: number) => {
          let prevCard: Card = card;
          let nextCard: Card = card;

          const cardIndex = CARDS.indexOf(card);

          if (offset === -1 && index === 0) {
            const prevCardIndex = (cardIndex - 1 + CARDS.length) % CARDS.length;
            prevCard = CARDS[prevCardIndex];
          }

          if (offset === 1 && index === cardsPerPage - 1) {
            const nextCardIndex = (cardIndex + 1) % CARDS.length;
            nextCard = CARDS[nextCardIndex];
          }

          return (
            <Fragment key={`${page}-${index}`}>
              {offset === -1 && index === 0 && <Tile card={prevCard} index={index} />}

              <Tile
                ref={page === currentPage && index === 0 ? sliderItemRef : undefined}
                card={card}
                index={index}
                isVisible={offset === 0}
              />

              {offset === 1 && index === cardsPerPage - 1 && <Tile card={nextCard} index={index} />}
            </Fragment>
          );
        });
      })}
    </>
  );
};

export default TileList;
