/* eslint-disable */

import { KeyOf, Prettify, ValueOf } from '@/lib/utils';

export type TODO = any;

export const NAV_ROUTES = {
  home: '/home',
  movies: '/movies',
  tv: '/tv',
} as const;
export type NavRoute = ValueOf<typeof NAV_ROUTES>;

export type ContentRouteParams = {
  mediaType: MediaType;
  id: string;
};

export type Pages = Map<number, TODO[]>;

export const MOVIE_GENRES = {
  28: 'action',
  12: 'adventure',
  16: 'animation',
  35: 'comedy',
  80: 'crime',
  99: 'documentary',
  18: 'drama',
  10751: 'family',
  14: 'fantasy',
  36: 'history',
  27: 'horror',
  10402: 'music',
  9648: 'mystery',
  10749: 'romance',
  878: 'science-fiction',
  10770: 'tv-movie',
  53: 'thriller',
  10752: 'war',
  37: 'western',
} as const;

export const TV_GENRES = {
  10759: 'action',
  16: 'animation',
  35: 'comedy',
  80: 'crime',
  99: 'documentary',
  18: 'drama',
  10751: 'family',
  10762: 'kids',
  9648: 'mystery',
  10763: 'news',
  10764: 'reality',
  10765: 'science-fiction',
  10766: 'soap',
  10767: 'talk',
  10768: 'war',
  37: 'western',
} as const;

export type MovieGenreId = KeyOf<typeof MOVIE_GENRES>;
export type TvGenreId = KeyOf<typeof TV_GENRES>;
export type GenreId = MovieGenreId | TvGenreId;

export type MovieGenreSlug = ValueOf<typeof MOVIE_GENRES>;
export type TvGenreSlug = ValueOf<typeof TV_GENRES>;
export type GenreSlug = MovieGenreSlug | TvGenreSlug;

const MEDIA_TYPES = {
  movie: 'movie',
  tv: 'tv',
} as const;
export type MediaType = ValueOf<typeof MEDIA_TYPES>;

const SECTIONS = {
  movie: MEDIA_TYPES.movie,
  tv: MEDIA_TYPES.tv,
  trailer: 'trailer',
  bonus: 'bonus',
  cast: 'cast',
  genre: 'genre',
} as const;
export type Section = ValueOf<typeof SECTIONS>;

const CATEGORIES = {
  credits: 'credits',
  details: 'details',
  keywords: 'keywords',
  recommendations: 'recommendations',
  similar: 'similar',
  videos: 'videos',
  images: 'images',
  popular: 'popular',
  trending: 'trending',
  discover: 'discover',
  search: 'search',
} as const;

type CategoryWithIdProps = {
  id: string;
  mediaType: MediaType;
  category:
    | typeof CATEGORIES.credits
    | typeof CATEGORIES.details
    | typeof CATEGORIES.keywords
    | typeof CATEGORIES.recommendations
    | typeof CATEGORIES.similar
    | typeof CATEGORIES.videos
    | typeof CATEGORIES.images;
};

type CategoryWithoutIdProps = {
  mediaType: MediaType;
  category: typeof CATEGORIES.popular | typeof CATEGORIES.trending;
};

type DiscoverProps = {
  category: typeof CATEGORIES.discover;
  page?: number;
  language?: string;
} & (DiscoverMovieProps | DiscoverTvProps);
type DiscoverMovieProps = { mediaType: typeof MEDIA_TYPES.movie; genreId: MovieGenreId };
type DiscoverTvProps = { mediaType: typeof MEDIA_TYPES.tv; genreId: TvGenreId };

type SearchProps = {
  mediaType: MediaType;
  category: typeof CATEGORIES.search;
  q: string;
};

export type CategoryProps = CategoryWithIdProps | CategoryWithoutIdProps | DiscoverProps | SearchProps;
export type FetchTMDBParams = Prettify<CategoryProps>;
