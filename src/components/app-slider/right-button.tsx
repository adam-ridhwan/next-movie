import { useDomProvider } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';

import { sliderUtils } from '@/components/app-slider/slider-utils';
import { Button } from '@/components/shared/ui/button';

const RightButton = () => {
  const isAnimating = useSliderStore(state => state.isAnimating);
  const enableAnimation = useSliderStore(state => state.enableAnimation);
  const disableAnimation = useSliderStore(state => state.disableAnimation);
  const trailingCardsTotal = useSliderStore(state => state.trailingCardsTotal);
  const setTranslatePercentage = useSliderStore(state => state.setTranslatePercentage);
  const goToNextPage = useSliderStore(state => state.goToNextPage);
  const resetToFirstPage = useSliderStore(state => state.resetToFirstPage);
  const updateCardsWhenOnLastPage = useSliderStore(state => state.updateCardsWhenOnLastPage);
  const currentPage = useSliderStore(state => state.currentPage);
  const isFirstPageVisited = useSliderStore(state => state.isFirstPageVisited);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);
  const maxPage = useSliderStore(state => state.maxPage);

  const { sliderRef, sliderItemRef } = useDomProvider();

  const handleRightScroll = () => {
    enableAnimation();
    const newCurrentPage = currentPage + 1;

    const canGoToNextPage = newCurrentPage <= maxPage;
    const isLastPage = newCurrentPage === maxPage;

    const newTranslatePercentage = sliderUtils.getTranslatePercentage({
      direction: sliderUtils.DIRECTION.right,
      trailingCardsTotal,
      sliderRef,
      sliderItemRef,
      isLastPage: isLastPage && isFirstPageVisited,
    });

    setTranslatePercentage(newTranslatePercentage);

    setTimeout(() => {
      disableAnimation();
      markAsPaginated();
      setTranslatePercentage(0);
      canGoToNextPage ? goToNextPage() : resetToFirstPage();
      if (isLastPage) updateCardsWhenOnLastPage();
    }, sliderUtils.TIMEOUT_DURATION);

    return;
  };

  return (
    <>
      <Button
        disabled={isAnimating}
        onClick={() => handleRightScroll()}
        variant='ghost'
        className={
          'absolute right-0 top-0 flex h-full w-12 items-center justify-center rounded-br-none' +
          ' rounded-tr-none bg-darkerBlue/30 hover:bg-darkestBlue/30'
        }
      >
        <span className='opacity-0 group-hover:opacity-100'>{'>'}</span>
      </Button>
    </>
  );
};

export default RightButton;
