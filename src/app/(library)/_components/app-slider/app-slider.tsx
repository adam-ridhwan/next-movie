'use client';

import { useEffect } from 'react';

import { cn, DEVELOPMENT_MODE } from '@/app/_lib/utils';
import { useDomProvider } from '@/app/_providers/dom-provider';
import { useSliderStore } from '@/app/_providers/slider-provider';
import { PagesArray } from '@/app/_providers/slider-store';
import LeftButton from '@/app/(library)/_components/app-slider/left-button';
import RightButton from '@/app/(library)/_components/app-slider/right-button';
import TileList from '@/app/(library)/_components/app-slider/tile-list';

const AppSlider = () => {
  const CARDS = useSliderStore(state => state.CARDS);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);
  const setPages = useSliderStore(state => state.setPages);
  const isAnimating = useSliderStore(state => state.isAnimating);
  const translatePercentage = useSliderStore(state => state.translatePercentage);
  const currentPage = useSliderStore(state => state.currentPage);
  const maxPage = useSliderStore(state => state.maxPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  const { sliderRef } = useDomProvider();

  // const renderCount = useRenderCount();

  useEffect(() => {
    const pages: PagesArray = Array.from({ length: maxPage }, (_, pageIndex) => {
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
      className={cn('group relative flex w-full', { 'bg-yellow-600': DEVELOPMENT_MODE })}
    >
      <div className='fixed left-1/2 top-0 text-[60px] font-bold'>{currentPage}</div>
      <div
        className={cn(
          'slider relative flex w-full flex-row px-12',
          { 'justify-center': hasPaginated },
          { 'transition-transform duration-700': isAnimating },
          { 'bg-green-600': DEVELOPMENT_MODE }
        )}
        style={{
          transform: translatePercentage ? `translate3d(${translatePercentage}%, 0, 0)` : undefined,
        }}
      >
        <TileList />
      </div>

      <LeftButton />
      <RightButton />
    </div>
  );
};

export default AppSlider;
