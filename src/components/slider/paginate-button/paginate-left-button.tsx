import { TIMEOUT_DURATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/hooks/use-animation';
import { usePageUtils } from '@/hooks/use-page-utils';
import { usePagination } from '@/hooks/use-pagination';
import { useSlide } from '@/hooks/use-slide';
import PaginateButton from '@/components/slider/paginate-button/paginate-button';

const PaginateLeftButton = () => {
  const {
    status: { isFirstPage, isSecondPage },
    actions: { goToFirstPage, goToLastPage, goToPrevPage },
  } = usePagination();
  const { state: { hasPaginated }, actions: { wait } } = usePageUtils(); // prettier-ignore
  const { slide, getSlideAmount } = useSlide();
  const { enableAnimation, disableAnimation } = useAnimation();

  const handlePaginateLeft = async () => {
    enableAnimation();
    const newSlideAmount = getSlideAmount({
      direction: 'left',
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
      direction='left'
      className={cn(
        { 'pointer-events-auto opacity-100': hasPaginated },
        { 'pointer-events-none opacity-0': !hasPaginated }
      )}
    />
  );
};

export default PaginateLeftButton;
