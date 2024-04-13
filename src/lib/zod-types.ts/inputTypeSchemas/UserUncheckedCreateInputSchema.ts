import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable()
}).strict();

export default UserUncheckedCreateInputSchema;
