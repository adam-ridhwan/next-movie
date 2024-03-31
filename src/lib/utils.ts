import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { MEDIA_QUERY } from '@/lib/constants';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

type GetMapValueParams<K, V> = {
  label: string;
  map: Map<K, V>;
  key: K;
};

export const getMapItem = <K, V>({ label, map, key }: GetMapValueParams<K, V>): V => {
  const result = map.get(key);
  if (result === undefined) throw new Error(`${label}: Key not found: ${key}`);
  return result;
};

type FindItemFromIndexParams<T, K extends keyof T> = {
  label: string;
  array: T[];
  key: K;
  value: T[K];
};

export const findItemFromIndex = <T, K extends keyof T>({
  label,
  array,
  key,
  value,
}: FindItemFromIndexParams<T, K>): number => {
  const index = array.findIndex(item => item[key] === value);
  if (index === -1) throw new Error(`${label}: Index of item not found for value: ${value}`);
  return index;
};

export const getCardsPerPage = () => {
  const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
  if (windowWidth < MEDIA_QUERY.SM) return 2;
  if (windowWidth < MEDIA_QUERY.MD) return 3;
  if (windowWidth < MEDIA_QUERY.LG) return 4;
  if (windowWidth < MEDIA_QUERY.XL) return 5;
  return 6;
};
