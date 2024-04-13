import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MovieCreateInputSchema } from '../inputTypeSchemas/MovieCreateInputSchema'
import { MovieUncheckedCreateInputSchema } from '../inputTypeSchemas/MovieUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MovieSelectSchema: z.ZodType<Prisma.MovieSelect> = z.object({
  id: z.boolean().optional(),
  uuid: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  thumbnailUrl: z.boolean().optional(),
}).strict()

export const MovieCreateArgsSchema: z.ZodType<Prisma.MovieCreateArgs> = z.object({
  select: MovieSelectSchema.optional(),
  data: z.union([ MovieCreateInputSchema,MovieUncheckedCreateInputSchema ]),
}).strict() ;

export default MovieCreateArgsSchema;
