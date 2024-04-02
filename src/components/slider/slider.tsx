'use client';

import { useEffect } from 'react';
import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';
import chalk from 'chalk';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { cn } from '@/lib/utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import useWindowResize from '@/components/slider/hooks/use-window-resize';
import PaginateLeftButton from '@/components/slider/pagination/paginate-left-button';
import PaginateRightButton from '@/components/slider/pagination/paginate-right-button';
import Tiles from '@/components/slider/tiles/tiles';

const Slider = () => {
  const pages = useSliderStore(state => state.pages);
  const isMounted = useSliderStore(state => state.isMounted);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  const { sliderRef } = useDomContext();

  const [currentPage, _, { goToFirstPage }] = usePagination();

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

    console.log('hasPaginated:', hasPaginated);
    console.log('─────────────────────────────────────────────────');
  }, [pages, currentPage]);

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
