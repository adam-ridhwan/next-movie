import Image from 'next/image';
import { MediaModal } from '@/routes';

import { TODO } from '@/types/global-types';
import { usePagination } from '@/hooks/use-pagination';
import { HeadingExtraSmall } from '@/components/fonts';
import { ArrowRightCircleIcon } from '@/components/icons';

type SpotlightThumbnailProps = {
  tile: TODO;
  isVisible: boolean;
};

export const SpotlightThumbnail = ({
  tile,
  isVisible,
}: SpotlightThumbnailProps) => {
  const { state: { mediaType } } = usePagination(); // prettier-ignore

  return (
    <MediaModal.Link
      slug={[mediaType, tile.id.toString()]}
      scroll={false}
      tabIndex={isVisible ? 0 : -1}
      prefetch={true}
    >
      <div className='group relative flex aspect-poster flex-col justify-end overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow max-sm:aspect-poster'>
        <div className='absolute z-10 h-full w-full bg-black/0 transition-colors duration-300 hover:bg-black/30' />
        <ArrowRightCircleIcon className='pointer-events-none absolute left-1/2 top-1/2 z-20 size-9 -translate-x-[50%] -translate-y-[50%] opacity-0 shadow-xl transition-all group-hover:opacity-100' />

        {tile.poster_path || tile.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${tile.poster_path || tile.backdrop_path}`}
            alt={tile.title || tile.name}
            priority
            unoptimized
            fill
            className='object-cover'
          />
        ) : (
          <div className='absolute bottom-0 z-50 flex h-full w-full items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent px-4 py-8'>
            <HeadingExtraSmall className='line-clamp-2'>
              {tile.name ||
                tile.original_title ||
                tile.title ||
                tile.original_name}
            </HeadingExtraSmall>
          </div>
        )}
      </div>
    </MediaModal.Link>
  );
};
