import { forwardRef, ForwardRefRenderFunction } from 'react';
import Image from 'next/image';

import { Movie } from '@/lib/types';
import { cn } from '@/lib/utils';
import { BodyMedium, BodySmall } from '@/components/fonts';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';

type TileItemProps = {
  tile: Movie | void;
  displayNumber?: number | '';
  isVisibleOnScreen?: boolean;
};

function extractYear(dateString: string | undefined): string {
  if (typeof dateString !== 'string') return '-';

  const regex = /^\d{4}/;
  const match = dateString.match(regex);
  return match ? match[0] : '';
}

const TileItem: ForwardRefRenderFunction<HTMLDivElement, TileItemProps> = (
  { tile, displayNumber, isVisibleOnScreen = false },
  ref
) => {
  const {
    state: { isMounted },
  } = usePageUtils();

  if (!tile) return null;

  return (
    <>
      {/* Desktop */}
      <div
        ref={ref}
        className={cn(
          'slider-tile max-sm:hidden',
          `tile-${isVisibleOnScreen && isMounted ? displayNumber : ''}`
        )}
      >
        <div className='relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl shadow-tileShadow'>
          {/* Image docs: https://developer.themoviedb.org/docs/image-basics */}
          {/* Example: https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg */}
          <Image
            src={`https://image.tmdb.org/t/p/w500${tile.backdrop_path || tile.poster_path}`}
            alt={tile.title || tile.name}
            priority
            fill
            sizes='(min-width: 1300px) 20vw, (min-width: 1000px) 25vw, (min-width: 800px) 33.33vw, 50vw'
            className='object-cover'
          />
        </div>

        <div className=' pt-3'>
          <div className='flex flex-col'>
            <BodyMedium className='line-clamp-1'>{tile.name || tile.original_title}</BodyMedium>
            <BodySmall>{extractYear(tile.release_date || tile.first_air_date)}</BodySmall>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        ref={ref}
        className={cn(
          'slider-tile-phone sm:hidden',
          `tile-${isVisibleOnScreen && isMounted ? displayNumber : ''}`
        )}
      >
        <div className='aspect-poster relative flex flex-col justify-end overflow-hidden rounded-2xl shadow-tileShadow'>
          {/* Image docs: https://developer.themoviedb.org/docs/image-basics */}
          {/* Example: https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg */}
          <Image
            src={`https://image.tmdb.org/t/p/w500${tile.poster_path || tile.backdrop_path}`}
            alt={tile.title || tile.name}
            priority
            fill
            sizes='(min-width: 1300px) 20vw, (min-width: 1000px) 25vw, (min-width: 800px) 33.33vw, 50vw'
            className='object-cover'
          />
        </div>
      </div>
    </>
  );
};

export default forwardRef(TileItem);
