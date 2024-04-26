import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import {
  MINIMUM_TILE_COUNT,
  SLIDE_DIRECTION,
  SlideDirection,
} from '@/components/slider/hooks/slider-constants';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePagination } from '@/components/slider/hooks/use-pagination';

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

  const isRight = direction === SLIDE_DIRECTION.RIGHT && MEDIA.length > MINIMUM_TILE_COUNT;
  const isLeft = direction === SLIDE_DIRECTION.LEFT && MEDIA.length > MINIMUM_TILE_COUNT;

  return (
    <>
      <button
        disabled={isAnimating || MEDIA.length <= MINIMUM_TILE_COUNT}
        onClick={onClick}
        className={cn(
          'group/button relative z-50 flex w-leftRightCustom min-w-leftRightCustom items-center bg-transparent',
          className,
          { 'justify-start': direction === SLIDE_DIRECTION.RIGHT },
          { 'justify-end': direction === SLIDE_DIRECTION.LEFT },
          'max-sm:hidden'
        )}
      >
        {isRight && <ChevronRightIcon className={iconClass} />}
        {isLeft && <ChevronLeftIcon className={iconClass} />}
      </button>

      <div className='w-leftRightCustom min-w-leftRightCustom sm:hidden' />
    </>
  );
};

export default PaginateButton;
