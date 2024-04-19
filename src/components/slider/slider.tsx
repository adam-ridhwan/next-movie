'use client';

import { useEffect } from 'react';
import { useDomContext } from '@/providers/dom-provider';
import chalk from 'chalk';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';
import { HeadingExtraSmall } from '@/components/fonts';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useResizeWindow } from '@/components/slider/hooks/use-resize-window';
import { useScrollbarWidth } from '@/components/slider/hooks/use-scrollbar-width';
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

type SliderProps = {
  header: string;
};

const Slider = ({ header }: SliderProps) => {
  const {
    state: { pages },
    actions: { goToFirstPage },
  } = usePagination();
  const {
    state: { isMounted },
  } = usePageUtils();

  useEffectOnce(() => goToFirstPage());
  useResizeWindow();
  useScrollbarWidth();

  useEffect(() => {
    if (!isMounted || DEVELOPMENT_MODE) return;
    log(' SLIDER PAGES ', '──────────────────────────────────');

    // [...pages.entries()]
    //   .sort((a, b) => a[0] - b[0])
    //   .forEach(([pageIndex, tiles], index) => {
    //     // eslint-disable-next-line no-console
    //     console.log(
    //       `Page ${pageIndex}:`,
    //       tiles.map(card => index)
    //     );
    //   });

    log('─────────────────────────────────────────────────');
  }, [pages, isMounted]);

  return (
    <div className='group/slider'>
      <div className='mx-[0.50%] flex h-20 flex-row items-center justify-between px-leftRightCustom pt-10'>
        <HeadingExtraSmall>{header}</HeadingExtraSmall>
        <PageIndicator />
      </div>

      <div className='relative flex flex-row'>
        <PaginateLeftButton />
        <TileList />
        <PaginateRightButton />
      </div>
    </div>
  );
};

export default Slider;
