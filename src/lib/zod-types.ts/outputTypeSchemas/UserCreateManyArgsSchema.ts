import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateManyInputSchema } from '../inputTypeSchemas/UserCreateManyInputSchema'

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default UserCreateManyArgsSchema;
