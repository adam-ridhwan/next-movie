import { useDomContext } from '@/providers/dom-provider';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { useSlide } from '@/components/slider/hooks/use-slide';
import { useTiles } from '@/components/slider/hooks/use-tiles';
import TileItem from '@/components/slider/tiles/tile-item';

const TileList = () => {
  const { tilesToRender } = useTiles();
  const { hasPaginated } = usePageUtils();
  const { slideAmount } = useSlide();
  const { isAnimating } = useAnimation();
  const { tileRef } = useDomContext();

  return (
    <div
      className={cn(
        'slider relative flex w-full flex-row px-12',
        { 'justify-center': hasPaginated },
        { 'transition-transform duration-700': isAnimating },
        { 'bg-green-600': DEVELOPMENT_MODE }
      )}
      style={{
        transform: slideAmount ? `translate3d(${slideAmount}%, 0, 0)` : undefined,
      }}
    >
      {tilesToRender.map((tile, i) => (
        // TODO: Fix the displayName. Only show the number if the tile is visible on screen.
        <TileItem key={tile.id} ref={i === 0 ? tileRef : undefined} tile={tile} />
      ))}
    </div>
  );
};

export default TileList;
