import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const MovieCreateInputSchema: z.ZodType<Prisma.MovieCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  thumbnailUrl: z.string()
}).strict();

export default MovieCreateInputSchema;
