'use client';

import { useEffect } from 'react';
import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';
import chalk from 'chalk';

import { DEVELOPMENT_MODE, DIRECTION } from '@/lib/constants';
import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { cn } from '@/lib/utils';
import PaginationButton from '@/components/slider/pagination-button';
import Tiles from '@/components/slider/tiles/tiles';
import { useTranslatePercentage } from '@/components/slider/use-translate-percentage';
import useWindowResize from '@/components/slider/use-window-resize';

const Slider = () => {
  const pages = useSliderStore(state => state.pages);
  const setInitialPages = useSliderStore(state => state.setInitialPages);
  const currentPage = useSliderStore(state => state.currentPage);
  const handleLeftScroll = useSliderStore(state => state.handleLeftScroll);
  const handleRightScroll = useSliderStore(state => state.handleRightScroll);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const isMounted = useSliderStore(state => state.isMounted);

  const getTranslatePercentage = useTranslatePercentage();
  const { sliderRef } = useDomContext();

  useEffectOnce(() => setInitialPages());
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
        <PaginationButton
          onClick={() => handleLeftScroll(getTranslatePercentage)}
          direction={DIRECTION.LEFT}
          className={cn({ hidden: !hasPaginated })}
        />
        <Tiles />
        <PaginationButton
          onClick={() => handleRightScroll(getTranslatePercentage)}
          direction={DIRECTION.RIGHT}
        />
      </div>
    </>
  );
};

export default Slider;
