import React from 'react';

import { Button } from '@/app/_components/ui/button';
import { useBoolean, usePages, usePagination } from '@/app/(library)/_components/app-slider/_hooks';
import { useRefContext } from '@/app/(library)/_components/app-slider/slider-context';
import { useAtoms } from '@/app/(library)/_components/app-slider/slider-store';
import { Utils } from '@/app/(library)/_components/app-slider/utils';

const RightButton = () => {
  const { pageActions } = usePages();
  const [_, { resetToFirstPage, goToNextPage, haveMoreCardsToLoad, isLastPage }] = usePagination();
  const { value: isAnimating, setTrue: startAnimation, setFalse: stopAnimation } = useBoolean();
  const { trailingCardsTotal, setTranslatePercentage } = useAtoms();
  const { sliderRef, sliderItemRef } = useRefContext();

  const handleRightScroll = () => {
    startAnimation();

    const newTranslatePercentage =
      !isLastPage || !haveMoreCardsToLoad
        ? -Utils.calcTranslatePercentage({ trailingCardsTotal, sliderRef, sliderItemRef })
        : Utils.calcTranslatePercentage({
            trailingCardsTotal,
            sliderRef,
            sliderItemRef,
            isLastPage,
          });

    setTranslatePercentage(newTranslatePercentage);

    setTimeout(() => {
      stopAnimation();
      setTranslatePercentage(0);
      goToNextPage();
      if (!isLastPage) return;
      if (!haveMoreCardsToLoad) return resetToFirstPage();
      pageActions.resetToInitial();
    }, 700);

    return;
  };

  return (
    <>
      <Button
        disabled={isAnimating}
        onClick={() => handleRightScroll()}
        className='absolute right-0 top-0 flex h-full w-10 items-center justify-center
        rounded-br-none rounded-tr-none bg-darkerBlue/30 hover:bg-darkestBlue/50'
        variant='ghost'
      >
        {'>'}
      </Button>
    </>
  );
};

export default RightButton;
