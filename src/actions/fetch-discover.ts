'use server';

import { env } from '@/lib/env';
import { ContentType, GenreId } from '@/lib/types';

const { TMDB_READ_ACCESS_TOKEN } = env;

export type FetchDiscoverParams = {
  page?: number;
  genre: GenreId | '';
  language?: string;
  contentType?: ContentType;
};

// Docs: https://developer.themoviedb.org/reference/discover-movie

export const fetchDiscover = async ({
  page = 1,
  genre = '',
  language = 'en',
  contentType = 'movie',
}: FetchDiscoverParams) => {
  const url = new URL(`https://api.themoviedb.org/3/discover/${contentType}`);
  url.searchParams.append('include_adult', 'true');
  url.searchParams.append('include_video', 'true');
  url.searchParams.append('language', 'en-US');
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
