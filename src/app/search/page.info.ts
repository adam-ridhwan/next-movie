import { z } from 'zod';

export const Route = {
  name: 'SearchRoute',
  params: z.object({}),
  search: z.object({
    q: z.string().optional(),
  }),
};
