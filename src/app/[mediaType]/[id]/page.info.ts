import { z } from 'zod';

export const Route = {
  name: 'MovieModal',
  params: z.object({
    mediaType: z.string(),
    id: z.string(),
  }),
};
