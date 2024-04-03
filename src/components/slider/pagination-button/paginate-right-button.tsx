import { SLIDE_DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePages } from '@/components/slider/hooks/use-pages';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import PaginationButton from '@/components/slider/pagination-button/pagination-button';

const PaginateRightButton = () => {
  const {
    state: { currentPage },
    status: { isFirstPageVisited },
    actions: { goToFirstPage, goToLastPage, goToNextPage },
  } = usePagination();
  const { getMaxPages, lastPageLength } = usePages();
  const { slide, getSlideAmount } = useSlide();
  const { enableAnimation, disableAnimation } = useAnimation();

  const handlePaginateRight = () => {
    const maxPages = getMaxPages();
    const isSecondToLastPage = currentPage === maxPages - 3;
    const isLastPage = currentPage === maxPages - 2;

    const slideAmount = getSlideAmount({
      direction: SLIDE_DIRECTION.RIGHT,
      lastPageLength: lastPageLength,
      isLastPage: currentPage + 1 === maxPages - 2 && isFirstPageVisited,
    });
    enableAnimation();
    slide(slideAmount);

    setTimeout(() => {
      disableAnimation();
      slide(0);
      if (isSecondToLastPage) return goToLastPage();
      if (isLastPage) return goToFirstPage();
      goToNextPage();
    }, TIMEOUT_DURATION);
  };

  return (
    <PaginationButton
      onClick={() => handlePaginateRight()}
      direction={SLIDE_DIRECTION.RIGHT}
      className=''
    />
  );
};

export default PaginateRightButton;
