import { useDomContext } from '@/providers/dom-provider';

import { cn } from '@/lib/utils';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import { useTiles } from '@/components/slider/hooks/use-tiles';
import TileItem from '@/components/slider/tiles/tile-item';

const TileList = () => {
  const { tilesToRender } = useTiles();
  const {
    state: { TILES },
  } = usePagination();
  const {
    state: { hasPaginated },
    actions: { getTileCountPerPage },
  } = usePageUtils();
  const { slideAmount } = useSlide();
  const { isAnimating } = useAnimation();
  const { tileListRef, tileItemRef } = useDomContext();

  const tilesPerPage = getTileCountPerPage();

  const isTileVisible = (i: number) => {
    const lowerBound = tilesPerPage - 1;
    const upperBound = tilesPerPage * 2 + 2;
    return lowerBound < i && i < upperBound;
  };

  return (
    <>
      {/* Desktop */}
      <div
        ref={tileListRef}
        className={cn(
          'flex flex-row pb-5 pt-3 max-sm:hidden',
          { 'justify-center': hasPaginated },
          { 'transition-transform duration-700': isAnimating }
        )}
        style={{ transform: slideAmount ? `translate3d(${slideAmount}%, 0, 0)` : undefined }}
      >
        {tilesToRender.map((tile, i) => {
          return (
            <TileItem
              key={tile?.uuid || i}
              ref={i === 0 ? tileItemRef : undefined}
              tile={tile}
              displayNumber={hasPaginated ? i - tilesPerPage : i}
              isVisibleOnScreen={hasPaginated ? isTileVisible(i) : i < tilesPerPage}
            />
          );
        })}
      </div>

      {/* Mobile */}
      <div className='hide-scrollbar flex flex-row overflow-x-auto px-leftRightCustom pb-5 pt-3 sm:hidden'>
        {TILES.map((tile, i) => {
          return (
            <TileItem
              key={tile?.uuid || i}
              ref={i === 0 ? tileItemRef : undefined}
              tile={tile}
              displayNumber={hasPaginated ? i - tilesPerPage : i}
              isVisibleOnScreen={hasPaginated ? isTileVisible(i) : i < tilesPerPage}
            />
          );
        })}
      </div>
    </>
  );
};

export default TileList;
