import { redirect } from 'next/navigation';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { ErrorPage } from '@/routes';

import { ContentRouteParams } from '@/types/global-types';
import { DetailsMovieResponse, DetailsTvResponse } from '@/types/tmdb-types';
import { isMovie, isNullish } from '@/lib/utils';
import { HeadingLarge } from '@/components/fonts';

export async function Label({ mediaType, id }: ContentRouteParams) {
  try {
    let details: DetailsMovieResponse | DetailsTvResponse | null = null;

    if (mediaType === 'movie') {
      details = await fetchTMDB(DetailsMovieResponse, {
        mediaType: 'movie',
        id,
        category: 'details',
      });
    }

    if (mediaType === 'tv') {
      details = await fetchTMDB(DetailsTvResponse, {
        mediaType: 'tv',
        id,
        category: 'details',
      });
    }

    if (!details) throw new Error('No details found');

    const title = isMovie<DetailsMovieResponse, DetailsTvResponse>(
      details,
      mediaType
    )
      ? isNullish(details.title, details.original_title)
      : isNullish(details.name, details.original_name);

    return (
      <>
        <HeadingLarge>{title}</HeadingLarge>
        <p className=''>{details.overview}</p>
      </>
    );
  } catch (err) {
    redirect(ErrorPage());
  }
}
