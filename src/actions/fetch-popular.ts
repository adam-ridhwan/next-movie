'use server';

import { env } from '@/lib/env';
import { ContentType } from '@/lib/types';

const { TMDB_READ_ACCESS_TOKEN } = env;

// Docs: https://developer.themoviedb.org/reference/movie-popular-list

export const fetchPopular = async (contentType: ContentType) => {
  // TODO: figure out how to opt out of caching
  // const _ = cookies();

  const url = `https://api.themoviedb.org/3/${contentType}/popular?language=en-US&page=1`;

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
