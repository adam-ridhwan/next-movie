import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { MEDIA_QUERY } from '@/lib/constants';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const getMapValue = <K, V>(map: Map<K, V>, key: K): V => {
  const result = map.get(key);
  if (result === undefined) {
    throw new Error(`Key not found: ${key}`);
  }
  return result;
};

export const getCardsPerPage = () => {
  const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
  if (windowWidth < MEDIA_QUERY.SM) return 2;
  if (windowWidth < MEDIA_QUERY.MD) return 3;
  if (windowWidth < MEDIA_QUERY.LG) return 4;
  if (windowWidth < MEDIA_QUERY.XL) return 5;
  return 6;
};
