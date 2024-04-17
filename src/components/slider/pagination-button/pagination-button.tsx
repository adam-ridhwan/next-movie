import { forwardRef, ForwardRefRenderFunction } from 'react';

import { SlideDirection } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { MINIMUM_TILE_COUNT, SLIDE_DIRECTION } from '@/components/slider/slider-constants';

type PaginationButtonProps = {
  direction: SlideDirection;
  onClick: () => void;
  className?: string;
};

const PaginationButton: ForwardRefRenderFunction<HTMLButtonElement, PaginationButtonProps> = (
  { direction, onClick, className },
  ref
) => {
  const {
    state: { TILES },
  } = usePagination();
  const { isAnimating } = useAnimation();

  if (TILES.length <= MINIMUM_TILE_COUNT) return null;

  const iconClass = cn(
    'opacity-0 transition-transform group-hover/button:scale-125 group-hover/slider:opacity-100',
    { 'opacity-100 group-hover/button:scale-125 ': isAnimating }
  );

  return (
    <Button
      ref={ref}
      variant='ghost'
      disabled={isAnimating}
      onClick={onClick}
      className={cn(
        // FIXME: The background color is overflowing outside the tile
        //  Check tailwind config and global.ss for the overflow issue.
        //  Might be because horizontal padding from .slider-tile is causing the overflow.
        `group/button absolute top-0 z-10 flex h-full w-leftRightCustom items-center justify-center 
          rounded-none bg-darkerBlue/30 px-0 py-0 
          hover:bg-darkestBlue/30 disabled:pointer-events-auto disabled:opacity-100`,
        { 'right-0': direction === SLIDE_DIRECTION.RIGHT },
        { 'left-0': direction === SLIDE_DIRECTION.LEFT },
        className
      )}
    >
      {direction === SLIDE_DIRECTION.RIGHT && <ChevronRightIcon className={iconClass} />}
      {direction === SLIDE_DIRECTION.LEFT && <ChevronLeftIcon className={iconClass} />}
    </Button>
  );
};

export default forwardRef(PaginationButton);
