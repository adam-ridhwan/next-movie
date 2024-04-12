import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MovieWhereUniqueInputSchema } from '../inputTypeSchemas/MovieWhereUniqueInputSchema'
import { MovieCreateInputSchema } from '../inputTypeSchemas/MovieCreateInputSchema'
import { MovieUncheckedCreateInputSchema } from '../inputTypeSchemas/MovieUncheckedCreateInputSchema'
import { MovieUpdateInputSchema } from '../inputTypeSchemas/MovieUpdateInputSchema'
import { MovieUncheckedUpdateInputSchema } from '../inputTypeSchemas/MovieUncheckedUpdateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MovieSelectSchema: z.ZodType<Prisma.MovieSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  thumbnailUrl: z.boolean().optional(),
}).strict()

export const MovieUpsertArgsSchema: z.ZodType<Prisma.MovieUpsertArgs> = z.object({
  select: MovieSelectSchema.optional(),
  where: MovieWhereUniqueInputSchema,
  create: z.union([ MovieCreateInputSchema,MovieUncheckedCreateInputSchema ]),
  update: z.union([ MovieUpdateInputSchema,MovieUncheckedUpdateInputSchema ]),
}).strict() ;

export default MovieUpsertArgsSchema;
