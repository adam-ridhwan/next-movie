import { SlideDirection } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/hooks/use-animation';
import { usePageUtils } from '@/hooks/use-page-utils';
import { usePagination } from '@/hooks/use-pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';

type PaginationButtonProps = {
  direction: SlideDirection;
  onClick: () => void;
  className?: string;
};

const PaginateButton = ({ direction, onClick, className }: PaginationButtonProps) => {
  const { state: { CONTENT } } = usePagination(); // prettier-ignore
  const { actions: { getTileCountPerPage } } = usePageUtils(); // prettier-ignore
  const { isAnimating } = useAnimation();

  if (CONTENT.length <= getTileCountPerPage()) {
    return <div className='w-custom min-w-custom max-sm:hidden' />;
  }

  const iconClass = cn(
    'opacity-0 transition-transform max-w-[40px] group-hover/button:scale-125 group-hover/slider:opacity-100',
    { 'opacity-100 group-hover/button:scale-125 ': isAnimating }
  );

  const isRight = direction === 'right';
  const isLeft = direction === 'left';

  return (
    <button
      disabled={isAnimating}
      onClick={onClick}
      className={cn(
        'group/button w-custom min-w-custom relative z-40 flex items-center bg-transparent',
        className,
        { 'justify-start': direction === 'right' },
        { 'justify-end': direction === 'left' },
        'max-sm:hidden'
      )}
    >
      {isRight && <ChevronRightIcon className={iconClass} />}
      {isLeft && <ChevronLeftIcon className={iconClass} />}
    </button>
  );
};

export default PaginateButton;
