import { MINIMUM_TILE_COUNT, SlideDirection } from '@/lib/constants';
import { useAnimation } from '@/lib/hooks/use-animation';
import { usePagination } from '@/lib/hooks/use-pagination';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';

type PaginationButtonProps = {
  direction: SlideDirection;
  onClick: () => void;
  className?: string;
};

const PaginateButton = ({ direction, onClick, className }: PaginationButtonProps) => {
  const { state: { MEDIA } } = usePagination(); // prettier-ignore
  const { isAnimating } = useAnimation();

  const iconClass = cn(
    'opacity-0 transition-transform max-w-[40px] group-hover/button:scale-125 group-hover/slider:opacity-100',
    { 'opacity-100 group-hover/button:scale-125 ': isAnimating }
  );

  const isRight = direction === 'right' && MEDIA.length > MINIMUM_TILE_COUNT;
  const isLeft = direction === 'left' && MEDIA.length > MINIMUM_TILE_COUNT;

  return (
    <>
      <button
        disabled={isAnimating || MEDIA.length <= MINIMUM_TILE_COUNT}
        onClick={onClick}
        className={cn(
          'group/button relative z-50 flex w-leftRightCustom min-w-leftRightCustom items-center bg-transparent',
          className,
          { 'justify-start': direction === 'right' },
          { 'justify-end': direction === 'left' },
          'max-sm:hidden'
        )}
      >
        {isRight && <ChevronRightIcon className={iconClass} />}
        {isLeft && <ChevronLeftIcon className={iconClass} />}
      </button>
    </>
  );
};

export default PaginateButton;
