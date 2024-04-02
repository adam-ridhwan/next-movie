'use client';

import { useEffect, useRef } from 'react';
import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';
import chalk from 'chalk';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { cn, getMaxPages, getTilesPerPage } from '@/lib/utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import PaginateLeftButton from '@/components/slider/pagination-button/paginate-left-button';
import PaginateRightButton from '@/components/slider/pagination-button/paginate-right-button';
import Tiles from '@/components/slider/tiles/tiles';

const Slider = () => {
  const [{ TILES, currentPage, pages }, { hasPaginated }, { goToFirstPage, goToLastPage }] =
    usePagination();
  const isMounted = useSliderStore(state => state.isMounted);
  const prevTilesPerPage = useRef(getTilesPerPage());
  const prevMaxPages = useRef(getMaxPages(TILES));

  const { sliderRef } = useDomContext();

  useEffectOnce(() => goToFirstPage());

  useEffect(() => {
    const handleResize = () => {
      const tilesPerPage = getTilesPerPage();
      const maxPages = getMaxPages(TILES);

      if (tilesPerPage === prevTilesPerPage.current) return;

      // const previousTiles = getMapItem({
      //   label: 'currentTilesOfPreviousMediaQuery',
      //   map: pages,
      //   key: currentPage,
      // });

      if (currentPage === 1) goToFirstPage();
      if (currentPage === prevMaxPages.current - 2) goToLastPage();

      prevTilesPerPage.current = tilesPerPage;
      prevMaxPages.current = maxPages;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [TILES, currentPage, goToFirstPage, goToLastPage, pages]);

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
