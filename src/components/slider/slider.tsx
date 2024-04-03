'use client';

import { useEffect } from 'react';
import { useDomContext } from '@/providers/dom-provider';
import chalk from 'chalk';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import { useWindowResize } from '@/components/slider/hooks/use-window-resize';
import PaginateLeftButton from '@/components/slider/pagination-button/paginate-left-button';
import PaginateRightButton from '@/components/slider/pagination-button/paginate-right-button';
import Tiles from '@/components/slider/tiles/tiles';

const Slider = () => {
  const {
    state: { pages, currentPage },
    status: { isMounted, hasPaginated },
    actions: { goToFirstPage },
  } = usePagination();
  const { isAnimating } = useAnimation();

  const { sliderRef } = useDomContext();

  useEffectOnce(() => goToFirstPage());
  useWindowResize();

  useEffect(() => {
    if (!isMounted) return;
    console.log(chalk.bgGreen.black(' SLIDER PAGES '), '──────────────────────────────────');

    [...pages.entries()]
      .sort((a, b) => a[0] - b[0])
      .forEach(([pageIndex, tiles]) => {
        console.log(
          `Page ${pageIndex}:`,
          tiles.map(card => (card ? card.id : undefined))
        );
      });

    console.log('─────────────────────────────────────────────────');
  }, [pages, currentPage, isAnimating]);

  return (
    <>
      <div
        ref={sliderRef}
        className={cn('group/slider relative flex w-full', {
          'bg-yellow-600': DEVELOPMENT_MODE,
        })}
      >
        {DEVELOPMENT_MODE && (
          <div className='absolute -top-16 left-1/2 z-50 -translate-x-1/2 text-[50px] font-bold'>
            {currentPage}
          </div>
        )}
        <PaginateLeftButton />
        <Tiles />
        <PaginateRightButton />
      </div>
    </>
  );
};

export default Slider;
