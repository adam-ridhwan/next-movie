/* eslint-disable */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  Genre,
  GenreId,
  GenreSlug,
  MediaType,
  MOVIE_GENRES,
  MovieGenreId,
  NAV_ROUTES,
  NavRoute,
  TV_GENRES,
  TvGenreId,
} from '@/types/global-types';
import { DetailsMovieResponse, DetailsTvResponse } from '@/types/tmdb-types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const fetcher = (url: string) => fetch(url).then(res => res.json());

export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}; // eslint-disable-line @typescript-eslint/ban-types

export type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];

export const capitalize = (str: string): string => {
  const words = str.split(' ');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  return words.join(' ');
};

export const capitalizeMedia = (mediaType: MediaType): string => {
  return mediaType === 'movie' ? 'Movies' : 'TV Shows';
};

export const extractYear = (dateString: string | undefined): string => {
  if (typeof dateString !== 'string') return '-';

  const regex = /^\d{4}/;
  const match = dateString.match(regex);
  return match ? match[0] : '-';
};

export const extractInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');
};

export const getGenreIdBySlug = (
  slug: GenreSlug,
  mediaType: MediaType
): GenreId | undefined => {
  const genreObj = mediaType === 'movie' ? MOVIE_GENRES : TV_GENRES;
  return objectKeys(genreObj).find(key => genreObj[key] === slug);
};

const objectKeys = <TObj extends object>(obj: TObj): (keyof TObj)[] => {
  return Object.keys(obj) as (keyof TObj)[];
};

export const getGenreSlugById = (id: GenreId, mediaType: MediaType): Genre => {
  if (mediaType === 'movie' && isMovieGenreId(id)) {
    return MOVIE_GENRES[id];
  }
  if (mediaType === 'tv' && isTvGenreId(id)) {
    return TV_GENRES[id];
  }
  throw new Error(`getGenreSlugById() Invalid media type: ${mediaType}`);
};

export const extractGenreMediaTypeSlugs = (
  slug: string
): [GenreSlug, MediaType] => {
  const match = slug.match(/^(.+?)-(movies|tv)$/);
  if (!match)
    throw new Error(`extractGenreMediaTypeSlugs() Invalid slug: ${slug}`);

  let genre = match[1];
  let mediaType = match[2];

  if (mediaType === 'movies' && mediaType.endsWith('s')) {
    mediaType = mediaType.slice(0, -1);
  }

  const parsedGenreSlug = Genre.safeParse(genre);
  if (!parsedGenreSlug.success)
    throw new Error(`extractGenreMediaTypeSlugs() Invalid genre: ${genre}`);

  const parsedMediaType = MediaType.safeParse(mediaType);
  if (!parsedMediaType.success) {
    throw new Error(
      `extractGenreMediaTypeSlugs() Invalid media type: ${mediaType}`
    );
  }

  return [parsedGenreSlug.data, parsedMediaType.data];
};

export const getFirstSentence = (text: string) => {
  const match = text.match(/^(.*?[.])\s/);
  return match ? match[1] : text;
};

export const getMapValue = <K, V>({
  label,
  map,
  key,
}: {
  label: string;
  map: Map<K, V>;
  key: K;
}): V => {
  const result = map.get(key);
  if (result === undefined) throw new Error(`${label}: Key not found: ${key}`);
  return result;
};

export const findIndexByKey = <T, K extends keyof T>({
  label,
  array,
  key,
  value,
}: {
  label: string;
  array: T[];
  key: K;
  value: T[K] | undefined;
}): number => {
  if (value === undefined) throw new Error(`${label}: Value is undefined`);
  const index = array.findIndex(item => item[key] === value);
  if (index === -1)
    throw new Error(`${label}: Index of item not found for value: ${value}`);
  return index;
};

export const isNullish = (...values: any[]): string => {
  return values.find(value => value !== undefined) ?? '-';
};

export const isMovie = <ZMovie, ZTv>(
  media: ZMovie | ZTv,
  mediaType: MediaType
): media is ZMovie => {
  return mediaType === 'movie';
};

export const isMovieGenreId = (genreId: GenreId): genreId is MovieGenreId => {
  return genreId in MOVIE_GENRES;
};

export const isTvGenreId = (genreId: any): genreId is TvGenreId => {
  return genreId in TV_GENRES;
};

export const isMovieDetails = (
  data: DetailsMovieResponse | DetailsTvResponse
): data is DetailsMovieResponse => {
  return data.hasOwnProperty('release_date');
};

export const isValidRoute = (route: string): route is NavRoute => {
  return (
    Object.values(NAV_ROUTES).find(navRoute => navRoute === route) !== undefined
  );
};

export const slugify = (...args: string[]) => {
  return args
    .map(part => {
      return part
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    })
    .join('-');
};

export const deslugify = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
