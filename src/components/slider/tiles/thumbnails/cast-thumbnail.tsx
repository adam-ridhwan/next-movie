import Image from 'next/image';

import { TODO } from '@/types/global';
import { extractInitials } from '@/lib/utils';
import { BodyMedium, BodySmall, HeadingLarge } from '@/components/fonts';

export const CastThumbnail = ({ tile, isVisible }: { tile: TODO; isVisible: boolean }) => {
  return (
    <>
      <div className='relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow'>
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
  );
};
