import { forwardRef, ForwardRefRenderFunction } from 'react';
import Image from 'next/image';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Movie } from '@/lib/zod-types.ts/modelSchema/MovieSchema';

type TileItemProps = {
  tile: Movie | void;
  displayNumber?: number | '';
  isVisibleOnScreen?: boolean;
};

const TileItem: ForwardRefRenderFunction<HTMLDivElement, TileItemProps> = (
  { tile, displayNumber, isVisibleOnScreen = false },
  ref
) => {
  if (!tile) return null;
  return (
    <div ref={ref} className={cn('slider-tile p-1', `tile-${isVisibleOnScreen ? displayNumber : ''}`)}>
      {DEVELOPMENT_MODE && (
        // <div
        //   className='relative flex aspect-video flex-col items-center justify-center gap-1
        //   text-8xl outline outline-black'
        // >
        //   {tile.id}
        //   <div className='absolute right-1 top-0 text-4xl'>{tile.id}</div>
        //   <div className='absolute left-1 top-0 text-4xl'>{tile.id}</div>
        // </div>

        <div className='relative flex aspect-video flex-col justify-end gap-1 p-4'>
          <Image
            src={tile.thumbnailUrl}
            alt='thumbnail'
            priority
            fill
            sizes='(min-width: 1536px) 16.66vw, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33.33vw, 50vw'
            className='object-cover'
          />
        </div>
      )}

      {!DEVELOPMENT_MODE && (
        <div className='relative flex aspect-video flex-col justify-end gap-1 p-4'>
          <Image
            src={tile.thumbnailUrl}
            alt='thumbnail'
            priority
            fill
            sizes='(min-width: 1536px) 16.66vw, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33.33vw, 50vw'
            className='object-cover'
          />
        </div>
      )}
    </div>
  );
};

export default forwardRef(TileItem);
