import { env } from './env';
import { clientPromise } from './mongodb';
import { User } from './types';

const { MONGODB_DATABASE, USERS_COLLECTION } = env;

export const connectToDatabase = async () => {
  const client = await clientPromise;
  const db = client.db(MONGODB_DATABASE);

  const usersCollection = db.collection<User>(USERS_COLLECTION);

  return {
    usersCollection,
  };
};
