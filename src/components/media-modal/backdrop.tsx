import Image from 'next/image';
import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams } from '@/types/global-types';
import { DetailsMovieResponse, DetailsTvResponse } from '@/types/tmdb-types';
import { isMovie, isNullish } from '@/lib/utils';

export default async function Backdrop({ mediaType, id }: ContentRouteParams) {
  const details = await fetchTMDB({ mediaType, id, category: 'details' });

  const schema =
    mediaType === 'movie' ? DetailsMovieResponse : DetailsTvResponse;
  const { success, data, error } = schema.safeParse(details);
  if (!success)
    throw new Error(`Backdrop() Invalid ${mediaType} schema: ${error.message}`);

  const title = isMovie<DetailsMovieResponse, DetailsTvResponse>(
    data,
    mediaType
  )
    ? isNullish(data.title, data.original_title)
    : isNullish(data.name, data.original_name);

  return (
    <div className='relative aspect-video overflow-hidden rounded-2xl'>
      <Image
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt={title ?? 'Backdrop'}
        priority
        unoptimized
        fill
        className='object-cover'
      />
      <div className='absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-appBackground via-transparent to-transparent' />
    </div>
  );
}
