import { User } from 'next-auth';

import { env } from './env';
import { clientPromise } from './mongodb';

const { MONGODB_DATABASE, USER_COLLECTION } = env;

export const connectToDatabase = async () => {
  const client = await clientPromise;
  const db = client.db(MONGODB_DATABASE);

  const userCollection = db.collection<User>(USER_COLLECTION);

  return {
    userCollection,
  };
};
