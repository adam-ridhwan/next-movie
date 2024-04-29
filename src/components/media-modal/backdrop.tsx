import Image from 'next/image';
import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams, DetailsSchema } from '@/lib/types';

export default async function Backdrop({ mediaType, id }: ContentRouteParams) {
  const details = await fetchTMDB({ category: 'details', mediaType, id });
  const parseDetails = DetailsSchema.safeParse(details);

  if (!parseDetails.success) return null;

  return (
    <div className='relative aspect-video overflow-hidden rounded-2xl'>
      <Image
        src={`https://image.tmdb.org/t/p/original${parseDetails.data.backdrop_path}`}
        alt={parseDetails.data.title || ''}
        priority
        unoptimized
        fill
        className='object-cover'
      />
      <div className='absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-appBackground via-transparent to-transparent' />
    </div>
  );
}
