'use server';

import { env } from '@/lib/env';
import { ContentType } from '@/lib/types';

const { TMDB_READ_ACCESS_TOKEN } = env;

// Docs: https://developer.themoviedb.org/reference/movie-details

export const fetchDetails = async (id: string, contentType: ContentType) => {
  const url = `https://api.themoviedb.org/3/${contentType}/${id}?language=en-US`;

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