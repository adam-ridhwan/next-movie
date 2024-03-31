import { useSliderStore } from '@/providers/slider-provider';

import { DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { useTranslatePercentage } from '@/lib/hooks/use-translate-percentage';
import PaginationButton from '@/components/slider/pagination-button';

const LeftButton = () => {
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
      direction: DIRECTION.LEFT,
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
    hasPaginated && (
      <PaginationButton onClick={() => handleLeftScroll()} direction={DIRECTION.LEFT} />
    )
  );
};

export default LeftButton;
