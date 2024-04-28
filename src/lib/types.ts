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
  original_name: z.string(),
  name: z.string(),
  first_air_date: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  profile_path: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  uuid: z.string(),
  key: z.string(),
  character: z.string(),
});
export type Movie = z.infer<typeof MovieSchema>;

export const MediaSchema = z.object({
  id: z.number(),
  title: z.string(),
  release_date: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  key: z.string(),
});

export const nonEmptyTilesSchema = z.array(MovieSchema);
export type Pages = Map<number, Movie[]>;

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
export type FetchTMDBParams = Prettify<{ mediaType: MediaType } & CategoryProps>;
