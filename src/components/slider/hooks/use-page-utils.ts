/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';
import { v4 as uuid } from 'uuid';

import { Movie, TODO } from '@/lib/types';
import { MEDIA_QUERY } from '@/components/slider/hooks/slider-constants';

type UsePageUtilsReturn = {
  state: {
    firstPageLength: number;
    lastPageLength: number;
    hasPaginated: boolean;
    isMounted: boolean;
  };
  actions: {
    markAsPaginated: () => void;
    wait: (ms: number) => Promise<void>;
    getTileCountPerPage: () => number;
    getTileCount: (num: number) => number;
    getStartIndex: (currentIndex: number, leftTilesTotal: number) => number;
    updateUuids: (params: UpdateUuidsParams) => Movie[];
    getMapValue: <K, V>({ label, map, key }: GetMapValueParams<K, V>) => V;
    findIndexByKey: <T, K extends keyof T>({
      label,
      array,
      key,
      value,
    }: FindItemByIndexParams<T, K>) => number;
  };
};

type UpdateUuidsParams = {
  newContentList: Movie[];
  firstTileIndex: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
};

type GetMapValueParams<K, V> = {
  label: string;
  map: Map<K, V>;
  key: K;
};

type FindItemByIndexParams<T, K extends keyof T> = {
  label: string;
  array: T[];
  key: K;
  value: T[K] | undefined;
};

export const usePageUtils = (): UsePageUtilsReturn => {
  const MEDIA = useSliderStore(state => state.MEDIA);
  const firstPageLength = useSliderStore(state => state.firstPageLength);
  const lastPageLength = useSliderStore(state => state.lastPageLength);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);
  const isMounted = useSliderStore(state => state.isMounted);

  const getTileCountPerPage = () => {
    const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
    if (windowWidth < MEDIA_QUERY.SM) return 2;
    if (windowWidth < MEDIA_QUERY.MD) return 3;
    if (windowWidth < MEDIA_QUERY.LG) return 4;
    return 5;
  };

  // +1 for left/right placeholders
  const getTileCount = (num: number) => (Math.ceil(num) + 1) * getTileCountPerPage();

  const getStartIndex = (currentIndex: number, leftTilesTotal: number) => {
    // Prevents negative modulo
    return (((currentIndex - leftTilesTotal + MEDIA.length) % MEDIA.length) + MEDIA.length) % MEDIA.length;
  };

  const updateUuids = ({
    newContentList,
    firstTileIndex,
    isFirstPage = false,
    isLastPage = false,
  }: UpdateUuidsParams) => {
    if (isFirstPage) {
      const updatedFirstElements = newContentList.slice(0, firstTileIndex).map(tile => ({
        ...tile,
        uuid: uuid(),
      }));
      return [...updatedFirstElements, ...newContentList.slice(firstTileIndex)];
    }

    if (isLastPage) {
      const updatedLastElements = newContentList.slice(firstTileIndex).map(tile => ({
        ...tile,
        uuid: uuid(),
      }));
      return [...newContentList.slice(0, firstTileIndex), ...updatedLastElements];
    }

    return newContentList.map(tile => ({ ...tile, uuid: uuid() }));
  };

  const getMapValue = <K, V>({ label, map, key }: GetMapValueParams<K, V>): V => {
    const result = map.get(key);
    if (result === undefined) throw new Error(`${label}: Key not found: ${key}`);
    return result;
  };

  const findIndexByKey = <T, K extends keyof T>({
    label,
    array,
    key,
    value,
  }: FindItemByIndexParams<T, K>): number => {
    if (value === undefined) throw new Error(`${label}: Value is undefined`);
    const index = array.findIndex(item => item[key] === value);
    if (index === -1) throw new Error(`${label}: Index of item not found for value: ${value}`);
    return index;
  };

  const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

  return {
    state: {
      firstPageLength,
      lastPageLength,
      hasPaginated,
      isMounted,
    },
    actions: {
      markAsPaginated,
      wait,
      getTileCountPerPage,
      getTileCount,
      getStartIndex,
      updateUuids,
      getMapValue,
      findIndexByKey,
    },
  };
};
