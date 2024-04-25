'use client';

import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { Divider } from '@/components/divider';
import { HeadingExtraSmall } from '@/components/fonts';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useResizeWindow } from '@/components/slider/hooks/use-resize-window';
import PageIndicator from '@/components/slider/page-indicator';
import PaginateLeftButton from '@/components/slider/paginate-left-button';
import PaginateRightButton from '@/components/slider/paginate-right-button';
import TileList from '@/components/slider/tile-list';

type SliderProps = {
  header: string;
};

const Slider = ({ header }: SliderProps) => {
  const { actions: { goToFirstPage } } = usePagination(); // prettier-ignore

  useEffectOnce(() => goToFirstPage());
  useResizeWindow();

  return (
    <>
      <Divider />

      <div className='group/slider overflow-hidden'>
        <div className='relative flex flex-row'>
          <PaginateLeftButton />

          <div className='flex w-full max-w-full flex-col gap-2'>
            <div className='flex flex-row items-center justify-between px-[0.5%] max-sm:px-leftRightCustom'>
              <HeadingExtraSmall>{header}</HeadingExtraSmall>
              <PageIndicator />
            </div>
            <TileList />
          </div>

          <PaginateRightButton />
        </div>
      </div>
    </>
  );
};

export default Slider;
