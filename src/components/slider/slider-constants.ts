export const TIMEOUT_DURATION = 700;
export const MINIMUM_TILE_COUNT = 6;

export const MEDIA_QUERY = {
  SM: 800,
  MD: 1000,
  LG: 1300,
} as const;

export const SLIDE_DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

export const RESIZE_DIRECTION = {
  MAXIMIZING: 'MAXIMIZING',
  MINIMIZING: 'MINIMIZING',
} as const;

export type SlideDirection = (typeof SLIDE_DIRECTION)[keyof typeof SLIDE_DIRECTION];
export type ResizeDirection = (typeof RESIZE_DIRECTION)[keyof typeof RESIZE_DIRECTION];
