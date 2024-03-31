'use client';

import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';

import { DEVELOPMENT_MODE, DIRECTION } from '@/lib/constants';
import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { useTranslatePercentage } from '@/lib/hooks/use-translate-percentage';
import { cn } from '@/lib/utils';
import PaginationButton from '@/components/slider/pagination-button';
import Tiles from '@/components/slider/tiles/tiles';

const Slider = () => {
  const setInitialPages = useSliderStore(state => state.setInitialPages);
  const currentPage = useSliderStore(state => state.currentPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const handleLeftScroll = useSliderStore(state => state.handleLeftScroll);
  const handleRightScroll = useSliderStore(state => state.handleRightScroll);
  const getTranslatePercentage = useTranslatePercentage();

  const { sliderRef } = useDomContext();

  useEffectOnce(() => setInitialPages());

  return (
    <>
      <div
        ref={sliderRef}
        className={cn('group/slider relative flex w-full', {
          'bg-yellow-600': DEVELOPMENT_MODE,
        })}
      >
        {DEVELOPMENT_MODE && (
          <div className='absolute -top-16 left-1/2 z-50 -translate-x-1/2 text-[60px] font-bold'>
            {currentPage}
          </div>
        )}

        {hasPaginated && (
          <PaginationButton
            onClick={() => handleLeftScroll(getTranslatePercentage)}
            direction={DIRECTION.LEFT}
          />
        )}
        <Tiles />
        <PaginationButton
          onClick={() => handleRightScroll(getTranslatePercentage)}
          direction={DIRECTION.RIGHT}
        />
      </div>
    </>
  );
};

export default Slider;
