export const DEVELOPMENT_MODE = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

export const TIMEOUT_DURATION = 700;
export const MINIMUM_TILE_COUNT = 6;

export const MEDIA_QUERY = {
  SM: 800,
  MD: 1000,
  LG: 1300,
} as const;

export type SlideDirection = 'left' | 'right';
export type ResizeDirection = 'maximizing' | 'minimizing';
