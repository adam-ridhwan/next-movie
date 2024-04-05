import { SLIDE_DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import PaginationButton from '@/components/slider/pagination-button/pagination-button';

const PaginateLeftButton = () => {
  const {
    state: { currentPage },
    status: { hasPaginated },
    actions: { goToFirstPage, goToLastPage, goToPrevPage },
  } = usePagination();
  const { slide, getSlideAmount } = useSlide();
  const { enableAnimation, disableAnimation } = useAnimation();

  const handlePaginateLeft = () => {
    const isSecondPage = currentPage === 2;
    const isFirstPage = currentPage === 1;

    const newSlideAmount = getSlideAmount({ direction: SLIDE_DIRECTION.LEFT, isSecondPage });
    enableAnimation();
    slide(newSlideAmount);

    setTimeout(() => {
      disableAnimation();
      slide(0);
      if (isSecondPage) return goToFirstPage();
      if (isFirstPage) return goToLastPage();
      goToPrevPage();
    }, TIMEOUT_DURATION);
  };

  return (
    <PaginationButton
      onClick={() => handlePaginateLeft()}
      direction={SLIDE_DIRECTION.LEFT}
      className={cn({ hidden: !hasPaginated })}
    />
  );
};

export default PaginateLeftButton;
