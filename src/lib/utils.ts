import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { GenreLabel } from '@/lib/types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type KeysOf<T> = keyof T;
export type ValuesOf<T> = T[keyof T];

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
  value: V[];
}): K[] => {
  return value.map(v => {
    for (const [key, val] of Object.entries(object) as [K, V][]) {
      if (val === v) return key;
    }
    throw new Error(`${label}: Value not found: ${v}`);
  });
};

export const toPascalCase = (inputString: GenreLabel) => {
  return inputString
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/(?:^|\s)\S/g, c => c.toUpperCase());
};

export const getFirstSentence = (text: string) => {
  const match = text.match(/^(.*?[.])\s/);
  return match ? match[1] : text;
};
