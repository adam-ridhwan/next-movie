import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MovieWhereInputSchema } from '../inputTypeSchemas/MovieWhereInputSchema'

export const MovieDeleteManyArgsSchema: z.ZodType<Prisma.MovieDeleteManyArgs> = z.object({
  where: MovieWhereInputSchema.optional(),
}).strict() ;

export default MovieDeleteManyArgsSchema;
