import { useDomContext } from '@/providers/dom-provider';

import { cn } from '@/lib/utils';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import { useTiles } from '@/components/slider/hooks/use-tiles';
import TileItem from '@/components/slider/tile-item';

const TileList = () => {
  const { tilesToRender } = useTiles();
  const { state: { MEDIA } } = usePagination(); // prettier-ignore
  const { state: { hasPaginated }, } = usePageUtils(); // prettier-ignore
  const { slideAmount } = useSlide();
  const { isAnimating } = useAnimation();
  const { tileListRef } = useDomContext();

  return (
    <>
      {/* TODO: Combine desktop using media queries */}
      {/* Desktop */}
      <div className='w-full overflow-hidden max-sm:hidden'>
        <div
          ref={tileListRef}
          className={cn(
            'flex flex-row',
            { 'justify-center': hasPaginated },
            { 'transition-transform duration-700': isAnimating }
          )}
          style={{ transform: slideAmount ? `translate3d(${slideAmount}%, 0, 0)` : undefined }}
        >
          {tilesToRender.map((tile, i) => (
            <TileItem key={tile?.uuid || i} tile={tile} i={i} />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className='hide-scrollbar flex flex-row overflow-x-auto px-leftRightCustom sm:hidden'>
        {MEDIA.map((tile, i) => (
          <TileItem key={tile?.uuid || i} tile={tile} i={i} />
        ))}
      </div>
    </>
  );
};

export default TileList;
