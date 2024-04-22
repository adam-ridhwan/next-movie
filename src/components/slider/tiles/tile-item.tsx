import { forwardRef, ForwardRefRenderFunction } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  const { state: { contentType } } = usePagination(); // prettier-ignore
  const { state: { isMounted } } = usePageUtils(); // prettier-ignore

  if (!tile) return null;

  const url = `/browse/${contentType}/${tile.id}`;

  return (
    <>
      <div
        ref={ref}
        className={cn('slider-tile', `tile-${isVisibleOnScreen && isMounted ? displayNumber : ''}`)}
      >
        <Link href={url} scroll={false} tabIndex={isVisibleOnScreen && isMounted ? 0 : -1}>
          <ContentImage tile={tile} />

          <div className='pt-3'>
            <div className='flex flex-col'>
              <BodyMedium className='line-clamp-1'>{tile.name || tile.original_title}</BodyMedium>
              <BodySmall>{extractYear(tile.release_date || tile.first_air_date)}</BodySmall>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

const ContentImage = ({ tile }: { tile: Movie }) => {
  return (
    <div className='relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl shadow-tileShadow max-sm:aspect-poster'>
      {/* Image docs: https://developer.themoviedb.org/docs/image-basics */}
      {/* Example: https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg */}
      <Image
        src={`https://image.tmdb.org/t/p/original${tile.backdrop_path || tile.poster_path}`}
        alt={tile.title || tile.name}
        priority
        fill
        sizes='(min-width: 1300px) 20vw, (min-width: 1000px) 25vw, (min-width: 800px) 33.33vw, 50vw'
        className='object-cover max-sm:hidden'
      />
      <Image
        src={`https://image.tmdb.org/t/p/original${tile.poster_path || tile.backdrop_path}`}
        alt={tile.title || tile.name}
        priority
        fill
        sizes='(min-width: 1300px) 20vw, (min-width: 1000px) 25vw, (min-width: 800px) 33.33vw, 50vw'
        className='object-cover sm:hidden'
      />
    </div>
  );
};

export default forwardRef(TileItem);
