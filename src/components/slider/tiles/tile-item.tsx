import { forwardRef, ForwardRefRenderFunction } from 'react';
import Image from 'next/image';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { Movie } from '@/lib/types';
import { cn } from '@/lib/utils';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';

type TileItemProps = {
  tile: Movie | void;
  index: number;
  displayNumber?: number | '';
  isVisibleOnScreen?: boolean;
};

const TileItem: ForwardRefRenderFunction<HTMLDivElement, TileItemProps> = (
  { tile, index, displayNumber, isVisibleOnScreen = false },
  ref
) => {
  const {
    state: { isMounted },
  } = usePageUtils();

  if (!tile) return null;

  return (
    <div
      ref={ref}
      className={cn('slider-tile', `tile-${isVisibleOnScreen && isMounted ? displayNumber : ''}`)}
    >
      <div className='relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl shadow-tileShadow'>
        {/* Image docs: https://developer.themoviedb.org/docs/image-basics */}
        {/* Example: https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg */}
        <Image
          src={`https://image.tmdb.org/t/p/w500${tile.backdrop_path ?? tile.poster_path}`}
          alt={tile.title || tile.name}
          priority
          fill
          sizes='(min-width: 1300px) 20vw, (min-width: 1000px) 25vw, (min-width: 800px) 33.33vw, 50vw'
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default forwardRef(TileItem);
