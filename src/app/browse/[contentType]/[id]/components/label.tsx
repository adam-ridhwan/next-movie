import { fetchDetails } from '@/actions/fetch-details';

import { ContentRouteParams } from '@/lib/types';
import { HeadingLarge } from '@/components/fonts';

export async function Label({ contentType, id }: ContentRouteParams) {
  const details = await fetchDetails(id, contentType);

  return (
    <>
      <HeadingLarge>{details.title || details.name}</HeadingLarge>
      <p className=''>{details.overview}</p>
    </>
  );
}
