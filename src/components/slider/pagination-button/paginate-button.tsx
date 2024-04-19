import { forwardRef, ForwardRefRenderFunction } from 'react';

import { SlideDirection } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { MINIMUM_TILE_COUNT, SLIDE_DIRECTION } from '@/components/slider/slider-constants';

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
    state: { TILES },
  } = usePagination();
  const { isAnimating } = useAnimation();

  if (TILES.length <= MINIMUM_TILE_COUNT) return null;

  const iconClass = cn(
    'opacity-100 transition-transform max-w-[40px] group-hover/button:scale-125 group-hover/slider:opacity-100',
    { 'opacity-100 group-hover/button:scale-125 ': isAnimating }
  );

  return (
    <button
      ref={ref}
      disabled={isAnimating}
      onClick={onClick}
      className={cn(
        'group/button bg-appBackground relative z-50 flex w-leftRightCustom items-center disabled:pointer-events-auto disabled:opacity-100',
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
