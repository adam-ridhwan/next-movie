import { useSliderStore } from '@/providers/slider-provider';
import { log } from '@/providers/slider-store';

import { DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import PaginationButton from '@/components/slider/pagination-button';
import { useTranslatePercentage } from '@/components/slider/use-translate-percentage';

const PaginateRightButton = () => {
  const maxPage = useSliderStore(state => state.maxPage);
  const currentPage = useSliderStore(state => state.currentPage);
  const lastPageLength = useSliderStore(state => state.lastPageLength);

  const goToFirstPage = useSliderStore(state => state.goToFirstPage);
  const goToLastPage = useSliderStore(state => state.goToLastPage);
  const goToNextPage = useSliderStore(state => state.goToNextPage);

  const isFirstPageVisited = useSliderStore(state => state.isFirstPageVisited);

  const disableAnimation = useSliderStore(state => state.disableAnimation);
  const enableAnimation = useSliderStore(state => state.enableAnimation);

  const getTranslatePercentage = useTranslatePercentage();
  const setTranslatePercentage = useSliderStore(state => state.setTranslatePercentage);

  const handlePaginateRight = () => {
    log('HANDLE PAGINATE RIGHT');

    enableAnimation();
    const newTranslatePercentage = getTranslatePercentage({
      direction: DIRECTION.RIGHT,
      lastPageLength: lastPageLength,
      isLastPage: currentPage + 1 === maxPage - 2 && isFirstPageVisited,
    });
    setTranslatePercentage(newTranslatePercentage);

    setTimeout(() => {
      disableAnimation();
      setTranslatePercentage(0);
      if (currentPage === maxPage - 3) return goToLastPage();
      if (currentPage === maxPage - 2) return goToFirstPage();
      goToNextPage();
    }, TIMEOUT_DURATION);
  };

  return (
    <>
      <PaginationButton onClick={() => handlePaginateRight()} direction={DIRECTION.RIGHT} />
    </>
  );
};

export default PaginateRightButton;
