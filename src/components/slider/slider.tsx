'use client';

import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { usePagination } from '@/lib/hooks/use-pagination';
import { useResizeWindow } from '@/lib/hooks/use-resize-window';
import PaginateLeftButton from '@/components/slider/paginate-button/paginate-left-button';
import PaginateRightButton from '@/components/slider/paginate-button/paginate-right-button';
import TileContainer from '@/components/slider/tiles/tile-container';

const Slider = () => {
  const { actions: { goToFirstPage } } = usePagination(); // prettier-ignore

  useEffectOnce(() => goToFirstPage());
  useResizeWindow();

  return (
    <div className='group/slider w-full overflow-hidden'>
      <div className='relative flex flex-row'>
        <PaginateLeftButton />
        <TileContainer />
        <PaginateRightButton />
      </div>
    </div>
  );
};

export default Slider;
