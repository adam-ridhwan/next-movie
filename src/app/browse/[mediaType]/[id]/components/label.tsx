import { fetchTMDB } from '@/actions/fetch-tmdb';

import { CATEGORIES, ContentRouteParams } from '@/lib/types';
import { HeadingLarge } from '@/components/fonts';

export async function Label({ mediaType, id }: ContentRouteParams) {
  const details = await fetchTMDB({ category: CATEGORIES.DETAILS, mediaType, id });

  return (
    <>
      <HeadingLarge>{details.title || details.name}</HeadingLarge>
      <p className=''>{details.overview}</p>
    </>
  );
}
