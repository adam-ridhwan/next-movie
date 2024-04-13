/* eslint-disable */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

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
  value: T[K] | undefined;
};

export const findIndexFromKey = <T, K extends keyof T>({
  label,
  array,
  key,
  value,
}: FindItemFromIndexParams<T, K>): number => {
  if (value === undefined) throw new Error(`${label}: Value is undefined`);
  const index = array.findIndex(item => item[key] === value);
  if (index === -1) throw new Error(`${label}: Index of item not found for value: ${value}`);
  return index;
};

// const debounce = <T extends (...args: TODO[]) => void>(
//   func: T,
//   wait: number
// ): ((...args: Parameters<T>) => void) => {
//   let timeout: ReturnType<typeof setTimeout> | undefined;
//
//   return function executedFunction(...args: Parameters<T>) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };
