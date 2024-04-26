import Image from 'next/image';
import Link from 'next/link';
import { useDomContext } from '@/providers/dom-provider';

import { Movie } from '@/lib/types';
import { cn } from '@/lib/utils';
import { BodyMedium, BodySmall, HeadingExtraSmall, HeadingLarge } from '@/components/fonts';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';

type TileItemProps = {
  tile: Movie | void;
  i: number;
};

function extractYear(dateString: string | undefined): string {
  if (typeof dateString !== 'string') return '';

  const regex = /^\d{4}/;
  const match = dateString.match(regex);
  return match ? match[0] : '';
}

function extractInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');
}

const TileItem = ({ tile, i }: TileItemProps) => {
  const { state: { mediaType } } = usePagination(); // prettier-ignore
  const { state: { isMounted } } = usePageUtils(); // prettier-ignore
  const { state: { hasPaginated }, actions: { getTileCountPerPage }, } = usePageUtils(); // prettier-ignore
  const { tileItemRef } = useDomContext();

  const tilesPerPage = getTileCountPerPage();

  const isTileVisible = (i: number) => {
    const lowerBound = tilesPerPage - 1;
    const upperBound = tilesPerPage * 2;
    return lowerBound < i && i < upperBound;
  };

  if (!tile) return null;

  // FIXME: This is not showing the first few tiles on the first render
  const displayNumber = hasPaginated ? i - tilesPerPage : i;
  const isVisibleOnScreen = isTileVisible(i) && isMounted;

  return (
    <div
      ref={i === 0 ? tileItemRef : undefined}
      className={cn('max-sm:pr-2', `tile-${isVisibleOnScreen ? displayNumber : ''}`, {
        'slider-tile': mediaType !== 'cast',
        'slider-tile-cast': mediaType === 'cast',
      })}
    >
      <Thumbnail tile={tile} isVisibleOnScreen={isVisibleOnScreen} />
    </div>
  );
};

export default TileItem;

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
        <div className='relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow'>
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
              <HeadingExtraSmall className='line-clamp-1'>
                {tile.name || tile.original_title || tile.original_name}
              </HeadingExtraSmall>
            </div>
          )}
        </div>

        <div className='pt-3'>
          <div className='flex flex-col'>
            <BodyMedium className='line-clamp-1'>{tile.name || ''}</BodyMedium>
          </div>
        </div>
      </a>
    );
  }

  if (mediaType === 'cast') {
    return (
      // <Link
      //   href={`/browse/${mediaType}/${tile.id}`}
      //   scroll={false}
      //   tabIndex={isVisibleOnScreen && isMounted ? 0 : -1}
      // >
      <>
        <div className='relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow'>
          {tile.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${tile.profile_path}`}
              alt={tile.title || tile.name}
              priority
              unoptimized
              fill
              className='object-cover'
            />
          ) : (
            <div className='absolute bottom-0 z-50 flex h-full w-full items-center justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent px-4 py-8'>
              <HeadingLarge className='line-clamp-2 text-[42px]'>
                {extractInitials(tile.name || tile.original_name)}
              </HeadingLarge>
            </div>
          )}
        </div>

        <div className='pt-3'>
          <div className='flex flex-col items-center'>
            <BodyMedium className='line-clamp-1 text-center'>{tile.name || ''}</BodyMedium>
            <BodySmall className='line-clamp-1 text-center'>{tile.character || ''}</BodySmall>
          </div>
        </div>
      </>

      // </Link>
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

      <div className='pt-3'>
        <div className='flex flex-col'>
          <BodyMedium className='line-clamp-1'>{tile.name || tile.title || tile.original_title}</BodyMedium>
          <BodySmall className='line-clamp-1'>
            {extractYear(tile.release_date || tile.first_air_date)}
          </BodySmall>
        </div>
      </div>
    </Link>
  );
};
