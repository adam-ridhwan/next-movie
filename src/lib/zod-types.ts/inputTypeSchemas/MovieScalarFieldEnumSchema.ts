import { z } from 'zod';

export const MovieScalarFieldEnumSchema = z.enum(['id','title','description','thumbnailUrl']);

export default MovieScalarFieldEnumSchema;
