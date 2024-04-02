/* eslint-disable */

import { z } from 'zod';

import { DIRECTION } from '@/lib/constants';

export type TODO = any;

export const mongoIdSchema = z.string();

export const formResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  user: z.any().nullable().optional(),
});
export type FormResponse = z.infer<typeof formResponseSchema>;

export const userSchema = z.object({
  _id: mongoIdSchema.optional(),
  name: z.string().nullable().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  emailVerified: z.date().nullable().optional(),
  image: z.string().nullable().optional(),
});
export type User = z.infer<typeof userSchema>;

export type SlideDirection = (typeof DIRECTION)[keyof typeof DIRECTION];

export const tileSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  year: z.string(),
  category: z.string(),
  rating: z.string(),
  title: z.string(),
});
export const nonEmptyTilesSchema = z.array(tileSchema).nonempty();
export type Tile = z.infer<typeof tileSchema>;
export type Pages = Map<number, Tile[]>;
