import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams, TODO } from '@/lib/types';
import { HeadingLarge } from '@/components/fonts';

export async function Label({ mediaType, id }: ContentRouteParams) {
  const details: TODO = await fetchTMDB({ label: '', category: 'details', mediaType, id });

  return (
    <>
      <HeadingLarge>{details.title || details.name}</HeadingLarge>
      <p className=''>{details.overview}</p>
    </>
  );
}
