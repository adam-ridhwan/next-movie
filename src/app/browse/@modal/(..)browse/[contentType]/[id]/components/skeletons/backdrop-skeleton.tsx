export default function BackdropSkeleton() {
  return (
    <div className='relative aspect-video animate-pulse bg-appBackground'>
      <div className='object-cover' />
      <div className='absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-muted via-transparent to-transparent' />
    </div>
  );
}
