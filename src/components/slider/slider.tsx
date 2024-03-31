'use client';

import { useEffect } from 'react';
import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';
import { PagesMap } from '@/providers/slider-store';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { Card } from '@/lib/types';
import { cn } from '@/lib/utils';
import LeftButton from '@/components/slider/left-button';
import RightButton from '@/components/slider/right-button';
import TileList from '@/components/slider/tile-list';

const Slider = () => {
  const CARDS = useSliderStore(state => state.CARDS);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);
  const setInitialPages = useSliderStore(state => state.setInitialPages);
  const isAnimating = useSliderStore(state => state.isAnimating);
  const translatePercentage = useSliderStore(state => state.translatePercentage);
  const currentPage = useSliderStore(state => state.currentPage);
  const maxPage = useSliderStore(state => state.maxPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  const { sliderRef } = useDomContext();

  useEffect(() => {
    const pagesMap: PagesMap = new Map<number, Card[]>();

    for (let pageIndex = 0; pageIndex < maxPage; pageIndex++) {
      const startIndex = pageIndex * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      pagesMap.set(pageIndex + 1, CARDS.slice(startIndex, endIndex));
    }

    const lastPage = pagesMap.get(maxPage);

    if (lastPage && maxPage < cardsPerPage && pagesMap.size > 1) {
      const cardsNeeded = cardsPerPage - lastPage.length;
      pagesMap.set(maxPage, [...lastPage, ...CARDS.slice(0, cardsNeeded)]);
    }

    const lastPageLength = lastPage ? lastPage.length : 0;
    setInitialPages(pagesMap, lastPageLength);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={sliderRef}
      className={cn('group relative flex w-full', {
        'bg-yellow-600': DEVELOPMENT_MODE,
      })}
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
