import { forwardRef, ForwardRefRenderFunction } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Movie } from '@/lib/types';
import { cn } from '@/lib/utils';
import { BodyMedium, BodySmall, HeadingExtraSmall } from '@/components/fonts';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';

type TileItemProps = {
  tile: Movie | void;
  displayNumber?: number | '';
  isVisibleOnScreen?: boolean;
};

function extractYear(dateString: string | undefined): string {
  if (typeof dateString !== 'string') return '';

  const regex = /^\d{4}/;
  const match = dateString.match(regex);
  return match ? match[0] : '';
}

const TileItem: ForwardRefRenderFunction<HTMLDivElement, TileItemProps> = (
  { tile, displayNumber, isVisibleOnScreen = false },
  ref
) => {
  const { state: { isMounted } } = usePageUtils(); // prettier-ignore

  if (!tile) return null;

  return (
    <div
      ref={ref}
      className={cn('slider-tile', `tile-${isVisibleOnScreen && isMounted ? displayNumber : ''}`)}
    >
      <Thumbnail tile={tile} isVisibleOnScreen={isVisibleOnScreen} />

      <div className='pt-3'>
        <div className='flex flex-col'>
          <BodyMedium className='line-clamp-1'>{tile.name || tile.title || tile.original_title}</BodyMedium>
          <BodySmall>{extractYear(tile.release_date || tile.first_air_date)}</BodySmall>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(TileItem);

const Thumbnail = ({ tile, isVisibleOnScreen }: { tile: Movie; isVisibleOnScreen: boolean }) => {
  const { state: { mediaType } } = usePagination(); // prettier-ignore
  const { state: { isMounted } } = usePageUtils(); // prettier-ignore

  if (mediaType === 'trailer' || mediaType === 'bonus') {
    return (
      <a
        href={`https://www.youtube.com/watch?v=${tile.key}`}
        target='_blank'
        rel='noreferrer'
        tabIndex={isVisibleOnScreen && isMounted ? 0 : -1}
      >
        <div className='relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow max-sm:aspect-poster'>
          {tile.key ? (
            <Image
              src={`https://img.youtube.com/vi/${tile.key}/hqdefault.jpg`}
              alt={tile.title || tile.name}
              priority
              unoptimized
              fill
              className='object-cover'
            />
          ) : (
            <div className='absolute bottom-0 z-50 flex h-full w-full items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent px-4 py-8'>
              <HeadingExtraSmall className='line-clamp-2'>
                {tile.name || tile.original_title || tile.original_name}
              </HeadingExtraSmall>
            </div>
          )}
        </div>
      </a>
    );
  }

  return (
    <Link
      href={`/browse/${mediaType}/${tile.id}`}
      scroll={false}
      tabIndex={isVisibleOnScreen && isMounted ? 0 : -1}
    >
      <div className='relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow max-sm:aspect-poster'>
        {tile.backdrop_path || tile.poster_path ? (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/original${tile.backdrop_path || tile.poster_path}`}
              alt={tile.title || tile.name}
              priority
              unoptimized
              fill
              className='object-cover max-sm:hidden'
            />
            <Image
              src={`https://image.tmdb.org/t/p/original${tile.poster_path || tile.backdrop_path}`}
              alt={tile.title || tile.name}
              priority
              unoptimized
              fill
              className='object-cover sm:hidden'
            />
          </>
        ) : (
          <div className='absolute bottom-0 z-50 flex h-full w-full items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent px-4 py-8'>
            <HeadingExtraSmall className='line-clamp-2'>
              {tile.name || tile.original_title || tile.original_name}
            </HeadingExtraSmall>
          </div>
        )}
      </div>
    </Link>
  );
};
