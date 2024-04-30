import { z } from 'zod';

const MovieSchema = z.object({
  id: z.number(),
  original_title: z.string().nullable(),
  title: z.string().nullable(),
  overview: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  release_date: z.string().nullable(),
  genre_ids: z.array(z.number()).nullable(),
  original_language: z.string().nullable(),
  popularity: z.number().nullable(),
  vote_average: z.number().nullable(),
  vote_count: z.number().nullable(),
  video: z.boolean().nullable(),
  adult: z.boolean().nullable(),
});

const TvSchema = z.object({
  id: z.number(),
  original_name: z.string().nullable(),
  name: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  first_air_date: z.string().nullable(),
  overview: z.string().nullable(),
  genre_ids: z.array(z.number()).nullable(),
  original_language: z.string().nullable(),
  origin_country: z.array(z.string()).nullable(),
  popularity: z.number().nullable(),
  vote_average: z.number().nullable(),
  vote_count: z.number().nullable(),
  adult: z.boolean().nullable(),
});

const MediaListSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
});

export const MovieListSchema = MediaListSchema.extend({ results: z.array(MovieSchema) });
export const TvListSchema = MediaListSchema.extend({ results: z.array(TvSchema) });

export type MovieList = z.infer<typeof MovieListSchema>;
export type TvList = z.infer<typeof TvListSchema>;
export type Movie = z.infer<typeof MovieSchema>;
export type Tv = z.infer<typeof TvSchema>;

export const CastSchema = z.object({
  id: z.number(),
  adult: z.boolean().nullable(),
  gender: z.number().nullable(),
  known_for_department: z.string().nullable(),
  name: z.string().nullable(),
  original_name: z.string().nullable(),
  popularity: z.number().nullable(),
  profile_path: z.string().nullable(),
  character: z.string().nullable(),
  credit_id: z.string().nullable(),
  order: z.number().nullable(),
});

const CrewSchema = z.object({
  id: z.number(),
  adult: z.boolean().nullable(),
  gender: z.number().nullable(),
  known_for_department: z.string().nullable(),
  name: z.string().nullable(),
  original_name: z.string().nullable(),
  popularity: z.number().nullable(),
  profile_path: z.string().nullable(),
  credit_id: z.string().nullable(),
  department: z.string().nullable(),
  job: z.string().nullable(),
});

export const CreditsSchema = z.object({
  id: z.number(),
  cast: z.array(CastSchema),
  crew: z.array(CrewSchema),
});

export type Cast = z.infer<typeof CastSchema>;
export type Crew = z.infer<typeof CrewSchema>;
export type Credits = z.infer<typeof CreditsSchema>;
