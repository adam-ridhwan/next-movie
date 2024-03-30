import { cleanEnv, str } from 'envalid';

// Only works in server side
export const env = cleanEnv(process.env, {
  NEXT_PUBLIC_NODE_ENV: str(),

  MONGODB_URI: str(),
  MONGODB_DATABASE: str(),

  USERS_COLLECTION: str(),

  NEXTAUTH_SECRET: str(),
  NEXTAUTH_URL: str(),
});
