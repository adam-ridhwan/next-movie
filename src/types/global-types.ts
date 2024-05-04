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

const MediaType = z.enum(['movie', 'tv'] as const);

export const MainRoute = z.enum(['home', 'movies', 'tv', 'search'] as const);

const GenreSlug = z.string().refine(
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

export const Slug = z.union([
  z.tuple([z.union([MainRoute, GenreSlug])]),
  z.tuple([MediaType, z.string()]),
]);

const Section = z.enum([
  'movie',
  'tv',
  'trailer',
  'bonus',
  'cast',
  'genre',
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
] as const);

const Genre = z.enum([
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

export type MediaType = z.infer<typeof MediaType>;
export type Genre = z.infer<typeof Genre>;
export type Section = z.infer<typeof Section>;
export type Pages = Map<number, TODO[]>;

export type MovieGenreId = KeyOf<typeof MOVIE_GENRES>;
export type MovieGenre = ValueOf<typeof MOVIE_GENRES>;

export type TvGenreId = KeyOf<typeof TV_GENRES>;
export type TvGenre = ValueOf<typeof TV_GENRES>;

export type GenreId = MovieGenreId | TvGenreId;

type CategoryWithIdProps = {
  id: string;
  mediaType: MediaType;
  category:
    | typeof Category.enum.credits
    | typeof Category.enum.details
    | typeof Category.enum.keywords
    | typeof Category.enum.recommendations
    | typeof Category.enum.similar
    | typeof Category.enum.videos
    | typeof Category.enum.images;
};

type CategoryWithoutIdProps = {
  mediaType: MediaType;
  category: typeof Category.enum.popular | typeof Category.enum.trending;
};

type DiscoverMovieProps = {
  mediaType: typeof MediaType.enum.movie;
  genreId: MovieGenreId;
};
type DiscoverTvProps = {
  mediaType: typeof MediaType.enum.tv;
  genreId: TvGenreId;
};

type DiscoverProps = {
  category: typeof Category.enum.discover;
  page?: number;
  language?: string;
} & (DiscoverMovieProps | DiscoverTvProps);

type SearchProps = {
  mediaType: MediaType;
  category: typeof Category.enum.search;
  q: string;
};

export type FetchTMDBParams = Prettify<
  CategoryWithIdProps | CategoryWithoutIdProps | DiscoverProps | SearchProps
>;
