import { useSliderStore } from '@/providers/slider-provider';

import { DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { useTranslatePercentage } from '@/lib/hooks/use-translate-percentage';
import PaginationButton from '@/components/slider/pagination-button';

const RightButton = () => {
  const enableAnimation = useSliderStore(state => state.enableAnimation);
  const disableAnimation = useSliderStore(state => state.disableAnimation);
  const currentPage = useSliderStore(state => state.currentPage);
  const maxPage = useSliderStore(state => state.maxPage);
  const goToNextPage = useSliderStore(state => state.goToNextPage);
  const goToLastPage = useSliderStore(state => state.goToLastPage);
  const goToFirstPage = useSliderStore(state => state.goToFirstPage);
  const lastPageLength = useSliderStore(state => state.lastPageLength);
  const setTranslatePercentage = useSliderStore(state => state.setTranslatePercentage);
  const isFirstPageVisited = useSliderStore(state => state.isFirstPageVisited);

  const getTranslatePercentage = useTranslatePercentage();

  const handleRightScroll = () => {
    enableAnimation();
    const newCurrentPage = currentPage + 1;

    const canGoToNextPage = newCurrentPage <= maxPage;
    const isLastPage = newCurrentPage === maxPage;

    const newTranslatePercentage = getTranslatePercentage({
      direction: DIRECTION.RIGHT,
      lastPageLength,
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

  return <PaginationButton onClick={() => handleRightScroll()} direction={DIRECTION.RIGHT} />;
};

export default RightButton;
