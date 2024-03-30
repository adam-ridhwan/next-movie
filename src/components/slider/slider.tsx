'use client';

import { useEffect } from 'react';
import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';
import { PagesArray } from '@/providers/slider-store';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import LeftButton from '@/components/slider/left-button';
import RightButton from '@/components/slider/right-button';
import TileList from '@/components/slider/tile-list';

const Slider = () => {
  const CARDS = useSliderStore(state => state.CARDS);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);
  const setPages = useSliderStore(state => state.setPages);
  const isAnimating = useSliderStore(state => state.isAnimating);
  const translatePercentage = useSliderStore(state => state.translatePercentage);
  const currentPage = useSliderStore(state => state.currentPage);
  const maxPage = useSliderStore(state => state.maxPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  const { sliderRef } = useDomContext();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={sliderRef}
      className={cn('group relative flex w-full', { 'bg-yellow-600': DEVELOPMENT_MODE })}
    >
      {DEVELOPMENT_MODE && (
        <div className='fixed left-1/2 top-0 text-[60px] font-bold'>{currentPage}</div>
      )}

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

export default Slider;
