import { Fragment } from 'react';

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
          const isFirstItemCurrentPage = page === currentPage && index === 0;

          const isFirstPlaceholder = offset === -1 && index === 0;
          const isLastPlaceholder = offset === 1 && index === cardsPerPage - 1;

          const lastItemPreviousPage = offset === -1 && index === cardsPerPage - 1;
          const allItemsCurrentPage = offset === 0;
          const firstItemNextPage = offset === 1 && index === 0;

          const getPrevCard = () => {
            if (offset !== -1 && index !== 0) return card;

            const prevPage = pages.get(currentPage - 1);
            if (!prevPage) throw new Error('First item not found');

            const indexOfFirstItem = CARDS.findIndex(card => card.id === prevPage[0].id);
            if (indexOfFirstItem === -1) throw new Error('Index of first item not found');

            const indexOfPreviousItem = indexOfFirstItem ? indexOfFirstItem - 1 : CARDS.length - 1;
            return CARDS[indexOfPreviousItem];
          };

          const getNextCard = (): Card => {
            if (offset !== 1 && index !== cardsPerPage - 1) return card;

            const nextPage = pages.get(currentPage + 1);
            if (!nextPage) throw new Error('Next item not found');

            const indexOfLastItem = CARDS.findIndex(
              card => card.id === nextPage[cardsPerPage - 1].id
            );
            if (indexOfLastItem === -1) throw new Error('Index of last item not found');

            const indexOfNextItem = indexOfLastItem === CARDS.length - 1 ? 0 : indexOfLastItem + 1;
            return CARDS[indexOfNextItem];
          };

          const getDisplayNumber = () => {
            if (offset === 1) return cardsPerPage + 1;
            if (offset === -1) return 0;
            return index + 1;
          };

          return (
            <Fragment key={`${page}-${index}`}>
              {isFirstPlaceholder && (
                <Tile card={getPrevCard()} displayNumber={getDisplayNumber()} />
              )}

              <Tile
                ref={isFirstItemCurrentPage ? sliderItemRef : undefined}
                card={card}
                displayNumber={getDisplayNumber()}
                isVisibleOnScreen={lastItemPreviousPage || allItemsCurrentPage || firstItemNextPage}
              />

              {isLastPlaceholder && (
                <Tile card={getNextCard()} displayNumber={getDisplayNumber()} />
              )}
            </Fragment>
          );
        });
      })}
    </>
  );
};

export default TileList;
