'use client';

import { useEffect, useRef, useState } from 'react';

import SliderItem from '@/app/_components/app-slider/slider-item';
import { Button } from '@/app/_components/ui/button';
import { useBoolean } from '@/app/_hooks/use-boolean';
import { useMap } from '@/app/_hooks/use-map';
import { usePagination } from '@/app/_hooks/use-pagination';
import { cn } from '@/app/_lib/utils';

const MEDIA_QUERY = {
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
};

const PADDING = 80;
const TIMEOUT_DURATION = 700;

type AppSliderProps<T> = {
  data: T[];
};

export const AppSlider = <T,>({ data: CARDS }: AppSliderProps<T>) => {
  const [pages, pagesAction] = useMap<number, T[]>([[1, CARDS.slice(0, 7)]]);
  const cachedPages = useRef<string>('');

  const [currentPage, { goToPrevPage, goToNextPage, resetToFirstPage }] = usePagination(pages.size);

  const [visibleCardsTotal, setVisibleCardsTotal] = useState(6);
  const [trailingCardsTotal, setTrailingCardsTotal] = useState<number>(0);

  const {
    value: isAnimating,
    setTrue: startAnimation,
    setFalse: stopAnimation,
  } = useBoolean(false);

  const [translatePercentage, setTranslatePercentage] = useState<number | undefined>(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderItemRef = useRef<HTMLDivElement>(null);
  const prevCardsPerPageRef = useRef(visibleCardsTotal);
  // const prevWidth = useRef(0);

  const getVisibleCardsTotal = () => {
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
    const initVisibleCardsTotal = getVisibleCardsTotal();
    const initPagesTotal = Math.ceil(CARDS.length / initVisibleCardsTotal);

    const initPages: [number, T[]][] = Array.from({ length: initPagesTotal }, (_, pageIndex) => {
      const startIndex = pageIndex * initVisibleCardsTotal;
      const endIndex = startIndex + initVisibleCardsTotal;
      return [pageIndex + 1, CARDS.slice(startIndex, endIndex)];
    });

    const initTrailingCardsTotal = initPages[initPages.length - 1][1].length;
    setTrailingCardsTotal(initTrailingCardsTotal);

    // If the last page has less than the required number of cards,
    // fill it up with the remaining cards
    if (
      initPages.length > 1 &&
      initPages[initPages.length - 1][1].length !== initVisibleCardsTotal
    ) {
      const cardsNeeded = initVisibleCardsTotal - initPages[initPages.length - 1][1].length;

      initPages[initPages.length - 1][1] = [
        ...initPages[initPages.length - 1][1],
        ...CARDS.slice(0, cardsNeeded),
      ];
    }

    console.log('initVisibleCardsTotal', initVisibleCardsTotal);
    console.log('initTrailingCardsTotal', initTrailingCardsTotal);
    console.log('initPages', initPages);
    console.log('───────────────────────────────────────────────────────');

    pagesAction.setAll(initPages);
    cachedPages.current = JSON.stringify(initPages);
    setVisibleCardsTotal(initVisibleCardsTotal);
    prevCardsPerPageRef.current = initVisibleCardsTotal;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ────────────────────────────────────────────────────────────────────────────────
   * Calculates the percentage of the slider that needs to be translated
   * @returns number
   * ────────────────────────────────────────────────────────────────────────────── */
  const getTranslatePercentage = ({ isLastPage }: { isLastPage?: boolean } = {}): number => {
    if (!sliderRef.current || !sliderItemRef.current) return 0;

    const windowWidth = window.innerWidth;
    const { offsetWidth: sliderWidth } = sliderRef.current;
    const { offsetWidth: sliderItemWidth } = sliderItemRef.current;

    if (!isLastPage) return ((sliderWidth - PADDING) / windowWidth) * 100;
    return ((trailingCardsTotal * sliderItemWidth) / windowWidth) * -100;
  };

  /** ────────────────────────────────────────────────────────────────────────────────
   * Handles the scroll event when the user clicks LEFT arrow
   * @returns void
   * * ────────────────────────────────────────────────────────────────────────────── */
  const handleLeftScroll = () => {
    startAnimation();
    // const newCurrentPage = currentPage - 1;

    setTranslatePercentage(getTranslatePercentage());

    setTimeout(() => {
      stopAnimation();
      goToPrevPage();
      setTranslatePercentage(0);
    }, TIMEOUT_DURATION);

    return;
  };

  /** ────────────────────────────────────────────────────────────────────────────────
   * Handles the scroll event when the user clicks RIGHT arrow
   * @returns void
   * ────────────────────────────────────────────────────────────────────────────── */
  const handleRightScroll = () => {
    startAnimation();

    const newCurrentPage = currentPage + 1;
    const isLastPage = newCurrentPage === pages.size;
    const canGoToNextPage = newCurrentPage <= Math.ceil(CARDS.length / visibleCardsTotal);

    !canGoToNextPage || !isLastPage
      ? setTranslatePercentage(getTranslatePercentage() * -1)
      : setTranslatePercentage(getTranslatePercentage({ isLastPage }));

    setTimeout(() => {
      stopAnimation();
      setTranslatePercentage(0);

      if (!canGoToNextPage) {
        resetToFirstPage();
        pagesAction.setAll(JSON.parse(cachedPages.current));
        return;
      }

      goToNextPage();
      if (!isLastPage) return;

      const newPages: [number, T[]][] = [];
      const newCardList = [];
      const totalNumberOfCards = pages.size * visibleCardsTotal;

      let decrementingCardIndex = CARDS.length - 1;
      for (let i = totalNumberOfCards; i > 0; i--) {
        newCardList.unshift(CARDS[decrementingCardIndex--]);
        if (decrementingCardIndex === -1) {
          decrementingCardIndex = CARDS.length - 1;
        }
      }

      // Add one extra page for alignment after last page for alignment
      for (let i = 0; i < visibleCardsTotal; i++) {
        newCardList.push(CARDS[i]);
      }

      /*
       * Creates new nested array of pages to update useMap()
       * Example: [[1, [card1, card2, card3]], [2, [card4, card5, card6]]]
       * Note: This adds an extra page for alignment
       */
      for (let i = 0; i < pages.size + 1; i++) {
        // Example with 3 visible cards
        // 0, 3
        // 3, 6
        // 6, 9
        // 9, 12
        const startIndex = i * visibleCardsTotal;
        const endIndex = startIndex + visibleCardsTotal;
        const subArray = newCardList.slice(startIndex, endIndex);
        newPages.push([i + 1, subArray]);
      }

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
  //     const newCardsPerPage = getVisibleCardsTotal();
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
  //       setVisibleCardsTotal(newCardsPerPage);
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
  // }, [cards, visibleCardsTotal, cards, cards.length, currentPage, setVisibleCardsTotal,
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
        {[-1, 0, 1].map(offset => {
          // Determine the actual page number based on offset
          // -1 = previous page
          //  0 = current page
          //  1 = next page
          const page = currentPage + offset;
          return pages
            .get(page)
            ?.map((card: T, index: number) => (
              <SliderItem
                key={`${page}-${index}`}
                ref={page === currentPage && index === 0 ? sliderItemRef : undefined}
                card={card}
                index={index}
                isVisible={offset === 0}
              />
            ));
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
