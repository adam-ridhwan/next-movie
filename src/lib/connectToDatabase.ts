import { User } from 'next-auth';

import { env } from './env';
import { clientPromise } from './mongodb';

const { MONGODB_DATABASE, USERS_COLLECTION } = env;

export const connectToDatabase = async () => {
  const client = await clientPromise;
  const db = client.db(MONGODB_DATABASE);

  const usersCollection = db.collection<User>(USERS_COLLECTION);

  return {
    usersCollection,
  };
};
