import { MINIMUM_TILE_COUNT, SLIDE_DIRECTION } from '@/lib/constants';
import { SlideDirection } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePagination } from '@/components/slider/hooks/use-pagination';

type PaginationButtonProps = {
  direction: SlideDirection;
  onClick: () => void;
  className?: string;
};

const PaginationButton = ({ direction, onClick, className }: PaginationButtonProps) => {
  const {
    state: { TILES },
  } = usePagination();
  const { isAnimating } = useAnimation();

  if (TILES.length <= MINIMUM_TILE_COUNT) return;

  const iconClass = cn(
    `opacity-0 transition-transform group-hover/button:scale-125 group-hover/slider:opacity-100`,
    { 'opacity-100 group-hover/button:scale-125 ': isAnimating }
  );

  return (
    <Button
      variant='ghost'
      disabled={isAnimating}
      onClick={onClick}
      className={cn(
        `group/button absolute top-0 z-10 flex h-full w-12 items-center justify-center 
          rounded-none bg-darkerBlue/50 px-0 py-0 
          hover:bg-darkestBlue/50 disabled:pointer-events-auto disabled:opacity-100`,
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

export default PaginationButton;
