import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams } from '@/types/global-types';
import { DetailsMovieResponse, DetailsTvResponse } from '@/types/tmdb-types';
import { isMovie, isNullish } from '@/lib/utils';
import { HeadingLarge } from '@/components/fonts';

export async function Label({ mediaType, id }: ContentRouteParams) {
  const details = await fetchTMDB({ mediaType, id, category: 'details' });

  const schema =
    mediaType === 'movie' ? DetailsMovieResponse : DetailsTvResponse;
  const { success, data, error } = schema.safeParse(details);
  if (!success)
    throw new Error(`Label() Invalid ${mediaType} schema: ${error.message}`);

  const title = isMovie<DetailsMovieResponse, DetailsTvResponse>(
    data,
    mediaType
  )
    ? isNullish(data.title, data.original_title)
    : isNullish(data.name, data.original_name);

  return (
    <>
      <HeadingLarge>{title}</HeadingLarge>
      <p className=''>{data.overview}</p>
    </>
  );
}
