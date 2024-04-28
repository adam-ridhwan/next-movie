/* eslint-disable */

import { z } from 'zod';

import { KeysOf, Prettify, ValuesOf } from '@/lib/utils';

export type TODO = any;

export type ContentRouteParams = {
  mediaType: MediaType;
  id: string;
};

export const MovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const TvSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  first_air_date: z.string(),
  name: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const MovieTvSchema = z.object({
  page: z.number(),
  results: z.array(z.union([MovieSchema, TvSchema])),
  total_pages: z.number(),
  total_results: z.number(),
});

export type MovieTv = z.infer<typeof MovieTvSchema>;

export const nonEmptyTilesSchema = z.array(MovieSchema);
export type Pages = Map<number, TODO[]>;

export const GENRES = {
  ACTION: 28,
  ADVENTURE: 12,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  FANTASY: 14,
  HISTORY: 36,
  HORROR: 27,
  MUSIC: 10402,
  MYSTERY: 9648,
  ROMANCE: 10749,
  SCIENCE_FICTION: 878,
  TV_MOVIE: 10770,
  THRILLER: 53,
  WAR: 10752,
  WESTERN: 37,
} as const;
export type GenreLabel = KeysOf<typeof GENRES>;
export type GenreId = ValuesOf<typeof GENRES>;

export type MediaType = 'movie' | 'tv';
export type Section = 'movie' | 'tv' | 'trailer' | 'bonus' | 'cast';

type CategoryWithIdProps = {
  id: string;
  category: 'credits' | 'details' | 'keywords' | 'recommendations' | 'similar' | 'videos' | 'images';
};

type CategoryWithoutIdProps = {
  category: 'popular' | 'trending';
};

type DiscoverProps = {
  category: 'discover';
  genreId: GenreId;
  page?: number;
  language?: string;
};

export type CategoryProps = CategoryWithIdProps | CategoryWithoutIdProps | DiscoverProps;
export type DefaultCategoryProps = { label: string; mediaType: MediaType };
export type FetchTMDBParams = Prettify<DefaultCategoryProps & CategoryProps>;
