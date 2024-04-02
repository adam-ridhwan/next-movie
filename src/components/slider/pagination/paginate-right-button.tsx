import { DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import PaginationButton from '@/components/slider/pagination/pagination-button';

const PaginateRightButton = () => {
  const [slide, { calculateSlideAmount, enableAnimation, disableAnimation }] = useSlide();

  const [
    { currentPage },
    { getMaxPages, lastPageLength, isFirstPageVisited },
    { goToLastPage, goToFirstPage, goToNextPage },
  ] = usePagination();

  const handlePaginateRight = () => {
    const slideAmount = calculateSlideAmount({
      direction: DIRECTION.RIGHT,
      lastPageLength: lastPageLength,
      isLastPage: currentPage + 1 === getMaxPages() - 2 && isFirstPageVisited,
    });
    enableAnimation();
    slide(slideAmount);

    setTimeout(() => {
      disableAnimation();
      slide(0);
      if (currentPage === getMaxPages() - 3) return goToLastPage();
      if (currentPage === getMaxPages() - 2) return goToFirstPage();
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
