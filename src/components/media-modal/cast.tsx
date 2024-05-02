import { fetchTMDB } from '@/actions/fetch-tmdb';
import { SliderProvider } from '@/providers/slider/slider-provider';

import { ContentRouteParams } from '@/types/global-types';
import { CreditsResponse } from '@/types/tmdb-types';
import Slider from '@/components/slider/slider';

export default async function Cast({ id, mediaType }: ContentRouteParams) {
  const credits = await fetchTMDB({ mediaType, id, category: 'credits' });
  const { success, data, error } = CreditsResponse.safeParse(credits);
  if (!success) throw new Error(`Cast() Invalid credits schema: ${error.message}`);

  // prettier-ignore
  const cast = data.cast
    .filter(({ known_for_department }) => known_for_department === 'Acting')
    .slice(0, 15);

  if (!cast.length) return null;

  return (
    <SliderProvider content={cast} mediaType={mediaType} section='cast'>
      <Slider headerTitle='Cast' />
    </SliderProvider>
  );
}
