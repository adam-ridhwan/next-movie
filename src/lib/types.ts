/* eslint-disable */

import { z } from 'zod';

import { RESIZE_DIRECTION, SLIDE_DIRECTION } from '@/components/slider/slider-constants';

export type TODO = any;

export type SlideDirection = (typeof SLIDE_DIRECTION)[keyof typeof SLIDE_DIRECTION];
export type ResizeDirection = (typeof RESIZE_DIRECTION)[keyof typeof RESIZE_DIRECTION];

export const formResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  user: z.any().nullable().optional(),
});
export type FormResponse = z.infer<typeof formResponseSchema>;

export const SignInValidationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(7),
  })
  .strict();

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
  uuid: z.string(),
});
export type Movie = z.infer<typeof MovieSchema>;

export const nonEmptyTilesSchema = z.array(MovieSchema).nonempty();
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

export type GenreId = (typeof GENRES)[keyof typeof GENRES];

export type TMDBParams = {
  genre: GenreId | '';
  page: number;
  language?: string;
};
