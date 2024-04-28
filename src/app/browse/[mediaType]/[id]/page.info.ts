import { z } from 'zod';

export const Route = {
  name: 'MediaRoute',
  params: z.object({
    mediaType: z.string(),
    id: z.string(),
  }),
};
