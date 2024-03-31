export const DEVELOPMENT_MODE = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

export const MEDIA_QUERY = {
  SM: 768,
  MD: 1024,
  LG: 1280,
  XL: 1536,
};

export const PADDING = 98;
export const TIMEOUT_DURATION = 700;

export const DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;
