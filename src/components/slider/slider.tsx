'use client';

import { useEffectOnce } from '@/hooks/use-effect-once';
import { usePagination } from '@/hooks/use-pagination';
import { useResizeWindow } from '@/hooks/use-resize-window';
import { Divider } from '@/components/divider';
import MediaHeader from '@/components/slider/media-header/media-header';
import PaginateLeftButton from '@/components/slider/paginate-button/paginate-left-button';
import PaginateRightButton from '@/components/slider/paginate-button/paginate-right-button';
import TileContainer from '@/components/slider/tiles/tile-container';

type SliderProps = {
  headerTitle: string;
};

const Slider = ({ headerTitle }: SliderProps) => {
  const {
    actions: { goToFirstPage },
  } = usePagination();

  useEffectOnce(() => goToFirstPage());
  useResizeWindow();

  return (
    <div className='group/slider flex flex-col'>
      <MediaHeader>{headerTitle}</MediaHeader>

      <div className='relative flex w-full flex-row'>
        <PaginateLeftButton />
        <TileContainer />
        <PaginateRightButton />
      </div>

      <Divider />
    </div>
  );
};

export default Slider;
