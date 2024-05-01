import { z } from 'zod';

export const Route = {
  name: 'HomeMedia',
  params: z.object({
    mediaType: z.string(),
    id: z.string(),
  }),
};
