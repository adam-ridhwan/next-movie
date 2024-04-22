import { cn } from '@/lib/utils';

type TileLoadingSkeletonProps = {
  count: number;
};

const TileLoadingSkeleton = ({ count }: TileLoadingSkeletonProps) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className=' flex flex-row px-leftRightCustom pb-[29px] pt-12'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 0.25}s` }}
              className={cn('slider-tile animate-netflix-pulse')}
            >
              <div className='relative flex aspect-video flex-col justify-end gap-1 overflow-hidden rounded-2xl bg-muted-foreground/20' />

              <div className='pt-3'>
                <div className='flex flex-col gap-2'>
                  <div className='h-[14px] w-2/3 animate-netflix-pulse rounded-2xl bg-muted-foreground/20' />
                  <div className='h-[10px] w-1/3 animate-netflix-pulse rounded-2xl bg-muted-foreground/20' />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TileLoadingSkeleton;
