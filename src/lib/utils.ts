import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type KeysOf<T> = keyof T;
export type ValuesOf<T> = T[keyof T];
