/* eslint-disable */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const fetcher = (url: string) => fetch(url).then(res => res.json());

export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}; // eslint-disable-line @typescript-eslint/ban-types

export const capitalize = (str: string): string => {
  const words = str.split(' ');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  return words.join(' ');
};

export const extractYear = (dateString: string | undefined): string => {
  if (typeof dateString !== 'string') return '-';

  const regex = /^\d{4}/;
  const match = dateString.match(regex);
  return match ? match[0] : '-';
};

export const extractInitials = (name: string): string =>
  name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

export const getObjectKey = <K extends string, V>({
  label,
  object,
  value,
}: {
  label: string;
  object: Record<K, V>;
  value: V[] | null;
}): K[] => {
  if (!value) return [];

  return value.map(v => {
    for (const [key, val] of Object.entries(object) as [K, V][]) {
      if (val === v) return key;
    }
    throw new Error(`${label}: Value not found: ${v}`);
  });
};

export const getFirstSentence = (text: string) => {
  const match = text.match(/^(.*?[.])\s/);
  return match ? match[1] : text;
};

export const getMapValue = <K, V>({ label, map, key }: { label: string; map: Map<K, V>; key: K }): V => {
  const result = map.get(key);
  if (result === undefined) throw new Error(`${label}: Key not found: ${key}`);
  return result;
};

export const findIndexByKey = <T, K extends keyof T>({
  label,
  array,
  key,
  value,
}: {
  label: string;
  array: T[];
  key: K;
  value: T[K] | undefined;
}): number => {
  if (value === undefined) throw new Error(`${label}: Value is undefined`);
  const index = array.findIndex(item => item[key] === value);
  if (index === -1) throw new Error(`${label}: Index of item not found for value: ${value}`);
  return index;
};

export const isNullish = (...values: any[]): string => {
  return values.find(value => value !== undefined) ?? '-';
};
