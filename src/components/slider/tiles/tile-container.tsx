import { useDomContext } from '@/providers/dom-provider';

import { cn } from '@/lib/utils';
import { useAnimation } from '@/hooks/use-animation';
import { usePageUtils } from '@/hooks/use-page-utils';
import { usePagination } from '@/hooks/use-pagination';
import { useSlide } from '@/hooks/use-slide';
import { useTiles } from '@/hooks/use-tiles';
import TileItem from '@/components/slider/tiles/tile-item';

const TileContainer = () => {
  const { state: { CONTENT } } = usePagination(); // prettier-ignore
  const { state: { hasPaginated } } = usePageUtils(); // prettier-ignore
  const { tilesToRender } = useTiles();
  const { slideAmount } = useSlide();
  const { isAnimating } = useAnimation();
  const { tileContainerRef } = useDomContext();

  return (
    <div className='relative w-full overflow-hidden'>
      {/* Desktop */}
      <div
        ref={tileContainerRef}
        className={cn(
          'flex flex-row',
          { 'justify-center': hasPaginated },
          { 'transition-transform duration-700': isAnimating },
          'max-sm:hidden'
        )}
        style={{ transform: slideAmount ? `translate3d(${slideAmount}%, 0, 0)` : undefined }}
      >
        {tilesToRender.map((tile, i) => (
          <TileItem key={tile?.uuid || i} tile={tile} i={i} />
        ))}
      </div>

      {/* Mobile */}
      {/* prettier-ignore */}
      <div className={cn(
        'hide-scrollbar flex flex-row overflow-x-auto px-leftRightCustom',
        'sm:hidden',
        )}>
        {CONTENT.map((tile, i) => (
          <TileItem key={tile?.uuid || i} tile={tile} i={i} />
        ))}
      </div>
    </div>
  );
};

export default TileContainer;
