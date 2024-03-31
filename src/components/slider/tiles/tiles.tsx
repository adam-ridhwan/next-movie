import { useSliderStore } from '@/providers/slider-provider';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import CurrentPage from '@/components/slider/tiles/tile/current-page';
import LeftPlaceholder from '@/components/slider/tiles/tile/left-placeholder';
import NextPage from '@/components/slider/tiles/tile/next-page';
import PrevPage from '@/components/slider/tiles/tile/prev-page';
import RightPlaceholder from '@/components/slider/tiles/tile/right-placeholder';

const Tiles = () => {
  const isAnimating = useSliderStore(state => state.isAnimating);
  const translatePercentage = useSliderStore(state => state.translatePercentage);
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
          transform: translatePercentage ? `translate3d(${translatePercentage}%, 0, 0)` : undefined,
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
