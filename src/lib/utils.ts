import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { MEDIA_QUERY } from '@/lib/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getCardsPerPage = () => {
  const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
  if (windowWidth < MEDIA_QUERY.SM) return 2;
  if (windowWidth < MEDIA_QUERY.MD) return 3;
  if (windowWidth < MEDIA_QUERY.LG) return 4;
  if (windowWidth < MEDIA_QUERY.XL) return 5;
  return 6;
};
