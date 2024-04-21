export const BackdropSkeleton = () => {
  return (
    <div className='relative aspect-video animate-pulse bg-appBackground'>
      <div className='object-cover' />
      <div className='absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-muted via-transparent to-transparent' />
    </div>
  );
};

export const MetadataSkeleton = () => {
  return (
    <>
      <div className='h-[20px] w-[80%] animate-netflix-pulse rounded-sm bg-muted-foreground/10' />
      <div className='h-[20px] w-[90%] animate-netflix-pulse rounded-sm bg-muted-foreground/10' />
      <div className='h-[20px] w-[95%] animate-netflix-pulse rounded-sm bg-muted-foreground/10' />
      <div className='h-[20px] w-[85%] animate-netflix-pulse rounded-sm bg-muted-foreground/10' />
    </>
  );
};

export const OverviewSkeleton = () => {
  return (
    <>
      <div className='h-[30px] w-2/3 animate-netflix-pulse rounded-sm bg-muted-foreground/10' />
      <div className='flex flex-col gap-2'>
        <div className='h-[20px] w-[80%] animate-netflix-pulse rounded-sm bg-muted-foreground/10' />
        <div className='h-[20px] w-[90%] animate-netflix-pulse rounded-sm bg-muted-foreground/10' />
        <div className='h-[20px] w-[95%] animate-netflix-pulse rounded-sm bg-muted-foreground/10' />
        <div className='h-[20px] w-[85%] animate-netflix-pulse rounded-sm bg-muted-foreground/10' />
      </div>
    </>
  );
};
