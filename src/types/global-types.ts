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
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'Tv Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
} as const;

export const TV_GENRES = {
  10759: 'Action',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  10762: 'Kids',
  9648: 'Mystery',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War',
  37: 'Western',
} as const;

export type MovieGenreId = KeyOf<typeof MOVIE_GENRES>;
export type TvGenreId = KeyOf<typeof TV_GENRES>;
export type GenreId = MovieGenreId | TvGenreId;

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
