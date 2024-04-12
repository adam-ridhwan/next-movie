import { z } from 'zod';

export const MovieScalarFieldEnumSchema = z.enum(['id','uuid','title','description','thumbnailUrl']);

export default MovieScalarFieldEnumSchema;
