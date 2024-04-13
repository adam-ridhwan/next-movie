import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';

export const MovieOrderByWithRelationInputSchema: z.ZodType<Prisma.MovieOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  thumbnailUrl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MovieOrderByWithRelationInputSchema;
