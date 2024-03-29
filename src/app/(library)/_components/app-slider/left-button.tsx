import React from 'react';
import chalk from 'chalk';

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
  const resetToFirstPage = useSliderStore(state => state.resetToFirstPage);
  const currentPage = useSliderStore(state => state.currentPage);
  const isLastPageVisited = useSliderStore(state => state.isLastPageVisited);

  const { sliderRef, sliderItemRef } = useDomProvider();

  const handleLeftScroll = () => {
    enableAnimation();
    const newCurrentPage = currentPage - 1;

    const canGoToPrevPage = currentPage - 1 > 1;
    const isFirstPage = newCurrentPage === 1;

    console.log(chalk.black.bgGreen('currentPage:', currentPage, ' '));
    console.log(chalk.black.bgYellow('newCurrentPage:', newCurrentPage, ' '));

    console.log('canGoToPrevPage', canGoToPrevPage);
    console.log('isFirstPage', isFirstPage);
    console.log('');

    const newTranslatePercentage =
      !isFirstPage || !isLastPageVisited
        ? sliderUtils.getTranslatePercentage({ trailingCardsTotal, sliderRef, sliderItemRef })
        : sliderUtils.getTranslatePercentage({
            trailingCardsTotal,
            sliderRef,
            sliderItemRef,
            isFirstPage,
          });

    setTranslatePercentage(newTranslatePercentage);

    setTimeout(() => {
      disableAnimation();
      canGoToPrevPage ? goToPrevPage() : resetToFirstPage();
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
