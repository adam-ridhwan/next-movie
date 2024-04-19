import { cn } from '@/lib/utils';

const TileLoadingSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='flex flex-row px-leftRightCustom pt-10'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 0.25}s` }}
              className={cn('slider-tile animate-netflix-pulse')}
            >
              <div className='relative flex aspect-video flex-col justify-end gap-1 overflow-hidden rounded-sm bg-muted-foreground/20' />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TileLoadingSkeleton;
