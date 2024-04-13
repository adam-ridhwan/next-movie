import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MovieMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MovieMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  thumbnailUrl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MovieMaxOrderByAggregateInputSchema;
