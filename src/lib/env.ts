import { cleanEnv, str } from 'envalid';

// Only works in server side
export const env = cleanEnv(process.env, {
  NEXT_PUBLIC_NODE_ENV: str(),
  NEXTAUTH_SECRET: str(),
  NEXTAUTH_URL: str(),
  POSTGRES_URL: str(),
  POSTGRES_PRISMA_URL: str(),
  POSTGRES_URL_NO_SSL: str(),
  POSTGRES_URL_NON_POOLING: str(),
  POSTGRES_USER: str(),
  POSTGRES_HOST: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_DATABASE: str(),
  BLOB_READ_WRITE_TOKEN: str(),
  TMDB_API_KEY: str(),
  TMDB_READ_ACCESS_TOKEN: str(),
});
