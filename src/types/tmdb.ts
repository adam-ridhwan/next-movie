import { z } from 'zod';

export const MovieSchema = z.object({
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
export type Movie = z.infer<typeof MovieSchema>;

export const TvSchema = z.object({
  id: z.number(),
  original_name: z.string().nullable(),
  name: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  first_air_date: z.string().nullable(),
  overview: z.string().nullable(),
  genre_ids: z.array(z.number()).optional().nullable(),
  original_language: z.string().optional().nullable(),
  origin_country: z.array(z.string()).optional().nullable(),
  popularity: z.number().optional().nullable(),
  vote_average: z.number().optional().nullable(),
  vote_count: z.number().optional().nullable(),
  adult: z.boolean().optional().nullable(),
});
export type Tv = z.infer<typeof TvSchema>;

export const MediaSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});
export type Media = z.infer<typeof MediaSchema>;
