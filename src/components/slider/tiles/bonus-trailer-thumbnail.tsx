import Image from 'next/image';

import { usePageUtils } from '@/lib/hooks/use-page-utils';
import { Movie } from '@/lib/types';
import { BodyMedium, HeadingExtraSmall } from '@/components/fonts';

export const BonusTrailerThumbnail = ({ tile, isVisible }: { tile: Movie; isVisible: boolean }) => {
  const { state: { isMounted } } = usePageUtils(); // prettier-ignore

  return (
    <a
      href={`https://www.youtube.com/watch?v=${tile.key}`}
      target='_blank'
      rel='noreferrer'
      tabIndex={isVisible && isMounted ? 0 : -1}
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
};
