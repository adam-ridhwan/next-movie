import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MovieWhereInputSchema } from './MovieWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';

export const MovieWhereUniqueInputSchema: z.ZodType<Prisma.MovieWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    uuid: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    uuid: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  uuid: z.string().optional(),
  AND: z.union([ z.lazy(() => MovieWhereInputSchema),z.lazy(() => MovieWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MovieWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MovieWhereInputSchema),z.lazy(() => MovieWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  thumbnailUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict());

export default MovieWhereUniqueInputSchema;
