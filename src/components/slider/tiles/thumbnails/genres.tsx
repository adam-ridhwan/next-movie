import { MediaModal } from '@/routes';

import { TODO } from '@/types/global-types';
import { HeadingMedium } from '@/components/fonts';
import { ArrowRightCircleIcon } from '@/components/icons';

const GenresThumbnail = ({ tile, isVisible }: { tile: TODO; isVisible: boolean }) => {
  return (
    <MediaModal.Link id={tile.id.toString()} mediaType='movie' scroll={false} tabIndex={isVisible ? 0 : -1}>
      <div className='group relative mb-4 flex aspect-video flex-col justify-end overflow-hidden rounded-2xl bg-black/50 shadow-tileShadow '>
        <HeadingMedium className='z-40 select-none p-6 text-primary'>{tile.name}</HeadingMedium>
        <ArrowRightCircleIcon className='pointer-events-none absolute left-1/2 top-1/2 z-30 size-9 -translate-x-[50%] -translate-y-[50%] opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100' />
        <div className='absolute z-20 h-full w-full bg-black/0 transition-colors duration-300 group-hover:bg-black/30' />
        <div className='absolute bottom-0 z-10 flex h-full w-full items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent px-4 py-8' />
      </div>
    </MediaModal.Link>
  );
};

export default GenresThumbnail;
