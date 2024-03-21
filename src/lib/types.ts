import { ObjectId } from 'mongodb';
import { z } from 'zod';

export type TODO = any;

export type MongoId = string | ObjectId;
export const mongoIdSchema = z.string().or(z.instanceof(ObjectId));

export const userSchema = z.object({
  _id: mongoIdSchema.optional(),
  name: z.string().nullable().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  emailVerified: z.date().nullable().optional(),
  image: z.string().nullable().optional(),
});
export type User = z.infer<typeof userSchema>;
