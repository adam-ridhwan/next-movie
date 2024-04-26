import { useDomContext } from '@/providers/dom-provider';

import { cn } from '@/lib/utils';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import { useTiles } from '@/components/slider/hooks/use-tiles';
import TileItem from '@/components/slider/tiles/tile-item';

const TileContainer = () => {
  const { state: { MEDIA } } = usePagination(); // prettier-ignore
  const { state: { hasPaginated } } = usePageUtils(); // prettier-ignore
  const { tilesToRender } = useTiles();
  const { slideAmount } = useSlide();
  const { isAnimating } = useAnimation();
  const { tileContainerRef } = useDomContext();

  return (
    <div className='w-full overflow-hidden'>
      {/* Desktop */}
      <div
        ref={tileContainerRef}
        className={cn(
          'flex flex-row max-sm:hidden',
          { 'justify-center': hasPaginated },
          { 'transition-transform duration-700': isAnimating }
        )}
        style={{ transform: slideAmount ? `translate3d(${slideAmount}%, 0, 0)` : undefined }}
      >
        {tilesToRender.map((tile, i) => (
          <TileItem key={tile?.uuid || i} tile={tile} i={i} />
        ))}
      </div>

      {/* Mobile */}
      <div className='hide-scrollbar flex flex-row overflow-x-auto sm:hidden'>
        {MEDIA.map((tile, i) => (
          <TileItem key={tile?.uuid || i} tile={tile} i={i} />
        ))}
      </div>
    </div>
  );
};

export default TileContainer;
