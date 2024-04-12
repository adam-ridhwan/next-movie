/* eslint-disable */

import { z } from 'zod';

import { RESIZE_DIRECTION, SLIDE_DIRECTION } from '@/lib/constants';

export type TODO = any;

export type SlideDirection = (typeof SLIDE_DIRECTION)[keyof typeof SLIDE_DIRECTION];
export type ResizeDirection = (typeof RESIZE_DIRECTION)[keyof typeof RESIZE_DIRECTION];

export const formResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  user: z.any().nullable().optional(),
});
export type FormResponse = z.infer<typeof formResponseSchema>;

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
