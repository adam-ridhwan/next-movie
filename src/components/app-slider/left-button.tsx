import { useDomProvider } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';

import { sliderUtils } from '@/components/app-slider/slider-utils';
import { Button } from '@/components/shared/ui/button';

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
  const goToLastPage = useSliderStore(state => state.goToLastPage);
  const updateCardsWhenOnLastPage = useSliderStore(state => state.updateCardsWhenOnLastPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  const { sliderRef, sliderItemRef } = useDomProvider();

  const handleLeftScroll = () => {
    enableAnimation();
    const newCurrentPage = currentPage - 1;

    const canGoToPrevPage = newCurrentPage > 1;
    const isFirstPage = newCurrentPage === 1;
    const isGoingLeftAfterFirstPage = newCurrentPage < 1;

    const newTranslatePercentage = sliderUtils.getTranslatePercentage({
      direction: sliderUtils.DIRECTION.left,
      trailingCardsTotal,
      sliderRef,
      sliderItemRef,
      isFirstPage: isFirstPage && isLastPageVisited,
    });

    setTranslatePercentage(newTranslatePercentage);

    setTimeout(() => {
      disableAnimation();
      canGoToPrevPage ? goToPrevPage() : resetToFirstPage();
      setTranslatePercentage(0);
      if (isGoingLeftAfterFirstPage) {
        goToLastPage();
        updateCardsWhenOnLastPage();
      }
    }, sliderUtils.TIMEOUT_DURATION);

    return;
  };

  return (
    <>
      {hasPaginated && (
        <Button
          disabled={isAnimating}
          onClick={() => handleLeftScroll()}
          variant='ghost'
          className='absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-bl-none rounded-tl-none bg-darkerBlue/30 hover:bg-darkestBlue/50'
        >
          <span className='opacity-0 group-hover:opacity-100'>{'<'}</span>
        </Button>
      )}
    </>
  );
};

export default LeftButton;
