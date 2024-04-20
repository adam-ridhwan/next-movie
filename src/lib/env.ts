import { cleanEnv, str } from 'envalid';

// Only works in server side
export const env = cleanEnv(process.env, {
  NEXT_PUBLIC_NODE_ENV: str(),
  TMDB_API_KEY: str(),
  TMDB_READ_ACCESS_TOKEN: str(),
});
