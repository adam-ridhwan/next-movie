'use client';

import { useEffect, useRef, useState } from 'react';
import { atom, useAtomValue } from 'jotai';
import { useBoolean, useMap, useStep } from 'usehooks-ts';

import SliderItem from '@/app/_components/app-slider/app-slider-item';
import { Button } from '@/app/_components/ui/button';
import { TODO } from '@/app/_lib/types';
import { cn } from '@/app/_lib/utils';

const CARDS: TODO = Array.from({ length: 7 }, (_, index) => ({
  id: `${index + 1}`,
  imageUrl: `https://picsum.photos/id/54/200/300`,
  year: '2019',
  category: 'Movie',
  rating: 'PG',
  title: `Beyond Earth ${index + 1}`,
}));

const MEDIA_QUERY = {
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
};

const PADDING = 80;

const TIMEOUT_DURATION = 700;

const fetchedCardsAtom = atom(CARDS);

export const Slider = () => {
  const FETCHED_CARDS = useAtomValue(fetchedCardsAtom);

  const [pages, pagesAction] = useMap<number, TODO>([[1, FETCHED_CARDS.slice(0, 7)]]);

  const [currentPage, { goToPrevStep: goToPrevPage, goToNextStep: goToNextPage }] = useStep(pages.size);

  const [numberOfVisibleCards, setNumberOfVisibleCards] = useState(6);
  const [numberOfTrailingCards, setNumberOfTrailingCards] = useState<number>(0);

  const { value: isAnimating, setTrue: startAnimation, setFalse: stopAnimation } = useBoolean(false);
  const [translatePercentage, setTranslateAmount] = useState<number | undefined>(0);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderItemRef = useRef<HTMLDivElement | null>(null);
  const prevCardsPerPageRef = useRef(numberOfVisibleCards);
  // const prevWidth = useRef(0);

  const getCardsPerPage = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < MEDIA_QUERY.sm) return 2;
    if (windowWidth < MEDIA_QUERY.md) return 3;
    if (windowWidth < MEDIA_QUERY.lg) return 4;
    if (windowWidth < MEDIA_QUERY.xl) return 5;
    return 6;
  };

  /** ──────────────────────────────────────────────────────────────────────────
   * Initializes the slider with the first page of cards
   * ──────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const initNumberOfVisibleCards = getCardsPerPage();
    const initTotalPages = Math.ceil(FETCHED_CARDS.length / initNumberOfVisibleCards);

    const initPages: [number, TODO[]][] = Array.from({ length: initTotalPages }, (_, pageIndex) => {
      const startIndex = pageIndex * initNumberOfVisibleCards;
      const endIndex = startIndex + initNumberOfVisibleCards;
      return [pageIndex + 1, FETCHED_CARDS.slice(startIndex, endIndex)];
    });

    const initTrailingCardsLength = initPages[initPages.length - 1][1].length;
    setNumberOfTrailingCards(initTrailingCardsLength);

    // If the last page has less than the required number of cards,
    // fill it up with the remaining cards
    if (initPages.length > 1 && initPages[initPages.length - 1][1].length !== initNumberOfVisibleCards) {
      const itemsNeeded = initNumberOfVisibleCards - initPages[initPages.length - 1][1].length;

      initPages[initPages.length - 1][1] = [
        ...initPages[initPages.length - 1][1],
        ...FETCHED_CARDS.slice(0, itemsNeeded),
      ];
    }

    console.log('initNumberOfVisibleCards', initNumberOfVisibleCards);
    console.log('initTotalPages', initTotalPages);
    console.log('initTrailingCardsLength', initTrailingCardsLength);
    console.log('initPages', initPages);
    console.log('───────────────────────────────────────────────────────');

    pagesAction.setAll(initPages);
    setNumberOfVisibleCards(initNumberOfVisibleCards);
    prevCardsPerPageRef.current = initNumberOfVisibleCards;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ────────────────────────────────────────────────────────────────────────────────
   * Calculates the percentage of the slider that needs to be translated
   * @returns number
   * ────────────────────────────────────────────────────────────────────────────── */
  const getTranslatePercentage = ({ isLastPage }: { isLastPage?: boolean } = {}): number => {
    if (!sliderRef.current) return 0;

    const windowWidth = window.innerWidth;
    const { offsetWidth: sliderWidth } = sliderRef.current;
    if (!isLastPage) return ((sliderWidth - PADDING) / windowWidth) * 100;

    if (!sliderItemRef.current) return 0;
    const { offsetWidth: sliderItemWidth } = sliderItemRef.current;
    return ((numberOfTrailingCards * sliderItemWidth) / windowWidth) * -100;
  };

  /** ────────────────────────────────────────────────────────────────────────────────
   * Handles the scroll event when the user clicks LEFT arrow
   * @returns void
   * * ────────────────────────────────────────────────────────────────────────────── */
  const handleLeftScroll = () => {
    startAnimation();
    const newCurrentPage = currentPage - 1;
    const isLastPage = newCurrentPage === pages.size;

    setTranslateAmount(getTranslatePercentage());

    console.log('previous page', pages.get(newCurrentPage - 1));
    console.log('current page', pages.get(newCurrentPage));
    console.log('next page', pages.get(newCurrentPage + 1));
    console.log('───────────────────────────────────────────────────────');

    setTimeout(() => {
      stopAnimation();
      goToPrevPage();
      setTranslateAmount(0);
    }, TIMEOUT_DURATION);

    return;
  };

  /** ────────────────────────────────────────────────────────────────────────────────
   * Handles the scroll event when the user clicks RIGHT arrow
   * @returns void
   * ────────────────────────────────────────────────────────────────────────────── */
  const handleRightScroll = () => {
    console.log('handleRightScroll');
    startAnimation();
    const newCurrentPage = currentPage + 1;
    const isLastPage = newCurrentPage === pages.size;

    isLastPage
      ? setTranslateAmount(getTranslatePercentage({ isLastPage }))
      : setTranslateAmount(getTranslatePercentage() * -1);

    console.log('previous page', pages.get(newCurrentPage - 1));
    console.log('current page', pages.get(newCurrentPage));
    console.log('next page', pages.get(newCurrentPage + 1));
    console.log('───────────────────────────────────────────────────────');

    setTimeout(() => {
      stopAnimation();
      goToNextPage();

      if (!isLastPage) return setTranslateAmount(0);

      setTranslateAmount(0);

      const newPages: [number, TODO[]][] = [];
      const totalPages = pages.size;
      let fetchedCardIndex = FETCHED_CARDS.length - 1;

      console.log('totalPages', totalPages);
      console.log('FETCHED_CARDS.length', FETCHED_CARDS.length);

      const array = [];

      const totalLength = pages.size * numberOfVisibleCards;
      console.log('totalLength', totalLength);

      for (let i = totalLength; i > 0; i--) {
        array.unshift(FETCHED_CARDS[fetchedCardIndex--]);
        if (fetchedCardIndex === -1) {
          fetchedCardIndex = FETCHED_CARDS.length - 1;
        }
      }

      // we need to add one extra page for alignment
      for (let i = 0; i < numberOfVisibleCards; i++) {
        array.push(FETCHED_CARDS[i]);
      }

      for (let i = 0; i < pages.size + 1; i++) {
        // Example with 3 visible cards
        // 0, 3
        // 3, 6
        // 6, 9
        // 9, 12
        const startIndex = i * numberOfVisibleCards;
        const endIndex = startIndex + numberOfVisibleCards;
        const subArray = array.slice(startIndex, endIndex);
        newPages.push([i + 1, subArray]);
      }

      console.log('array', array);
      console.log('updatedPages', newPages);

      pagesAction.reset();
      pagesAction.setAll(newPages);
    }, TIMEOUT_DURATION);

    return;
  };

  // useEffect(() => {
  //   console.log('currentPage', currentPage);
  //   console.log('pages', pages);
  //
  //   console.log('left', pages.get(currentPage - 1));
  //   console.log('mid', pages.get(currentPage));
  //   console.log('start', pages.get(currentPage + 1));
  // }, [currentPage, pages]);

  /** ────────────────────────────────────────────────────────────────────────────────
   * Handles the resize event when the user resizes the window
   * @returns void
   * ────────────────────────────────────────────────────────────────────────────── */
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (!sliderRef.current) return;
  //
  //     const newCardsPerPage = getCardsPerPage();
  //
  //     if (newCardsPerPage !== prevCardsPerPageRef.current) {
  //       const newTotalCardsPerPage = newCardsPerPage * SECTION_LENGTH + TWO_EXTRA_CARDS;
  //
  //       const [first, second, ...rest] = cards;
  //       const startIndex = 0;
  //       const endIndex = startIndex + newTotalCardsPerPage;
  //       const newCards = rest.slice(startIndex, endIndex);
  //
  //       console.log('first', first.id);
  //       console.log('second', second.id);
  //       console.log('rest', rest);
  //       console.log('newCardsPerPage', newCards.length);
  //       console.log('newCards', newCards.length);
  //       console.log('totalCardsPerPage', newTotalCardsPerPage);
  //       console.log('───────────────────────────────────────────────────────');
  //
  //       setCards(newCards);
  //       setNumberOfVisibleCards(newCardsPerPage);
  //       prevCardsPerPageRef.current = newCardsPerPage;
  //     }
  //
  //     const newWidth = window.innerWidth;
  //     const { offsetWidth } = sliderRef.current;
  //     const percentage = ((offsetWidth - PADDING) / window.innerWidth) * 100;
  //
  //     prevWidth.current = newWidth;
  //   };
  //
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, [cards, numberOfVisibleCards, cards, cards.length, currentPage, setNumberOfVisibleCards,
  // totalCardsPerPage]);

  return (
    <div
      ref={sliderRef}
      className={cn(
        'relative flex w-full',
        'bg-yellow-600' // for testing purposes
      )}
    >
      <div className='fixed left-1/2 top-0  text-[60px] font-bold'>{currentPage}</div>
      <div
        className={cn(
          'slider relative flex w-full flex-row px-10',
          'bg-green-600', // for testing purposes
          { 'justify-center': currentPage > 1 },

          {
            'transition-transform duration-700': isAnimating,
          }
        )}
        style={{
          transform: translatePercentage ? `translate3d(${translatePercentage}%, 0, 0)` : undefined,
        }}
      >
        {[-1, 0, 1].flatMap(offset => {
          // Determine the actual page number based on offset
          // -1 = previous page
          //  0 = current page
          //  1 = next page
          const page = currentPage + offset;
          return pages.get(page)?.map((card: TODO, index: number) => {
            return (
              <SliderItem
                key={`${page}-${index}`}
                ref={sliderItemRef}
                card={card}
                index={index}
                currentPage={currentPage}
                isVisible={offset === 0} // Only mark as visible if on the current page
              />
            );
          });
        })}
      </div>

      <Button
        disabled={isAnimating}
        onClick={() => handleLeftScroll()}
        className='absolute left-0 top-0 flex h-full w-10 items-center justify-center
          rounded-bl-none rounded-tl-none bg-darkerBlue/30 hover:bg-darkestBlue/50'
        variant='ghost'
      >
        {'<'}
      </Button>

      <Button
        disabled={isAnimating}
        onClick={() => handleRightScroll()}
        className='absolute right-0 top-0 flex h-full w-10 items-center justify-center
        rounded-br-none rounded-tr-none bg-darkerBlue/30 hover:bg-darkestBlue/50'
        variant='ghost'
      >
        {'>'}
      </Button>
    </div>
  );
};
