'use server';

import { redirect } from 'next/navigation';
import { ErrorPage } from '@/routes';
import { Schema } from 'zod';

import { FetchTMDBParams } from '@/types/global-types';
import { env } from '@/lib/env';

const { TMDB_READ_ACCESS_TOKEN } = env;

const BASE_URL = 'https://api.themoviedb.org/3';

const createUrl = (params: FetchTMDBParams): string => {
  if (params.mediaType === 'movie' || params.mediaType === 'tv') {
    switch (params.category) {
      case 'popular':
        return `${BASE_URL}/${params.mediaType}/${params.category}?language=en-US&page=1`;

      case 'trending':
        return `${BASE_URL}/${params.category}/${params.mediaType}/day`;

      case 'discover': {
        const url = new URL(
          `${BASE_URL}/${params.category}/${params.mediaType}`
        );
        url.searchParams.append(
          'with_genres',
          params.genreId.toString() || '28'
        );
        url.searchParams.append('page', params.page?.toString() || '1');
        url.searchParams.append('with_original_language', 'en');
        url.searchParams.append('sort_by', 'popularity.desc');
        url.searchParams.append('with_origin_country', 'US');
        url.searchParams.append(
          'vote_average.gte',
          params.vote_average_gte?.toString() || '0'
        );

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
        const url = new URL(
          `${BASE_URL}/${params.category}/${params.mediaType}`
        );
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

      case 'external_ids':
        return `${BASE_URL}/${params.mediaType}/${params.id}/${params.category}`;

      default:
        throw new Error('fetchTMDB() Invalid URL configuration');
    }
  }

  if (params.mediaType === 'person') {
    switch (params.category) {
      case 'details':
        return `${BASE_URL}/${params.mediaType}/${params.personId}?language=en-US`;

      case 'combined_credits':
        return `${BASE_URL}/${params.mediaType}/${params.personId}/${params.category}?language=en-US`;

      case 'external_ids':
        return `${BASE_URL}/${params.mediaType}/${params.personId}/${params.category}`;

      default:
        throw new Error('fetchTMDB() Invalid URL configuration');
    }
  }

  throw new Error('fetchTMDB() Invalid mediaType');
};

export const fetchTMDB = async <T>(
  schema: Schema<T>,
  params: FetchTMDBParams
): Promise<T> => {
  try {
    const url = createUrl(params);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} ${response}`);
    }

    const data = await response.json();
    return schema.parse(data);
  } catch (error) {
    console.error(error);
    redirect(ErrorPage());
  }
};
