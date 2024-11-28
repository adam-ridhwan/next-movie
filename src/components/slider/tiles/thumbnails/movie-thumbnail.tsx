import Image from 'next/image';
import { MediaModal } from '@/routes';

import { TODO } from '@/types/global-types';
import { extractYear } from '@/lib/utils';
import { BodyMedium, BodySmall, HeadingExtraSmall } from '@/components/fonts';
import ThumbnailWrapper from '@/components/thumbnail-wrapper';

type MovieThumbnailProps = {
  tile: TODO;
  isVisible: boolean;
};

export const MovieThumbnail = ({ tile, isVisible }: MovieThumbnailProps) => (
  <MediaModal.Link
    slug={['movie', tile.id.toString()]}
    scroll={false}
    tabIndex={isVisible ? 0 : -1}
    prefetch={true}
  >
    <ThumbnailWrapper>
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
    </ThumbnailWrapper>

    <div className='pt-3 max-sm:hidden'>
      <div className='flex flex-col'>
        <BodyMedium className='line-clamp-1'>
          {tile.name || tile.title || tile.original_title}
        </BodyMedium>
        <BodySmall className='line-clamp-1'>
          {extractYear(tile.release_date || tile.first_air_date)}
        </BodySmall>
      </div>
    </div>
  </MediaModal.Link>
);
