import Image from 'next/image';
import { MediaModal } from '@/routes';

import { TODO } from '@/types/global-types';
import { extractInitials } from '@/lib/utils';
import { BodyMedium, BodySmall, HeadingLarge } from '@/components/fonts';

type CastThumbnailProps = {
  tile: TODO;
  isVisible: boolean;
};

export const CastThumbnail = ({ tile, isVisible }: CastThumbnailProps) => (
  <MediaModal.Link
    slug={['person', tile.id.toString()]}
    scroll={false}
    tabIndex={isVisible ? 0 : -1}
  >
    <div className='group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow'>
      {/*<div className='absolute z-10 h-full w-full bg-black/0 transition-colors duration-300 hover:bg-black/30' />*/}
      {/*<ArrowRightCircleIcon className='pointer-events-none absolute left-1/2 top-1/2 z-20 size-9 -translate-x-[50%] -translate-y-[50%] opacity-0 shadow-xl transition-all group-hover:opacity-100' />*/}
      {tile.profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${tile.profile_path}`}
          alt={tile.id.toString() || 'Image not found'}
          priority
          unoptimized
          fill
          className='object-cover object-top'
        />
      ) : (
        <div className='absolute bottom-0 z-50 flex h-full w-full items-center justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent px-4 py-8'>
          <HeadingLarge className='line-clamp-2 text-[32px]'>
            {extractInitials(tile.name || tile.original_name)}
          </HeadingLarge>
        </div>
      )}
    </div>

    <div className='pt-3'>
      <div className='flex flex-col items-center'>
        <BodyMedium className='line-clamp-1 text-center'>
          {tile.name || ''}
        </BodyMedium>
        <BodySmall className='line-clamp-1 text-center'>
          {tile.character || ''}
        </BodySmall>
      </div>
    </div>
  </MediaModal.Link>
);
