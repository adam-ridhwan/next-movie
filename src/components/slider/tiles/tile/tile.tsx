import { forwardRef, ForwardRefRenderFunction } from 'react';
import Image from 'next/image';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { Card } from '@/lib/types';
import { cn } from '@/lib/utils';
import { BodyMedium, BodySmall } from '@/components/shared/fonts';
import { CategoryMovieIcon, DotIcon } from '@/components/shared/icons';

type TileItemProps = {
  card: Card;
  displayNumber: number | '';
  isVisibleOnScreen?: boolean;
};

const Tile: ForwardRefRenderFunction<HTMLDivElement, TileItemProps> = (
  { card, displayNumber, isVisibleOnScreen = false },
  ref
) => {
  return (
    <div
      ref={ref}
      className={cn('slider-tile p-1', `tile-${isVisibleOnScreen ? displayNumber : ''}`)}
    >
      {DEVELOPMENT_MODE ? (
        <>
          <div
            className='relative flex aspect-video flex-col items-center justify-center gap-1
          text-8xl outline outline-black'
          >
            {card.id}
            <div className='absolute right-1 top-0 text-4xl'>{card.id}</div>
            <div className='absolute left-1 top-0 text-4xl'>{card.id}</div>
          </div>
        </>
      ) : (
        <>
          <div className='relative flex aspect-video flex-col justify-end gap-1 p-4'>
            <Image
              src={card.imageUrl}
              alt='thumbnail'
              priority
              fill
              sizes='(min-width: 1536px) 16.66vw, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33.33vw, 50vw'
              className='object-cover'
            />
            <div className='relative flex flex-row'>
              <BodySmall className='text-[12px] opacity-75'>{card.year}</BodySmall>
              <DotIcon />
              <div className='flex flex-row items-center gap-1'>
                <CategoryMovieIcon />
                <BodySmall className='text-[12px] opacity-75'>{card.category}</BodySmall>
              </div>
              <DotIcon />
              <BodySmall className='text-[12px] opacity-75'>{card.rating}</BodySmall>
            </div>
            <div className='relative'>
              <BodyMedium>{card.title}</BodyMedium>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default forwardRef(Tile);
