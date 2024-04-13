import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MovieCreateManyInputSchema } from '../inputTypeSchemas/MovieCreateManyInputSchema'

export const MovieCreateManyArgsSchema: z.ZodType<Prisma.MovieCreateManyArgs> = z.object({
  data: z.union([ MovieCreateManyInputSchema,MovieCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default MovieCreateManyArgsSchema;
