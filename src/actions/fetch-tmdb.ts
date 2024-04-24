import { env } from '@/lib/env';
import { Category, CategoryProps, CategoryWithId, CreateUrlFn, Discover, FetchTMDBParams } from '@/lib/types'; // prettier-ignore

const { TMDB_READ_ACCESS_TOKEN } = env;

type Status = 'success' | 'data';

const idExists = (params: CategoryProps): params is CategoryWithId => 'id' in params;
const isDiscover = (params: CategoryProps): params is Discover => params.category === 'discover';
const throwError = (msg: string) => {
  throw new Error(msg);
};

const apiUrlConfig: Record<Category, CreateUrlFn> = {
  popular: params => `${params.mediaType}/${params.category}?`,

  trending: params => `trending/${params.mediaType}/day?`,

  discover: params =>
    !isDiscover(params)
      ? throwError('Invalid category for discover.')
      : `discover/${params.mediaType}?with_genres=${params.genre || 'action'}&page=${params.page || 1}&with_original_language=${params.language || 'en'}`,

  details: params =>
    !idExists(params)
      ? throwError('ID is required for details.')
      : `${params.mediaType}/${params.id}?`, // prettier-ignore

  credits: params =>
    !idExists(params)
      ? throwError('ID is required for credits.')
      : `${params.mediaType}/${params.id}/${params.category}?`,

  recommendations: params =>
    !idExists(params)
      ? throwError('ID is required for recommendations.')
      : `${params.mediaType}/${params.id}/${params.category}?`,

  keywords: params =>
    !idExists(params)
      ? throwError('ID is required for keywords.')
      : `${params.mediaType}/${params.id}/${params.category}?`,

  similar: params =>
    !idExists(params)
      ? throwError('ID is required for similar.')
      : `${params.mediaType}/${params.id}/${params.category}?`,

  videos: params =>
    !idExists(params)
      ? throwError('ID is required for similar.')
      : `${params.mediaType}/${params.id}/${params.category}?`,
};

export const fetchTMDB = async (params: FetchTMDBParams) => {
  const urlConfig = apiUrlConfig[params.category](params);
  const url = `https://api.themoviedb.org/3/${urlConfig}&language=en-US`;

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
