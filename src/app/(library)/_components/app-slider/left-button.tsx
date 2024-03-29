import React from 'react';

import { Button } from '@/app/_components/ui/button';
import { useDomProvider } from '@/app/_providers/dom-provider';
import { useSliderStore } from '@/app/_providers/slider-provider';
import { sliderUtils } from '@/app/(library)/_components/app-slider/slider-utils';

const LeftButton = () => {
  const isAnimating = useSliderStore(state => state.isAnimating);
  const enableAnimation = useSliderStore(state => state.enableAnimation);
  const disableAnimation = useSliderStore(state => state.disableAnimation);
  const trailingCardsTotal = useSliderStore(state => state.trailingCardsTotal);
  const setTranslatePercentage = useSliderStore(state => state.setTranslatePercentage);
  const goToPrevPage = useSliderStore(state => state.goToPrevPage);

  const { sliderRef, sliderItemRef } = useDomProvider();

  const handleLeftScroll = () => {
    enableAnimation();

    setTranslatePercentage(
      sliderUtils.getTranslatePercentage({ trailingCardsTotal, sliderRef, sliderItemRef })
    );

    setTimeout(() => {
      disableAnimation();
      goToPrevPage();
      setTranslatePercentage(0);
    }, sliderUtils.TIMEOUT_DURATION);

    return;
  };

  return (
    <>
      <Button
        disabled={isAnimating}
        onClick={() => handleLeftScroll()}
        className='absolute left-0 top-0 flex h-full w-10 items-center justify-center
        rounded-bl-none rounded-tl-none bg-darkerBlue/30 hover:bg-darkestBlue/50'
        variant='ghost'
      >
        {'<'}
      </Button>
    </>
  );
};

export default LeftButton;
