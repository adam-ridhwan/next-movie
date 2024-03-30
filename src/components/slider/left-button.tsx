import { useSliderStore } from '@/providers/slider-provider';

import { SLIDE_DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { useTranslatePercentage } from '@/lib/hooks/use-translate-percentage';
import { Button } from '@/components/shared/ui/button';

const LeftButton = () => {
  const isAnimating = useSliderStore(state => state.isAnimating);
  const enableAnimation = useSliderStore(state => state.enableAnimation);
  const disableAnimation = useSliderStore(state => state.disableAnimation);
  const trailingCardsTotal = useSliderStore(state => state.trailingCardsTotal);
  const setTranslatePercentage = useSliderStore(state => state.setTranslatePercentage);
  const goToPrevPage = useSliderStore(state => state.goToPrevPage);
  const setToFirstPage = useSliderStore(state => state.setToFirstPage);
  const currentPage = useSliderStore(state => state.currentPage);
  const isLastPageVisited = useSliderStore(state => state.isLastPageVisited);
  const goToLastPage = useSliderStore(state => state.goToLastPage);
  const setToLastPage = useSliderStore(state => state.setToLastPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  const getTranslatePercentage = useTranslatePercentage();

  const handleLeftScroll = () => {
    enableAnimation();
    const newCurrentPage = currentPage - 1;

    const canGoToPrevPage = newCurrentPage > 1;
    const isFirstPage = newCurrentPage === 1;
    const isGoingLeftAfterFirstPage = newCurrentPage < 1;

    const newTranslatePercentage = getTranslatePercentage({
      direction: SLIDE_DIRECTION.LEFT,
      trailingCardsTotal,
      isFirstPage: isFirstPage && isLastPageVisited,
    });

    setTranslatePercentage(newTranslatePercentage);

    setTimeout(() => {
      disableAnimation();
      canGoToPrevPage ? goToPrevPage() : setToFirstPage();
      setTranslatePercentage(0);
      if (isGoingLeftAfterFirstPage) {
        goToLastPage();
        setToLastPage();
      }
    }, TIMEOUT_DURATION);

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
