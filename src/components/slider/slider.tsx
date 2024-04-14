'use client';

import { useEffect } from 'react';
import { useDomContext } from '@/providers/dom-provider';
import chalk from 'chalk';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useResizeWindow } from '@/components/slider/hooks/use-resize-window';
import PageIndicator from '@/components/slider/page-indicator/page-indicator';
import PaginateLeftButton from '@/components/slider/pagination-button/paginate-left-button';
import PaginateRightButton from '@/components/slider/pagination-button/paginate-right-button';
import TileList from '@/components/slider/tiles/tile-list';

function log(...args: string[]) {
  if (args.length > 1 && typeof args[0] === 'string') {
    const [label, ...rest] = args;
    logger([chalk.bgGreen.black(label), ...rest].join(' '));
  } else {
    logger(args.join(' '));
  }
}

const Slider = () => {
  const {
    state: { pages, currentPage },
    actions: { goToFirstPage },
  } = usePagination();
  const {
    state: { isMounted },
  } = usePageUtils();
  const { sliderRef } = useDomContext();

  useEffectOnce(() => goToFirstPage());
  useResizeWindow();

  useEffect(() => {
    if (!isMounted || !DEVELOPMENT_MODE) return;
    log(' SLIDER PAGES ', '──────────────────────────────────');

    [...pages.entries()]
      .sort((a, b) => a[0] - b[0])
      .forEach(([pageIndex, tiles]) => {
        // eslint-disable-next-line no-console
        console.log(
          `Page ${pageIndex}:`,
          tiles.map(card => (card ? card.title : undefined))
        );
      });

    log('─────────────────────────────────────────────────');
  }, [pages, isMounted]);

  return (
    <div ref={sliderRef} className={cn('group/slider relative flex w-full')}>
      {DEVELOPMENT_MODE && (
        <div className='absolute -top-16 left-1/2 z-50 -translate-x-1/2 text-[50px] font-bold'>
          {currentPage}
        </div>
      )}
      <PaginateLeftButton />
      <TileList />
      <PaginateRightButton />
      <PageIndicator />
    </div>
  );
};

export default Slider;
