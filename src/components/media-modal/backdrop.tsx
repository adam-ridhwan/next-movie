import Image from 'next/image';
import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams } from '@/types/global';
import { MovieDetails, MovieDetailsSchema, TvDetails, TvDetailsSchema } from '@/types/tmdb';
import { isMovie, isNullish } from '@/lib/utils';

export default async function Backdrop({ mediaType, id }: ContentRouteParams) {
  const details = await fetchTMDB({ category: 'details', mediaType, id });

  const schema = mediaType === 'movie' ? MovieDetailsSchema : TvDetailsSchema;
  const { success, data, error } = schema.safeParse(details);
  if (!success) throw new Error(`Label() Invalid ${mediaType} schema: ${error.message}`);

  const title = isMovie<MovieDetails, TvDetails>(data, mediaType)
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
