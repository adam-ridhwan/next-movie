import { useSliderStore } from '@/providers/slider-provider';
import { log } from '@/providers/slider-store';

import { DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import PaginationButton from '@/components/slider/pagination-button';
import { useTranslatePercentage } from '@/components/slider/use-translate-percentage';

const PaginateLeftButton = () => {
  const currentPage = useSliderStore(state => state.currentPage);
  const lastPageLength = useSliderStore(state => state.lastPageLength);

  const goToFirstPage = useSliderStore(state => state.goToFirstPage);
  const goToLastPage = useSliderStore(state => state.goToLastPage);
  const goToPrevPage = useSliderStore(state => state.goToPrevPage);

  const isLastPageVisited = useSliderStore(state => state.isLastPageVisited);

  const disableAnimation = useSliderStore(state => state.disableAnimation);
  const enableAnimation = useSliderStore(state => state.enableAnimation);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  const getTranslatePercentage = useTranslatePercentage();
  const setTranslatePercentage = useSliderStore(state => state.setTranslatePercentage);

  const handlePaginateLeft = () => {
    log('HANDLE PAGINATE LEFT');

    enableAnimation();
    const newTranslatePercentage = getTranslatePercentage({
      direction: DIRECTION.LEFT,
      lastPageLength: lastPageLength,
      isFirstPage: currentPage - 1 === 1 && isLastPageVisited,
    });
    setTranslatePercentage(newTranslatePercentage);

    setTimeout(() => {
      disableAnimation();
      setTranslatePercentage(0);
      if (currentPage === 2) return goToFirstPage();
      if (currentPage === 1) return goToLastPage();
      goToPrevPage();
    }, TIMEOUT_DURATION);
  };

  return (
    <>
      <PaginationButton
        onClick={() => handlePaginateLeft()}
        direction={DIRECTION.LEFT}
        className={cn({ hidden: !hasPaginated })}
      />
    </>
  );
};

export default PaginateLeftButton;
