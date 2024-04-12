import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MovieUpdateManyMutationInputSchema } from '../inputTypeSchemas/MovieUpdateManyMutationInputSchema'
import { MovieUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/MovieUncheckedUpdateManyInputSchema'
import { MovieWhereInputSchema } from '../inputTypeSchemas/MovieWhereInputSchema'

export const MovieUpdateManyArgsSchema: z.ZodType<Prisma.MovieUpdateManyArgs> = z.object({
  data: z.union([ MovieUpdateManyMutationInputSchema,MovieUncheckedUpdateManyInputSchema ]),
  where: MovieWhereInputSchema.optional(),
}).strict() ;

export default MovieUpdateManyArgsSchema;
