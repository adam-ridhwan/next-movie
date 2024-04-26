import { cn } from '@/lib/utils';
import { SLIDE_DIRECTION, TIMEOUT_DURATION } from '@/components/slider/hooks/slider-constants';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import PaginateButton from '@/components/slider/paginate-button/paginate-button';

const PaginateLeftButton = () => {
  const {
    status: { isFirstPage, isSecondPage },
    actions: { goToFirstPage, goToLastPage, goToPrevPage },
  } = usePagination();
  const {
    state: { hasPaginated },
    actions: { wait },
  } = usePageUtils();
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
    <PaginateButton
      onClick={handlePaginateLeft}
      direction={SLIDE_DIRECTION.LEFT}
      className={cn(
        { 'pointer-events-auto opacity-100': hasPaginated },
        { 'pointer-events-none opacity-0': !hasPaginated }
      )}
    />
  );
};

export default PaginateLeftButton;
