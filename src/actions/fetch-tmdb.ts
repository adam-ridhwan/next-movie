import { env } from '@/lib/env';
import { CATEGORIES, Category, CategoryProps, CategoryWithId, CreateUrlFn, Discover, FetchTMDBParams, GENRES } from '@/lib/types'; // prettier-ignore

const { TMDB_READ_ACCESS_TOKEN } = env;
const { ACTION } = GENRES;
const { CREDITS, DETAILS, KEYWORDS, RECOMMENDATIONS, SIMILAR, POPULAR, TRENDING, DISCOVER } = CATEGORIES;

type Status = 'success' | 'data';

const BASE_URL = 'https://api.themoviedb.org/3';

const idExists = (params: CategoryProps): params is CategoryWithId => 'id' in params;
const isDiscover = (params: CategoryProps): params is Discover => params.category === DISCOVER;

export const apiUrlConfig: Record<Category, CreateUrlFn> = {
  [POPULAR]: params => `${params.mediaType}/${params.category}?`,

  [TRENDING]: params => `${TRENDING}/${params.mediaType}/day?`,

  [DISCOVER]: params => {
    if (!isDiscover(params)) throw new Error('Invalid category for DISCOVER.');
    return `${params.category}/${params.mediaType}?with_genres=${params.genre || ACTION}&page=${params.page || 1}&with_original_language=${params.language || 'en'}`;
  },

  [DETAILS]: params => {
    if (!idExists(params)) throw new Error('ID is required for DETAILS.');
    return `${params.mediaType}/${params.id}?`;
  },

  [CREDITS]: params => {
    if (!idExists(params)) throw new Error('ID is required for CREDITS.');
    return `${params.mediaType}/${params.id}/${params.category}?`;
  },

  [RECOMMENDATIONS]: params => {
    if (!idExists(params)) throw new Error('ID is required for RECOMMENDATIONS.');
    return `${params.mediaType}/${params.id}/${params.category}?`;
  },

  [KEYWORDS]: params => {
    if (!idExists(params)) throw new Error('ID is required for KEYWORDS.');
    return `${params.mediaType}/${params.id}/${params.category}?`;
  },

  [SIMILAR]: params => {
    if (!idExists(params)) throw new Error('ID is required for SIMILAR.');
    return `${params.mediaType}/${params.id}/${params.category}?`;
  },
};

export const fetchTMDB = async (params: FetchTMDBParams) => {
  const url = `${BASE_URL}/${apiUrlConfig[params.category](params)}&language=en-US`;

  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
      },
    };

    const response = await fetch(url.toString(), options);
    return await response.json();
  } catch (error) {
    console.error('fetchTMDB', error);
  }
};
