'use client';

import { log } from 'console';
import { useEffect, useRef, useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { useMap } from 'usehooks-ts';

import { TODO } from '@/lib/types';
import { cn } from '@/lib/utils';
import { SliderItem } from '@/app/_components/app-slider/app-slider-item';
import { Button } from '@/app/_components/ui/button';

const CARDS: TODO = Array.from({ length: 13 }, (_, index) => ({
  id: `${index + 1}`,
  imageUrl: `https://picsum.photos/id/54/200/300`,
  year: '2019',
  category: 'Movie',
  rating: 'PG',
  title: `Beyond Earth ${index + 1}`,
}));

const DIRECTION = {
  left: 'LEFT',
  right: 'RIGHT',
} as const;
type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

const LEFT_SECTION = 'left section';
const MIDDLE_SECTION = 'middle section';
const RIGHT_SECTION = 'right section';

const SECTION = {
  page1: LEFT_SECTION,
  page2: MIDDLE_SECTION,
  page3: RIGHT_SECTION,
} as const;
type Section = (typeof SECTION)[keyof typeof SECTION];

const MEDIA_QUERY = {
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
};

const PADDING = 80;
const SECTION_LENGTH = Object.keys(SECTION).length;
const TWO_EXTRA_CARDS = 2;

const fetchedCardsAtom = atom(CARDS);
const numberOfVisibleCardsAtom = atom(6);
const currentPageAtom = atom(1);

export const Slider = () => {
  const fetchedCards = useAtomValue(fetchedCardsAtom);
  const [numberOfVisibleCards, setNumberOfVisibleCards] = useAtom(numberOfVisibleCardsAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  // 3 pages of cards + 2 extra cards
  const totalCardsPerPage = numberOfVisibleCards * SECTION_LENGTH + TWO_EXTRA_CARDS;
  const [totalPages, setTotalPages] = useState(Math.ceil(7));
  const [pages, pagesAction] = useMap<number, TODO>([[1, fetchedCards.slice(0, totalPages)]]);

  const [isAnimating, setIsAnimating] = useState(false);
  const [translateAmount, setTranslateAmount] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const prevCardsPerPageRef = useRef(numberOfVisibleCards);
  const prevWidth = useRef(0);

  const getCardsPerPage = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < MEDIA_QUERY.sm) return 2;
    if (windowWidth < MEDIA_QUERY.md) return 3;
    if (windowWidth < MEDIA_QUERY.lg) return 4;
    if (windowWidth < MEDIA_QUERY.xl) return 5;
    return 6;
  };

  // init
  useEffect(() => {
    const initVisibleCardsPerPage = getCardsPerPage();
    const initTotalPages = Math.ceil(fetchedCards.length / initVisibleCardsPerPage);
    console.log('initTotalPages', initTotalPages);

    const paginatedCards: [number, TODO[]][] = Array.from({ length: initTotalPages }, (_, pageIndex) => {
      const startIndex = pageIndex * initVisibleCardsPerPage;
      const endIndex = startIndex + initVisibleCardsPerPage;
      return [pageIndex + 1, fetchedCards.slice(startIndex, endIndex)];
    });

    pagesAction.setAll(paginatedCards);
    console.log('n', paginatedCards);
    console.log('───────────────────────────────────────────────────────');

    setTotalPages(initTotalPages);
    setNumberOfVisibleCards(initVisibleCardsPerPage);
    prevCardsPerPageRef.current = initVisibleCardsPerPage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ────────────────────────────────────────────────────────────────────────────────
   * Handles the scroll event when the user clicks the left or right arrow
   * @param direction - The direction of the scroll
   * @returns void
   * ────────────────────────────────────────────────────────────────────────────── */
  const handleScroll = (direction: Direction) => {
    setIsAnimating(true);

    if (!sliderRef.current) return;
    const isScrollingLeft = direction === DIRECTION.left;
    const { offsetWidth } = sliderRef.current;
    const percentage = ((offsetWidth - PADDING) / window.innerWidth) * 100;
    const translateAmount = isScrollingLeft ? percentage : -percentage;
    const newPage = isScrollingLeft ? currentPage - 1 : currentPage + 1;

    setTranslateAmount(prev => prev + translateAmount);

    setTimeout(() => {
      setIsAnimating(false);

      // const startIndex = isScrollingLeft
      //   ? Math.max(0, (currentPage - 3) * numberOfVisibleCards)
      //   : Math.max(0, currentPage * numberOfVisibleCards - numberOfVisibleCards);
      // const endIndex = startIndex + totalCardsPerPage;

      // console.log('newCards', newCards.length);
      // console.log('totalCardsPerPage', totalCardsPerPage);
      // console.log('───────────────────────────────────────────────────────');

      setCurrentPage(newPage);
      console.log('newPage', newPage);
      if (newPage === 1) return;
      console.log('translated');

      console.log('totalPages', totalPages);
      // setTranslateAmount(isScrollingLeft ? -translateAmount : translateAmount);
      setTranslateAmount(0);
    }, 700);
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
  // }, [cards, numberOfVisibleCards, cards, cards.length, currentPage, setNumberOfVisibleCards, totalCardsPerPage]);

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
          transform: `translate3d(${translateAmount}%, 0, 0)`,
        }}
      >
        {
          // Iterate through currentPage - 1, currentPage, currentPage + 1
          [-1, 0, 1].flatMap(offset => {
            const page = currentPage + offset; // Determine the actual page number based on offset
            return (
              pages.get(page)?.map((card: TODO, index: number) => (
                // Render SliderItem, marking cards on the current page as visible
                <SliderItem
                  key={`${page}-${index}`} // Ensure keys are unique across all pages
                  card={card}
                  index={index}
                  currentPage={currentPage}
                  isVisible={offset === 0} // Only mark as visible if on the current page
                />
              )) || []
            ); // Return an empty array if there are no cards for this page
          })
        }
      </div>

      {currentPage > 1 && (
        <Button
          disabled={isAnimating}
          onClick={() => handleScroll(DIRECTION.left)}
          className='absolute left-0 top-0 flex h-full w-10 items-center justify-center
          rounded-bl-none rounded-tl-none bg-darkerBlue/30 hover:bg-darkestBlue/50'
          variant='ghost'
        >
          {'<'}
        </Button>
      )}

      <Button
        disabled={isAnimating}
        onClick={() => handleScroll(DIRECTION.right)}
        className='absolute right-0 top-0 flex h-full w-10 items-center justify-center
        rounded-br-none rounded-tr-none bg-darkerBlue/30 hover:bg-darkestBlue/50'
        variant='ghost'
      >
        {'>'}
      </Button>
    </div>
  );
};
