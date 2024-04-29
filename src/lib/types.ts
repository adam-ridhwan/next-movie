/* eslint-disable */

import { KeysOf, Prettify, ValuesOf } from '@/lib/utils';

export type TODO = any;

export type ContentRouteParams = {
  mediaType: MediaType;
  id: string;
};

export type Pages = Map<number, TODO[]>;

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

type SearchProps = {
  category: 'search';
  q: string;
};

export type CategoryProps = CategoryWithIdProps | CategoryWithoutIdProps | DiscoverProps | SearchProps;
export type DefaultCategoryProps = { label?: string; mediaType: MediaType };
export type FetchTMDBParams = Prettify<DefaultCategoryProps & CategoryProps>;
