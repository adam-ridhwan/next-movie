import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams } from '@/lib/types';
import { HeadingLarge } from '@/components/fonts';

export async function Label({ mediaType, id }: ContentRouteParams) {
  const details = await fetchTMDB({ category: 'details', mediaType, id });

  return (
    <>
      <HeadingLarge>{details.name || details.original_title || details.original_name}</HeadingLarge>
      <p className=''>{details.overview}</p>
    </>
  );
}
