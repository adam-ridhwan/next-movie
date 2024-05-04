import Image from 'next/image';
import Link from 'next/link';

import { TODO } from '@/types/global-types';
import { BodyMedium, HeadingExtraSmall } from '@/components/fonts';
import { ArrowRightCircleIcon } from '@/components/icons';

type BonusTrailerThumbnailProps = {
  tile: TODO;
  isVisible: boolean;
};

export const BonusTrailerThumbnail = ({
  tile,
  isVisible,
}: BonusTrailerThumbnailProps) => {
  return (
    <Link
      // TODO: Switch to Media.Link when the bonus trailer drawer is implemented
      href={`https://www.youtube.com/watch?v=${tile.key}`}
      target='_blank'
      rel='noreferrer'
      tabIndex={isVisible ? 0 : -1}
    >
      <div className='group relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow'>
        <div className='absolute z-10 h-full w-full bg-black/0 transition-colors duration-300 hover:bg-black/30' />
        <ArrowRightCircleIcon className='pointer-events-none absolute left-1/2 top-1/2 z-20 size-9 -translate-x-[50%] -translate-y-[50%] opacity-0 shadow-xl transition-all group-hover:opacity-100' />

        {tile.key ? (
          <Image
            src={`https://img.youtube.com/vi/${tile.key}/hqdefault.jpg`}
            alt={'Image not found'}
            priority
            unoptimized
            fill
            className='object-cover'
          />
        ) : (
          <div className='absolute bottom-0 z-50 flex h-full w-full items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent px-4 py-8'>
            <HeadingExtraSmall className='line-clamp-1'>
              {`${tile.name || tile.original_title || tile.original_name || ''}`}
            </HeadingExtraSmall>
          </div>
        )}
      </div>

      <div className='pt-3'>
        <div className='flex flex-col'>
          <BodyMedium className='line-clamp-1'>{tile.name || ''}</BodyMedium>
        </div>
      </div>
    </Link>
  );
};
