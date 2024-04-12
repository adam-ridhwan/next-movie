import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','email','password','name','emailVerified','image']);

export default UserScalarFieldEnumSchema;
