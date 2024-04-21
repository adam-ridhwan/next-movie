import { fetchDetails } from '@/actions/fetch-details';

import { ContentType } from '@/lib/types';
import { HeadingLarge } from '@/components/fonts';

type LabelProps = {
  contentType: ContentType;
  id: string;
};

export async function Label({ contentType, id }: LabelProps) {
  const details = await fetchDetails(id, contentType);

  return (
    <>
      <HeadingLarge>{details.title || details.name}</HeadingLarge>
      <p className=''>{details.overview}</p>
    </>
  );
}
