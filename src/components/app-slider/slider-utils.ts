'use client';

import { MEDIA_QUERY } from '@/lib/constants';

const getCardsPerPage = () => {
  const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
  if (windowWidth < MEDIA_QUERY.SM) return 2;
  if (windowWidth < MEDIA_QUERY.MD) return 3;
  if (windowWidth < MEDIA_QUERY.LG) return 4;
  if (windowWidth < MEDIA_QUERY.XL) return 5;
  return 6;
};

export const sliderUtils = {
  getCardsPerPage,
};
