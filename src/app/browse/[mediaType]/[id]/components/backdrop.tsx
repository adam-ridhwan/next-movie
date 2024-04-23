import Image from 'next/image';
import { fetchTMDB } from '@/actions/fetch-tmdb';

import { CATEGORIES, ContentRouteParams } from '@/lib/types';

export default async function Backdrop({ id, mediaType }: ContentRouteParams) {
  const details = await fetchTMDB({ category: CATEGORIES.DETAILS, mediaType, id });

  return (
    <div className='relative aspect-video overflow-hidden rounded-2xl'>
      <Image
        src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
        alt={details.original_title || details.original_name}
        priority
        unoptimized
        fill
        className='object-cover'
      />
      <div className='absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-appBackground via-transparent to-transparent' />
    </div>
  );
}
