import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const MovieCreateManyInputSchema: z.ZodType<Prisma.MovieCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  uuid: z.string().optional().nullable(),
  title: z.string(),
  description: z.string(),
  thumbnailUrl: z.string()
}).strict();

export default MovieCreateManyInputSchema;
