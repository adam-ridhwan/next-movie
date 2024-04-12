import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MovieUpdateInputSchema } from '../inputTypeSchemas/MovieUpdateInputSchema'
import { MovieUncheckedUpdateInputSchema } from '../inputTypeSchemas/MovieUncheckedUpdateInputSchema'
import { MovieWhereUniqueInputSchema } from '../inputTypeSchemas/MovieWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MovieSelectSchema: z.ZodType<Prisma.MovieSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  thumbnailUrl: z.boolean().optional(),
}).strict()

export const MovieUpdateArgsSchema: z.ZodType<Prisma.MovieUpdateArgs> = z.object({
  select: MovieSelectSchema.optional(),
  data: z.union([ MovieUpdateInputSchema,MovieUncheckedUpdateInputSchema ]),
  where: MovieWhereUniqueInputSchema,
}).strict() ;

export default MovieUpdateArgsSchema;
