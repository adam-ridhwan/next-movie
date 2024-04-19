import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputSchema } from '../inputTypeSchemas/UserWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  name: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export default UserFindUniqueOrThrowArgsSchema;
