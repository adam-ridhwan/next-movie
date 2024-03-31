import { useSliderStore } from '@/providers/slider-provider';

import { DIRECTION } from '@/lib/constants';
import { SlideDirection } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/shared/icons';
import { Button } from '@/components/shared/ui/button';

type PaginationButtonProps = {
  direction: SlideDirection;
  onClick: () => void;
};

const PaginationButton = ({ direction, onClick }: PaginationButtonProps) => {
  const isAnimating = useSliderStore(state => state.isAnimating);

  const iconClass = cn(
    `opacity-0 transition-transform group-hover/button:scale-125 group-hover/slider:opacity-100`,
    { 'opacity-100 group-hover/button:scale-125 ': isAnimating }
  );

  return (
    <>
      <Button
        variant='ghost'
        disabled={isAnimating}
        onClick={onClick}
        className={cn(
          `group/button absolute top-0 z-10 flex h-full w-12 items-center justify-center rounded-none bg-darkerBlue/30 px-0 py-0 hover:bg-darkestBlue/30 disabled:pointer-events-auto disabled:opacity-100`,
          { 'right-0': direction === DIRECTION.RIGHT },
          { 'left-0': direction === DIRECTION.LEFT }
        )}
      >
        {direction === DIRECTION.RIGHT ? (
          <ChevronRightIcon className={iconClass} />
        ) : (
          <ChevronLeftIcon className={iconClass} />
        )}
      </Button>
    </>
  );
};

export default PaginationButton;
