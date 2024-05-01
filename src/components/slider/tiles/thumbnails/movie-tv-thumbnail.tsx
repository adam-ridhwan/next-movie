import Image from 'next/image';
import { MediaRoute } from '@/routes';

import { TODO } from '@/types/global';
import { extractYear } from '@/lib/utils';
import { usePagination } from '@/hooks/use-pagination';
import { BodyMedium, BodySmall, HeadingExtraSmall } from '@/components/fonts';

export const MovieTvThumbnail = ({ tile, isVisible }: { tile: TODO; isVisible: boolean }) => {
  const { state: { mediaType } } = usePagination(); // prettier-ignore

  return (
    // prettier-ignore
    <MediaRoute.Link
      id={tile.id.toString()}
      mediaType={mediaType}
      scroll={false}
      tabIndex={isVisible ? 0 : -1}
    >
      <div className='relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow max-sm:aspect-poster'>
        {tile.backdrop_path || tile.poster_path ? (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/w500${tile.backdrop_path || tile.poster_path}`}
              alt={tile.title || tile.name}
              priority
              unoptimized
              fill
              className='object-cover max-sm:hidden'
            />
            <Image
              src={`https://image.tmdb.org/t/p/w500${tile.poster_path || tile.backdrop_path}`}
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

      <div className='pt-3 max-sm:hidden'>
        <div className='flex flex-col'>
          <BodyMedium className='line-clamp-1'>{tile.name || tile.title || tile.original_title}</BodyMedium>
          <BodySmall className='line-clamp-1'>
            {extractYear(tile.release_date || tile.first_air_date)}
          </BodySmall>
        </div>
      </div>
    </MediaRoute.Link>
  );
};
