import { ReactNode } from 'react';

import { ArrowRightCircleIcon } from '@/components/icons';

const ThumbnailWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className='relative flex aspect-video flex-col justify-end overflow-hidden rounded-2xl bg-muted/50 shadow-tileShadow max-sm:aspect-poster'>
      <div className='absolute z-10 h-full w-full bg-black/0 transition-colors duration-300 hover:bg-black/30' />
      <ArrowRightCircleIcon className='pointer-events-none absolute left-1/2 top-1/2 z-20 size-9 -translate-x-[50%] -translate-y-[50%] opacity-0 shadow-xl transition-all group-hover:opacity-100' />
      {children}
    </div>
  );
};

export default ThumbnailWrapper;
