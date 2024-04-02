import chalk from 'chalk';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { DEVELOPMENT_MODE } from '@/lib/constants';
import { TODO } from '@/lib/types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const log = (string: string) =>
  // eslint-disable-next-line no-console
  DEVELOPMENT_MODE ? console.log(chalk.bgBlueBright.black(` ${string} `)) : null;

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

const debounce = <T extends (...args: TODO[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
