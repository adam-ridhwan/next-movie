import { z } from 'zod';

import { Slug } from '@/types/global-types';

export const Route = {
  name: 'MediaModal',
  params: z.object({
    slug: Slug,
  }),
};
