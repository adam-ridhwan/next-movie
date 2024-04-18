import { cn } from '@/lib/utils';

export default function Loading() {
  return (
    <div className='flex flex-row px-leftRightCustom pt-10'>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={cn('slider-tile animate-netflix-pulse')}
          style={{ animationDelay: `${i * 0.25}s` }}
        >
          <div className='relative flex aspect-video flex-col justify-end gap-1 overflow-hidden rounded-sm bg-muted-foreground/20' />
        </div>
      ))}
    </div>
  );
}
