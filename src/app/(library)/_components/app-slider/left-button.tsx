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
  const goToLastPage = useSliderStore(state => state.goToLastPage);
  const updateCardsWhenOnLastPage = useSliderStore(state => state.updateCardsWhenOnLastPage);

  const { sliderRef, sliderItemRef } = useDomProvider();

  const handleLeftScroll = () => {
    enableAnimation();
    const newCurrentPage = currentPage - 1;

    const canGoToPrevPage = currentPage - 1 > 1;
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
