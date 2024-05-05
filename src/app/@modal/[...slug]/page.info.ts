import { z } from 'zod';

import { MediaModalSlug } from '@/types/global-types';

export const Route = {
  name: 'MediaModal',
  params: z.object({
    slug: MediaModalSlug,
  }),
};
