import { ObjectId } from 'mongodb';
import { z } from 'zod';

export type TODO = any;

export type MongoId = string | ObjectId;
export const mongoIdSchema = z.string().or(z.instanceof(ObjectId));

const userSchema = z.object({
  _id: mongoIdSchema.optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  emailVerified: z.date().optional(),
  image: z.string().optional(),
});
export type User = z.infer<typeof userSchema>;
