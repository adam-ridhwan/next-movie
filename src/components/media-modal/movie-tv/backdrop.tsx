import Image from 'next/image';
import { redirect } from 'next/navigation';
import { fetchTMDB } from '@/actions/fetch-tmdb';
import { ErrorPage } from '@/routes';

import { ContentRouteParams } from '@/types/global-types';
import { DetailsMovieResponse, DetailsTvResponse } from '@/types/tmdb-types';
import { isMovie, isNullish } from '@/lib/utils';

export default async function Backdrop({ mediaType, id }: ContentRouteParams) {
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
      <div className='relative aspect-video overflow-hidden rounded-2xl'>
        <Image
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
          alt={title ?? 'Backdrop'}
          priority
          unoptimized
          fill
          className='object-cover'
        />
        <div className='absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-appBackground via-transparent to-transparent' />
      </div>
    );
  } catch (err) {
    redirect(ErrorPage());
  }
}
