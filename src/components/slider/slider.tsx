'use client';

import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useResizeWindow } from '@/components/slider/hooks/use-resize-window';
import PaginateLeftButton from '@/components/slider/paginate-left-button';
import PaginateRightButton from '@/components/slider/paginate-right-button';
import TileList from '@/components/slider/tile-list';

const Slider = () => {
  const { actions: { goToFirstPage } } = usePagination(); // prettier-ignore

  useEffectOnce(() => goToFirstPage());
  useResizeWindow();

  return (
    <div className='group/slider w-full overflow-hidden'>
      <div className='relative flex flex-row'>
        <PaginateLeftButton />
        <TileList />
        <PaginateRightButton />
      </div>
    </div>
  );
};

export default Slider;
