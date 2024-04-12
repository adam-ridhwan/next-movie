import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { MovieCountOrderByAggregateInputSchema } from './MovieCountOrderByAggregateInputSchema';
import { MovieMaxOrderByAggregateInputSchema } from './MovieMaxOrderByAggregateInputSchema';
import { MovieMinOrderByAggregateInputSchema } from './MovieMinOrderByAggregateInputSchema';

export const MovieOrderByWithAggregationInputSchema: z.ZodType<Prisma.MovieOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  thumbnailUrl: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MovieCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MovieMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MovieMinOrderByAggregateInputSchema).optional()
}).strict();

export default MovieOrderByWithAggregationInputSchema;
