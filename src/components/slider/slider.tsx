'use client';

import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { HeadingExtraSmall } from '@/components/fonts';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useResizeWindow } from '@/components/slider/hooks/use-resize-window';
import PageIndicator from '@/components/slider/page-indicator/page-indicator';
import PaginateLeftButton from '@/components/slider/pagination-button/paginate-left-button';
import PaginateRightButton from '@/components/slider/pagination-button/paginate-right-button';
import TileList from '@/components/slider/tiles/tile-list';

type SliderProps = {
  header: string;
};

const Slider = ({ header }: SliderProps) => {
  const {
    actions: { goToFirstPage },
  } = usePagination();

  useEffectOnce(() => goToFirstPage());
  useResizeWindow();

  return (
    <div className='group/slider overflow-hidden'>
      <div className='relative flex flex-row'>
        <PaginateLeftButton />

        <div className='flex w-full flex-col pt-3'>
          <div className='flex flex-row items-center justify-between px-[0.5%] max-sm:px-leftRightCustom'>
            <HeadingExtraSmall>{header}</HeadingExtraSmall>
            <PageIndicator />
          </div>
          <TileList />
        </div>

        <PaginateRightButton />
      </div>

      {/*<div className='mx-leftRightCustom border border-b-muted-foreground/20' />*/}
    </div>
  );
};

export default Slider;
