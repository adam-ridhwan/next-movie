import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams, DetailsSchema } from '@/lib/types';
import { HeadingLarge } from '@/components/fonts';

export async function Label({ mediaType, id }: ContentRouteParams) {
  const details = await fetchTMDB({ category: 'details', mediaType, id });
  const parseDetails = DetailsSchema.safeParse(details);
  if (!parseDetails.success) return null;

  return (
    <>
      <HeadingLarge>{`${parseDetails.data.original_name || parseDetails.data.original_title || '-'}`}</HeadingLarge>
      <p className=''>{parseDetails.data.overview}</p>
    </>
  );
}
