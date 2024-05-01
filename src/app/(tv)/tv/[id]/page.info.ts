import { z } from 'zod';

export const Route = {
  name: 'TvModal',
  params: z.object({
    id: z.string(),
  }),
};
