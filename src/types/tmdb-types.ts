import { z } from 'zod';

const BaseMedia = z.object({
  id: z.number(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  overview: z.string().nullable(),
  genre_ids: z.array(z.number()).nullable(),
  original_language: z.string().nullable(),
  vote_count: z.number().nullable(),
});

const Movie = BaseMedia.merge(
  z.object({
    original_title: z.string().nullable(),
    title: z.string().nullable(),
    release_date: z.string().nullable(),
  })
);

const Tv = BaseMedia.merge(
  z.object({
    original_name: z.string().nullable(),
    name: z.string().nullable(),
    first_air_date: z.string().nullable(),
  })
);

const MediaResponse = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
});

export const MovieResponse = MediaResponse.extend({ results: z.array(Movie) });
export const TvResponse = MediaResponse.extend({ results: z.array(Tv) });

export const Cast = z.object({
  id: z.number(),
  cast_id: z.number().optional().nullable(),
  credit_id: z.string().nullable(),
  name: z.string().nullable(),
  original_name: z.string().nullable(),
  profile_path: z.string().nullable(),
  character: z.string().nullable(),
  adult: z.boolean().nullable(),
  gender: z.number().nullable(),
  known_for_department: z.string().nullable(),
});

export const CreditsResponse = z.object({
  id: z.number(),
  cast: z.array(Cast),
});

const Video = z.object({
  id: z.string(),
  name: z.string().nullable(),
  key: z.string().nullable(),
  site: z.string().nullable(),
  type: z.string().nullable(),
  official: z.boolean().nullable(),
  published_at: z.string().nullable(),
});

export const VideoResponse = z.object({
  id: z.number(),
  results: z.array(Video),
});

const BaseDetails = z.object({
  id: z.number(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  genres: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .nullable(),
  homepage: z.string().nullable(),
  origin_country: z.array(z.string()).nullable(),
  original_language: z.string().nullable(),
  overview: z.string().nullable(),
  spoken_languages: z
    .array(
      z.object({
        english_name: z.string(),
        iso_639_1: z.string(),
        name: z.string(),
      })
    )
    .nullable(),
  tagline: z.string().nullable(),
  vote_average: z.number().nullable(),
  vote_count: z.number().nullable(),
});

export const DetailsMovieResponse = BaseDetails.extend({
  title: z.string().nullable(),
  original_title: z.string().nullable(),
  belongs_to_collection: z
    .object({
      id: z.number().nullable(),
      name: z.string().nullable(),
      poster_path: z.string().nullable(),
      backdrop_path: z.string().nullable(),
    })
    .nullable(),
  imdb_id: z.string().nullable(),
  release_date: z.string().nullable(),
  runtime: z.number().nullable(),
  budget: z.number().nullable(),
  revenue: z.number().nullable(),
});

export const DetailsTvResponse = BaseDetails.extend({
  name: z.string().nullable(),
  original_name: z.string().nullable(),
  first_air_date: z.string().nullable(),
  languages: z.array(z.string()).nullable(),
  number_of_episodes: z.number().nullable(),
  number_of_seasons: z.number().nullable(),
  seasons: z.array(
    z
      .object({
        air_date: z.string().nullable(),
        episode_count: z.number().nullable(),
        id: z.number(),
        name: z.string().nullable(),
        overview: z.string().nullable(),
        poster_path: z.string().nullable(),
        season_number: z.number(),
        vote_average: z.number().nullable(),
      })
      .nullable()
  ),
});

const Keyword = z.object({
  id: z.number(),
  name: z.string(),
});

export const KeywordsMovieResponse = z.object({
  id: z.number(),
  keywords: z.array(Keyword),
});

export const KeywordsTvResponse = z.object({
  id: z.number(),
  results: z.array(Keyword),
});

export const SearchResultsResponse = z.object({
  movieData: MovieResponse,
  tvData: TvResponse,
});

export const ExternalIds = z.object({
  id: z.number(),
  imdb_id: z.string().nullable(),
  wikidata_id: z.string().nullable(),
  facebook_id: z.string().nullable(),
  instagram_id: z.string().nullable(),
  twitter_id: z.string().nullable(),
});

export const DetailsPersonResponse = z.object({
  id: z.number(),
  biography: z.string().nullable(),
  name: z.string().nullable(),
  profile_path: z.string().nullable(),
});

export const MoviePersonCreditsSchema = z.object({
  id: z.number(),
  adult: z.boolean().nullable(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()).nullable(),
  original_language: z.string().nullable(),
  original_title: z.string().nullable(),
  overview: z.string().nullable(),
  popularity: z.number().nullable(),
  poster_path: z.string().nullable(),
  release_date: z.string().nullable(),
  title: z.string().nullable(),
  video: z.boolean().nullable(),
  vote_average: z.number().nullable(),
  vote_count: z.number().nullable(),
  character: z.string().nullable(),
  credit_id: z.string().nullable(),
  order: z.number().nullable(),
  media_type: z.literal('movie').nullable(),
});

export const TvPersonCreditsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  first_air_date: z.string(),
  name: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  character: z.string(),
  credit_id: z.string(),
  episode_count: z.number(),
  media_type: z.literal('tv'),
});

export const CombinedCreditsSchema = z.object({
  id: z.number(),
  cast: z.array(z.union([MoviePersonCreditsSchema, TvPersonCreditsSchema])),
});

export type MovieResponse = z.infer<typeof MovieResponse>;
export type TvResponse = z.infer<typeof TvResponse>;
export type MediaResponse = MovieResponse | TvResponse;
export type Movie = z.infer<typeof Movie>;
export type Tv = z.infer<typeof Tv>;

export type Cast = z.infer<typeof Cast>;
export type CreditsResponse = z.infer<typeof CreditsResponse>;
export type Video = z.infer<typeof Video>;
export type VideoResponse = z.infer<typeof VideoResponse>;
export type DetailsMovieResponse = z.infer<typeof DetailsMovieResponse>;
export type DetailsTvResponse = z.infer<typeof DetailsTvResponse>;
export type KeywordsMovieResponse = z.infer<typeof KeywordsMovieResponse>;
export type KeywordsTvResponse = z.infer<typeof KeywordsTvResponse>;

export type SearchResultsResponse = z.infer<typeof SearchResultsResponse>;

export type DetailsPersonResponse = z.infer<typeof DetailsPersonResponse>;
export type CombinedCreditsSchema = z.infer<typeof CombinedCreditsSchema>;

export type MoviePersonCreditsSchema = z.infer<typeof MoviePersonCreditsSchema>;
export type TvPersonCreditsSchema = z.infer<typeof TvPersonCreditsSchema>;
