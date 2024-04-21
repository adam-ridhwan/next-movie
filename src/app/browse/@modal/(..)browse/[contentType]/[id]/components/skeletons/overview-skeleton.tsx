const OverviewSkeleton = () => {
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

export default OverviewSkeleton;
