'use server';

import { FetchTMDBParams } from '@/types/global-types';
import { env } from '@/lib/env';

const { TMDB_READ_ACCESS_TOKEN } = env;

const BASE_URL = 'https://api.themoviedb.org/3';

const createUrl = (params: FetchTMDBParams): string => {
  switch (params.category) {
    case 'popular':
      return `${BASE_URL}/${params.mediaType}/${params.category}`;

    case 'trending':
      return `${BASE_URL}/${params.category}/${params.mediaType}/day`;

    case 'discover': {
      const url = new URL(`${BASE_URL}/${params.category}/${params.mediaType}`);
      url.searchParams.append('with_genres', params.genreId.toString() || '28');
      url.searchParams.append('page', params.page?.toString() || '1');
      url.searchParams.append('with_original_language', 'en');
      url.searchParams.append('sort_by', 'popularity.desc');

      if (
        params.mediaType === 'movie' &&
        params.primary_release_date_gte &&
        params.primary_release_date_lte
      ) {
        url.searchParams.append(
          'primary_release_date.gte',
          params.primary_release_date_gte
        );
        url.searchParams.append(
          'primary_release_date.lte',
          params.primary_release_date_lte
        );
      }

      if (
        params.mediaType === 'tv' &&
        params.first_air_date_gte &&
        params.first_air_date_lte
      ) {
        url.searchParams.append(
          'first_air_date.gte',
          params.first_air_date_gte
        );
        url.searchParams.append(
          'first_air_date.lte',
          params.first_air_date_lte
        );
      }

      return url.href;
    }

    case 'search': {
      1;
      const url = new URL(`${BASE_URL}/${params.category}/${params.mediaType}`);
      url.searchParams.append('query', params.q);
      url.searchParams.append('include_adult', 'false');
      url.searchParams.append('language', 'en-US');
      url.searchParams.append('page', '1');
      return url.href;
    }

    case 'details':
      return `${BASE_URL}/${params.mediaType}/${params.id}?language=en-US`;

    case 'credits':
    case 'recommendations':
    case 'keywords':
    case 'similar':
    case 'videos':
    case 'images':
      return `${BASE_URL}/${params.mediaType}/${params.id}/${params.category}?language=en-US`;

    default:
      return '';
  }
};

export const fetchTMDB = async (params: FetchTMDBParams): Promise<unknown> => {
  try {
    const url = createUrl(params);
    if (!url) throw new Error(`fetchTMDB() Invalid URL configuration ${url}`);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
      },
    };

    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
      console.error(json);
      throw new Error(`HTTP error ${response.status}`);
    }

    return json;
  } catch (error) {
    console.error('fetchTMDB', error);
  }
};
