import { SLIDE_DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { cn, wait } from '@/lib/utils';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import PaginationButton from '@/components/slider/pagination-button/pagination-button';

const PaginateLeftButton = () => {
  const {
    status: { isFirstPage, isSecondPage },
    actions: { goToFirstPage, goToLastPage, goToPrevPage },
  } = usePagination();
  const { hasPaginated } = usePageUtils();
  const { slide, getSlideAmount } = useSlide();
  const { enableAnimation, disableAnimation } = useAnimation();

  const handlePaginateLeft = async () => {
    enableAnimation();
    const newSlideAmount = getSlideAmount({
      direction: SLIDE_DIRECTION.LEFT,
      isSecondPage,
    });
    slide(newSlideAmount);

    await wait(TIMEOUT_DURATION);

    disableAnimation();
    slide(0);
    if (isSecondPage) return goToFirstPage();
    if (isFirstPage) return goToLastPage();
    goToPrevPage();
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
