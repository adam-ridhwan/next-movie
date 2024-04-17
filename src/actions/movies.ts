'use server';

import { env } from '@/lib/env';
import { TMDBParams } from '@/lib/types';

const { TMDB_READ_ACCESS_TOKEN } = env;

// Movie discover docs: https://developer.themoviedb.org/reference/discover-movie
// Image docs: https://developer.themoviedb.org/docs/image-basics
export const fetchMovies = async ({ page, genre = '', language = 'en' }: TMDBParams) => {
  const url = new URL('https://api.themoviedb.org/3/discover/movie');
  url.searchParams.append('include_adult', 'true');
  url.searchParams.append('include_video', 'true');
  url.searchParams.append('language', 'en-US');
  url.searchParams.append('sort_by', 'popularity.desc');
  url.searchParams.append('page', page.toString());
  url.searchParams.append('with_genres', genre.toString());
  url.searchParams.append('with_original_language', language);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(url, options);
  return await response.json();
};
