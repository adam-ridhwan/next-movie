import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MovieWhereInputSchema } from '../inputTypeSchemas/MovieWhereInputSchema'
import { MovieOrderByWithAggregationInputSchema } from '../inputTypeSchemas/MovieOrderByWithAggregationInputSchema'
import { MovieScalarFieldEnumSchema } from '../inputTypeSchemas/MovieScalarFieldEnumSchema'
import { MovieScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/MovieScalarWhereWithAggregatesInputSchema'

export const MovieGroupByArgsSchema: z.ZodType<Prisma.MovieGroupByArgs> = z.object({
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithAggregationInputSchema.array(),MovieOrderByWithAggregationInputSchema ]).optional(),
  by: MovieScalarFieldEnumSchema.array(),
  having: MovieScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default MovieGroupByArgsSchema;
