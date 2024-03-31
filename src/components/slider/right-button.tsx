import { useSliderStore } from '@/providers/slider-provider';

import { SLIDE_DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { useTranslatePercentage } from '@/lib/hooks/use-translate-percentage';
import { Button } from '@/components/shared/ui/button';

const RightButton = () => {
  const isAnimating = useSliderStore(state => state.isAnimating);
  const enableAnimation = useSliderStore(state => state.enableAnimation);
  const disableAnimation = useSliderStore(state => state.disableAnimation);
  const currentPage = useSliderStore(state => state.currentPage);
  const maxPage = useSliderStore(state => state.maxPage);
  const goToNextPage = useSliderStore(state => state.goToNextPage);
  const goToLastPage = useSliderStore(state => state.goToLastPage);
  const goToFirstPage = useSliderStore(state => state.goToFirstPage);
  const trailingCardsTotal = useSliderStore(state => state.trailingCardsTotal);
  const setTranslatePercentage = useSliderStore(state => state.setTranslatePercentage);
  const isFirstPageVisited = useSliderStore(state => state.isFirstPageVisited);

  const getTranslatePercentage = useTranslatePercentage();

  const handleRightScroll = () => {
    enableAnimation();
    const newCurrentPage = currentPage + 1;

    const canGoToNextPage = newCurrentPage <= maxPage;
    const isLastPage = newCurrentPage === maxPage;

    const newTranslatePercentage = getTranslatePercentage({
      direction: SLIDE_DIRECTION.RIGHT,
      trailingCardsTotal,
      isLastPage: isLastPage && isFirstPageVisited,
    });

    setTranslatePercentage(newTranslatePercentage);

    setTimeout(() => {
      disableAnimation();
      setTranslatePercentage(0);
      canGoToNextPage ? goToNextPage() : goToFirstPage();
      if (isLastPage) goToLastPage();
    }, TIMEOUT_DURATION);

    return;
  };

  return (
    <>
      <Button
        disabled={isAnimating}
        onClick={() => handleRightScroll()}
        variant='ghost'
        className='absolute right-0 top-0 flex h-full w-12 items-center justify-center rounded-none bg-darkerBlue/30 hover:bg-darkestBlue/30 disabled:opacity-100'
      >
        <span className='opacity-0 group-hover:opacity-100'>{'>'}</span>
      </Button>
    </>
  );
};

export default RightButton;
