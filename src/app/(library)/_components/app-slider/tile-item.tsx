import { forwardRef, ForwardRefRenderFunction } from 'react';
import Image from 'next/image';

import { AppFonts } from '@/app/_components/app-fonts';
import { AppIcons } from '@/app/_components/app-icons';
import { cn, DEVELOPMENT_MODE } from '@/app/_lib/utils';
import { Card } from '@/app/(library)/page';

type TileItemProps = {
  card: Card;
  displayNumber: number;
  isVisibleOnScreen?: boolean;
};

const TileItem: ForwardRefRenderFunction<HTMLDivElement, TileItemProps> = (
  { card, displayNumber, isVisibleOnScreen = false },
  ref
) => {
  return (
    <div
      ref={ref}
      className={cn('slider-tile p-1', `tile-${isVisibleOnScreen ? displayNumber : ''}`)}
    >
      {DEVELOPMENT_MODE ? (
        <div className='relative flex aspect-video flex-col items-center justify-center gap-1 p-4 text-8xl outline outline-black'>
          {card.id}
          <div className='absolute right-1 top-0 text-4xl'>{card.id ?? 'NaN'}</div>
          <div className='absolute left-1 top-0 text-4xl'>{card.id ?? 'NaN'}</div>
        </div>
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
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-black to-transparent' />
            <div className='relative flex flex-row'>
              <AppFonts.bodySmall className='text-[12px] opacity-75'>
                {card.year}
              </AppFonts.bodySmall>
              <AppIcons.dot />
              <div className='flex flex-row items-center gap-1'>
                <AppIcons.categoryMovie />
                <AppFonts.bodySmall className='text-[12px] opacity-75'>
                  {card.category}
                </AppFonts.bodySmall>
              </div>
              <AppIcons.dot />
              <AppFonts.bodySmall className='text-[12px] opacity-75'>
                {card.rating}
              </AppFonts.bodySmall>
            </div>
            <div className='relative'>
              <AppFonts.bodyMedium>{card.title}</AppFonts.bodyMedium>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default forwardRef(TileItem);
