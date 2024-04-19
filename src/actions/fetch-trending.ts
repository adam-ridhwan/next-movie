'use server';

import { env } from '@/lib/env';
import { ContentType } from '@/lib/types';

const { TMDB_READ_ACCESS_TOKEN } = env;

// Trending movies docs: https://developer.themoviedb.org/reference/trending-movies

export const fetchTrending = async (contentType: ContentType) => {
  const url = `https://api.themoviedb.org/3/trending/${contentType}/day?language=en-US`;

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
