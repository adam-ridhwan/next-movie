import { DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import PaginationButton from '@/components/slider/pagination-button/pagination-button';

const PaginateRightButton = () => {
  const {
    state: { currentPage },
    status: { isFirstPageVisited },
    config: { lastPageLength, getMaxPages },
    actions: { goToFirstPage, goToLastPage, goToNextPage },
  } = usePagination();

  const { slide, getSlideAmount } = useSlide();
  const { enableAnimation, disableAnimation } = useAnimation();

  const handlePaginateRight = () => {
    const maxPages = getMaxPages();
    const slideAmount = getSlideAmount({
      direction: DIRECTION.RIGHT,
      lastPageLength: lastPageLength,
      isLastPage: currentPage + 1 === maxPages - 2 && isFirstPageVisited,
    });
    enableAnimation();
    slide(slideAmount);

    setTimeout(() => {
      disableAnimation();
      slide(0);
      if (currentPage === maxPages - 3) return goToLastPage();
      if (currentPage === maxPages - 2) return goToFirstPage();
      goToNextPage();
    }, TIMEOUT_DURATION);
  };

  return (
    <PaginationButton
      onClick={() => handlePaginateRight()}
      direction={DIRECTION.RIGHT}
      className=''
    />
  );
};

export default PaginateRightButton;
