import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MovieWhereInputSchema } from '../inputTypeSchemas/MovieWhereInputSchema'
import { MovieOrderByWithRelationInputSchema } from '../inputTypeSchemas/MovieOrderByWithRelationInputSchema'
import { MovieWhereUniqueInputSchema } from '../inputTypeSchemas/MovieWhereUniqueInputSchema'
import { MovieScalarFieldEnumSchema } from '../inputTypeSchemas/MovieScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MovieSelectSchema: z.ZodType<Prisma.MovieSelect> = z.object({
  id: z.boolean().optional(),
  uuid: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  thumbnailUrl: z.boolean().optional(),
}).strict()

export const MovieFindFirstArgsSchema: z.ZodType<Prisma.MovieFindFirstArgs> = z.object({
  select: MovieSelectSchema.optional(),
  where: MovieWhereInputSchema.optional(),
  orderBy: z.union([ MovieOrderByWithRelationInputSchema.array(),MovieOrderByWithRelationInputSchema ]).optional(),
  cursor: MovieWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MovieScalarFieldEnumSchema,MovieScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default MovieFindFirstArgsSchema;
