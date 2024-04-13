/* eslint-disable */

import { z } from 'zod';

import { RESIZE_DIRECTION, SLIDE_DIRECTION } from '@/lib/constants';
import { Movie, MovieSchema } from '@/lib/zod-types.ts/modelSchema/MovieSchema';

export type TODO = any;

export type SlideDirection = (typeof SLIDE_DIRECTION)[keyof typeof SLIDE_DIRECTION];
export type ResizeDirection = (typeof RESIZE_DIRECTION)[keyof typeof RESIZE_DIRECTION];

export const formResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  user: z.any().nullable().optional(),
});
export type FormResponse = z.infer<typeof formResponseSchema>;

export const nonEmptyTilesSchema = z.array(MovieSchema).nonempty();
export type Pages = Map<number, Movie[]>;

export const SignInValidationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(7),
  })
  .strict();
