'use server';

import { env } from '@/lib/env';
import { TMDBParams } from '@/lib/types';

const { TMDB_READ_ACCESS_TOKEN } = env;

// Movie discover docs: https://developer.themoviedb.org/reference/discover-movie
// Image docs: https://developer.themoviedb.org/docs/image-basics
export const fetchMovies = async ({ genre, page }: TMDBParams) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`;

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
