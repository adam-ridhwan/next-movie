import { DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import PaginationButton from '@/components/slider/pagination-button/pagination-button';

const PaginateLeftButton = () => {
  const { slide, getSlideAmount } = useSlide();
  const { enableAnimation, disableAnimation } = useAnimation();

  const {
    state: { currentPage },
    status: { isLastPageVisited, hasPaginated },
    config: { lastPageLength },
    actions: { goToFirstPage, goToLastPage, goToPrevPage },
  } = usePagination();

  const handlePaginateLeft = () => {
    const newSlideAmount = getSlideAmount({
      direction: DIRECTION.LEFT,
      lastPageLength: lastPageLength,
      isFirstPage: currentPage - 1 === 1 && isLastPageVisited,
    });
    enableAnimation();
    slide(newSlideAmount);

    setTimeout(() => {
      disableAnimation();
      slide(0);
      if (currentPage === 2) return goToFirstPage();
      if (currentPage === 1) return goToLastPage();
      goToPrevPage();
    }, TIMEOUT_DURATION);
  };

  return (
    <PaginationButton
      onClick={() => handlePaginateLeft()}
      direction={DIRECTION.LEFT}
      className={cn({ hidden: !hasPaginated })}
    />
  );
};

export default PaginateLeftButton;