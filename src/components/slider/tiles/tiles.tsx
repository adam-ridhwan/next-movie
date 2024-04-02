import { useSliderStore } from '@/providers/slider-provider';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import CurrentPage from '@/components/slider/tiles/current-page';
import LeftPlaceholder from '@/components/slider/tiles/left-placeholder';
import NextPage from '@/components/slider/tiles/next-page';
import PrevPage from '@/components/slider/tiles/prev-page';
import RightPlaceholder from '@/components/slider/tiles/right-placeholder';

const Tiles = () => {
  const isAnimating = useSliderStore(state => state.isAnimating);
  const slideAmount = useSliderStore(state => state.slideAmount);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  return (
    <>
      <div
        className={cn(
          'slider relative flex w-full flex-row px-12',
          { 'justify-center': hasPaginated },
          { 'transition-transform duration-700': isAnimating },
          { 'bg-green-600': DEVELOPMENT_MODE }
        )}
        style={{
          transform: slideAmount ? `translate3d(${slideAmount}%, 0, 0)` : undefined,
        }}
      >
        <LeftPlaceholder />
        <PrevPage />
        <CurrentPage />
        <NextPage />
        <RightPlaceholder />
      </div>
    </>
  );
};

export default Tiles;
