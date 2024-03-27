'use client';

import { useEffect, useRef, useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { useBoolean, useMap, useStep } from 'usehooks-ts';

import { TODO } from '@/lib/types';
import { cn } from '@/lib/utils';
import SliderItem from '@/app/_components/app-slider/app-slider-item';
import { Button } from '@/app/_components/ui/button';

const CARDS: TODO = Array.from({ length: 13 }, (_, index) => ({
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

  const [visibleCardsLength, setVisibleCardsLength] = useState(6);
  const [trailingCardsLength, setTrailingCardsLength] = useState<number>(0);

  const { value: isAnimating, setTrue: startAnimation, setFalse: stopAnimation } = useBoolean(false);
  const [translatePercentage, setTranslateAmount] = useState<number | undefined>(0);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderItemRef = useRef<HTMLDivElement | null>(null);
  const prevCardsPerPageRef = useRef(visibleCardsLength);
  // const prevWidth = useRef(0);

  const getCardsPerPage = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < MEDIA_QUERY.sm) return 2;
    if (windowWidth < MEDIA_QUERY.md) return 3;
    if (windowWidth < MEDIA_QUERY.lg) return 4;
    if (windowWidth < MEDIA_QUERY.xl) return 5;
    return 6;
  };

  /** ────────────────────────────────────────────────────────────────────────────────
   * Initializes the slider with the first page of cards
   * ────────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const initVisibleCardsPerPage = getCardsPerPage();
    const initTotalPages = Math.ceil(FETCHED_CARDS.length / initVisibleCardsPerPage);

    const initPages: [number, TODO[]][] = Array.from({ length: initTotalPages }, (_, pageIndex) => {
      const startIndex = pageIndex * initVisibleCardsPerPage;
      const endIndex = startIndex + initVisibleCardsPerPage;
      return [pageIndex + 1, FETCHED_CARDS.slice(startIndex, endIndex)];
    });

    const initTrailingCardsLength = initPages[initPages.length - 1][1].length;
    setTrailingCardsLength(initTrailingCardsLength);

    // If the last page has less than the required number of cards, fill it up with the remaining cards
    if (initPages.length > 1 && initPages[initPages.length - 1][1].length !== initVisibleCardsPerPage) {
      const itemsNeeded = initVisibleCardsPerPage - initPages[initPages.length - 1][1].length;

      initPages[initPages.length - 1][1] = [
        ...initPages[initPages.length - 1][1],
        ...FETCHED_CARDS.slice(0, itemsNeeded),
      ];
    }
    console.log('initVisibleCardsPerPage', initVisibleCardsPerPage);
    console.log('initTotalPages', initTotalPages);
    console.log('initPages', initPages);
    console.log('initTrailingCardsLength', initTrailingCardsLength);
    console.log('───────────────────────────────────────────────────────');

    pagesAction.setAll(initPages);
    setVisibleCardsLength(initVisibleCardsPerPage);
    prevCardsPerPageRef.current = initVisibleCardsPerPage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ────────────────────────────────────────────────────────────────────────────────
   * Calculates the percentage of the slider that needs to be translated
   * @returns number
   * ────────────────────────────────────────────────────────────────────────────── */
  const getTranslatePercentage = ({ hasTrailingCards }: { hasTrailingCards?: boolean } = {}): number => {
    if (!sliderRef.current || !sliderItemRef.current) return 0;
    const windowWidth = window.innerWidth;
    const { offsetWidth: sliderWidth } = sliderRef.current;
    const { offsetWidth: sliderItemWidth } = sliderItemRef.current;

    if (!hasTrailingCards) return ((sliderWidth - PADDING) / windowWidth) * 100;

    const missingCards = visibleCardsLength - trailingCardsLength;
    console.log('hasTrailingCards');
    console.log('trailingCardsLength', trailingCardsLength);
    console.log('missingCards', missingCards);
    return ((trailingCardsLength * sliderItemWidth) / windowWidth) * 100;
  };

  /** ────────────────────────────────────────────────────────────────────────────────
   * Handles the scroll event when the user clicks LEFT arrow
   * @returns void
   * ────────────────────────────────────────────────────────────────────────────── */
  const handleLeftScroll = () => {
    startAnimation();
    setTranslateAmount(getTranslatePercentage());
    const newPage = currentPage - 1;
    console.log('previous page', pages.get(newPage - 1));
    console.log('current page', pages.get(newPage));
    console.log('next page', pages.get(newPage + 1));
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
    startAnimation();
    const newPage = currentPage + 1;
    const isLastPage = newPage === pages.size;

    isLastPage
      ? setTranslateAmount(getTranslatePercentage({ hasTrailingCards: isLastPage }) * -1)
      : setTranslateAmount(getTranslatePercentage() * -1);

    console.log('previous page', pages.get(newPage - 1));
    console.log('current page', pages.get(newPage));
    console.log('next page', pages.get(newPage + 1));
    console.log('───────────────────────────────────────────────────────');

    setTimeout(() => {
      stopAnimation();

      if (isLastPage)
        return setTranslateAmount(getTranslatePercentage({ hasTrailingCards: isLastPage }) * -1);

      setTranslateAmount(0);
      goToNextPage();
    }, TIMEOUT_DURATION);

    return;
  };

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
  //       setVisibleCardsLength(newCardsPerPage);
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
  // }, [cards, visibleCardsLength, cards, cards.length, currentPage, setVisibleCardsLength, totalCardsPerPage]);

  return (
    <div
      ref={sliderRef}
      className={cn(
        'relative flex w-full',
        'bg-yellow-600' // for testing purposes
      )}
    >
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
          return pages.get(page)?.map((card: TODO, index: number) => (
            <SliderItem
              key={`${page}-${index}`}
              ref={sliderItemRef}
              card={card}
              index={index}
              currentPage={currentPage}
              isVisible={offset === 0} // Only mark as visible if on the current page
            />
          ));
        })}
      </div>

      {currentPage > 1 && (
        <Button
          disabled={isAnimating}
          onClick={() => handleLeftScroll()}
          className='absolute left-0 top-0 flex h-full w-10 items-center justify-center
          rounded-bl-none rounded-tl-none bg-darkerBlue/30 hover:bg-darkestBlue/50'
          variant='ghost'
        >
          {'<'}
        </Button>
      )}

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
