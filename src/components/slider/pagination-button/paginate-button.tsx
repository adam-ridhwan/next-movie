import { forwardRef, ForwardRefRenderFunction } from 'react';

import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { MINIMUM_TILE_COUNT, SLIDE_DIRECTION, SlideDirection } from '@/components/slider/slider-constants';

type PaginationButtonProps = {
  direction: SlideDirection;
  onClick: () => void;
  className?: string;
};

const PaginateButton: ForwardRefRenderFunction<HTMLButtonElement, PaginationButtonProps> = (
  { direction, onClick, className },
  ref
) => {
  const {
    state: { CONTENT },
  } = usePagination();
  const { isAnimating } = useAnimation();

  if (CONTENT.length <= MINIMUM_TILE_COUNT) return null;

  const iconClass = cn(
    'opacity-0 transition-transform max-w-[40px] group-hover/button:scale-125 group-hover/slider:opacity-100',
    { 'opacity-100 group-hover/button:scale-125 ': isAnimating }
  );

  return (
    <button
      ref={ref}
      disabled={isAnimating}
      onClick={onClick}
      className={cn(
        `group/button relative z-50 flex w-leftRightCustom min-w-leftRightCustom items-center bg-transparent disabled:pointer-events-auto 
          disabled:opacity-100 max-sm:hidden`,
        className,
        { 'justify-start': direction === SLIDE_DIRECTION.RIGHT },
        { 'justify-end': direction === SLIDE_DIRECTION.LEFT }
      )}
    >
      {direction === SLIDE_DIRECTION.RIGHT && <ChevronRightIcon className={iconClass} />}
      {direction === SLIDE_DIRECTION.LEFT && <ChevronLeftIcon className={iconClass} />}
    </button>
  );
};

export default forwardRef(PaginateButton);
