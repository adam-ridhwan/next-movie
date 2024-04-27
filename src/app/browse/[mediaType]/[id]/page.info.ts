import { z } from 'zod';

export const Route = {
  name: 'Media',
  params: z.object({
    mediaType: z.string(),
    id: z.string(),
  }),
};
