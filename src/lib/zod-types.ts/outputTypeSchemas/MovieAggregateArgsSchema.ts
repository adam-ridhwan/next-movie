import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MovieWhereInputSchema } from '../inputTypeSchemas/MovieWhereInputSchema'
import { MovieOrderByWithRelationInputSchema } from '../inputTypeSchemas/MovieOrderByWithRelationInputSchema'
import { MovieWhereUniqueInputSchema } from '../inputTypeSchemas/MovieWhereUniqueInputSchema'

export const MovieAggregateArgsSchema: z.ZodType<Prisma.MovieAggregateArgs> = z.object({
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithRelationInputSchema.array(),MovieOrderByWithRelationInputSchema ]).optional(),
  cursor: MovieWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default MovieAggregateArgsSchema;
