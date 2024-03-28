import React from 'react';

import { Button } from '@/app/_components/ui/button';
import { useBoolean, usePages, usePagination } from '@/app/(library)/_components/app-slider/_hooks';
import { useRefContext } from '@/app/(library)/_components/app-slider/slider-context';
import { useAtoms } from '@/app/(library)/_components/app-slider/slider-store';
import { Utils } from '@/app/(library)/_components/app-slider/utils';

const LeftButton = () => {
  const { pages, pageActions, cachePageActions } = usePages();
  const [currentPage, { resetToFirstPage, goToPrevPage }] = usePagination();
  const { value: isAnimating, setTrue: startAnimation, setFalse: stopAnimation } = useBoolean();
  const { CARDS, visibleCardsTotal, trailingCardsTotal, setTranslatePercentage } = useAtoms();
  const { sliderRef, sliderItemRef } = useRefContext();

  // /** ────────────────────────────────────────────────────────────────────────────────
  //  * Handles the scroll event when the user clicks LEFT arrow
  //  * @returns void
  //  * * ────────────────────────────────────────────────────────────────────────────── */
  const handleLeftScroll = () => {
    startAnimation();

    setTranslatePercentage(
      Utils.calcTranslatePercentage({ trailingCardsTotal, sliderRef, sliderItemRef })
    );

    setTimeout(() => {
      stopAnimation();
      goToPrevPage();
      setTranslatePercentage(0);
    }, 700);

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
