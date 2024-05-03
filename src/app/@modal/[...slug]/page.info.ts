import { z } from 'zod';

export const Route = {
  name: 'MediaModal',
  params: z.object({
    slug: z.string().array(),
  }),
};
