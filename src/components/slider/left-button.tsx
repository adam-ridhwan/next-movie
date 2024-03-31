import { useSliderStore } from '@/providers/slider-provider';

import { SLIDE_DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { useTranslatePercentage } from '@/lib/hooks/use-translate-percentage';
import { Button } from '@/components/shared/ui/button';

const LeftButton = () => {
  const isAnimating = useSliderStore(state => state.isAnimating);
  const enableAnimation = useSliderStore(state => state.enableAnimation);
  const disableAnimation = useSliderStore(state => state.disableAnimation);
  const lastPageLength = useSliderStore(state => state.lastPageLength);
  const setTranslatePercentage = useSliderStore(state => state.setTranslatePercentage);
  const goToPrevPage = useSliderStore(state => state.goToPrevPage);
  const goToFirstPage = useSliderStore(state => state.goToFirstPage);
  const currentPage = useSliderStore(state => state.currentPage);
  const isLastPageVisited = useSliderStore(state => state.isLastPageVisited);
  const goToLastPage = useSliderStore(state => state.goToLastPage);
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
      lastPageLength,
      isFirstPage: isFirstPage && isLastPageVisited,
    });

    setTranslatePercentage(newTranslatePercentage);

    setTimeout(() => {
      disableAnimation();
      canGoToPrevPage ? goToPrevPage() : goToFirstPage();
      setTranslatePercentage(0);
      if (isGoingLeftAfterFirstPage) goToLastPage();
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
          className='absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-none bg-darkerBlue/30 hover:bg-darkestBlue/30 disabled:opacity-100'
        >
          <span className='opacity-0 group-hover:opacity-100'>{'<'}</span>
        </Button>
      )}
    </>
  );
};

export default LeftButton;
