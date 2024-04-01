import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { MEDIA_QUERY } from '@/lib/constants';
import { nonEmptyTilesSchema, Pages, Tile } from '@/lib/types';

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

export const findIndexFromKey = <T, K extends keyof T>({
  label,
  array,
  key,
  value,
}: FindItemFromIndexParams<T, K>): number => {
  const index = array.findIndex(item => item[key] === value);
  if (index === -1) throw new Error(`${label}: Index of item not found for value: ${value}`);
  return index;
};

export const getTilesPerPage = () => {
  const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
  if (windowWidth < MEDIA_QUERY.SM) return 2;
  if (windowWidth < MEDIA_QUERY.MD) return 3;
  if (windowWidth < MEDIA_QUERY.LG) return 4;
  if (windowWidth < MEDIA_QUERY.XL) return 5;
  return 6;
};

export const getMaxPages = (tiles: Tile[]) => {
  // +2 for the left and right placeholder pages
  return Math.ceil(tiles.length / getTilesPerPage()) + 2;
};

export function validatePagesMap({
  label,
  tiles,
  pages,
}: {
  label: string;
  tiles: Tile[];
  pages: Pages;
}): void {
  const expectedMaxPage = getMaxPages(tiles);
  const expectedTilesPerPage = getTilesPerPage();

  if (pages.size !== expectedMaxPage) {
    // throw new Error(`${label} Expected ${expectedMaxPage} pages, found ${pages.size}.`);
  }

  pages.forEach((tiles, pageIndex) => {
    const result = nonEmptyTilesSchema.safeParse(tiles);

    if (!result.success) {
      // throw new Error(`${label} Validation failed for page ${pageIndex}: ${result.error}`);
    }

    if (tiles.length !== expectedTilesPerPage) {
      // throw new Error(`${label} Page ${pageIndex} has ${tiles.length} tiles, expected ${expectedTilesPerPage}`);
    }
  });
}
