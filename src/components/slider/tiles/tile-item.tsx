import { forwardRef, ForwardRefRenderFunction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Movie } from '@/lib/types';
import { cn } from '@/lib/utils';
import { BodyMedium, BodySmall } from '@/components/fonts';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';

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
    state: { contentType },
  } = usePagination();
  const {
    state: { isMounted },
  } = usePageUtils();
  const router = useRouter();

  if (!tile) return null;

  const url = `/browse/${contentType}/${tile.id}`;

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
        <Link href={url} scroll={false} onMouseEnter={() => router.prefetch(url)}>
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
        </Link>
      </div>

      {/* Mobile */}
      <div
        ref={ref}
        className={cn(
          'slider-tile-phone sm:hidden',
          `tile-${isVisibleOnScreen && isMounted ? displayNumber : ''}`
        )}
      >
        <Link href={url} scroll={false}>
          <div className='relative flex aspect-poster flex-col justify-end overflow-hidden rounded-2xl shadow-tileShadow'>
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
        </Link>
      </div>
    </>
  );
};

export default forwardRef(TileItem);
