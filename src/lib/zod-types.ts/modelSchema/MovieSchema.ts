import { z } from 'zod';

/////////////////////////////////////////
// MOVIE SCHEMA
/////////////////////////////////////////

export const MovieSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  thumbnailUrl: z.string(),
})

export type Movie = z.infer<typeof MovieSchema>

export default MovieSchema;
