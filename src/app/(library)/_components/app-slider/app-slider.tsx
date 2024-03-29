'use client';

import React, { useEffect } from 'react';

import { cn } from '@/app/_lib/utils';
import { useDomProvider } from '@/app/_providers/dom-provider';
import { useSliderStore } from '@/app/_providers/slider-provider';
import LeftButton from '@/app/(library)/_components/app-slider/left-button';
import RightButton from '@/app/(library)/_components/app-slider/right-button';
import SliderItem from '@/app/(library)/_components/app-slider/tile';
import { Card } from '@/app/(library)/page';

const AppSlider = () => {
  const CARDS = useSliderStore(state => state.CARDS);
  const pages = useSliderStore(state => state.pages);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);
  const setPages = useSliderStore(state => state.setPages);
  const setCache = useSliderStore(state => state.setCache);
  const setTrailingCardsTotal = useSliderStore(state => state.setTrailingCardsTotal);
  const isAnimating = useSliderStore(state => state.isAnimating);
  const translatePercentage = useSliderStore(state => state.translatePercentage);
  const currentPage = useSliderStore(state => state.currentPage);
  const maxPage = useSliderStore(state => state.maxPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  const { sliderRef, sliderItemRef } = useDomProvider();

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

    setPages(pages);
    setCache(pages);
    setTrailingCardsTotal(lastPage.length);

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
    >
      <div className='fixed left-1/2 top-0  text-[60px] font-bold'>{currentPage}</div>
      <div
        className={cn(
          'slider relative flex w-full flex-row px-10',
          'bg-green-600', // for testing purposes
          { 'justify-center': hasPaginated || currentPage > 1 },
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
            ?.get(page)
            ?.map((card: Card, index: number) => (
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

      {currentPage > 1 && <LeftButton />}
      <RightButton />
    </div>
  );
};

export default AppSlider;
