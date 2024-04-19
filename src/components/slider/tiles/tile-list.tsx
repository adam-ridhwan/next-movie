import { useDomContext } from '@/providers/dom-provider';

import { cn } from '@/lib/utils';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { useSlide } from '@/components/slider/hooks/use-slide';
import { useTiles } from '@/components/slider/hooks/use-tiles';
import TileItem from '@/components/slider/tiles/tile-item';

const TileList = () => {
  const { tilesToRender } = useTiles();
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
    <div
      ref={tileListRef}
      className={cn(
        'flex w-full flex-row pb-10 pt-3',
        { 'justify-center': hasPaginated },
        { 'transition-transform duration-700': isAnimating }
      )}
      style={{ transform: slideAmount ? `translate3d(${slideAmount}%, 0, 0)` : undefined }}
    >
      {tilesToRender.map((tile, i) => (
        <TileItem
          key={tile?.uuid || i}
          ref={i === 0 ? tileItemRef : undefined}
          tile={tile}
          index={i + 1}
          displayNumber={hasPaginated ? i - tilesPerPage : i}
          isVisibleOnScreen={hasPaginated ? isTileVisible(i) : i < tilesPerPage}
        />
      ))}
    </div>
  );
};

export default TileList;
