import Image from 'next/image';
import Link from 'next/link';

import { SliderContent, VideoSchema } from '@/lib/types';
import { BodyMedium, HeadingExtraSmall } from '@/components/fonts';

export const BonusTrailerThumbnail = ({ tile, isVisible }: { tile: SliderContent; isVisible: boolean }) => {
  const parsedTile = VideoSchema.safeParse(tile);
  if (!parsedTile.success) return null;

  return (
    <Link
      // TODO: Switch to Media.Link when the bonus trailer drawer is implemented
      href={`https://www.youtube.com/watch?v=${parsedTile.data.key}`}
      target='_blank'
      rel='noreferrer'
      tabIndex={isVisible ? 0 : -1}
    >
      <div className='relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow'>
        {parsedTile.data.key ? (
          <Image
            src={`https://img.youtube.com/vi/${parsedTile.data.key}/hqdefault.jpg`}
            alt={'Image not found'}
            priority
            unoptimized
            fill
            className='object-cover'
          />
        ) : (
          <div className='absolute bottom-0 z-50 flex h-full w-full items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent px-4 py-8'>
            <HeadingExtraSmall className='line-clamp-1'>
              {`${parsedTile.data.name || parsedTile.data.original_title || parsedTile.data.original_name || ''}`}
            </HeadingExtraSmall>
          </div>
        )}
      </div>

      <div className='pt-3'>
        <div className='flex flex-col'>
          <BodyMedium className='line-clamp-1'>{parsedTile.data.name || ''}</BodyMedium>
        </div>
      </div>
    </Link>
  );
};
