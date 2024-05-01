import { z } from 'zod';

export const Route = {
  name: 'MovieModal',
  params: z.object({
    id: z.string(),
  }),
};
