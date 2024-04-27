import { useDomContext } from '@/providers/dom-provider';

import { useAnimation } from '@/lib/hooks/use-animation';
import { usePageUtils } from '@/lib/hooks/use-page-utils';
import { usePagination } from '@/lib/hooks/use-pagination';
import { useSlide } from '@/lib/hooks/use-slide';
import { useTiles } from '@/lib/hooks/use-tiles';
import { cn } from '@/lib/utils';
import TileItem from '@/components/slider/tiles/tile-item';

const TileContainer = () => {
  const { state: { MEDIA } } = usePagination(); // prettier-ignore
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
        'hide-scrollbar flex flex-row overflow-x-auto',
        'sm:hidden',
        )}>
        {MEDIA.map((tile, i) => (
          <TileItem key={tile?.uuid || i} tile={tile} i={i} />
        ))}
      </div>
    </div>
  );
};

export default TileContainer;
