/* eslint-disable */

import { z } from 'zod';

import { KeysOf, Prettify, ValuesOf } from '@/lib/utils';

export type TODO = any;

export type ContentRouteParams = {
  mediaType: MediaType;
  id: string;
};

export const MovieSchema = z.object({
  id: z.number(),
  uuid: z.string().uuid().optional(),
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
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
  id: z.number(),
  uuid: z.string().uuid().optional(),
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
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

export const DetailsSchema = z.object({
  id: z.number(),
  adult: z.boolean().optional(),
  backdrop_path: z.string().optional(),
  belongs_to_collection: z.any().nullable().optional(),
  budget: z.number().optional(),
  genres: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().optional(),
      })
    )
    .optional(),
  homepage: z.string().optional(),
  imdb_id: z.string().optional(),
  origin_country: z.array(z.string()).optional(),
  original_language: z.string().optional(),
  original_title: z.string().optional(),
  original_name: z.string().optional(),
  overview: z.string().optional(),
  popularity: z.number().optional(),
  poster_path: z.string().optional(),
  production_companies: z
    .array(
      z.object({
        id: z.number().optional(),
        logo_path: z.string().nullable().optional(),
        name: z.string().optional(),
        origin_country: z.string().optional(),
      })
    )
    .optional(),
  production_countries: z
    .array(
      z.object({
        iso_3166_1: z.string().optional(),
        name: z.string().optional(),
      })
    )
    .optional(),
  release_date: z.string().optional(),
  revenue: z.number().optional(),
  runtime: z.number().optional(),
  spoken_languages: z
    .array(
      z.object({
        english_name: z.string().optional(),
        iso_639_1: z.string().optional(),
        name: z.string().optional(),
      })
    )
    .optional(),
  status: z.string().optional(),
  tagline: z.string().optional(),
  title: z.string().optional(),
  video: z.boolean().optional(),
  vote_average: z.number().optional(),
  vote_count: z.number().optional(),
  type: z.string().optional(),
  created_by: z
    .array(
      z.object({
        id: z.number(),
        credit_id: z.string(),
        name: z.string(),
        original_name: z.string(),
        gender: z.number(),
        profile_path: z.string().nullable().optional(),
      })
    )
    .optional(),
  last_episode_to_air: z
    .object({
      id: z.number(),
      overview: z.string(),
      name: z.string(),
      vote_average: z.number(),
      vote_count: z.number(),
      air_date: z.string(),
      episode_number: z.number(),
      episode_type: z.string(),
      production_code: z.string().optional(),
      runtime: z.number(),
      season_number: z.number(),
      show_id: z.number(),
      still_path: z.string().optional(),
    })
    .optional(),
});

export const CastSchema = z.object({
  id: z.number(),
  uuid: z.string().uuid().optional(),
  adult: z.boolean(),
  gender: z.number(),
  known_for_department: z.string(),
  title: z.string().optional(),
  name: z.string().optional(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  cast_id: z.number().optional(),
  character: z.string().optional(),
  credit_id: z.string(),
  order: z.number().optional(),
});

export const CrewSchema = z.object({
  id: z.number(),
  uuid: z.string().uuid().optional(),
  adult: z.boolean(),
  gender: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
});

export const CreditsSchema = z.object({
  id: z.number(),
  cast: z.array(CastSchema),
  crew: z.array(CrewSchema),
});

export const VideoSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  title: z.string().optional(),
  original_title: z.string().optional(),
  original_name: z.string().optional(),
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  key: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  published_at: z.string(),
});

export const VideosListSchema = z.object({
  id: z.number(),
  results: z.array(VideoSchema),
});

const KeywordObjectSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const KeywordsSchema = z.object({
  id: z.number(),
  keywords: z.array(KeywordObjectSchema).optional(),
  results: z.array(KeywordObjectSchema).optional(),
});

export type Movie = z.infer<typeof MovieSchema>;
export type Tv = z.infer<typeof TvSchema>;
export type Details = z.infer<typeof DetailsSchema>;
export type Cast = z.infer<typeof CastSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type SliderContent = Movie | Tv | Cast | Video;

export const nonEmptyTilesSchema = z.array(MovieTvSchema);
export type Pages = Map<number, SliderContent[]>;

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
export type DefaultCategoryProps = { label?: string; mediaType: MediaType };
export type FetchTMDBParams = Prettify<DefaultCategoryProps & CategoryProps>;
