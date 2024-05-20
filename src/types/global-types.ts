/* eslint-disable */

import { z } from 'zod';

import { KeyOf, Prettify, ValueOf } from '@/lib/utils';

export type TODO = any;

export const NAV_ROUTES = {
  home: '/home',
  movies: '/movies',
  tv: '/tv',
} as const;
export type NavRoute = ValueOf<typeof NAV_ROUTES>;

export const MediaType = z.enum(['movie', 'tv'] as const);

export const GenreSlug = z.string().refine(
  slug => {
    const suffixes: Record<string, number> = { '-movies': 7, '-tv': 3 };

    const foundSuffix = Object.keys(suffixes).find(suffix =>
      slug.endsWith(suffix)
    );

    if (!foundSuffix) return false;

    const baseGenre = slug.slice(0, -suffixes[foundSuffix]);
    return Genre.safeParse(baseGenre).success;
  },
  { message: "Must be a valid genre with '-movies' or '-tv' suffix." }
);

export const PersonSlug = z.literal('person');

export const MediaModalSlug = z.union([
  z.tuple([MediaType, z.string()]),
  z.tuple([GenreSlug]),
  z.tuple([PersonSlug, z.string()]),
]);

const Section = z.enum([
  MediaType.enum.movie,
  MediaType.enum.tv,
  'trailer',
  'bonus',
  'cast',
  'genre',
  'spotlight',
] as const);

const Category = z.enum([
  'credits',
  'details',
  'keywords',
  'recommendations',
  'similar',
  'videos',
  'images',
  'popular',
  'trending',
  'discover',
  'search',
  'external_ids',
  'combined_credits',
] as const);

export const Genre = z.enum([
  'action',
  'adventure',
  'animation',
  'comedy',
  'crime',
  'documentary',
  'drama',
  'family',
  'fantasy',
  'kids',
  'history',
  'horror',
  'music',
  'mystery',
  'news',
  'reality',
  'romance',
  'science-fiction',
  'soap',
  'talk',
  'tv-movie',
  'thriller',
  'war',
  'western',
] as const);

export const MOVIE_GENRES = {
  28: Genre.enum.action,
  12: Genre.enum.adventure,
  16: Genre.enum.animation,
  35: Genre.enum.comedy,
  80: Genre.enum.crime,
  99: Genre.enum.documentary,
  18: Genre.enum.drama,
  10751: Genre.enum.family,
  14: Genre.enum.fantasy,
  36: Genre.enum.history,
  27: Genre.enum.horror,
  10402: Genre.enum.music,
  9648: Genre.enum.mystery,
  10749: Genre.enum.romance,
  878: Genre.enum['science-fiction'],
  10770: Genre.enum['tv-movie'],
  53: Genre.enum.thriller,
  10752: Genre.enum.war,
  37: Genre.enum.western,
} as const;

export const TV_GENRES = {
  10759: Genre.enum.action,
  16: Genre.enum.animation,
  35: Genre.enum.comedy,
  80: Genre.enum.crime,
  99: Genre.enum.documentary,
  18: Genre.enum.drama,
  10751: Genre.enum.family,
  10762: Genre.enum.kids,
  9648: Genre.enum.mystery,
  10763: Genre.enum.news,
  10764: Genre.enum.reality,
  10765: Genre.enum['science-fiction'],
  10766: Genre.enum.soap,
  10767: Genre.enum.talk,
  10768: Genre.enum.war,
  37: Genre.enum.western,
} as const;

export type ContentRouteParams = {
  mediaType: MediaType;
  id: string;
};

export type MediaModalSlug = z.infer<typeof MediaModalSlug>;

export type MediaType = z.infer<typeof MediaType>;
export type Section = z.infer<typeof Section>;
export type Pages = Map<number, TODO[]>;

export type Genre = MovieGenre | TvGenre;
export type GenreId = MovieGenreId | TvGenreId;
export type GenreSlug = z.infer<typeof Genre>;

export type MovieGenreId = KeyOf<typeof MOVIE_GENRES>;
export type MovieGenre = ValueOf<typeof MOVIE_GENRES>;

export type TvGenreId = KeyOf<typeof TV_GENRES>;
export type TvGenre = ValueOf<typeof TV_GENRES>;

export type PersonSlug = z.infer<typeof PersonSlug>;

type CategoryWithIdProps = {
  mediaType: MediaType;
  id: string;
  category:
    | typeof Category.enum.credits
    | typeof Category.enum.details
    | typeof Category.enum.keywords
    | typeof Category.enum.recommendations
    | typeof Category.enum.similar
    | typeof Category.enum.videos
    | typeof Category.enum.images
    | typeof Category.enum.external_ids;
};

type CategoryWithoutIdProps = {
  mediaType: MediaType;
  category: typeof Category.enum.popular | typeof Category.enum.trending;
};

export type DiscoverMovieProps = {
  mediaType: typeof MediaType.enum.movie;
  genreId: MovieGenreId;
  primary_release_date_gte?: string;
  primary_release_date_lte?: string;
};

export type DiscoverTvProps = {
  mediaType: typeof MediaType.enum.tv;
  genreId: TvGenreId;
  first_air_date_gte?: string;
  first_air_date_lte?: string;
};

export type DiscoverProps = {
  category: typeof Category.enum.discover;
  page?: number;
  language?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
} & (DiscoverMovieProps | DiscoverTvProps);

type SearchProps = {
  mediaType: MediaType;
  category: typeof Category.enum.search;
  q: string;
};

type PersonProps = {
  mediaType: PersonSlug;
  personId: string;
  category:
    | typeof Category.enum.details
    | typeof Category.enum.external_ids
    | typeof Category.enum.combined_credits;
};

export type FetchTMDBParams = Prettify<
  | CategoryWithIdProps
  | CategoryWithoutIdProps
  | DiscoverProps
  | SearchProps
  | PersonProps
>;
