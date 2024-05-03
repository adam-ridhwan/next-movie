import { z } from 'zod';

export const Route = {
  name: 'MediaModal',
  params: z.object({
    mediaType: z.string(),
    id: z.string().optional(),
  }),
};
