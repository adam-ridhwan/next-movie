'use client';

import { useEffect } from 'react';

import { cn } from '@/app/_lib/utils';
import { useDomProvider } from '@/app/_providers/dom-provider';
import { useSliderStore } from '@/app/_providers/slider-provider';
import LeftButton from '@/app/(library)/_components/app-slider/left-button';
import RightButton from '@/app/(library)/_components/app-slider/right-button';
import TileList from '@/app/(library)/_components/app-slider/tile-list';
import { Card } from '@/app/(library)/page';

const AppSlider = () => {
  const CARDS = useSliderStore(state => state.CARDS);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);
  const setPages = useSliderStore(state => state.setPages);
  const isAnimating = useSliderStore(state => state.isAnimating);
  const translatePercentage = useSliderStore(state => state.translatePercentage);
  const currentPage = useSliderStore(state => state.currentPage);
  const maxPage = useSliderStore(state => state.maxPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const isSliderPaginated = hasPaginated || currentPage > 1;
  const enterSlider = useSliderStore(state => state.enterSlider);
  const leaveSlider = useSliderStore(state => state.leaveSlider);

  const { sliderRef } = useDomProvider();

  // const renderCount = useRenderCount();

  useEffect(() => {
    const pages: [number, Card[]][] = Array.from({ length: maxPage }, (_, pageIndex) => {
      const startIndex = pageIndex * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      return [pageIndex + 1, CARDS.slice(startIndex, endIndex)];
    });

    const lastPage = pages[pages.length - 1][1];

    // If the last page has less than the required number of cards,
    // fill it up with the remaining cards
    if (pages.length > 1 && lastPage.length !== cardsPerPage) {
      const cardsNeeded = cardsPerPage - lastPage.length;
      pages[pages.length - 1][1] = [...lastPage, ...CARDS.slice(0, cardsNeeded)];
    }

    setPages(pages, lastPage.length);

    // prevCardsPerPageRef.current = cardsPerPage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={sliderRef}
      className={cn(
        'relative flex w-full',
        'bg-yellow-600' // for testing purposes
      )}
      onMouseEnter={() => enterSlider()}
      onMouseLeave={() => leaveSlider()}
    >
      <div className='fixed left-1/2 top-0  text-[60px] font-bold'>{currentPage}</div>
      <div
        className={cn(
          'slider relative flex w-full flex-row px-10',
          'bg-green-600', // for testing purposes
          { 'justify-center': isSliderPaginated },
          {
            'transition-transform duration-700': isAnimating,
          }
        )}
        style={{
          transform: translatePercentage ? `translate3d(${translatePercentage}%, 0, 0)` : undefined,
        }}
      >
        <TileList />
      </div>

      {isSliderPaginated && <LeftButton />}
      <RightButton />
    </div>
  );
};

export default AppSlider;
