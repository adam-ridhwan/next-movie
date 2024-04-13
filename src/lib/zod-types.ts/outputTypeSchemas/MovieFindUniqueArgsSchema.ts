import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MovieWhereUniqueInputSchema } from '../inputTypeSchemas/MovieWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MovieSelectSchema: z.ZodType<Prisma.MovieSelect> = z.object({
  id: z.boolean().optional(),
  uuid: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  thumbnailUrl: z.boolean().optional(),
}).strict()

export const MovieFindUniqueArgsSchema: z.ZodType<Prisma.MovieFindUniqueArgs> = z.object({
  select: MovieSelectSchema.optional(),
  where: MovieWhereUniqueInputSchema,
}).strict() ;

export default MovieFindUniqueArgsSchema;
