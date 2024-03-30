import { Button } from '@/app/_components/ui/button';
import { cn } from '@/app/_lib/utils';
import { useDomProvider } from '@/app/_providers/dom-provider';
import { useSliderStore } from '@/app/_providers/slider-provider';
import { sliderUtils } from '@/app/(library)/_components/app-slider/slider-utils';

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
  const isHoveringSlider = useSliderStore(state => state.isHoveringSlider);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);
  const maxPage = useSliderStore(state => state.maxPage);

  const { sliderRef, sliderItemRef } = useDomProvider();

  const handleRightScroll = () => {
    enableAnimation();
    const newCurrentPage = currentPage + 1;

    const canGoToNextPage = currentPage + 1 <= maxPage;
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
        className={cn(
          `absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-br-none rounded-tr-none bg-darkerBlue/30 hover:bg-darkestBlue/30`
        )}
        variant='ghost'
      >
        <span
          className={cn({ 'opacity-0': !isHoveringSlider }, { 'opacity-100': isHoveringSlider })}
        >
          {'>'}
        </span>
      </Button>
    </>
  );
};

export default RightButton;
